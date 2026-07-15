import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { CartProvider, useCart } from "./CartContext";
import SearchOverlay from "./SearchOverlay";
import CartFlyout from "./CartFlyout";
import HomePage from "./pages/Home";
import StorePage from "./pages/Store";
import ProductPage from "./pages/Product";
import CartPage from "./pages/Cart";
import AccountPage from "./pages/Account";
import SupportPage from "./pages/Support";
import B2bPage from "./pages/B2b";
import BlogPage from "./pages/Blog";
import BlogArticlePage from "./pages/BlogArticle";
import AnimInit from "./animations";

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

function Layout({ children }) {
  const location = useLocation();
  const cart = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(()=>{const bt=document.getElementById("back-top");if(bt)bt.classList.toggle("visible",window.scrollY>300);})

  useEffect(() => {
    window.scrollTo(0, 0);
    setSearchOpen(false);
    setShowCart(false);
  }, [location.pathname]);

  useEffect(() => {
    const h = (e) => {
      if (e.key === "/" && !searchOpen && e.target.tagName !== "INPUT") { e.preventDefault(); setSearchOpen(true); }
      if (e.key === "Escape") setShowCart(false);
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
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <div className="fixed top-0 left-0 h-[2px] bg-[#0071e3] z-[9999]" style={{ width: scrollPct + "%", transition: "width 0.1s" }} />

      <nav className="fixed top-0 z-50 w-full h-12 bg-white/75 border-b border-[#e8e8ed] backdrop-blur-[20px]">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 v5-card-light rounded-lg px-2 -ml-2" aria-label="KeyStarter Home">
            <MicrosoftLogo />
            <span className="text-sm font-semibold tracking-tight text-[#1d1d1f]">KeyStarter</span>
            <span className="hidden sm:inline bg-blue-50 text-[#0078d4] text-[10px] font-semibold px-1.5 py-0.5 rounded border border-blue-200">Partner</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6 text-xs font-medium text-[#1d1d1f]/80">
            {location.pathname === "/" ? (
              <>
                <button onClick={()=>scrollToSection("store")} className="hover:text-[#0078d4] transition-colors">Store</button>
                <button onClick={()=>scrollToSection("business")} className="hover:text-[#0078d4] transition-colors">Enterprise / B2B</button>
                <button onClick={()=>scrollToSection("compare")} className="hover:text-[#0078d4] transition-colors">Compare</button>
                <button onClick={()=>scrollToSection("support")} className="hover:text-[#0078d4] transition-colors">Tech Support</button>
               <button onClick={()=>scrollToSection("portal")} className="hover:text-[#0078d4] transition-colors">Fulfillment Center</button>
                <button onClick={()=>window.location.href='/blog'} className="hover:text-[#0078d4] transition-colors">Blog</button>
</>
            ) : (
              <>
                <Link to="/#store" className="hover:text-[#0078d4] transition-colors">Store</Link>
                <Link to="/#business" className="hover:text-[#0078d4] transition-colors">Enterprise</Link>
                <Link to="/#compare" className="hover:text-[#0078d4] transition-colors">Compare</Link>
               <Link to="/#support" className="hover:text-[#0078d4] transition-colors">Support</Link>
                <Link to="/blog" className="hover:text-[#0078d4] transition-colors">Blog</Link>
</>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={()=>setSearchOpen(true)} className="text-[#1d1d1f]/70 hover:text-[#1d1d1f] transition-colors" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
            <div className="relative">
              <button onClick={()=>setShowCart(!showCart)} className="relative text-[#1d1d1f]/70 hover:text-[#1d1d1f] transition-colors" aria-label={"Cart (" + cart.count + ")"}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                {cart.count > 0 && (<span className="absolute -top-1.5 -right-1.5 bg-[#0071e3] text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center leading-none">{cart.count}</span>)}
              </button>
              <CartFlyout open={showCart} onClose={() => setShowCart(false)} />
            </div>
          </div>
        </div>
      </nav>

      <AnimInit />

      {/* V5.2: Page enter animation */}
      <main key={location.pathname} className="page-enter pt-12">
        {children}
      </main>

      <footer className="bg-[#161617] text-white py-16 border-t border-white/5">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 pb-8 mb-8 border-b border-white/5 md:flex-row text-center md:text-left">
            <div>
              <span className="text-lg font-bold text-white">KeyStarter Partner Solutions</span>
              <p className="text-xs text-[#86868b] mt-1">Reliable, secure, efficient B2B & B2C Microsoft authorized supply chain services.</p>
            </div>
            <div className="flex items-center space-x-4 text-white/50 text-xs">
              <span>256-bit SSL Secured</span>
              <span>PayPal, Stripe, Bank Wire</span>
            </div>
          </div>
          <div className="flex flex-col justify-between text-xs text-[#86868b] gap-4 md:flex-row">
            <p>&copy; 2026 KeyStarter. All Rights Reserved. All Microsoft trademarks and product designs are the property of Microsoft Corporation.</p>
            <div className="flex space-x-4">
              <button className="hover:text-white bg-transparent border-none p-0 cursor-pointer text-xs">Disclaimer</button>
              <button className="hover:text-white bg-transparent border-none p-0 cursor-pointer text-xs">Privacy Policy</button>
              <button className="hover:text-white bg-transparent border-none p-0 cursor-pointer text-xs">Licensing Terms</button>
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
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/products" element={<StorePage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/b2b" element={<B2bPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogArticlePage />} />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  );
}
