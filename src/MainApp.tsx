// v6.1.23f
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchOverlay from "./SearchOverlay";
import WooCartFlyout from "./components/WooCartFlyout";
import { CartProvider, useCart } from "./data/CartContext";
import HomePage from "./pages/Home";
import StorePage from "./pages/Store";
import ProductPage from "./pages/Product";
import SupportPage from "./pages/Support";
import B2bPage from "./pages/B2b";
import BlogPage from "./pages/Blog";
import BlogArticlePage from "./pages/BlogArticle";
import AnimInit from "./animations";
import NavDrawer from "./NavDrawer";
import NotFound from "./pages/NotFound";
import FaqPage from "./pages/Faq";
import ContactPage from "./pages/Contact";
// B1785212195_1743202026
import AccountPage from "./pages/Account";
import AboutPage from "./pages/About";
import ChangelogPage from "./pages/Changelog";
import CartPage from "./pages/Cart";
import CookieConsent from "./components/CookieConsent";
import PrivacyPage from "./pages/Privacy";
import TermsPage from "./pages/Terms";
import RefundPage from "./pages/Refund";
import CookiesPage from "./pages/Cookies";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

function MicrosoftLogo() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 23 23" fill="none">
      <rect x="0" y="0" width="11" height="11" fill="#F25022"/>
      <rect x="12" y="0" width="11" height="11" fill="#7FBA00"/>
      <rect x="0" y="12" width="11" height="11" fill="#00A4EF"/>
      <rect x="12" y="12" width="11" height="11" fill="#FFB900"/>
    </svg>
  );
}

function KeyStarterLogo() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="40" stroke="#1d1d1f" strokeWidth="1.2" />
      <ellipse cx="50" cy="50" rx="36" ry="14" stroke="#7c3aed" strokeWidth="1.2" transform="rotate(-30 50 50)" className="anim-spin-cw" style={{ transformOrigin: "50px 50px" }} />
      <ellipse cx="50" cy="50" rx="36" ry="14" stroke="#7c3aed" strokeWidth="1.2" transform="rotate(30 50 50)" className="anim-spin-ccw" style={{ transformOrigin: "50px 50px" }} />
      <circle cx="50" cy="50" r="5" fill="#7c3aed" className="anim-pulse" />
    </svg>
  );
}


