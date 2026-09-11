// Screenshot both sides for visual comparison:
//  A = redesign-terminal-v3 mockup (static, served at 127.0.0.1:8124)
//  B = live shop1 Terminal build (https://shop1.keys-starter.com)
const { chromium } = require('playwright');
const fs = require('fs');

const PAIRS = [
  ['home', 'http://127.0.0.1:8124/index.html', 'https://shop1.keys-starter.com/'],
  ['products', 'http://127.0.0.1:8124/products.html', 'https://shop1.keys-starter.com/products'],
  ['product', 'http://127.0.0.1:8124/product-windows-11-pro.html', 'https://shop1.keys-starter.com/product/windows-11-pro'],
  ['b2b', 'http://127.0.0.1:8124/b2b.html', 'https://shop1.keys-starter.com/b2b'],
  ['support', 'http://127.0.0.1:8124/support.html', 'https://shop1.keys-starter.com/support'],
  ['about', 'http://127.0.0.1:8124/about.html', 'https://shop1.keys-starter.com/about'],
  ['blog', 'http://127.0.0.1:8124/blog.html', 'https://shop1.keys-starter.com/blog'],
  ['faq', 'http://127.0.0.1:8124/faq.html', 'https://shop1.keys-starter.com/faq'],
  ['contact', 'http://127.0.0.1:8124/contact.html', 'https://shop1.keys-starter.com/contact'],
  ['downloads', 'http://127.0.0.1:8124/downloads.html', 'https://shop1.keys-starter.com/downloads'],
  ['links', 'http://127.0.0.1:8124/links.html', 'https://shop1.keys-starter.com/links'],
  ['account', 'http://127.0.0.1:8124/account.html', 'https://shop1.keys-starter.com/account'],
  ['changelog', 'http://127.0.0.1:8124/changelog.html', 'https://shop1.keys-starter.com/changelog'],
  ['legal', 'http://127.0.0.1:8124/legal.html', 'https://shop1.keys-starter.com/privacy'],
];

(async () => {
  fs.mkdirSync('out/cmp/shots', { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1280, height: 860 } });
  const page = await ctx.newPage();

  for (const [name, mockUrl, liveUrl] of PAIRS) {
    for (const [side, url] of [['mock', mockUrl], ['live', liveUrl]]) {
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await page.waitForTimeout(side === 'live' ? 3500 : 1200);
        await page.screenshot({ path: `out/cmp/shots/${name}-${side}.png` });
        console.log(`OK ${name}-${side}`);
      } catch (e) {
        console.log(`FAIL ${name}-${side} :: ${String(e.message).split('\n')[0].slice(0, 80)}`);
      }
    }
  }
  await browser.close();
})();
