// Final visual verification shots (own chromium, no MCP profile).
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('https://shop1.keys-starter.com/?final=' + Date.now(), { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);
  await page.evaluate(() => { const el = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('Most trusted')); if (el) el.scrollIntoView({ block: 'center' }); });
  await page.waitForTimeout(800);
  await page.screenshot({ path: '../final-best-band.png' });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await page.screenshot({ path: '../final-home-top.png' });
  await page.goto('https://shop1.keys-starter.com/b2b?final=' + Date.now(), { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: '../final-b2b-top.png' });
  await browser.close();
  console.log('shots done');
})();