function Layout({ children }) {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const { t } = useTranslation();
  const { cart } = useCart();

  useEffect(()=>{const bt=document.getElementById("back-top");if(bt)bt.classList.toggle("visible",window.scrollY>300);})

  useEffect(() => {
    window.scrollTo(0, 0);
    setSearchOpen(false);
    setCartOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const h = (e) => {
      if (e.key === "/" && !searchOpen && e.target.tagName !== "INPUT") { e.preventDefault(); setSearchOpen(true); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [searchOpen]);

  useEffect(() => {
    const h = () => { const s = document.documentElement; setScrollPct((s.scrollTop / (s.scrollHeight - s.clientHeight)) * 100); };
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 48; window.scrollTo({ top: y, behavior: "smooth" }); }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] antialiased" style={{ fontFamily: "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif" }}>
      <span data-build={typeof __BUILD_TIME__ !== 'undefined' ? __BUILD_TIME__ : ''} style={{display:'none'}} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <WooCartFlyout open={cartOpen} onClose={() => setCartOpen(false)} />
      <NavDrawer open={navOpen} onClose={() => setNavOpen(false)} isHomepage={location.pathname === "/"} />
      <div className="fixed top-0 left-0 h-[2px] bg-[#7c3aed] z-[9999]" style={{ width: scrollPct + "%", transition: "width 0.1s" }} />

      <nav className="fixed top-0 z-50 w-full h-12 bg-white/75 border-b border-[#e8e8ed] backdrop-blur-[20px]">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 h-full flex items-center justify-between">
                    <button onClick={()=>setNavOpen(true)} className="md:hidden text-[#1d1d1f]/70 hover:text-[#1d1d1f] transition-colors mr-2" aria-label="Menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
<Link to="/" className="flex items-center space-x-2 v5-card-light rounded-lg px-2 -ml-2" aria-label="KeyStarter Home">
            <KeyStarterLogo />
            <span className="text-sm font-semibold tracking-tight text-[#1d1d1f]">{t("brand.name")}</span>
            <span className="hidden sm:inline bg-blue-50 text-[#7c3aed] text-[10px] font-semibold px-1.5 py-0.5 rounded border border-blue-200">{t("brand.partner")}</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6 text-xs font-medium text-[#1d1d1f]/80">
            {location.pathname === "/" ? (
              <>
                <button onClick={()=>window.location.href="/products"} className="hover:text-[#7c3aed] transition-colors">{t("nav.products", "Products")}</button>
                <button onClick={()=>scrollToSection("store")} className="hover:text-[#7c3aed] transition-colors">{t("nav.store")}</button>
                <button onClick={()=>{window.location.hash='business';scrollToSection("business")}} className="hover:text-[#7c3aed] transition-colors">{t("nav.enterprise")}</button>
                <button onClick={()=>scrollToSection("compare")} className="hover:text-[#7c3aed] transition-colors">{t("nav.compare")}</button>
                <button onClick={()=>scrollToSection("support")} className="hover:text-[#7c3aed] transition-colors">{t("nav.support")}</button>
               <button onClick={()=>scrollToSection("portal")} className="hover:text-[#7c3aed] transition-colors">{t("nav.portal")}</button>
                <button onClick={()=>window.location.href='/blog'} className="hover:text-[#7c3aed] transition-colors">{t("nav.blog")}</button>
</>
            ) : (
              <>
                <Link to="/products" className="hover:text-[#7c3aed] transition-colors">{t("nav.products", "Products")}</Link>
                <Link to="/b2b" className="hover:text-[#7c3aed] transition-colors">{t("nav.enterprise")}</Link>
               <Link to="/support" className="hover:text-[#7c3aed] transition-colors">{t("nav.support")}</Link>
                <Link to="/blog" className="hover:text-[#7c3aed] transition-colors">Blog</Link>
</>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={()=>setSearchOpen(true)} className="text-[#1d1d1f]/70 hover:text-[#1d1d1f] transition-colors" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
          <LanguageSwitcher />
              <button onClick={()=>window.location.href="/my-account/"} className="text-[#1d1d1f]/70 hover:text-[#1d1d1f] transition-colors" aria-label={t("nav.account")}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </button>
            <button onClick={() => setCartOpen(true)} className="relative text-[#1d1d1f]/70 hover:text-[#1d1d1f] transition-colors" aria-label="Cart">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="16" y1="10" x2="16" y2="14"/><line x1="8" y1="10" x2="8" y2="14"/></svg>
                {cart.items_count > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#7c3aed] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cart.items_count > 99 ? '99+' : cart.items_count}
                  </span>
                )}
            </button>
          </div>
        </div>
      </nav>

      <AnimInit />

      {/* V5.2: Page enter animation */}
      <main className="page-enter pt-12">
        {children}
      </main>

      <footer className="bg-[#161617] text-white py-16 border-t border-white/5">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-white/5 mb-8">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">{t("nav.products")}</h4>
            <div className="space-y-2">
              <button onClick={()=>window.location.href="/products"} className="block text-xs text-white/70 hover:text-white bg-transparent border-none p-0 cursor-pointer transition">Products</button>
              <button onClick={()=>window.location.href="/#store"} className="block text-xs text-white/70 hover:text-white bg-transparent border-none p-0 cursor-pointer transition">{t("nav.store")}</button>
              <button onClick={()=>window.location.href="/b2b"} className="block text-xs text-white/70 hover:text-white bg-transparent border-none p-0 cursor-pointer transition">{t("nav.enterprise")}</button>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">{t("footer.support")}</h4>
            <div className="space-y-2">
              <button onClick={()=>window.location.href="/support"} className="block text-xs text-white/70 hover:text-white bg-transparent border-none p-0 cursor-pointer transition">{t("footer.help_center")}</button>
              <button onClick={()=>window.location.href="/faq"} className="block text-xs text-white/70 hover:text-white bg-transparent border-none p-0 cursor-pointer transition">{t("footer.faq")}</button>
              <button onClick={()=>window.location.href="/#compare"} className="block text-xs text-white/70 hover:text-white bg-transparent border-none p-0 cursor-pointer transition">{t("nav.compare")}</button>
              <button onClick={()=>window.location.href="/#portal"} className="block text-xs text-white/70 hover:text-white bg-transparent border-none p-0 cursor-pointer transition">{t("footer.fulfillment")}</button>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">{t("nav.company")}</h4>
            <div className="space-y-2">
              <button onClick={()=>window.location.href="/blog"} className="block text-xs text-white/70 hover:text-white bg-transparent border-none p-0 cursor-pointer transition">{t("nav.blog")}</button>
              <button onClick={()=>window.location.href="/about"} className="block text-xs text-white/70 hover:text-white bg-transparent border-none p-0 cursor-pointer transition">{t("footer.about")}</button>
              <button onClick={()=>window.location.href="/contact"} className="block text-xs text-white/70 hover:text-white bg-transparent border-none p-0 cursor-pointer transition">{t("footer.contact")}</button>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">{t("nav.legal")}</h4>
            <div className="space-y-2">
              <button onClick={() => window.location.href="/privacy"} className="block text-xs text-white/70 hover:text-white bg-transparent border-none p-0 cursor-pointer transition">{t("footer.privacy")}</button>
              <button onClick={() => window.location.href="/terms"} className="block text-xs text-white/70 hover:text-white bg-transparent border-none p-0 cursor-pointer transition">{t("footer.terms")}</button>
              <button onClick={() => window.location.href="/refund"} className="block text-xs text-white/70 hover:text-white bg-transparent border-none p-0 cursor-pointer transition">{t("footer.refund")}</button>
            </div>
          </div>
        </div>
        <div className="border-b border-white/5 mb-8 pb-8 text-center">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3">{t("footer.stay_updated")}</h4>
          <p className="text-xs text-white/50 mb-4">{t("footer.newsletter")}</p>
          <div className="flex max-w-sm mx-auto gap-2">
            <input id="newsletter-email" type="email" placeholder={t("footer.email_placeholder")} className="flex-1 px-3 py-2 rounded-lg text-xs bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#7c3aed]" />
            <button onClick={function(){ var e=document.getElementById("newsletter-email"); if(e&&e.value){ fetch("/api/consumer/newsletter",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e.value})}).then(function(r){return r.json()}).then(function(d){ e.value=""; alert(d.message||"Subscribed!"); }).catch(function(){ alert("Error. Please try again."); }); } }} className="bg-[#7c3aed] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#6d28d9] transition border-none cursor-pointer">{t("footer.subscribe")}</button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-6 pb-8 mb-8 border-b border-white/5 md:flex-row text-center md:text-left">
          <div>
            <span className="text-lg font-bold text-white">{t("footer.brand_title")}</span>
            <p className="text-xs text-[#86868b] mt-1">{t("footer.brand_desc")}</p>
          </div>
          <div className="flex items-center space-x-3 my-3 md:my-0">
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="Twitter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors" aria-label="YouTube">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
          <div className="flex items-center space-x-4 text-white/50 text-xs">
            <span>{t("footer.secure")}</span>
            <span>{t("footer.payments")}</span>
          </div>
        </div>
        <div className="flex flex-col justify-between text-xs text-[#86868b] gap-4 md:flex-row">
          <p>{t("footer.rights_ext")}</p>
          <div className="flex space-x-4">
            <button onClick={() => window.location.href="/disclaimer"} className="hover:text-white bg-transparent border-none p-0 cursor-pointer text-xs">{t("footer.disclaimer")}</button>
            <button onClick={() => window.location.href="/privacy"} className="hover:text-white bg-transparent border-none p-0 cursor-pointer text-xs">{t("footer.privacy")}</button>
            <button onClick={() => window.location.href="/licensing"} className="hover:text-white bg-transparent border-none p-0 cursor-pointer text-xs">{t("footer.licensing")}</button>
          </div>
        </div>
      </div>
    </footer>

      <div className="back-top" id="back-top" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} role="button" aria-label="Back to top" tabIndex={0} onKeyDown={(e)=>e.key==="Enter"&&window.scrollTo({top:0,behavior:"smooth"})}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="18 15 12 9 6 15"/></svg>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
    <BrowserRouter>
          <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/shop" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<StorePage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/b2b" element={<B2bPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogArticlePage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/changelog" element={<ChangelogPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/refund" element={<RefundPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      <CookieConsent />
        </Layout>
    </BrowserRouter>
    </CartProvider>
  );
}




