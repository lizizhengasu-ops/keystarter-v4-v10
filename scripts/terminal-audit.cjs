// Terminal design audit — gstack design-review categories + MS pillars,
// executed with Playwright against the live shop1 Terminal build.
const { chromium } = require('playwright');
const fs = require('fs');

const BASE = 'https://shop1.keys-starter.com';
const ROUTES = ['/', '/products', '/product/windows-11-pro', '/about', '/support', '/b2b', '/blog', '/faq', '/contact', '/links', '/changelog', '/downloads'];

function ratio(l1, l2) {
  const lum = (rgb) => {
    const [r, g, b] = rgb.map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const L1 = lum(l1), L2 = lum(l2);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}
const parseRGB = (s) => (s.match(/\d+(\.\d+)?/g) || [255, 255, 255]).slice(0, 3).map(Number);

(async () => {
  fs.mkdirSync('audit/shots', { recursive: true });
  const browser = await chromium.launch();
  const report = [];

  for (const viewport of [['desktop', 1440, 900], ['mobile', 375, 812]]) {
    const [label, w, h] = viewport;
    const ctx = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    const consoleErrors = [];
    page.on('console', m => { if (m.type() === 'error' && !/googletagmanager|google-analytics/.test(m.location()?.url || '')) consoleErrors.push(m.text().slice(0, 90)); });

    for (const route of ROUTES) {
      try {
        await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await page.waitForTimeout(3200);
        const m = await page.evaluate(() => {
          const parseRGB = (s) => (s.match(/\d+(\.\d+)?/g) || [255, 255, 255]).slice(0, 3).map(Number);
          const lum = (rgb) => {
            const [r, g, b] = rgb.map(v => {
              v /= 255;
              return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
            });
            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
          };
          const ratio = (l1, l2) => {
            const L1 = lum(l1), L2 = lum(l2);
            return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
          };
          const out = {};
          const de = document.documentElement;
          out.overflowX = de.scrollWidth > de.clientWidth + 1 ? de.scrollWidth - de.clientWidth : 0;
          const bodyCS = getComputedStyle(document.body);
          out.bodyFont = bodyCS.fontFamily.split(',')[0].replace(/"/g, '');
          out.bodySize = bodyCS.fontSize;
          const fams = new Set();
          document.querySelectorAll('h1,h2,h3,h4,p,a,button,span,li,td,summary').forEach(e => {
            const f = getComputedStyle(e).fontFamily.split(',')[0].replace(/"/g, '');
            if (f) fams.add(f);
          });
          out.fontFamilies = Array.from(fams);
          const heads = Array.from(document.querySelectorAll('h1,h2,h3')).slice(0, 12).map(h => {
            const cs = getComputedStyle(h);
            return { t: h.textContent.trim().slice(0, 28), tag: h.tagName, size: cs.fontSize, weight: cs.fontWeight, ls: cs.letterSpacing, ff: cs.fontFamily.split(',')[0].replace(/"/g, '') };
          });
          out.headings = heads;
          // tap targets
          const small = [];
          document.querySelectorAll('a,button,select,input,summary').forEach(e => {
            const r = e.getBoundingClientRect();
            if (r.width > 0 && r.height > 0 && r.height < 24 && e.textContent.trim()) {
              small.push({ t: e.textContent.trim().slice(0, 24), h: Math.round(r.height) });
            }
          });
          out.smallTargets = small.slice(0, 6);
          // contrast sampling
          const bad = [];
          const seen = new Set();
          document.querySelectorAll('p,span,a,li,h1,h2,h3,button,small,td,th,label').forEach(e => {
            if (bad.length >= 8 || seen.size > 260) return;
            const txt = (e.childNodes.length && Array.from(e.childNodes).some(n => n.nodeType === 3 && n.textContent.trim())) ? e.textContent.trim().slice(0, 30) : '';
            if (!txt || seen.has(txt)) return;
            seen.add(txt);
            const cs = getComputedStyle(e);
            if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) < 0.15) return;
            let fg = parseRGB(cs.color);
            let node = e, bg = null;
            while (node && node !== document.documentElement) {
              const b = getComputedStyle(node).backgroundColor;
              if (b && !b.includes('rgba(0, 0, 0, 0)')) { bg = parseRGB(b); break; }
              node = node.parentElement;
            }
            if (!bg) bg = [255, 255, 255];
            const size = parseFloat(cs.fontSize);
            const large = size >= 24 || (size >= 18.66 && parseInt(cs.fontWeight) >= 700);
            const min = large ? 3 : 4.5;
            const r = ratio(fg, bg);
            if (r < min) bad.push({ t: txt, ratio: +r.toFixed(2), size: +size.toFixed(0), min, fg: cs.color, bg: `rgb(${bg.join(',')})` });
          });
          out.contrastFails = bad;
          // images
          const imgs = [];
          document.querySelectorAll('img').forEach(im => {
            if (!im.naturalWidth && im.src) imgs.push({ src: im.src.split('/').pop().slice(0, 30), issue: 'missing' });
            else if (im.naturalWidth > 0 && im.width > 0 && im.naturalWidth < im.width * 0.5) imgs.push({ src: im.src.split('/').pop().slice(0, 30), issue: `upscaled ${im.naturalWidth}->${Math.round(im.width)}` });
          });
          out.imgIssues = imgs.slice(0, 6);
          // paragraph measure
          let maxChars = 0, maxW = 0;
          document.querySelectorAll('p').forEach(p => {
            const cs = getComputedStyle(p);
            const chars = Math.round(p.clientWidth / (parseFloat(cs.fontSize) * 0.5));
            if (chars > maxChars) { maxChars = chars; maxW = Math.round(p.clientWidth); }
          });
          out.maxParaChars = maxChars;
          // section rhythm
          const sections = Array.from(document.querySelectorAll('section')).slice(0, 14).map(s => Math.round(s.getBoundingClientRect().height));
          out.sectionHeights = sections;
          out.buttons = Array.from(document.querySelectorAll('a.btn,button.btn,button[class*="btn"],a[class*="btn"]')).map(b => b.textContent.trim().slice(0, 24)).filter(Boolean).slice(0, 10);
          return out;
        });
        m.route = route; m.viewport = label; m.consoleErrors = consoleErrors.splice(0);
        report.push(m);
        await page.screenshot({ path: `audit/shots/${route.replace(/\//g, '_') || 'root'}-${label}.png` });
        console.log(`audited ${label} ${route}`);
      } catch (e) {
        console.log(`FAIL ${label} ${route} :: ${String(e.message).split('\n')[0].slice(0, 60)}`);
      }
    }
    await ctx.close();
  }
  fs.writeFileSync('audit/audit.json', JSON.stringify(report, null, 1));
  await browser.close();
  console.log('DONE');
})();
