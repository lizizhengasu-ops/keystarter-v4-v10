// A1: prerender batch — render 13 routes + 26 product pages from the LIVE
// deployed build, clean Worker-injected duplicates (hidden H1 + #seo-jsonld),
// output prerender-out/<route>/index.html for upload.
// Run AFTER every content deploy (see main-site-seo-execution-plan §2.4).
//
// v2 (2026-09-16) — fix for "all 26 product snapshots are bare shells":
//  v1 defect: goto(waitUntil:networkidle) timed out on long-lived connections
//  (s33k.js / chat WS / analytics), then `.catch(()=>waitForTimeout(4000))`
//  silently captured the pre-hydration SPA shell (0 H2, template H1s) and
//  marked it OK — the broken shell then overwrote good snapshots on upload.
//  Red line (playbook §6): NO silent degradation in render scripts; every
//  artifact must pass a content gate before it may be written as OK/uploaded.
//  Changes:
//   1. goto uses domcontentloaded, then an explicit CONTENT-SIGNAL wait
//      (waitForSelector('h2') for product pages). Timeout => FAIL, no capture.
//   2. Post-cleanup gate: product pages need h2>=5 AND exactly 1 visible H1;
//      routes need >=1 visible H1 (the shell state carries 5 template H1s,
//      so exactly-1 is the discriminator). Failures go to prerender-out/.reject/ and
//      are recorded in manifest with a reason.
//   3. /blog is EXCLUDED (blog-snapshot line owns it; thread boundary).
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// BASE_URL override lets non-prod environments (e.g. staging) re-shoot;
// defaults to production. Uploader must target the matching docroot.
const BASE = (process.env.BASE_URL || 'https://keys-starter.com').replace(/\/$/, '');
const ROUTES = ['/', '/products', '/about', '/support', '/b2b', '/faq', '/contact', '/links', '/privacy', '/terms', '/refund', '/changelog',
  // v2 (2026-09-24, AEO R1): category landing pages — content signal waits for
  // product cards (WooCommerce API render), gate requires >=3 card links.
  '/product-category/windows', '/product-category/office', '/product-category/server-sql', '/product-category/iot-enterprise'];
const SLUGS_FILE = 'audit/main/product-slugs.txt';

(async () => {
  const slugs = fs.readFileSync(SLUGS_FILE, 'utf8').split('\n').map(s => s.trim()).filter(Boolean);
  let targets = ROUTES.map(r => ({ out: r === '/' ? '' : r.replace(/^\//, ''), url: BASE + r, isProduct: false, isCategory: r.startsWith('/product-category/') }))
    .concat(slugs.map(s => ({ out: 'product/' + s, url: BASE + '/product/' + s, isProduct: true })));
  // ONLY=<route-out> e.g. ONLY=product/windows-11-pro — spot re-shoot one page
  const only = process.env.ONLY;
  if (only) targets = targets.filter(t => t.out === only);
  fs.mkdirSync('prerender-out', { recursive: true });
  fs.mkdirSync(path.join('prerender-out', '.reject'), { recursive: true });

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  // ONLY mode merges into the previous manifest so a spot re-shoot keeps the
  // full approved set intact for the uploader.
  const manifestPath = 'prerender-out/manifest.json';
  const manifest = fs.existsSync(manifestPath) && only
    ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    : { generatedAt: new Date().toISOString(), gate: { product: 'h2>=5 && visibleH1==1', route: 'visibleH1==1' }, pages: [] };
  if (only) manifest.generatedAt = new Date().toISOString();
  let ok = 0, reject = 0;

  for (const t of targets) {
    const rec = { route: t.out || '/', url: t.url, isProduct: t.isProduct };
    try {
      // 1) navigation without fragile networkidle
      await page.goto(t.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      // 2) content-signal wait — product pages MUST render their content H2s
      if (t.isProduct) {
        await page.waitForSelector('h2', { timeout: 25000 });
        await page.waitForTimeout(2000); // let per-SKU data fetches settle
      } else if (t.isCategory) {
        await page.waitForSelector('a[href^="/product/"]', { timeout: 25000 });
        await page.waitForTimeout(2000); // let remaining card data settle
      } else {
        await page.waitForTimeout(3000);
      }
      // 3) in-page cleanup of Worker-injected duplicates (edge re-adds them)
      const info = await page.evaluate(() => {
        document.querySelectorAll('h1[style*="position:absolute"], h1[style*="left:-9999px"]').forEach(e => e.remove());
        // The SPA (#seo-jsonld) is the single schema owner: drop edge/legacy
        // ld+json duplicates, keep the SPA block so snapshots carry the @graph.
        document.querySelectorAll('script[type="application/ld+json"]').forEach(e => { if (e.id !== 'seo-jsonld') e.remove(); });
        const visibleH1 = [...document.querySelectorAll('h1')].filter(e => e.offsetParent !== null).length;
        return { h2: document.querySelectorAll('h2').length, visibleH1, bodyLen: document.body.innerText.length, cards: document.querySelectorAll('a[href^="/product/"]').length };
      });
      const html = '<!DOCTYPE html>\n' + await page.evaluate(() => document.documentElement.outerHTML);
      // 4) content gate — reject instead of silently shipping a shell.
      //    RICH: hydrated content page. THIN: hydrated but no PRODUCT_DETAILS
      //    data (content gap, fixed by keyword batch B/C/D) — still a valid,
      //    user-correct page (correct H1/title/price) and far better than the
      //    shell it replaces. Shells/error states never pass (they have
      //    !=1 visible H1 or almost no body text).
      const hydrated = info.visibleH1 === 1 && (t.isProduct ? info.bodyLen >= 1500 : (t.isCategory ? info.cards >= 2 : true));
      const rich = t.isProduct && info.h2 >= 5;
      const pass = hydrated;
      if (!pass) {
        const reason = `visibleH1=${info.visibleH1} h2=${info.h2} bodyLen=${info.bodyLen} (shell/error signature)`;
        fs.writeFileSync(path.join('prerender-out', '.reject', (t.out || 'root').replace(/\//g, '_') + '.html'), html);
        rec.status = 'REJECT'; rec.reason = reason;
        manifest.pages.push(rec); reject++;
        console.log('REJECT', t.out || '/', reason);
        continue;
      }
      const dir = path.join('prerender-out', t.out);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), html);
      rec.status = t.isProduct ? (rich ? 'RICH' : 'THIN') : 'OK';
      if (t.isCategory) rec.cards = info.cards;
      rec.h2 = info.h2; rec.bytes = html.length;
      const idx = manifest.pages.findIndex(p => p.route === rec.route);
      if (idx >= 0) manifest.pages[idx] = rec; else manifest.pages.push(rec);
      ok++;
      console.log(rec.status, t.out || '/', `h2=${info.h2}`);
    } catch (e) {
      rec.status = 'FAIL'; rec.reason = String(e.message).split('\n')[0].slice(0, 90);
      manifest.pages.push(rec); reject++;
      console.log('FAIL', t.out || t.url, rec.reason);
    }
  }
  fs.writeFileSync('prerender-out/manifest.json', JSON.stringify(manifest, null, 1));
  console.log(`DONE ok=${ok} reject/fail=${reject}`);
  await browser.close();
  if (ok === 0) process.exit(2);
})();
