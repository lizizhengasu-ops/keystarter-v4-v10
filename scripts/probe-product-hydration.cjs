// One-page hydration probe: what actually happens on /product/<slug>?
// Logs console errors + failed/slow requests + final DOM state.
const { chromium } = require('playwright');

(async () => {
  const url = process.argv[2] || 'https://keys-starter.com/product/windows-11-pro';
  const browser = await chromium.launch();
  const page = await browser.newPage({ ignoreHTTPSErrors: true });
  page.on('console', m => { if (m.type() === 'error') console.log('CONSOLE-ERR:', m.text().slice(0, 160)); });
  page.on('requestfailed', r => console.log('REQ-FAIL:', r.method(), r.url().slice(0, 120), '|', r.failure() && r.failure().errorText));
  const t0 = Date.now();
  const slow = [];
  page.on('response', r => { const dt = Date.now() - t0; if (r.status() >= 400 || dt > 15000) slow.push(`${r.status()} ${Math.round(dt)}ms ${r.url().slice(0, 110)}`); });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  for (const wait of [5, 10, 20]) {
    await page.waitForTimeout((wait - (wait === 5 ? 0 : wait === 10 ? 5 : 10)) * 1000);
    const s = await page.evaluate(() => ({
      h1: [...document.querySelectorAll('h1')].map(e => e.textContent.trim().slice(0, 60)),
      h2: document.querySelectorAll('h2').length,
      hasSkeleton: !!document.querySelector('.animate-pulse, [class*="skeleton"]'),
      bodyLen: document.body.innerText.length,
      snippet: document.body.innerText.slice(0, 180).replace(/\s+/g, ' '),
    }));
    console.log(`--- t=${wait}s h2=${s.h2} skeleton=${s.hasSkeleton} bodyLen=${s.bodyLen} h1=${JSON.stringify(s.h1)}`);
    console.log('   ', s.snippet);
  }
  console.log('SLOW/4xx/5xx responses:'); slow.slice(0, 10).forEach(l => console.log('  ', l));
  await browser.close();
})();
