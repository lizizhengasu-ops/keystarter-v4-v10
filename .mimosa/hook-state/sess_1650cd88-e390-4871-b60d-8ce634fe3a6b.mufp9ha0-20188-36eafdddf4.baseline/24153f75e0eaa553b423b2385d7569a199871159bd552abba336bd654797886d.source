// Terminal storefront home — faithful port of redesign-terminal-v3/index.html
// with live catalog data wired through the same Store API + cart plumbing
// as the default skin. Rendered for "/" when SITE.design === "terminal".

import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, type SPAProduct } from "../../api/woocommerce";
import { useCart } from "../../data/CartContext";
import { api, SITE } from "../../site-config";
import { termImg, termCat, termPrice, termBadge, isTestSku } from "./terminal-data";

const BEST = ["windows-11-pro", "windows-10-pro", "office-2021-pro-plus", "win-svr-iot-2022"];
const NEW = ["windows-11-pro-official", "win-svr-iot-2025", "office-2021-pro-plus", "win-11-iot-2024-value"];
const OFFERS = ["windows-11-pro", "office-2021-pro-plus", "win-11-iot-2024-value"];

function useCatalog() {
  const [products, setProducts] = useState<SPAProduct[] | null>(null);
  useEffect(() => {
    let live = true;
    fetchProducts().then(p => { if (live) setProducts(p); }).catch(() => { if (live) setProducts([]); });
    return () => { live = false; };
  }, []);
  return products;
}

function pick(products: SPAProduct[] | null, slugs: string[]): SPAProduct[] {
  if (!products) return [];
  return slugs.map(s => products.find(p => p.slug === s)).filter(Boolean) as SPAProduct[];
}

