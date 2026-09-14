// Probe the "Most trusted this month" h2 computed styles on live shop1.
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('https://shop1.keys-starter.com/?probe=' + Date.now(), { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3500);
  const out = await page.evaluate(() => {
    const o = {};
    const target = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('Most trusted'));
    if (!target) { o.missing = true; return o; }
    const cs = getComputedStyle(target);
    o.color = cs.color;
    o.fontSize = cs.fontSize;
    let node = target;
    const bgs = [];
    while (node && node !== document.documentElement && bgs.length < 8) {
      bgs.push((node.tagName || '') + '.' + String(node.className).slice(0, 20) + ' => ' + getComputedStyle(node).backgroundColor);
      node = node.parentElement;
    }
    o.ancestors = bgs;
    return o;
  });
  console.log(JSON.stringify(out, null, 1));
  await browser.close();
})();
