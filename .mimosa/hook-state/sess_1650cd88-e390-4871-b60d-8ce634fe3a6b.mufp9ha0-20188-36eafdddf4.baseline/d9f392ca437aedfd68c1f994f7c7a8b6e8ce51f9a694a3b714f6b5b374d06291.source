// Small Terminal pages: Links / Changelog / FAQ — ports of the redesign-terminal-v3 mockup.

import { Link } from "react-router-dom";

export function TerminalLinks() {
  const cards = [
    { t: "Products", s: "All 28 keys", to: "/products" },
    { t: "Enterprise / B2B", s: "Volume licensing", to: "/b2b" },
    { t: "Compare", s: "Editions & guides", to: "/products#compare" },
    { t: "Blog", s: "News & guides", to: "/blog" },
    { t: "Support", s: "Help center", to: "/support" },
    { t: "FAQ", s: "Common questions", to: "/faq" },
    { t: "Licensing", s: "How it works", to: "/licensing" },
    { t: "Downloads", s: "Official installers", to: "/downloads" },
  ];
  return (
    <main className="ks-main">
      <div className="wrap section kst-wrap kst-section">
        <div className="section-head kst-section-head"><div><span className="eyebrow kst-eyebrow">Links</span><h1 className="h2 kst-h2" style={{ marginTop: 10 }}>Quick links</h1></div></div>
        <div className="cat-grid kst-cat-grid">
          {cards.map(c => <Link className="cat-card kst-cat-card" to={c.to} key={c.t}><h3>{c.t}</h3><small>{c.s}</small></Link>)}
        </div>
      </div>
    </main>
  );
}

const CHANGELOG = [
  { d: "Changelog 4.0.0", t: "Multi-language support, Polylang integration, product translations" },
  { d: "Changelog 3.1.0", t: "i18n framework, LanguageSwitcher, 9 language files" },
  { d: "Changelog 3.0.0", t: "Product API endpoint, SPA rebuild, cart improvements" },
  { d: "Changelog 2.1.0", t: "CSP fix, keystarter-email-api v2.1, checkout improvements" },
  { d: "Changelog 2.0.0", t: "React SPA launch, WooCommerce integration, checkout flow" },
  { d: "Changelog 1.1.0", t: "Rank Math SEO, GA4, 12 blog articles" },
];

export function TerminalChangelog() {
  return (
    <main className="ks-main">
      <div className="wrap section kst-wrap kst-section">
        <div className="section-head kst-section-head"><div><span className="eyebrow kst-eyebrow">Changelog</span><h1 className="h2 kst-h2" style={{ marginTop: 10 }}>Recent changes</h1></div></div>
        <div className="faq kst-faq">
          {CHANGELOG.map((c, i) => (
            <details key={c.d} open={i === 0}><summary>{c.d}</summary><p>{c.t}</p></details>
          ))}
        </div>
      </div>
    </main>
  );
}

const FAQS = [
  { q: "How fast is delivery?", a: "Keys are emailed within 10 minutes of payment, usually in 2-4 minutes." },
  { q: "Are your keys genuine?", a: "Yes. Keys are sourced through authorized channels and verified before sale." },
  { q: "What does the refund cover?", a: "Keys that fail to activate through no fault of the buyer are replaced or refunded within 14 days." },
  { q: "Can I use a key on multiple PCs?", a: "OEM keys are licensed for one PC. Retail keys may be transferred under Microsoft rules." },
  { q: "Do you support businesses?", a: "Yes. Volume pricing, invoices and dedicated support are available through the B2B team." },
];

export function TerminalFaq() {
  return (
    <main className="ks-main">
      <div className="wrap section kst-wrap kst-section">
        <div className="section-head kst-section-head">
          <div><span className="eyebrow kst-eyebrow">FAQ</span><h1 className="h2 kst-h2" style={{ marginTop: 10 }}>Frequently asked questions</h1><p style={{ marginTop: 8 }}>Activation, delivery, refunds and licensing, answered.</p></div>
        </div>
        <div className="faq kst-faq">
          {FAQS.map((f, i) => (
            <details key={f.q} open={i === 0}><summary>{f.q}</summary><p>{f.a}</p></details>
          ))}
        </div>
      </div>
    </main>
  );
}
