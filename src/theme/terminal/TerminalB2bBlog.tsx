// Terminal B2B + Blog — ports of redesign-terminal-v3 b2b.html / blog.html.

import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { api, SITE } from "../../site-config";

const CHECK = (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5" /></svg>
);

const LOGOS = ["windows.svg", "office.png", "redhat.svg", "ubuntu.svg", "kylin2.png", "uos2.png", "openeuler.png", "openharmony.png"];
const INDUSTRIES = [
  ["factory", "Factory Automation", "IoT and embedded licensing"],
  ["energy", "New Energy", "SCADA and edge systems"],
  ["transport", "Transportation", "Kiosk and signage fleets"],
  ["healthcare", "Healthcare", "Compliant desktop estates"],
];

export function TerminalB2b() {
  const [sent, setSent] = useState(false);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      await fetch(api("/wp-json/keystarter/v1/send-email"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: SITE.supportEmail,
          from_email: String(fd.get("email") || ""),
          from_name: String(fd.get("contact") || ""),
          reply_to: String(fd.get("email") || ""),
          subject: "B2B quote · " + (fd.get("company") || "website") + " · " + (fd.get("units") || "?") + " units",
          message: "<h2>B2B quote request</h2><p>Company: " + (fd.get("company") || "") + "<br>Units: " + (fd.get("units") || "") + "<br>Product: " + (fd.get("product") || "") + "<br>Contact: " + (fd.get("contact") || "") + "<br>Email: " + (fd.get("email") || "") + "<br>Notes: " + (fd.get("note") || "") + "</p>",
        }),
      });
    } catch { /* best effort */ }
    setSent(true);
  };

  return (
    <main className="ks-main">
      <section className="b2b-hero">
        <div className="bg" role="presentation" />
        <div className="wrap b2b-hero-in">
          <span className="eyebrow">Enterprise / B2B licensing</span>
          <h1 className="h1">Volume Microsoft Licensing, Simplified</h1>
          <p className="lead">OEM, retail and IoT programs for teams of 5 to 5,000. Custom quotes within 24 hours, compliance documentation included, dedicated account support.</p>
          <ul className="checks">
            <li>{CHECK}Volume pricing by quantity</li>
            <li>{CHECK}Compliance, SAM audit &amp; invoice documentation</li>
            <li>{CHECK}Global delivery &amp; instant keys</li>
            <li>{CHECK}Dedicated account support</li>
          </ul>
          <div className="cta">
            <a className="btn btn-amber btn-lg" href="#quote">Get a Free Custom Quote</a>
            <a className="btn btn-ghost btn-lg" href={"mailto:" + SITE.supportEmail}>Email {SITE.supportEmail}</a>
            <a className="btn btn-ghost btn-lg" href={"https://wa.me/" + SITE.whatsappNumber} target="_blank" rel="noopener">Get Quote by WhatsApp</a>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="section-head"><div><span className="eyebrow">Licensing portfolio</span><h2 className="h2">Windows, Office, Server &amp; IoT</h2></div></div>
          <div className="logo-row">
            {LOGOS.map(l => <img key={l} src={"/terminal/logos/" + l} alt={l.replace(/\.[a-z]+$/, "")} loading="lazy" />)}
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="section-head"><div><span className="eyebrow">Industries</span><h2 className="h2">Industries we serve</h2></div></div>
          <div className="industry-grid">
            {INDUSTRIES.map(([img, t, s]) => (
              <div className="industry-card" key={img}>
                <img src={"/terminal/industries/" + img + ".webp"} alt={t} loading="lazy" />
                <b>{t}</b><small>{s}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="quote">
        <div className="wrap b2b-split">
          <div>
            <span className="eyebrow">B2B quote</span>
            <h2 className="h2" style={{ marginTop: 10 }}>Tell us what you need</h2>
            <p className="lead" style={{ marginTop: 12 }}>Share quantities, editions and delivery region. A dedicated account manager will reply within 24 hours on business days.</p>
            <ul className="feature-list">
              <li>{CHECK}Volume pricing by quantity</li>
              <li>{CHECK}Invoice and compliance documents</li>
              <li>{CHECK}Named account manager</li>
            </ul>
          </div>
          <div className="b2b-form">
            {sent ? (
              <p className="lead">Request received. A dedicated account manager will reply within 24 hours on business days.</p>
            ) : (
              <form onSubmit={submit}>
                <div className="form-grid">
                  <div className="field"><label htmlFor="b2b-company">Company</label><input id="b2b-company" name="company" placeholder="Company name" required /></div>
                  <div className="field"><label htmlFor="b2b-units">Estimated units</label><input id="b2b-units" name="units" placeholder="e.g. 100" /></div>
                  <div className="field"><label htmlFor="b2b-product">Product</label><select id="b2b-product" name="product"><option>Windows</option><option>Office</option><option>Server / SQL</option><option>IoT</option><option>Mixed estate</option></select></div>
                  <div className="field"><label htmlFor="b2b-contact">Contact</label><input id="b2b-contact" name="contact" placeholder="Contact name" /></div>
                  <div className="field full"><label htmlFor="b2b-email">Email</label><input id="b2b-email" type="email" name="email" placeholder="you@company.com" required /></div>
                  <div className="field full"><label htmlFor="b2b-note">Notes</label><textarea id="b2b-note" name="note" rows={4} placeholder="Delivery region, deadlines, existing estate..." /></div>
                </div>
                <button className="btn btn-primary btn-lg" type="submit">Get Free Quote</button>
                <div className="promise">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                  Response within 24 hours on business days
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

interface Post {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
}

export function TerminalBlog() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  useEffect(() => {
    let live = true;
    fetch(api("/wp-json/wp/v2/posts?per_page=12&_fields=id,slug,title,excerpt,date"))
      .then(r => r.json())
      .then(p => { if (live) setPosts(Array.isArray(p) ? p : []); })
      .catch(() => { if (live) setPosts([]); });
    return () => { live = false; };
  }, []);

  const fmt = (d: string) => {
    const dt = new Date(d);
    return isNaN(dt.getTime()) ? "" : dt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };
  const strip = (s: string) => s.replace(/<[^>]*>/g, "").trim();

  return (
    <main className="ks-main">
      <div className="wrap kst-wrap">
        <div className="breadcrumb kst-breadcrumb"><Link to="/">Home</Link> <span>/</span> <span>Blog</span></div>
        <div className="section-head kst-section-head" style={{ marginTop: 14 }}>
          <div>
            <span className="eyebrow kst-eyebrow">Windows &amp; Microsoft AI News</span>
            <h1 className="h2 kst-h2" style={{ marginTop: 10 }}>Latest from KeyStarter Editorial</h1>
            <p style={{ marginTop: 8 }}>Daily news digests, licensing guides and edition comparisons. Sources cited and verified.</p>
          </div>
        </div>

        {posts === null ? (
          <p className="muted">Loading articles…</p>
        ) : posts.length === 0 ? (
          <p className="muted">Articles are being prepared. Check back soon.</p>
        ) : (
          <div className="blog-grid kst-blog-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
            {posts.map(p => (
              <Link className="blog-card kst-blog-card" to={"/blog/" + p.slug} key={p.id}>
                <span className="tag kst-tag">{fmt(p.date)}</span>
                <h3>{strip(p.title.rendered)}</h3>
                <p>{strip(p.excerpt.rendered).slice(0, 180)}{strip(p.excerpt.rendered).length > 180 ? "…" : ""}</p>
                <span className="more kst-more">Read article &rarr;</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
