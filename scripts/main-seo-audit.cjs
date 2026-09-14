// Main-site full SEO audit: server HTML + rendered + CDP perf.
// 14 routes x {onpage, headings, images, links, jsonld, perf(lcp/cls/weight), screenshots}
const { chromium } = require('playwright');
const fs = require('fs');

const BASE = 'https://keys-starter.com';
const ROUTES = ['/', '/products', '/product/windows-11-pro', '/blog', '/about', '/support', '/b2b', '/faq', '/contact', '/links', '/privacy', '/terms', '/refund', '/changelog'];
const ARTICLE = '/blog/windows-microsoft-ai-news-2026-09-13'; // sample article (may 404)

function textOf(el) { return (el && el.textContent || '').trim(); }

(async () => {
  fs.mkdirSync('audit/main/shots', { recursive: true });
  const out = [];

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  const routes = ROUTES.concat([ARTICLE]);

  for (const route of routes) {
    const rec = { route, status: 0 };
    try {
      const resp = await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 30000 });
      rec.status = resp ? resp.status() : 0;
      await page.waitForTimeout(3200);

      rec.seo = await page.evaluate(() => {
        const textOf = (el) => ((el && el.textContent) || '').trim();
        const o = {};
        o.title = document.title;
        o.titleLen = document.title.length;
        const md = document.querySelector('meta[name="description"]');
        o.desc = md ? md.content.trim() : null;
        o.descLen = o.desc ? o.desc.length : 0;
        const can = document.querySelector('link[rel="canonical"]');
        o.canonical = can ? can.href : null;
        o.hreflang = Array.from(document.querySelectorAll('link[rel="alternate"][hreflang]')).map(l => l.getAttribute('hreflang'));
        const rb = document.querySelector('meta[name="robots"]');
        o.robotsMeta = rb ? rb.content : null;
        o.og = {};
        ['og:title', 'og:description', 'og:image', 'og:url', 'og:type'].forEach(k => {
          const m = document.querySelector(`meta[property="${k}"]`);
          o.og[k] = m ? m.content : null;
        });
        const tw = document.querySelector('meta[name="twitter:card"]');
        o.twitterCard = tw ? tw.content : null;
        const jlds = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s => {
          try { const j = JSON.parse(s.textContent); return Array.isArray(j) ? j.map(x => x['@type']) : j['@type']; } catch { return 'INVALID_JSON'; }
        });
        o.jsonldTypes = jlds.flat();
        // Product schema required props
        const prodLd = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s => { try { return JSON.parse(s.textContent); } catch { return null; } }).flat().filter(j => j && (j['@type'] === 'Product'));
        if (prodLd.length) {
          const p = prodLd[0];
          o.productSchema = {
            hasName: !!p.name, hasImage: !!p.image, hasBrand: !!(p.brand),
            offers: p.offers ? { price: p.offers.price != null, currency: p.offers.priceCurrency, availability: p.offers.availability, url: !!p.offers.url } : null,
            hasRating: !!(p.aggregateRating),
          };
        }
        // headings
        const h1s = Array.from(document.querySelectorAll('h1'));
        o.h1Count = h1s.length;
        o.h1 = textOf(h1s[0]).slice(0, 70);
        const order = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(h => +h.tagName[1]);
        let skips = 0, prev = 0;
        for (const l of order) { if (prev && l - prev > 1) skips++; prev = l; }
        o.headingSkips = skips;
        // body word count (rough)
        const bodyClone = document.body.cloneNode(true);
        bodyClone.querySelectorAll('script,style,noscript,svg').forEach(e => e.remove());
        o.wordCount = (bodyClone.innerText || '').split(/\s+/).filter(Boolean).length;
        // images
        const imgs = Array.from(document.querySelectorAll('img'));
        o.imgTotal = imgs.length;
        o.imgNoAlt = imgs.filter(i => !i.hasAttribute('alt')).length;
        o.imgEmptyAlt = imgs.filter(i => i.getAttribute('alt') === '').length;
        o.imgBig = imgs.filter(i => i.naturalWidth > 1600).length;
        // links
        const links = Array.from(document.querySelectorAll('a[href]'));
        o.linksInternal = links.filter(a => /keys-starter\.com/.test(a.href) || a.href.startsWith('/')).length;
        o.linksExternal = links.filter(a => /^https?:/.test(a.href) && !/keys-starter\.com/.test(a.href)).length;
        o.linksNofollow = links.filter(a => a.rel.includes('nofollow')).length;
        // paragraph measure sample
        const ps = Array.from(document.querySelectorAll('p')).filter(p => p.clientWidth > 0);
        o.widestP = ps.length ? Math.max(...ps.map(p => Math.round(p.clientWidth / (parseFloat(getComputedStyle(p).fontSize) * 0.5)))) : 0;
        return o;
      }).catch(e => ({ evalError: String(e.message).slice(0, 80) }));

      // Performance via CDP
      const cdp = await ctx.newCDPSession(page);
      const metrics = {};
      await cdp.send('Performance.enable');
      const t0 = Date.now();
      // reload with network+perf capture
      const lcp = page.evaluate(() => new Promise(res => {
        let v = 0;
        try {
          new PerformanceObserver(l => { const e = l.getEntries(); if (e.length) v = e[e.length - 1].startTime; res(v); }).observe({ type: 'largest-contentful-paint', buffered: true });
          setTimeout(() => res(v), 6000);
        } catch { res(-1); }
      }));
      await page.reload({ waitUntil: 'load', timeout: 30000 });
      const lcpMs = await lcp;
      const perf = await cdp.send('Performance.getMetrics');
      const nav = await page.evaluate(() => {
        const n = performance.getEntriesByType('navigation')[0];
        const res = performance.getEntriesByType('resource');
        return {
          ttfb: n ? Math.round(n.responseStart) : null,
          domContentLoaded: n ? Math.round(n.domContentLoadedEventEnd) : null,
          load: n ? Math.round(n.loadEventEnd > 0 ? n.loadEventEnd : performance.now()) : null,
          transferBytes: Math.round(res.reduce((a, r) => a + (r.transferSize || 0), 0) / 1024),
          reqCount: res.length,
        };
      });
      metrics.lcpMs = Math.round(lcpMs);
      metrics.ttfb = nav.ttfb; metrics.load = nav.load;
      metrics.kb = nav.transferBytes; metrics.reqs = nav.reqCount;
      rec.perf = metrics;
      await cdp.detach();

      await page.screenshot({ path: `audit/main/shots/${route.replace(/\//g, '_') || 'root'}.png` });
    } catch (e) {
      rec.error = String(e.message).split('\n')[0].slice(0, 90);
    }
    out.push(rec);
    console.log(`${rec.status || 'ERR'} ${route} ${rec.perf ? 'lcp=' + rec.perf.lcpMs + 'ms kb=' + rec.perf.kb : rec.error || ''}`);
  }

  // site-level: robots + sitemap sample
  const site = {};
  const robots = await page.request.get(BASE + '/robots.txt', { ignoreHTTPSErrors: true, timeout: 20000 });
  site.robots = (await robots.text()).slice(0, 900);
  const sm = await page.request.get(BASE + '/sitemap.xml', { ignoreHTTPSErrors: true, timeout: 20000 });
  const smBody = await sm.text();
  const urls = (smBody.match(/<loc>([^<]+)<\/loc>/g) || []).map(s => s.replace(/<\/?loc>/g, ''));
  site.sitemapCount = urls.length;
  site.sitemapSample = urls.slice(0, 6);
  // sample 10 sitemap URLs for status
  const sample = [];
  for (const u of urls.filter((_, i) => i % 10 === 0).slice(0, 10)) {
    try { const r = await page.request.get(u, { ignoreHTTPSErrors: true, timeout: 15000 }); sample.push(r.status() + ' ' + u.replace(BASE, '')); } catch { sample.push('ERR ' + u); }
  }
  site.sitemapSampleStatus = sample;
  fs.writeFileSync('audit/main/site-level.json', JSON.stringify(site, null, 1));

  fs.writeFileSync('audit/main/seo-audit.json', JSON.stringify(out, null, 1));
  await browser.close();
  console.log('AUDIT DONE');
})();
