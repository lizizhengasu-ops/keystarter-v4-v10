const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await (await b.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto('https://keys-starter.com/', { waitUntil: 'load', timeout: 30000 });
  const r = await p.evaluate(() => new Promise(res => {
    new PerformanceObserver(l => {
      const e = l.getEntries().pop();
      if (!e) return res(null);
      const el = document.elementFromPoint(Math.min(e.element ? 1 : 1, 1)) || null;
      res({ ms: Math.round(e.startTime), size: e.size, url: e.url || '(text)', tag: e.element ? 'sel' : '' });
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    setTimeout(() => res('timeout'), 5000);
  }));
  const el = await p.evaluate(() => {
    const cand = Array.from(document.querySelectorAll('img,video,h1,p')).map(n => {
      const cs = getComputedStyle(n); const r = n.getBoundingClientRect();
      return { tag: n.tagName, txt: (n.textContent || '').trim().slice(0, 30), w: Math.round(r.width), h: Math.round(r.height), vis: cs.visibility, disp: cs.display, src: n.currentSrc || n.src || '' };
    }).filter(x => x.h > 100 && x.w > 400 && x.vis !== 'hidden' && x.disp !== 'none');
    return cand.slice(0, 6);
  });
  console.log(JSON.stringify({ lcp: r, bigElements: el }, null, 1));
  await b.close();
})();
