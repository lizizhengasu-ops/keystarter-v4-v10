const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto('https://keys-starter.com/product/windows-11-pro?v=' + Date.now(), { waitUntil: 'domcontentloaded', timeout: 30000 });
  await p.waitForTimeout(3500);
  const out = await p.evaluate(() => {
    const o = {};
    // all JSON-LD blocks
    o.ld = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s => {
      try { const j = JSON.parse(s.textContent); return (Array.isArray(j) ? j : [j]).map(x => ({ type: x['@type'], name: (x.name || '').slice(0, 24), hasImage: !!x.image })); }
      catch { return [{ type: 'PARSE_ERR' }]; }
    }).flat();
    // find the widest paragraph precisely
    let worst = null;
    document.querySelectorAll('p').forEach(pp => {
      const cs = getComputedStyle(pp);
      if (pp.clientWidth <= 0) return;
      const chars = Math.round(pp.clientWidth / (parseFloat(cs.fontSize) * 0.5));
      if (!worst || chars > worst.chars) worst = { chars, w: Math.round(pp.clientWidth), fs: cs.fontSize, txt: (pp.textContent || '').trim().slice(0, 50), cls: String(pp.className).slice(0, 60), inMain: !!pp.closest('main'), parentCls: String((pp.closest('section,div[class]') || {}).className || '').slice(0, 60) };
    });
    o.widestP = worst;
    return o;
  });
  console.log(JSON.stringify(out, null, 1));
  await b.close();
})();
