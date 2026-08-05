import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/woocommerce';
import type { SPAProduct } from '../api/woocommerce';
import Portal from '../Portal';
import { useTranslation } from 'react-i18next';
import { TESTIMONIALS } from '../data/testimonials';
import { useCart } from "../data/CartContext";
import { SPECIAL_OFFER_IDS } from "../data/constants";
import ProductImage from "../components/ProductImage";
import CountdownTimer from "../components/CountdownTimer";
import { stripTags } from "../utils/html";


const WindowsIcon = ({ colorClass = "text-[#7c3aed]" }) => (
  <svg className={`w-8 h-8 ${colorClass}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 3.449L9.75 2.1v9.45H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.1zM10.8 1.95L24 0v11.55H10.8V1.95zM10.8 12.45H24v11.55l-13.2-1.95v-9.6z" />
  </svg>
);

const OfficeIcon = () => (
  <svg className="w-8 h-8 text-[#f25022]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 0h-9L0 7.5v9L7.5 24h9l7.5-7.5v-9L16.5 0zm1.5 15.75l-3.75 3.75H10.5L6.75 15.75V10.5l3.75-3.75h3.75l3.75 3.75v5.25z" />
  </svg>
);

const DatabaseIcon = () => (
  <svg className="w-8 h-8 text-[#8f00ff]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 4.02 2 6.5s4.48 4.5 10 4.5 10-2.02 10-4.5S17.52 2 12 2zm0 6.5c-4.42 0-8-1.34-8-3s3.58-3 8-3 8 1.34 8 3-3.58 3-8 3zm0 1c-5.52 0-10-1.52-10-3.5v3.5c0 1.98 4.42 3.5 10 3.5s10-1.52 10-3.5V6c0 1.98-4.48 3.5-10 3.5zm0 4.5c-4.42 0-8-1.34-8-3s3.58-3 8-3 8 1.34 8 3-3.58 3-8 3zm0 1c-5.52 0-10-1.52-10-3.5v3.5c0 1.98 4.42 3.5 10 3.5s10-1.52 10-3.5v-3.5c0 1.98-4.48 3.5-10 3.5zm0 4.5c-4.42 0-8-1.34-8-3s3.58-3 8-3 8 1.34 8 3-3.58 3-8 3z" />
  </svg>
);

const TrustIcon = ({ type }: { type: string }) => {
  const common: React.SVGProps<SVGSVGElement> = { className: "w-7 h-7", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "delivery") {
    return <svg {...common}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
  }
  if (type === "genuine") {
    return <svg {...common}><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></svg>;
  }
  if (type === "refund") {
    return <svg {...common}><path d="m16 16 2 2 4-4" /><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" /><path d="M3.29 7 12 12l8.71-5" /><path d="M12 22V12" /></svg>;
  }
  return <svg {...common}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>;
};

const PREMIUM_SKUS: any[] = [
  {id:'windows-11-pro-official',category:'windows',title:'Windows 11 Pro OEM Key',subtitle:'Official Microsoft order - screenshot delivery',price:49,originalPrice:199.00,tag:'Official Order',type:'Microsoft Direct OEM',features:['Official Microsoft direct order','Delivery with order screenshot','Lifetime OEM activation'],icon:<WindowsIcon />},
  {id:'windows-10-pro-official',category:'windows',title:'Windows 10 Pro OEM Key',subtitle:'Official Microsoft order - screenshot delivery',price:49,originalPrice:149.00,tag:'Official Order',type:'Microsoft Direct OEM',features:['Official Microsoft direct order','Delivery with order screenshot','Lifetime OEM activation'],icon:<WindowsIcon colorClass="text-[#7fba00]" />},
  {id:'windows-11-home-official',category:'windows',title:'Windows 11 Home OEM Key',subtitle:'Official Microsoft order - screenshot delivery',price:39,originalPrice:139.00,tag:'Official Order',type:'Microsoft Direct OEM',features:['Official Microsoft direct order','Delivery with order screenshot','Lifetime OEM activation'],icon:<WindowsIcon colorClass="text-[#00a4ef]" />},
  {id:'windows-10-home-official',category:'windows',title:'Windows 10 Home OEM Key',subtitle:'Official Microsoft order - screenshot delivery',price:39,originalPrice:139.00,tag:'Official Order',type:'Microsoft Direct OEM',features:['Official Microsoft direct order','Delivery with order screenshot','Lifetime OEM activation'],icon:<WindowsIcon colorClass="text-[#00a4ef]" />},
  {id:'windows-11-pro',category:'windows',title:'Windows 11 Pro OEM Key',subtitle:'Special price - email delivery',price:18,originalPrice:199.00,tag:'Special Price',type:'OEM',features:['OEM license for 1 PC - lifetime activation','Email delivery','Official ISO downloads & updates'],icon:<WindowsIcon />},
  {id:'windows-10-pro',category:'windows',title:'Windows 10 Pro OEM Key',subtitle:'Special price - email delivery',price:18,originalPrice:149.00,tag:'Special Price',type:'OEM',features:['OEM license for 1 PC - lifetime activation','Email delivery','Official ISO downloads & updates'],icon:<WindowsIcon colorClass="text-[#7fba00]" />},
  {id:'windows-11-home',category:'windows',title:'Windows 11 Home OEM Key',subtitle:'Special price - email delivery',price:13,originalPrice:139.00,tag:'Special Price',type:'OEM',features:['OEM license for 1 PC - home use','Email delivery','Seamless updates & support'],icon:<WindowsIcon colorClass="text-[#00a4ef]" />},
  {id:'windows-10-home',category:'windows',title:'Windows 10 Home OEM Key',subtitle:'Special price - email delivery',price:13,originalPrice:139.00,tag:'Special Price',type:'OEM',features:['OEM license for 1 PC - home use','Email delivery','Official updates & support'],icon:<WindowsIcon colorClass="text-[#00a4ef]" />},
  {id:'office-2019-pro-plus',category:'office',title:'Office 2019 Professional Plus',subtitle:'1 Device - lifetime license',price:48,originalPrice:439.00,tag:'Special Price',type:'Perpetual License',features:['Classic Office suite for 1 device','Word,Excel,PowerPoint,Outlook & more','Lifetime license, no subscription'],icon:<OfficeIcon />},
  {id:'office-2021-pro-plus',category:'office',title:'Office 2021 Professional Plus',subtitle:'1 Device - latest classic Office',price:58,originalPrice:439.00,tag:'Special Price',type:'Perpetual License',features:['Latest Office classic suite for 1 PC','Word,Excel,PowerPoint,Outlook & more','Lifetime license, no subscription'],icon:<OfficeIcon />},
  {id:'win-11-iot-2024-entry',category:'server',title:'Win 11 IoT Ent LTSC 2024 Entry',subtitle:'IoT device license - sticker delivery',price:45,originalPrice:160.00,tag:'IoT',type:'Enterprise IoT',features:['IoT Enterprise LTSC 2024 Edition','Sticker delivery + shipping','Device-bound activation'],icon:<DatabaseIcon />},
  {id:'win-10-iot-2021-entry',category:'server',title:'Win 10 IoT Ent 2021 LTSC Entry',subtitle:'IoT device license - sticker delivery',price:45,originalPrice:160.00,tag:'IoT',type:'Enterprise IoT',features:['IoT Enterprise LTSC 2021 Edition','Sticker delivery + shipping','Device-bound activation'],icon:<DatabaseIcon />},
  {id:'win-10-iot-2019-entry',category:'server',title:'Win 10 IoT Ent 2019 LTSC Entry',subtitle:'IoT device license - sticker delivery',price:45,originalPrice:160.00,tag:'IoT',type:'Enterprise IoT',features:['IoT Enterprise LTSC 2019 Edition','Sticker delivery + shipping','Device-bound activation'],icon:<DatabaseIcon />},
];
const specialOfferSkus = PREMIUM_SKUS.filter(s => SPECIAL_OFFER_IDS.includes(s.id));

const TRUST_ITEMS = [
  { img: "/assets/images/trust-paypal.jpg?v=3", title: "PayPal Verified", desc: "Official verified seller account", alt: "PayPal" },
  { icon: "delivery", bg: "#ff6b35", title: "Instant Delivery", desc: "Global instant delivery within 10 minutes" },
  { icon: "genuine", bg: "#00aa13", title: "100% Genuine", desc: "Direct Microsoft channel licenses" },
  { icon: "refund", bg: "#2563eb", title: "14-Day Refund", desc: "No activation failure risk guarantee" },
  { icon: "ssl", bg: "#7c3aed", title: "SSL Encrypted", desc: "256-bit TLS encrypted checkout" }
];

export default function App() {
  const { t } = useTranslation();
  const [apiProducts, setApiProducts] = useState<SPAProduct[] | null>(null);
  useEffect(() => { fetchProducts().then(setApiProducts).catch(function(e){console.warn("API fetch failed:",e)}); }, []);
const [activeTab, setActiveTab] = useState('all');
 const [openFaqId, setOpenFaqId] = useState<number | null>(null);
 const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [showOffer, setShowOffer] = useState(true);
  useEffect(() => { fetch("https://keys-starter.com/wp-json/wp/v2/posts?_embed&per_page=3").then(r=>r.json()).then(setBlogPosts).catch(()=>{}); }, []);
  
  const { addToCart, buyNow } = useCart();

  // Custom Toast State
  const [heroPersona, setHeroPersona] = useState("retail");
  const [toast, setToast] = useState({ visible: false, message: '', icon: '🚀' });

  // Helper smooth scrolling for single page navigation
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 48; // nav height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const showToast = (message: string, icon?: string) => {
    setToast({ visible: true, message, icon: icon || "" });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4000);
  };

  const toggleFAQ = (id: number) => {
    setOpenFaqId(prevId => (prevId === id ? null : id));
  };


  // Listen for hash nav (from header nav buttons)
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === '#business') {
        setHeroPersona("enterprise");
        setTimeout(() => scrollToSection('business'), 200);
      }
    };
    if (window.location.hash === '#business') setTimeout(onHash, 100);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const handleB2BSubmit = async (e: any) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const msg = "<h2>Compliance Quote Request</h2>" +
      "<p><b>Company:</b> " + (fd.get("company") || "") + "</p>" +
      "<p><b>Units:</b> " + (fd.get("units") || "") + "</p>" +
      "<p><b>Product:</b> " + (fd.get("product") || "") + "</p>" +
      "<p><b>Contact:</b> " + (fd.get("contact") || "") + "</p>" +
      "<p><b>Phone/Email:</b> " + String(fd.get("phone") || "") + "</p>";
    try {
      await fetch("/wp-json/keystarter/v1/send-email", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          to: "admin@keys-starter.com",
          from_email: String(fd.get("phone") || "").includes("@") ? String(fd.get("phone") || "") : "",
          from_name: (fd.get("contact") || ""),
          reply_to: String(fd.get("phone") || "").includes("@") ? String(fd.get("phone") || "") : "",
          subject: "Compliance Quote from " + (fd.get("company") || "Unknown"),
          message: msg
        })
      });
      // Auto-reply to customer
      const ce = String(fd.get("phone") || "");
      if (ce.includes("@")) {
        fetch("/wp-json/keystarter/v1/send-email", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            to: ce,
            from_email: ce,
            from_name: (fd.get("contact") || ""),
            reply_to: ce,
            subject: "Thank you for your Compliance Quote - KeyStarter",
            message: "<p>Hi " + (fd.get("contact") || "") + ",</p><p>Thank you for your compliance quote request. Our experts will review your needs and provide a cost-effective quote within 30 minutes.</p><p>For urgent inquiries, please email admin@keys-starter.com.</p><p>Best regards,<br>KeyStarter Compliance Team</p>"
          })
        }).catch(() => {});
      }
      showToast("Quote submitted! A specialist will email you shortly.", "🔵");
      e.target.reset();
    } catch(_err) {
      showToast("Network error. Please email admin@keys-starter.com directly.", "⚠️");
    }
  };

  // Filtered SKUs
  const getLiveData = (sku: any) => {
    if (!apiProducts) return sku;
    const live = apiProducts.find((p: any) => p.name === sku.title);
    if (!live) return sku;
    return { ...sku, price: live.price, originalPrice: live.regularPrice };
  };

const filteredSkus = PREMIUM_SKUS.filter(sku => 
    activeTab === 'all' || sku.category === activeTab
  );

  return (
    <div className="overflow-x-hidden bg-[#f5f5f7] text-[#1d1d1f] antialiased font-sans">
      {showOffer && (
        <div className="relative bg-gradient-to-r from-[#7c3aed] to-[#7c3aed] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm">
             <span className="hidden sm:inline text-lg">🔥</span>
              <span className="font-semibold whitespace-nowrap">{heroPersona==="retail" ? t("home.offer.title") : t("home.enterprise.hero_title")}</span>
              <span className="text-white/80">{heroPersona==="retail" ? t("home.offer.desc") : t("home.enterprise.hero_desc")}</span>
              <button onClick={() => heroPersona==="retail" ? scrollToSection("special-offer") : window.location.href="/b2b#enterprise-b2b"} className="bg-white text-[#7c3aed] text-xs font-bold px-4 py-1.5 rounded-full hover:bg-blue-50 transition flex-shrink-0">{heroPersona==="retail" ? t("home.offer.cta") : t("home.enterprise.hero_cta")}</button>
            </div>
            <button onClick={() => setShowOffer(false)} className="text-white/50 hover:text-white transition ml-2 flex-shrink-0" aria-label={t("home.offer.dismiss")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      )}
      
            {/* Navigation Bar */}

      {}
      {/* Hero Section - Platinum Digital Style */}
      <section id="hero" className="relative min-h-[560px] flex items-center justify-center overflow-hidden bg-[#161617] pt-32 pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <video className="absolute inset-0 w-full h-full object-cover opacity-70 brightness-[0.98] scale-105" autoPlay muted loop playsInline preload="auto" poster="/videos/enterprise-bg-v30-poster.png">
            <source src="/videos/enterprise-bg-v30.mp4" type="video/mp4" />
            <source src="/videos/enterprise-bg-v30.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#161617]/65 via-[#161617]/50 to-[#161617]/75" />
          <div className="absolute inset-0 shadow-[inset_0_0_140px_rgba(0,0,0,0.45)] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-4xl px-4 mx-auto text-center">
          {/* Persona Tabs */}
          <div className="inline-flex bg-white/10 border border-white/20 p-1 rounded-full mb-8">
            <button onClick={() => setHeroPersona("retail")} className={"px-5 py-2 text-xs font-bold rounded-full transition " + (heroPersona==="retail" ? "bg-[#7c3aed] text-white" : "text-white/70 hover:text-white")}>{String.fromCodePoint(0x1F464)} {t("home.persona.retail")}</button>
            <button onClick={() => setHeroPersona("enterprise")} className={"px-5 py-2 text-xs font-bold rounded-full transition " + (heroPersona==="enterprise" ? "bg-[#7c3aed] text-white" : "text-white/70 hover:text-white")}>{String.fromCodePoint(0x1F3E2)} {t("home.persona.enterprise")}</button>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide mb-4 bg-white text-[#7c3aed] border border-[#d1d5db]">
            {heroPersona==="retail" ? t("home.retail.portal_title") : t("home.enterprise.heading")}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight text-white">
            {heroPersona==="retail" ? t("home.hero.headline") : t("home.enterprise.sub_heading")}
          </h1>
          <p className="text-sm text-white/75 max-w-xl mx-auto mb-8 leading-relaxed">
            {heroPersona==="retail" ? t("hero.desc") : t("home.enterprise.sub_desc")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <button onClick={() => scrollToSection(heroPersona==="retail" ? "special-offer" : "business")} className="w-full sm:w-auto inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition shadow-lg shadow-purple-500/10 text-center">
              {heroPersona==="retail" ? t("hero.cta") : t("home.enterprise.compliance_btn")}
            </button>
            <button onClick={() => window.location.href="/b2b#enterprise-b2b"} className="w-full sm:w-auto inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition text-center">
              {heroPersona==="retail" ? t("hero.enterprise") : t("home.enterprise.verify_btn")} {String.fromCharCode(0x203A)}
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-0 md:divide-x divide-white/20 bg-white/10 border border-white/20 rounded-lg shadow-sm overflow-hidden max-w-3xl mx-auto">
            {(heroPersona==="retail" ? [
              { num: "10 Min", label: t("hero.trust.delivery") },
              { num: "98.7%", label: t("hero.trust.satisfaction") },
              { num: "50K+", label: t("hero.trust.activation") },
              { num: "100%", label: t("hero.trust.verification") }
            ] : [
              { num: t("home.enterprise.vat_label"), label: t("home.enterprise.dedicated_invoice") },
              { num: t("home.enterprise.enterprise_label"), label: "Volume Licensing" },
              { num: t("home.enterprise.po_terms"), label: t("home.enterprise.corporate_transfer") },
              { num: t("home.enterprise.support_247"), label: t("home.enterprise.sla_manager") }
            ]).map((s, i) => (
              <div key={i} className="px-4 py-5 text-center">
                <div className="text-xl md:text-2xl font-extrabold text-[#ff6b35] tabular-nums">{s.num}</div>
                <div className="text-[10px] md:text-[11px] font-semibold uppercase text-white/70 mt-1.5 tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {heroPersona === "enterprise" && (
      <section className="py-16 bg-[#f3f4f6] border-t border-[#d1d5db] text-center">
        <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mb-4">{t("home.enterprise.cta_title")}</h2>
        <p className="text-sm text-[#86868b] mb-6 max-w-xl mx-auto">{t("home.enterprise.cta_desc")}</p>
        <div className="flex justify-center gap-4 flex-wrap items-center">
          <a href="mailto:admin@keys-starter.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition cursor-pointer no-underline">Contact Enterprise Sales</a>
          <span className="text-sm text-[#7c3aed] font-semibold">admin@keys-starter.com</span>
        </div>
      </section>
      )}

{heroPersona === "enterprise" && (
      <section className="py-12 bg-white border-b border-[#e8e8ed] overflow-hidden">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-[#7c3aed] tracking-wider uppercase">{t("home.enterprise.trusted_title")}</span>
            <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mt-2">{t("home.enterprise.partners_title")}</h2>
          </div>
        </div>
        <div className="relative">
          <div className="flex animate-scroll gap-6 px-4" style={{width:"max-content"}}>
            {[["Mindray","Medical Devices & Healthcare"],["Han's Laser","Laser Equipment"],["GE Healthcare","Medical Imaging"],["Philips Healthcare","Health Tech"],["SMIC","Semiconductor"],["CRRC","Rail Transit & Mobility"],["Kaba Group","Access Control & Security"],["Siemens","Industrial Automation"],["Mindray","Medical Devices & Healthcare"],["Han's Laser","Laser Equipment"],["GE Healthcare","Medical Imaging"],["Philips Healthcare","Health Tech"],["SMIC","Semiconductor"],["CRRC","Rail Transit & Mobility"],["Kaba Group","Access Control & Security"],["Siemens","Industrial Automation"]].map((p,i) => <div key={i} className="flex-shrink-0 w-[220px] sm:w-[260px] bg-[#fafafa] rounded-2xl p-6 border border-[#e8e8ed] text-center shadow-sm hover:border-[#7c3aed]/30 transition-colors"><div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#f3f4f6] flex items-center justify-center text-lg font-bold text-[#7c3aed]">{p[0][0]}</div><div className="text-sm font-bold text-[#1d1d1f] mb-1">{p[0]}</div><div className="text-[11px] text-[#86868b]">{p[1]}</div></div>)}
          </div>
        </div>
      </section>
      )}

{/* Testimonials Carousel */}
      <section id="testimonials" className={`py-12 bg-white border-b border-[#f5f5f7] overflow-hidden ${heroPersona!=="retail"?"persona-hidden":""}`}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-[#7c3aed] tracking-wider uppercase">Why Our Customers Trust Us</span>
            <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mt-2">Real reviews from verified buyers</h2>
          </div>
        </div>
        <div className="relative">
          <div className="flex animate-scroll gap-4 px-4" style={{width:"max-content"}}>
            {[...TESTIMONIALS,...TESTIMONIALS].map((t,i) => (
              <div key={i} className="flex-shrink-0 w-[300px] sm:w-[340px] bg-[#f5f5f7] rounded-2xl p-5 border border-[#e8e8ed]">
                <div className="text-yellow-500 text-sm mb-2">
                  {[...Array(5)].map((_,s) => (
                    <span key={s} className={s < t.stars ? "text-yellow-500" : "text-gray-300"}>
                      {s < t.stars ? String.fromCharCode(9733) : String.fromCharCode(9734)}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-[#1d1d1f]/80 leading-relaxed mb-3 italic">&ldquo;{t.text}&rdquo;</p>
                <p className="text-[11px] font-semibold text-[#1d1d1f]">- {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
{/* Special Offer Section */}
     {specialOfferSkus.length > 0 && (
      <section id="special-offer" className={`py-16 bg-gradient-to-b from-[#1d1d1f] to-[#161617] border-t border-white/10 ${heroPersona!=="retail"?"persona-hidden":""}`}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-8 text-center">
            <span className="inline-block text-[10px] font-bold bg-[#ff6b35] text-white px-3 py-1 rounded-full uppercase tracking-wider mb-3">Limited Time</span>
            <h2 className="text-2xl font-bold tracking-tight text-white">{t("home.offer.section_title")}</h2>
            <p className="text-sm text-white/70 mt-1">{t("home.offer.section_desc")}</p>
            <div className="mt-6 inline-flex flex-col items-center gap-2.5 rounded-2xl bg-white border-2 border-[#ff6b35]/40 px-8 py-6 shadow-[0_12px_32px_rgba(255,107,53,0.18)]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#c2410c]">Limited Time Offer ends in</span>
              <CountdownTimer large />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialOfferSkus.map((sku) => (
              <div key={sku.id} onClick={() => window.location.href="/product/"+sku.id}
                className="bg-white v5-card rounded-2xl border-2 border-[#ff6b35]/20 p-6 flex flex-col justify-between cursor-pointer hover:border-[#ff6b35]/50 hover:shadow-lg transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#ff6b35] text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg">-{Math.round((1 - sku.price/sku.originalPrice)*100)}%</div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 bg-orange-50 text-orange-600 rounded border border-orange-200">{sku.tag}</span>
                    <span className="text-xs text-[#86868b]">{sku.type}</span>
                  </div>
                  <ProductImage slug={sku.id} name={sku.title} />
                  <h3 className="text-lg font-bold text-[#1d1d1f] mb-1">{sku.title}</h3>
                  <p className="text-xs text-[#86868b] mb-4">{sku.subtitle}</p>
                  <ul className="space-y-2 mb-6 text-xs text-[#1d1d1f]/80 border-t border-[#f5f5f7] pt-4">
                    {sku.features.map((feat: any, idx: number) => (
                      <li key={idx} className="flex items-start space-x-2"><span className="text-green-500 mt-0.5">{String.fromCharCode(0x2713)}</span><span>{feat}</span></li>
                    ))}
                 </ul>
               </div>
              <div className="border-t border-[#f5f5f7] pt-4 mt-auto">
                    <p className="text-[10px] text-orange-600 font-semibold mb-2">Limit 10 per customer</p>
                 <div className="flex items-baseline justify-between mb-4">
                   <div>
                      <span className="text-2xl font-extrabold text-[#ff6b35]">{String.fromCharCode(0x0024)}{sku.price}</span>
                      <span className="text-xs text-[#86868b] line-through ml-1.5">{String.fromCharCode(0x0024)}{sku.originalPrice}</span>
                     <span className="text-[10px] font-semibold text-orange-600 ml-2">Special Offer</span>
                   </div>
                 </div>
                  <CountdownTimer className="mb-4" />
                  <div className="flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); addToCart(sku.id, sku.title, getLiveData(sku).price) }}
                      className="flex-1 border-2 border-[#ff6b35] text-[#ff6b35] hover:bg-orange-50 text-xs font-semibold py-2.5 rounded-xl transition">
                      {t('product.add_to_cart', 'Add to Cart')}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); buyNow(sku.id, sku.title, getLiveData(sku).price) }}
                      className="flex-1 bg-[#ff6b35] hover:bg-[#e55a2b] text-white text-xs font-semibold py-2.5 rounded-xl transition">
                      {t('product.buy_now', 'Buy Now')}
                    </button>
                  </div>
               </div>
             </div>
           ))}
         </div>
        </div>
      </section>
      )}

      <section id="store" className={`py-20 bg-[#f5f5f7] ${heroPersona!=="retail"?"persona-hidden":""}`}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#1d1d1f] mb-4">{t("store.section_title")}</h2>
            <p className="text-sm text-[#86868b]">{t("store.section_desc")}</p>
          </div>

          {/* Filter Categories */}
          <div className="flex justify-center mb-10 py-2 overflow-x-auto">
            <div className="flex space-x-1.5 bg-white p-1.5 rounded-full border border-[#e8e8ed] shadow-[0_4px_12px_rgba(0,0,0,0.03)] whitespace-nowrap">
              <button 
                onClick={() => setActiveTab('all')} 
                className={`px-6 py-2 rounded-full text-xs font-semibold transition ${activeTab === 'all' ? 'bg-[#1d1d1f] text-white' : 'text-[#86868b] hover:text-black'}`}
              >
                All Products (13)
              </button>
              <button 
                onClick={() => setActiveTab('windows')} 
                className={`px-6 py-2 rounded-full text-xs font-semibold transition ${activeTab === 'windows' ? 'bg-[#1d1d1f] text-white' : 'text-[#86868b] hover:text-black'}`}
              >
                Windows (8)
              </button>
              <button 
                onClick={() => setActiveTab('office')} 
                className={`px-6 py-2 rounded-full text-xs font-semibold transition ${activeTab === 'office' ? 'bg-[#1d1d1f] text-white' : 'text-[#86868b] hover:text-black'}`}
              >
                Office (2)
              </button>
              <button 
                onClick={() => setActiveTab('server')} 
                className={`px-6 py-2 rounded-full text-xs font-semibold transition ${activeTab === 'server' ? 'bg-[#1d1d1f] text-white' : 'text-[#86868b] hover:text-black'}`}
              >
                Server / SQL (3)
              </button>
            </div>
          </div>

          {/* 13 SKU Grid with Preserved Premium Copy */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSkus.map((sku) => (
              <div 
                key={sku.id} 
                onClick={() => window.location.href='/product/'+sku.id} 
                className={`bg-white v5-card rounded-2xl border ${SPECIAL_OFFER_IDS.includes(sku.id)?"border-[#ff6b35]/30":"border-[#e8e8ed]"} p-6 flex flex-col justify-between cursor-pointer hover:shadow-md transition-shadow relative`}
              >
                {SPECIAL_OFFER_IDS.includes(sku.id) && <div className="absolute top-0 right-0 bg-[#ff6b35] text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg">-{Math.round((1 - sku.price/sku.originalPrice)*100)}%</div>}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded border ${SPECIAL_OFFER_IDS.includes(sku.id)?"bg-orange-50 text-orange-600 border-orange-200":"bg-green-50 text-green-600 border-green-200"}`}>
                      ⚡ {String(t('home.sku.'+sku.id.replace(/-/g,'')+'.tag', sku.tag))}
                    </span>
                    <span className="text-xs text-[#86868b]">{String(t('home.sku.'+sku.id.replace(/-/g,'')+'.type', sku.type))}</span>
                  </div>
                  
                  <ProductImage slug={sku.id} name={sku.title} />
                  <h3 className="text-lg font-bold text-[#1d1d1f] mb-1">{sku.title}</h3>
                  <p className="text-xs text-[#86868b] mb-4">{String(t('home.sku.'+sku.id.replace(/-/g,'')+'.subtitle', sku.subtitle))}</p>

                  <ul className="space-y-2 mb-6 text-xs text-[#1d1d1f]/80 border-t border-[#f5f5f7] pt-4">
                    {sku.features.map((feat: any, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-green-500 font-bold">✓</span>
                        <span>{String(t('home.sku.'+sku.id.replace(/-/g,'')+'.f'+(idx+1), feat))}</span>
                      </li>
                    ))}
                 </ul>
               </div>

               <div>
                  {SPECIAL_OFFER_IDS.includes(sku.id) && <p className="text-[10px] text-orange-600 font-semibold mb-2">Limit 10 per customer</p>}
                 <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-2xl font-extrabold text-[#1d1d1f]">${getLiveData(sku).price}</span>
                      <span className="text-xs text-[#86868b] line-through ml-1.5">${getLiveData(sku).originalPrice}</span>
                    </div>
                    {sku.auditInfo && (
                      <span className="text-[11px] text-[#7c3aed] font-medium">✓ {String(t('home.sku.'+sku.id.replace(/-/g,'')+'.audit', sku.auditInfo))}</span>
                    )}
                  </div>
                  {SPECIAL_OFFER_IDS.includes(sku.id) && <CountdownTimer className="mb-4" />}
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(sku.id, sku.title, getLiveData(sku).price) }} 
                      className="flex-1 border-2 border-[#7c3aed] text-[#7c3aed] hover:bg-blue-50 text-xs font-semibold py-2.5 rounded-xl transition"
                    >
                      {t('product.add_to_cart', 'Add to Cart')}
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); buyNow(sku.id, sku.title, getLiveData(sku).price) }} 
                      className="flex-1 bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-semibold py-2.5 rounded-xl transition"
                    >
                      {t('product.buy_now', 'Buy Now')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      {/* B2B Section */}
      <section id="business" className={`relative py-24 bg-[#161617] text-white overflow-hidden ${heroPersona!=="enterprise"?"persona-hidden":""}`}>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
            
            {/* Business value propositions */}
            <div>
              <span className="text-[#7c3aed] text-xs font-bold tracking-wider uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                {t("home.enterprise.compliance_section_title")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-6 mb-6 leading-tight">
                Enterprise Compliance & {t("home.compare.audit")}
              </h2>
              <p className="text-sm text-[#86868b] leading-relaxed mb-8">
                When facing a Microsoft SAM Audit, opaque procurement chains put enterprises at risk. We provide Volume Licensing certificates and genuine keys for 100% compliance at low cost, avoiding legal penalties.
              </p>

              <div className="space-y-4">
                <div className="flex space-x-4 v5-card-light bg-white/5 p-4 rounded-xl border border-white/10 hover:border-blue-500/40 transition duration-300">
                  <div className="text-[#7c3aed] text-xl pt-0.5">🛡️</div>
                  <div>
                    <h4  className="text-sm font-semibold">{t("home.enterprise.compliance_verified_label")}</h4>
                    <p className="text-xs text-[#86868b] mt-1">{t("home.compare.enterprise_desc")}</p>
                  </div>
                </div>
                <div className="flex space-x-4 v5-card-light bg-white/5 p-4 rounded-xl border border-white/10 hover:border-blue-500/40 transition duration-300">
                  <div className="text-[#34c759] text-xl pt-0.5">💰</div>
                  <div>
                    <h4  className="text-sm font-semibold">{t("home.enterprise.volume_pricing_title")}</h4>
                    <p className="text-xs text-[#86868b] mt-1">{t("home.enterprise.compliance_flexible")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* B2B Interactive Intake Form */}
            <div className="bg-white text-[#1d1d1f] p-8 rounded-2xl border border-[#e8e8ed] shadow-2xl relative">
              <h3 className="text-xl font-bold mb-2">{t("home.b2b.contact_title")}</h3>
              <p className="text-xs text-[#86868b] mb-6">{t("home.b2b.quote")}</p>
              
              <form onSubmit={handleB2BSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#1d1d1f] mb-1">{t("home.b2b.company")}</label>
                  <input type="text" name="company" required placeholder="e.g. TechCorp Solutions Ltd." className="w-full px-3 py-2 text-sm bg-[#f5f5f7] border border-[#d2d2d7] rounded-lg focus:outline-none focus:border-[#7c3aed] transition" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1d1d1f] mb-1">{t("home.b2b.employees")}</label>
                    <select name="units" className="w-full px-3 py-2 text-sm bg-[#f5f5f7] border border-[#d2d2d7] rounded-lg focus:outline-none focus:border-[#7c3aed] transition">
                      <option>5 - 20 Units</option>
                      <option>21 - 50 Units</option>
                      <option>51 - 100 Units</option>
                      <option>100+ Units</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1d1d1f] mb-1">{t("home.b2b.needs")}</label>
                    <select name="product" className="w-full px-3 py-2 text-sm bg-[#f5f5f7] border border-[#d2d2d7] rounded-lg focus:outline-none focus:border-[#7c3aed] transition">
                      <option>{t("home.b2b.windows")}</option>
                      <option>{t("home.b2b.m365")}</option>
                      <option>{t("home.b2b.server")}</option>
                      <option>{t("home.b2b.compliance")}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1d1d1f] mb-1">{t("home.b2b.contact_name")}</label>
                    <input type="text" name="contact" required placeholder="Mr. Zhang" className="w-full px-3 py-2 text-sm bg-[#f5f5f7] border border-[#d2d2d7] rounded-lg focus:outline-none focus:border-[#7c3aed] transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1d1d1f] mb-1">{t("home.b2b.phone")}</label>
                    <input type="text" name="phone" required placeholder="manager@company.com" className="w-full px-3 py-2 text-sm bg-[#f5f5f7] border border-[#d2d2d7] rounded-lg focus:outline-none focus:border-[#7c3aed] transition" />
                  </div>
                </div>

                <div>
                  <button type="submit" className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-bold py-3.5 rounded-lg transition shadow-lg shadow-blue-500/10">
                    Get Free Custom Quote
                  </button>
                </div>
                <p className="text-[10px] text-center text-[#86868b] mt-3">🔒 Your privacy is protected by GDPR and Chinese data protection laws. Never shared with third parties.</p>
              </form>
            </div>

          </div>
        </div>
      </section>

      {}
      {/* Compare Section */}
      <section id="compare" className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <p className="text-xs font-semibold text-[#7c3aed] tracking-wider uppercase mb-2">{t("home.compare.title")}</p>
            <h2  className="text-3xl font-bold tracking-tight text-[#1d1d1f]">{t("home.compare.subtitle")}</h2>
            <p className="text-sm text-[#86868b] mt-3">Compare editions to find the most cost-effective option.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#e8e8ed] shadow-sm">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-[#f5f5f7] border-b border-[#e8e8ed]">
                  <th className="p-6 text-sm font-semibold text-[#1d1d1f] w-1/4">{t("home.compare.dimension")}</th>
                  <th className="p-6 text-sm font-semibold text-[#1d1d1f] w-1/4">{t("home.compare.retail")}</th>
                  <th className="p-6 text-sm font-semibold text-[#1d1d1f] w-1/4">{t("home.compare.smb")}</th>
                  <th className="p-6 text-sm font-semibold text-[#1d1d1f] w-1/4">{t("home.compare.enterprise")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f5f7] text-xs text-[#1d1d1f]/80">
                <tr>
                  <td className="p-6 font-semibold text-[#1d1d1f] text-sm">{t("home.compare.features")}</td>
                  <td className="p-6">{t("home.compare.lowest_price")}</td>
                  <td className="p-6">{t("home.compare.retail_desc")}</td>
                  <td className="p-6">{t("home.compare.smb_desc")}</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-[#1d1d1f] text-sm">{t("home.compare.ownership")}</td>
                  <td className="p-6">{t("home.compare.retail_ownership")}</td>
                  <td className="p-6">{t("home.compare.smb_ownership")}</td>
                  <td className="p-6">{t("home.compare.enterprise_ownership")}</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-[#1d1d1f] text-sm">{t("home.compare.reinstall")}</td>
                  <td className="p-6"><span className="text-green-600 font-semibold">✓ Full Support</span> (Unlimited)</td>
                  <td className="p-6"><span className="text-green-600 font-semibold">✓ Full Support</span> (Unbind anytime)</td>
                  <td className="p-6"><span className="text-green-600 font-semibold">✓ Full Support</span> (Silent auto-reactivation)</td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-[#1d1d1f] text-sm">SAM Audit Support</td>
                  <td className="p-6">✓ Personal asset compliance</td>
                  <td className="p-6"><span className="text-green-600 font-semibold">✓ Full compliance pass</span></td>
                  <td className="p-6"><span className="text-green-600 font-semibold">✓ Premium compliance guarantee</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {}
      {/* Support & FAQ Section */}
      <section id="support" className="py-20 bg-[#f5f5f7]">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <span className="text-xs font-semibold text-[#7c3aed] tracking-wider uppercase mb-2">{t("home.support.help_guides")}</span>
            <h2  className="text-3xl font-bold tracking-tight text-[#1d1d1f]">{t("home.support.tech_center")}</h2>
            <p className="text-sm text-[#86868b] mt-3">{t("home.b2b.self_service")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white v5-card-light rounded-2xl border border-[#e8e8ed] p-6">
              <div className="text-3xl mb-4">🔑</div>
              <h4 className="text-base font-bold mb-2">{t("home.support.activation_faq")}</h4>
              <p className="text-xs text-[#86868b] leading-relaxed mb-4">{t("home.support.activation_guide")}</p>
              <button onClick={() => scrollToSection('portal')} className="text-xs font-semibold text-[#7c3aed] hover:underline focus:outline-none text-left">Go to User Portal{' > '}</button>
            </div>
            <div className="bg-white v5-card-light rounded-2xl border border-[#e8e8ed] p-6">
              <div className="text-3xl mb-4">📦</div>
              <h4 className="text-base font-bold mb-2">{t("support.download_title")}</h4>
              <p className="text-xs text-[#86868b] leading-relaxed mb-4">{t("support.download_desc")}</p>
              <a href="https://setup.office.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#7c3aed] hover:underline">{t("home.support.activation_link")}{' > '}</a>
            </div>
            <div className="bg-white v5-card-light rounded-2xl border border-[#e8e8ed] p-6">
              <div className="text-3xl mb-4">📡</div>
              <h4 className="text-base font-bold mb-2">{t("support.server_title")}</h4>
              <p className="text-xs text-[#86868b] leading-relaxed mb-4">{t("support.server_desc")}</p>
              <button onClick={() => showToast("Our 24/7 tech team is ready. Apply below for compliance consultation.", "ℹ️")} className="text-xs font-semibold text-[#7c3aed] hover:underline text-left focus:outline-none">{t("home.support.contact_expert")} &gt;</button>
            </div>
          </div>

          {/* Interactive Collapsible FAQ */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#e8e8ed] p-8">
            <h3 className="text-lg font-bold mb-6 text-center text-[#1d1d1f]">🤔 Your Top Concerns About Genuine Software, Answered</h3>
            
            <div className="space-y-4 divide-y divide-[#f5f5f7]">
              
              <div className="pt-4 first:pt-0">
                <button 
                  onClick={() => toggleFAQ(1)} 
                  className="w-full flex items-center justify-between font-semibold text-sm text-[#1d1d1f] hover:text-[#7c3aed] focus:outline-none transition"
                >
                  <span>{t("faq.q1.question")}</span>
                  <span className={`transform transition-transform duration-200 text-xs ${openFaqId === 1 ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openFaqId === 1 && (
                  <p className="text-xs text-[#86868b] mt-3 leading-relaxed">
                    Absolutely genuine. We source Volume Licensing and CSP channel keys through Microsoft regional bulk agreements. Microsoft offers steep volume discounts, and we pass those savings to developers. All keys support Microsoft account binding and official ISO downloads — never unauthorized keys.
                  </p>
                )}
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => toggleFAQ(2)} 
                  className="w-full flex items-center justify-between font-semibold text-sm text-[#1d1d1f] hover:text-[#7c3aed] focus:outline-none transition"
                >
                  <span>Q2：After purchasing, can I still use the key after reinstalling or changing devices?</span>
                  <span className={`transform transition-transform duration-200 text-xs ${openFaqId === 2 ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openFaqId === 2 && (
                  <p className="text-xs text-[#86868b] mt-3 leading-relaxed">
                    Yes! Our Retail-grade keys support cloud binding to your Microsoft account. When reinstalling, simply click “I recently changed the hardware on this device”，for seamless reactivation.
                  </p>
                )}
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => toggleFAQ(3)} 
                  className="w-full flex items-center justify-between font-semibold text-sm text-[#1d1d1f] hover:text-[#7c3aed] focus:outline-none transition"
                >
                  <span>Q3：My company faces a compliance audit. Can these keys pass official SAM Audit?</span>
                  <span className={`transform transition-transform duration-200 text-xs ${openFaqId === 3 ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openFaqId === 3 && (
                  <p className="text-xs text-[#86868b] mt-3 leading-relaxed">
                    Yes! We provide enterprise procurement with Microsoft compliance statements and authorized receipts (invoices supported). Our compliance team offers one-on-one legal support throughout any audit.
                  </p>
                )}
              </div>

            </div>
          </div>
        </div>
     </section>

     {}
     {/* Deliver & Account Portal Section */}
      {/* Latest from Blog */}
      <section id="blog-preview" className={`py-20 bg-[#f5f5f7] ${heroPersona!=="retail"?"persona-hidden":""}`}>
        <div className="max-w-4xl px-4 mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-[#7c3aed] tracking-wider uppercase mb-2">{t("blog.section_label")}</span>
            <h2 className="text-3xl font-bold tracking-tight text-[#1d1d1f]">{t("home.blog.guides_resources")}</h2>
            <p className="text-sm text-[#86868b] mt-3 max-w-2xl mx-auto">{t("blog.section_desc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.length === 0 ? (
              <div className="md:col-span-3 text-center text-sm text-[#86868b] py-8">Loading latest articles...</div>
            ) : blogPosts.slice(0, 3).map(post => (
              <a key={post.id} href={post.link} className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
                <div className="p-5">
                  <h3 className="text-base font-semibold text-[#1d1d1f] group-hover:text-[#7c3aed] transition-colors mb-2 line-clamp-2">{stripTags(post.title.rendered)}</h3>
                  <div className="text-xs text-[#86868b] leading-relaxed line-clamp-3 mb-3">{stripTags(post.excerpt.rendered)}</div>
                  <span className="text-xs text-[#7c3aed] font-medium">{t("home.blog.read_more")}</span>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-[#7c3aed] hover:text-[#7c3aed] transition-colors">
              View All Articles
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>
        </div>
      </section>
      {}
      <section id="portal" className={`py-20 bg-white border-t border-[#e8e8ed] ${heroPersona!=="retail"?"persona-hidden":""}`}>
        <div className="max-w-4xl px-4 mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-[#7c3aed] tracking-wider uppercase mb-2">{t("portal.label")}</span>
            <h2  className="text-3xl font-bold tracking-tight text-[#1d1d1f]">{t("portal.title")}</h2>
            <p className="text-sm text-[#86868b] mt-2">{t("portal.desc")}</p>
          </div>

          <div className="bg-[#f5f5f7] rounded-3xl p-6 sm:p-10 border border-[#e8e8ed] shadow-sm">
            <div className="text-center py-10">
              <h4 className="text-sm font-bold text-[#1d1d1f] mb-2">{t("portal.title")}</h4>
              <p className="text-xs text-[#86868b] mb-4">{t("portal.desc")}</p>
              <button onClick={() => window.location.href="/account"} className="inline-block bg-[#7c3aed] text-white text-xs font-semibold px-5 py-2.5 rounded-xl border-none cursor-pointer hover:bg-[#6d28d9] transition">{t("account.signin")}</button>
            </div>
          </div>
        </div>
      </section>

      <section id="trusted-secure" className="py-14 bg-white border-t border-[#e8e8ed]">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#86868b]">Trusted &amp; Secure</span>
            <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mt-2">Payments and licenses you can rely on</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {TRUST_ITEMS.map((item, i) => (
              <div key={i} className="group bg-[#f5f5f7] rounded-2xl border border-[#e8e8ed] overflow-hidden transition hover:border-[#7c3aed]/40 hover:shadow-md">
                <div className="flex h-32 items-center justify-center bg-white border-b border-[#e8e8ed]">
                  {item.img ? (
                    <img src={item.img} alt={item.alt || item.title} loading="lazy" className="max-h-12 max-w-[130px] object-contain" />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl text-white" style={{ backgroundColor: item.bg || "#7c3aed" }}>
                      <TrustIcon type={String(item.icon || "")} />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-[#1d1d1f]">{item.title}</h3>
                  <p className="text-[11px] text-[#86868b] mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      {/* Deep-dark corporate footer */}

      {}


      {}


      

      


      {/* Global Interactive Notification Toast */}
      {toast.visible && <Portal>
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1d1d1f] text-white text-xs font-medium px-5 py-3.5 rounded-full shadow-2xl flex items-center space-x-2.5 border border-white/10 transition-all duration-300">
          <span>{toast.icon}</span>
          <span>{toast.message}</span>
        </div>
      </Portal>}

    </div>
  );
}