export default function TerminalHome() {
  const products = useCatalog();
  const { addToCart, buyNow } = useCart();
  const count = products ? products.filter(p => !isTestSku(p.slug)).length : 0;

  const [quoteSent, setQuoteSent] = useState(false);
  const [emailOk, setEmailOk] = useState(false);

  const submitQuote = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      await fetch(api("/wp-json/keystarter/v1/send-email"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: SITE.supportEmail,
          from_name: String(fd.get("contact") || ""),
          from_email: String(fd.get("phone") || "").includes("@") ? String(fd.get("phone") || "") : "",
          reply_to: String(fd.get("phone") || "").includes("@") ? String(fd.get("phone") || "") : "",
          subject: "Volume quote request from " + (fd.get("company") || "website"),
          message: "<h2>Volume quote request</h2><p>Company: " + (fd.get("company") || "") + "<br>Units: " + (fd.get("units") || "") + "<br>Product: " + (fd.get("product") || "") + "<br>Contact: " + (fd.get("contact") || "") + "<br>Phone/Email: " + (fd.get("phone") || "") + "</p>",
        }),
      });
      setQuoteSent(true);
    } catch { setQuoteSent(true); }
  };

  const submitNewsletter = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") || "");
    if (!email) return;
    try {
      await fetch(api("/api/consumer/newsletter"), {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }),
      });
    } catch { /* best effort */ }
    setEmailOk(true);
  };

  const best = pick(products, BEST);
  const fresh = pick(products, NEW);
  const offers = pick(products, OFFERS);

  return (
    <main className="ks-main">
      {/* HERO */}
      <section className="hero kst-hero" id="kst-hero">
        <div className="wrap kst-hero-in">
          <span className="eyebrow">Authorized Microsoft partner</span>
          <h1 className="h1">Genuine licenses,<br /><span style={{ color: "var(--ks-accent)" }}>issued with certainty.</span></h1>
          <p className="lead">Windows, Office, IoT and Server keys from authorized channels. Verified activation, instant email delivery and a 14-day refund guarantee.</p>
          <div className="kst-cta">
            <Link className="btn btn-accent btn-lg" to="/products">Shop Licenses Now</Link>
            <Link className="btn btn-ghost btn-lg" to="/b2b">Enterprise Licensing</Link>
          </div>
          <div className="kst-trust"><span><b>50K+</b> activations</span><span><b>98.7%</b> satisfaction</span><span><b>10 min</b> delivery</span></div>
          <div className="kst-terminal craft-telemetry-map tablet" data-craft="telemetry-map">
            <div className="kst-terminal-head"><span className="kst-dot"></span><span className="kst-dot"></span><span className="kst-dot"></span><span>KS::LICENSE-CONSOLE</span></div>
            <div className="kst-terminal-body">
              <div className="kst-line"><span className="prompt">$</span><span>issue --product windows-11-pro --channel authorized</span></div>
              <div className="kst-line"><span className="prompt">&gt;</span><span className="ok">ACTIVATION CHECK ................. PASS</span></div>
              <div className="kst-line"><span className="prompt">&gt;</span><span className="ok">DELIVERY SLOT .................... 10 MIN</span></div>
              <div className="kst-line"><span className="prompt">&gt;</span><span className="key">XXXXX-XXXXX-XXXXX-XXXXX-XXXXX</span></div>
              <div className="kst-line"><span className="prompt">&gt;</span><span className="dim">14-day refund guarantee active</span></div>
            </div>
            <svg viewBox="0 0 720 90" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" style={{ width: "100%", height: 70, color: "var(--ks-accent)", opacity: 0.5 }}>
              <path d="M0 70 H720" strokeDasharray="6 8" />
              <path d="M0 44 Q120 20 240 44 T480 44 T720 44" />
              <path d="M0 64 Q140 44 280 64 T560 64 T720 64" strokeDasharray="3 6" />
              <circle cx="240" cy="44" r="4" fill="currentColor" stroke="none" />
              <circle cx="480" cy="44" r="4" fill="currentColor" stroke="none" />
            </svg>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="best kst-best" id="kst-best" data-grid="best">
        <div className="wrap">
          <div className="section-head">
            <div><span className="eyebrow">Best sellers</span><h2 className="h2">Most trusted this month</h2></div>
            <Link className="btn btn-ghost" to="/products">See all {count || 28} products</Link>
          </div>
          <div className="slab-grid">
            {best.map(p => {
              return (
                <article className="slab-card" key={p.slug}>
                  <div className="img"><img src={termImg(p.slug)} alt={p.name} loading="lazy" /></div>
                  <div>
                    <span className="tag">BEST SELLER</span>
                    <h3><Link to={"/product/" + p.slug}>{p.name}</Link></h3>
                    <small>Verified before sale</small>
                    <div className="rating">{p.reviewCount ? "★".repeat(Math.round(p.rating || 0)) + " " + (p.rating || 0).toFixed(1) + " (" + p.reviewCount + ")" : "New"}</div>
                    <div className="price">{termPrice(p.price)}</div>
                    <div className="actions">
                      <button className="btn btn-accent" onClick={() => addToCart(p.slug, p.name, p.price, 1)}>Add to Cart</button>
                      <button className="btn btn-ghost" onClick={() => buyNow(p.slug, p.name, p.price)}>Buy Now</button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="new-arrivals" id="kst-new">
        <div className="wrap">
          <div className="section-head">
            <div><span className="eyebrow">New arrivals</span><h2 className="h2">Fresh stock, ready to issue</h2></div>
            <Link className="btn btn-ghost" to="/products">See all {count || 28} products</Link>
          </div>
          <div className="strata-rail">
            {fresh.map(p => (
              <Link className="strata-row" to={"/product/" + p.slug} key={p.slug}>
                <img src={termImg(p.slug)} alt={p.name} loading="lazy" />
                <div><b>{p.name}</b><small>{termCat(p.slug, p.category) === "server" ? "Server edition" : "Latest edition"}</small></div>
                <i>{termPrice(p.price)}</i>
                <em>NEW &rarr;</em>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="split ecosystem kst-ecosystem" id="kst-ecosystem">
        <div className="wrap">
          <div>
            <span className="eyebrow">Licensed ecosystem</span>
            <h2 className="h2">{count || 28} premium genuine licenses</h2>
            <p className="lead" style={{ marginTop: 14 }}>Windows, Office, Server, SQL and IoT editions sourced through authorized channels, each verified before it reaches your inbox.</p>
            <div className="kst-cta" style={{ marginTop: 22 }}><Link className="btn btn-accent" to="/products">Browse the catalog</Link></div>
          </div>
          <div>
            <div className="logo-row">
              <img src="/terminal/logos/windows.svg" alt="Windows" />
              <img src="/terminal/logos/office.png" alt="Office" />
              <img src="/terminal/logos/redhat.svg" alt="Red Hat" />
              <img src="/terminal/logos/ubuntu.svg" alt="Ubuntu" />
              <img src="/terminal/logos/kylin2.png" alt="Kylin" />
              <img src="/terminal/logos/uos2.png" alt="UOS" />
            </div>
            <div className="kst-strata" data-craft="signal-grid">
              <svg viewBox="0 0 720 180" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
                <rect x="0" y="0" width="720" height="180" fill="none" />
                <path d="M40 40 H680 M40 90 H680 M40 140 H680" strokeDasharray="5 7" />
                <path d="M40 40 L260 90 L420 40 L680 140" />
                <path d="M40 90 L300 140 L500 90 L680 40" strokeDasharray="4 6" />
                <circle cx="260" cy="90" r="5" fill="currentColor" stroke="none" />
                <circle cx="420" cy="40" r="5" fill="currentColor" stroke="none" />
                <circle cx="500" cy="90" r="5" fill="currentColor" stroke="none" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <section className="offers" id="kst-offers">
        <div className="wrap">
          <div className="section-head">
            <div><span className="eyebrow">Special offers</span><h2 className="h2">Limited-time deals</h2></div>
            <Link className="btn btn-ghost" to="/products">View all {count || 28} products</Link>
          </div>
          <div className="offer-row">
            {offers.map(p => (
              <Link className="offer-item" to={"/product/" + p.slug} key={p.slug}>
                <div className="img"><img src={termImg(p.slug)} alt={p.name} loading="lazy" /></div>
                <div>
                  <span className="tag">{termBadge(termCat(p.slug, p.category))}</span>
                  <h3>{p.name}</h3>
                  <p>Save up to 40% vs retail list.</p>
                  <b>from {termPrice(p.price)}</b>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SAM / B2B QUOTE */}
      <section className="sam" id="kst-sam">
        <div className="wrap sam-in">
          <div>
            <span className="eyebrow">Enterprise compliance</span>
            <h2 className="h2">Compliance &amp; SAM audit support</h2>
            <p>Clean invoices, licensing documentation and audit-ready records for enterprise estates.</p>
            <Link className="btn btn-accent" to="/b2b">Talk to the B2B team</Link>
          </div>
          {quoteSent ? (
            <div className="b2b-quick"><h3>Request received</h3><p className="muted">Our B2B team will reply within one business day.</p></div>
          ) : (
            <form className="b2b-quick" onSubmit={submitQuote}>
              <h3>Request a volume quote</h3>
              <input name="company" placeholder="Company" required />
              <input name="units" placeholder="Estimated units" />
              <select name="product" aria-label="Product"><option>Windows</option><option>Office</option><option>Server / SQL</option><option>IoT</option><option>Mixed estate</option></select>
              <input name="contact" placeholder="Contact" />
              <input name="phone" placeholder="Phone / WhatsApp" />
              <button className="btn btn-accent" type="submit">Get Free Quote</button>
            </form>
          )}
        </div>
      </section>

      {/* MODEL PICKER */}
      <section className="model-picker kst-model" id="kst-model">
        <div className="wrap">
          <div className="section-head"><div><span className="eyebrow">Edition picker</span><h2 className="h2">Which license model fits your team?</h2></div></div>
          <div className="model-row">
            <Link className="model-item" to="/products#compare"><span>01</span><h3>Windows 11 Pro vs Home</h3><p>BitLocker, Remote Desktop, Group Policy.</p><em>Compare &rarr;</em></Link>
            <Link className="model-item" to="/products#compare"><span>02</span><h3>Windows IoT Enterprise vs Pro</h3><p>LTSC, kiosk and embedded deployments.</p><em>Read guide &rarr;</em></Link>
            <Link className="model-item" to="/products#compare"><span>03</span><h3>OEM vs Retail</h3><p>Transfer rights and support explained.</p><em>Compare &rarr;</em></Link>
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <section className="support-center kst-support" id="kst-support">
        <div className="wrap support-in">
          <div>
            <span className="eyebrow">Full support center</span>
            <h2 className="h2">Help from activation to renewal</h2>
            <p>Self-service guides, real answers and a 14-day guarantee behind every order.</p>
            <Link className="btn btn-ghost" to="/support">Open help center</Link>
          </div>
          <div className="topic-grid">
            <Link to="/support">Activation</Link><Link to="/support">Installation</Link><Link to="/support">Licensing</Link><Link to="/account">Account</Link><Link to="/faq">Payments</Link><Link to="/refund">Refunds</Link>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section className="delivery split" id="kst-delivery">
        <div className="wrap">
          <div className="section-head"><div><span className="eyebrow">One-click delivery center</span><h2 className="h2">Microsoft Genuine, delivered instantly</h2></div></div>
          <div className="step-row">
            <div className="step-item"><span>01</span><b>Buy</b><small>Secure checkout</small></div>
            <div className="step-item"><span>02</span><b>Receive</b><small>Key in 10 minutes</small></div>
            <div className="step-item"><span>03</span><b>Activate</b><small>Verified before sale</small></div>
            <div className="step-item"><span>04</span><b>Supported</b><small>Lifetime help</small></div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="reviews" id="kst-quotes">
        <div className="wrap">
          <div className="section-head"><div><span className="eyebrow">Customer reviews</span><h2 className="h2">Real reviews from verified buyers</h2></div></div>
          <div className="review-list">
            <div className="review-card"><span className="stars">★★★★★</span><p>"Key arrived in 4 minutes and activated instantly."</p><span className="who">VERIFIED BUYER &middot; WINDOWS 11 PRO</span></div>
            <div className="review-card"><span className="stars">★★★★★</span><p>"Smooth checkout and the key was genuine OEM."</p><span className="who">VERIFIED BUYER &middot; OFFICE 2021</span></div>
            <div className="review-card"><span className="stars">★★★★★</span><p>"Support answered my activation question quickly."</p><span className="who">VERIFIED BUYER &middot; SERVER 2022</span></div>
          </div>
        </div>
      </section>

      {/* JOURNAL */}
      <section className="journal" id="kst-journal">
        <div className="wrap">
          <div className="section-head">
            <div><span className="eyebrow">Guides &amp; resources</span><h2 className="h2">Latest from the KeyStarter blog</h2></div>
            <Link className="btn btn-ghost" to="/blog">Read the blog</Link>
          </div>
          <div className="blog-grid">
            <Link className="blog-card" to="/blog">
              <div className="img"><img src={termImg("win-11-iot-2024-value")} alt="Windows IoT vs Pro" loading="lazy" /></div>
              <span className="tag">GUIDE</span><h3>Windows IoT Enterprise vs Windows 11 Pro</h3><p>LTSC lifecycle, kiosk scenarios and which SKU fits.</p>
            </Link>
            <Link className="blog-card" to="/blog">
              <div className="img"><img src={termImg("windows-11-pro")} alt="Windows 11 Pro" loading="lazy" /></div>
              <span className="tag">GUIDE</span><h3>How to Activate Windows 11</h3><p>Step-by-step activation with a product key.</p>
            </Link>
            <Link className="blog-card" to="/blog">
              <div className="img"><img src="/terminal/img/og-cover.png" alt="Microsoft AI news" loading="lazy" /></div>
              <span className="tag">NEWS</span><h3>Windows &amp; Microsoft AI News</h3><p>Microsoft partnerships and AI gateway security.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="trust" id="kst-trust">
        <div className="wrap trust-in">
          <div className="kst-craft" data-craft="issue-flow">
            <svg viewBox="0 0 420 120" preserveAspectRatio="none" aria-hidden="true">
              <rect x="0" y="0" width="420" height="120" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M40 0 V120 M140 0 V120 M240 0 V120 M340 0 V120 M0 40 H420 M0 80 H420" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 4" />
              <path d="M70 120 L70 30 L170 30 L170 78 L300 78 L300 120" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="70" cy="30" r="3" fill="currentColor" />
              <circle cx="170" cy="78" r="3" fill="currentColor" />
              <circle cx="300" cy="78" r="3" fill="currentColor" />
            </svg>
          </div>
          <div>
            <span className="eyebrow">Payments you can rely on</span>
            <h2 className="h2">Secure checkout, verified delivery</h2>
            <p>Encrypted payment, genuine licenses and a numbered record for every order.</p>
          </div>
          <div className="pay-badges"><span>VISA</span><span>MASTERCARD</span><span>PAYPAL</span><span>AMEX</span></div>
          <ul className="metrics"><li><b>10 min</b><span>avg delivery</span></li><li><b>100%</b><span>verified</span></li><li><b>14 day</b><span>refund</span></li></ul>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter" id="kst-newsletter">
        <div className="wrap newsletter-in">
          <div><span className="eyebrow">Stay updated</span><h3>Guides and offers, once a week.</h3></div>
          {emailOk ? (
            <p className="muted">Subscribed. See you in the next issue.</p>
          ) : (
            <form onSubmit={submitNewsletter}>
              <input type="email" name="email" placeholder="Your email" aria-label="Email" required />
              <button className="btn btn-accent" type="submit">Subscribe</button>
            </form>
          )}
        </div>
      </section>

      {/* PERSONA STRIP */}
      <section className="persona-strip" id="kst-persona">
        <Link className="persona-card" to="/products"><span className="icon-lg">P</span><div><b>Personal Retail</b><small>Instant keys, lifetime activation</small></div><em>Shop now &rarr;</em></Link>
        <Link className="persona-card accent" to="/b2b"><span className="icon-lg">B</span><div><b>Enterprise B2B</b><small>Volume pricing, compliance docs</small></div><em>Request quote &rarr;</em></Link>
      </section>
    </main>
  );
}
