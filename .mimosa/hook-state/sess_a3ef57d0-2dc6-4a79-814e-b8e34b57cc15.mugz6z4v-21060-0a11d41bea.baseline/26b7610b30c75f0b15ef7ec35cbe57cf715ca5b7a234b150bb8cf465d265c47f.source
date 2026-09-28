// Terminal skin chrome — full header/footer port of redesign-terminal-v3.
// Renders instead of the default nav/footer when SITE.design === "terminal".

import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NAV = [
  { t: "Products", to: "/products" },
  { t: "Compare", to: "/products#compare" },
  { t: "Enterprise", to: "/b2b" },
  { t: "Support", to: "/support" },
  { t: "Blog", to: "/blog" },
];

const LANGS = [
  ["en", "English"], ["ja", "日本語"], ["ko", "한국어"], ["es", "Español"], ["pt", "Português"], ["fr", "Français"],
];

export function TerminalHeader({ onSearch, onCart, cartCount }: { onSearch: () => void; onCart: () => void; cartCount: number }) {
  const { i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const cur = (i18n.language || "en").slice(0, 2).toUpperCase();

  return (
    <>
      <div className="announce promo">
        <span className="promo-msg ks-mono">KEYSTARTER TERMINAL - AUTHORIZED PARTNER</span>
        <span>Save up to 40% &middot; 10-minute delivery &middot; 14-day refund</span>
        <Link to="/products">Shop deals</Link>
      </div>

      <header className="header kst-header">
        <div className="wrap header-in">
          <Link className="brand" to="/" aria-label="KeyStarter home">
            <img className="brand-logo" src="/terminal/logos/keystarter-logo.svg" alt="KeyStarter" />
            <span>KeyStarter<small>KEYSTARTER TERMINAL - AUTHORIZED PARTNER</small></span>
          </Link>
          <nav className="nav">
            {NAV.map(n => <Link key={n.t} to={n.to}>{n.t}</Link>)}
          </nav>
          <div className="header-actions">
            <button className="search-open" type="button" onClick={onSearch} aria-label="Search">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
            </button>
            <div className={"lang" + (langOpen ? " open" : "")}>
              <button type="button" onClick={() => setLangOpen(v => !v)} aria-label="Language">{cur} <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="m6 9 6 6 6-6" /></svg></button>
              <div className="menu">
                {LANGS.map(([code, label]) => (
                  <button key={code} type="button" onClick={() => { i18n.changeLanguage(code); setLangOpen(false); }}>{label}</button>
                ))}
              </div>
            </div>
            <button className="cart-open" type="button" onClick={onCart} aria-label="Cart">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
              <span className="count">{cartCount > 99 ? "99+" : cartCount}</span>
            </button>
            <button className="burger" type="button" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
              <svg className="icon lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
            </button>
          </div>
        </div>
        <div className="mega kst-mega">
          <Link to="/product/windows-11-pro"><img src="/terminal/img/box-win11-pro.webp" alt="Windows 11 Pro" /><span>Windows 11 Pro</span><b>$18.00</b></Link>
          <Link to="/product/office-2021-pro-plus"><img src="/terminal/img/box-office-2021.webp" alt="Office 2021" /><span>Office 2021</span><b>$58.00</b></Link>
          <Link to="/product/win-svr-iot-2022"><img src="/terminal/img/pic-svr2022.webp" alt="Server 2022" /><span>Server 2022</span><b>$850.00</b></Link>
        </div>
      </header>

      {menuOpen && (
        <nav className="mobile-nav" data-open="true">
          {NAV.map(n => <Link key={n.t} to={n.to} onClick={() => setMenuOpen(false)}>{n.t}</Link>)}
          <Link to="/cart/" onClick={() => setMenuOpen(false)}>Cart</Link>
          <div className="lang-row">
            {LANGS.map(([code, label]) => (
              <button key={code} type="button" onClick={() => i18n.changeLanguage(code)}>{label.slice(0, 2).toUpperCase()}</button>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}

export function TerminalFooter() {
  return (
    <footer className="footer site-footer">
      <div className="wrap footer-in">
        <div>
          <Link className="brand" to="/">
            <img className="brand-logo" src="/terminal/logos/keystarter-logo.svg" alt="KeyStarter" />
            <span>KeyStarter<small>KEYSTARTER TERMINAL - AUTHORIZED PARTNER</small></span>
          </Link>
          <p className="footer-lede">Genuine Microsoft licenses with verified activation, 10-minute delivery and a 14-day refund guarantee.</p>
          <div className="pay"><span>VISA</span><span>MASTERCARD</span><span>PAYPAL</span><span>AMEX</span></div>
        </div>
        <div>
          <h4>Shop</h4>
          <Link to="/products">All products</Link>
          <Link to="/products">Windows</Link>
          <Link to="/products">Office</Link>
          <Link to="/products">Server / SQL</Link>
          <Link to="/b2b">Enterprise / B2B</Link>
        </div>
        <div>
          <h4>Support</h4>
          <Link to="/support">Help center</Link>
          <Link to="/contact">Contact us</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/downloads">Downloads</Link>
          <Link to="/account">Account</Link>
        </div>
        <div>
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <Link to="/licensing">Licensing</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/refund">Refund</Link>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>&copy; 2026 KeyStarter Terminal v3.0. All rights reserved.</span>
        <span className="ks-mono">Authorized channel &middot; verified activation</span>
      </div>
    </footer>
  );
}
