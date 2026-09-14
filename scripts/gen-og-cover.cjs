// Generate /og-cover.png (1200x630) — branded OG card matching Terminal-v3 look.
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { width:1200px; height:630px; background:#0d1118; color:#f6f7f9;
           font-family: 'Segoe UI', Arial, sans-serif; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; }
    .grid { position:absolute; inset:0;
      background-image: linear-gradient(rgba(124,108,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,108,255,.06) 1px, transparent 1px);
      background-size: 44px 44px; }
    .glow { position:absolute; width:700px; height:700px; border-radius:50%;
      background: radial-gradient(circle, rgba(124,108,255,.22), transparent 60%); right:-180px; top:-180px; }
    .wrap { position:relative; max-width:960px; padding:0 60px; }
    .eyebrow { font-family:'Consolas','JetBrains Mono',monospace; color:#a78bfa; font-size:20px; letter-spacing:.22em; text-transform:uppercase; margin-bottom:26px; }
    h1 { font-size:64px; line-height:1.06; letter-spacing:-.02em; font-weight:800; }
    h1 span { color:#a78bfa; }
    p { margin-top:24px; font-size:24px; color:#a8b0bf; line-height:1.45; }
    .console { position:absolute; left:60px; bottom:44px; font-family:'Consolas',monospace; font-size:17px; color:#34d399; }
    .console b { color:#5b6270; font-weight:400; }
    .domain { position:absolute; right:60px; bottom:44px; font-family:'Consolas',monospace; font-size:17px; color:#8b93a7; }
    .dots { position:absolute; top:40px; left:60px; display:flex; gap:9px; }
    .dots i { width:12px; height:12px; border-radius:50%; display:block; }
  </style></head><body>
    <div class="grid"></div><div class="glow"></div>
    <div class="dots"><i style="background:#ff5f57"></i><i style="background:#febc2e"></i><i style="background:#28c840"></i></div>
    <div class="wrap">
      <div class="eyebrow">KeyStarter &middot; Authorized Microsoft Partner</div>
      <h1>Genuine licenses,<br><span>issued with certainty.</span></h1>
      <p>Genuine Windows, Office, IoT and Server keys. Verified activation,<br>instant email delivery, 14-day refund guarantee.</p>
    </div>
    <div class="console">$ &gt; ACTIVATION CHECK ............. <b>PASS</b></div>
    <div class="domain">keys-starter.com</div>
  </body></html>`);
  await page.screenshot({ path: 'public/og-cover.png', type: 'png' });
  await browser.close();
  console.log('og-cover.png generated');
})();
