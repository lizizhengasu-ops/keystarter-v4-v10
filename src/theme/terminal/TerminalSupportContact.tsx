// Terminal Support + Contact — ports of redesign-terminal-v3 support.html / contact.html.

import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { api, SITE } from "../../site-config";

const CARDS = [
  {
    t: "Order help", p: "Find your key, re-send delivery emails, update order details.", l: "Open a ticket", to: "/contact",
    ic: <svg className="icon lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16" /></svg>,
  },
  {
    t: "Activation help", p: "Step-by-step activation for Windows, Office, Server and SQL.", l: "Read activation guide", to: "/faq",
    ic: <svg className="icon lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z" /></svg>,
  },
  {
    t: "Refund policy", p: "14-day replacement or refund on qualifying activation issues.", l: "Read the policy", to: "/refund",
    ic: <svg className="icon lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h4l3-8 4 16 3-8h4" /></svg>,
  },
  {
    t: "License transfers", p: "Understand OEM vs retail transfer rules before reinstalling.", l: "Read the guide", to: "/faq",
    ic: <svg className="icon lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>,
  },
];

const TOPICS = [
  ["Where is my key?", "Delivery & email"],
  ["How do I activate Windows 11?", "Activation"],
  ["Is the key genuine?", "Trust & safety"],
  ["Can I get a refund?", "14-day policy"],
  ["Does it work on more than one PC?", "License terms"],
  ["How do I contact B2B sales?", "Enterprise"],
];

export function TerminalSupport() {
  return (
    <main className="ks-main">
      <div className="wrap">
        <div className="breadcrumb"><Link to="/">Home</Link> <span>/</span> <span>Help Center</span></div>
        <div className="section-head" style={{ marginTop: 14 }}>
          <div>
            <span className="eyebrow">Help Center</span>
            <h1 className="h2" style={{ marginTop: 10 }}>How can we help?</h1>
            <p style={{ marginTop: 8 }}>Orders, activation, refunds and account help. Average first response under 30 minutes.</p>
          </div>
        </div>

        <div className="support-grid">
          {CARDS.map(c => (
            <div className="support-card" key={c.t}>
              <span className="ic">{c.ic}</span>
              <h3>{c.t}</h3>
              <p>{c.p}</p>
              <Link to={c.to}>{c.l} &rarr;</Link>
            </div>
          ))}
        </div>

        <div className="section-head"><div><span className="eyebrow">Popular topics</span><h2 className="h2">Top questions</h2></div></div>
        <ul className="help-topics">
          {TOPICS.map(([q, tag]) => <li key={q}>{q} <span>{tag}</span></li>)}
        </ul>

        <div className="section" id="faq">
          <div className="section-head"><div><span className="eyebrow">Policy</span><h2 className="h2">Refund &amp; guarantee</h2></div></div>
          <div className="faq kst-faq">
            <details open><summary>What does the refund cover?</summary><p>Keys that fail to activate through no fault of the buyer are replaced or refunded within 14 days.</p></details>
            <details><summary>How fast is delivery?</summary><p>Keys are emailed within 10 minutes of payment, usually in 2-4 minutes.</p></details>
          </div>
        </div>
      </div>
    </main>
  );
}

export function TerminalContact() {
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
          from_name: String(fd.get("name") || ""),
          reply_to: String(fd.get("email") || ""),
          subject: "[" + (fd.get("topic") || "Contact") + "] " + (fd.get("name") || "Website message") + (fd.get("order") ? " · #" + fd.get("order") : ""),
          message: "<p>" + String(fd.get("message") || "").replace(/\n/g, "<br>") + "</p>",
        }),
      });
    } catch { /* best effort */ }
    setSent(true);
  };

  return (
    <main className="ks-main">
      <div className="wrap contact-grid kst-wrap kst-contact-grid">
        <div>
          <div className="breadcrumb kst-breadcrumb"><Link to="/">Home</Link> <span>/</span> <span>Contact</span></div>
          <h1 className="h2 kst-h2" style={{ margin: "16px 0 10px" }}>Talk to a human</h1>
          <p className="muted kst-muted">Sales, order support and B2B quotes. We reply fast, usually within 30 minutes on business days.</p>
          <ul className="contact-list kst-contact-list">
            <li>
              <svg className="icon kst-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4z" /><path d="m4 6 8 7 8-7" /></svg>
              <div><b>General &amp; sales</b><br />{SITE.supportEmail}</div>
            </li>
            <li>
              <svg className="icon kst-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
              <div><b>Order &amp; activation support</b><br />{SITE.supportEmail}</div>
            </li>
            <li>
              <svg className="icon kst-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              <div><b>Hours</b><br />24/7 automated key delivery · support Mon-Sat</div>
            </li>
          </ul>
        </div>
        <div className="contact-card kst-contact-card">
          <h3 style={{ fontSize: 20, marginBottom: 6 }}>Send us a message</h3>
          <p className="muted kst-muted" style={{ fontSize: 13, marginBottom: 16 }}>Include your order number if you have one.</p>
          {sent ? (
            <p className="muted">Message sent. We usually reply within 30 minutes on business days.</p>
          ) : (
            <form onSubmit={submit} className="form-grid kst-form-grid">
              <div className="field kst-field"><label htmlFor="cn2">Name</label><input id="cn2" name="name" required placeholder="Your name" /></div>
              <div className="field kst-field"><label htmlFor="em2">Email</label><input id="em2" name="email" type="email" required placeholder="you@example.com" /></div>
              <div className="field kst-field"><label htmlFor="or">Order number (optional)</label><input id="or" name="order" placeholder="e.g. 1024" /></div>
              <div className="field kst-field"><label htmlFor="tp">Topic</label><select id="tp" name="topic"><option>Order help</option><option>Activation</option><option>Refund</option><option>B2B quote</option><option>Other</option></select></div>
              <div className="field full kst-field kst-full"><label htmlFor="msg2">Message</label><textarea id="msg2" name="message" required placeholder="How can we help?" /></div>
              <button className="btn btn-primary btn-lg kst-btn kst-btn-primary kst-btn-lg" type="submit" style={{ gridColumn: "1/-1" }}>Send Message</button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
