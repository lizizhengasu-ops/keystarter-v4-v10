const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto('https://keys-starter.com/product/windows-11-pro?v=' + Date.now(), { waitUntil: 'commit', timeout: 30000 });
  const read = () => p.evaluate(() => {
    const blocks = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s => {
      try { const j = JSON.parse(s.textContent); const o = (Array.isArray(j) ? j : [j]).find(x => x['@type'] === 'Product'); return o ? { hasImage: !!o.image, img: o.image ? String(o.image).slice(-20) : null } : null; }
      catch { return 'PARSE_ERR'; }
    }).filter(Boolean);
    return { n: blocks.length, blocks, canonical: !!document.head.querySelector('link[rel="canonical"]') };
  }).catch(() => 'page-not-ready');
  for (const t of [300, 800, 1500, 3000]) {
    await p.waitForTimeout(t === 300 ? 300 : t - (t === 800 ? 300 : t === 1500 ? 800 : 1500));
    console.log(t + 'ms:', JSON.stringify(await read().catch(() => 'err')));
  }
  await b.close();
})();
