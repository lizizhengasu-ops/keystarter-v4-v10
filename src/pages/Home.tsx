import React, { useState, useEffect, useRef } from 'react';
import { fetchProducts } from '../api/woocommerce';
import Portal from '../Portal';
import { useCart } from '../CartContext';
import { useTranslation } from 'react-i18next';
import { TESTIMONIALS } from '../data/testimonials';

// Custom lightweight inline SVG Icons representing Microsoft Core Brands
// To eliminate any external CDN load latency or render flickering.
const MicrosoftIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="11" height="11" fill="#F25022"/>
    <rect x="12" y="0" width="11" height="11" fill="#7FBA00"/>
    <rect x="0" y="12" width="11" height="11" fill="#00A4EF"/>
    <rect x="12" y="12" width="11" height="11" fill="#FFB900"/>
  </svg>
);

const WindowsIcon = ({ colorClass = "text-[#0078d4]" }) => (
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

const PREMIUM_SKUS = [
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

export default function App() {
  const { t } = useTranslation();
  const cart = useCart();
  const [apiProducts, setApiProducts] = useState(null);
  useEffect(() => { fetchProducts().then(setApiProducts).catch(function(e){console.warn("API fetch failed:",e)}); }, []);
const [activeTab, setActiveTab] = useState('all');
 const [openFaqId, setOpenFaqId] = useState(null);
 const [blogPosts, setBlogPosts] = useState([]);
  const [showOffer, setShowOffer] = useState(true);
  useEffect(() => { fetch("https://keys-starter.com/wp-json/wp/v2/posts?_embed&per_page=3").then(r=>r.json()).then(setBlogPosts).catch(()=>{}); }, []);
  
  // Simulated Licenses purchased in this session
  const [purchasedLicenses, setPurchasedLicenses] = useState([
    {
      id: 'demo-win',
      title: 'Windows 11 Professional Retail',
      licenseType: 'Account-Bound',
      key: 'W269N-WFGWX-YVC9B-4J6C9-T83GX',
      isOffice: false,
      link: 'https://www.microsoft.com/zh-cn/software-download/windows11'
    },
    {
      id: 'demo-office',
      title: 'Microsoft 365 Family Account',
      licenseType: '1-Year Subscription',
      key: 'Activated via official mail: customer-link-m365',
      isOffice: true,
      link: 'https://setup.office.com'
    }
  ]);

  // Checkout Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState({ title: '', price: 0 });
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [payMethod, setPayMethod] = useState(1);

  // Custom Toast State
  const [testimonials, setTestimonials] = useState([]);
  const [toast, setToast] = useState({ visible: false, message: '', icon: '🚀' });

  // Helper smooth scrolling for single page navigation
  const scrollToSection = (id) => {
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

  const showToast = (message, icon = "🚀") => {
    setToast({ visible: true, message, icon });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4000);
  };

  const toggleFAQ = (id) => {
    setOpenFaqId(prevId => (prevId === id ? null : id));
  };

  const copyToClipboard = (text) => {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    try {
      document.execCommand('copy');
      showToast("License key copied! Go activate now!", "🟢");
    } catch (err) {
      showToast("Copy failed, please select and copy manually.", "🔴");
    }
    document.body.removeChild(tempTextArea);
  };

  const openCheckoutDrawer = (productName, price) => {
    setCheckoutProduct({ title: productName, price });
    setIsDrawerOpen(true);
  };

  const closeCheckoutDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handlePurchase = (e) => {
    e.preventDefault();
    if (!checkoutEmail || !checkoutEmail.includes('@')) {
      showToast("Please enter a valid email to receive the license key.", "⚠️");
      return;
    }

    closeCheckoutDrawer();

    const isOfficeProduct = checkoutProduct.title.includes('Office') || checkoutProduct.title.includes('365');
    const mockKey = isOfficeProduct 
      ? 'M365F-ANNUAL-BIND-OK-KEY-' + Math.floor(10000 + Math.random() * 90000)
      : 'W11PR-OEM25-GENUINE-KEY-' + Math.floor(10000 + Math.random() * 90000);

    // Simulate order backend injection
    setTimeout(() => {
      const newLicense = {
        id: 'mock-' + Date.now(),
        title: checkoutProduct.title,
        licenseType: 'Official Genuine License',
        key: mockKey,
        isOffice: isOfficeProduct,
        link: isOfficeProduct ? 'https://setup.office.com' : 'https://www.microsoft.com/zh-cn/software-download/'
      };

      setPurchasedLicenses(prev => [newLicense, ...prev]);
      showToast(`Simulated dispatch [${checkoutProduct.title}] License Key!`, "🟢");
      scrollToSection('portal');
    }, 500);
  };

  const handleB2BSubmit = (e) => {
    e.preventDefault();
    showToast("Quote submitted! A specialist will email you shortly.", "🔵");
    e.target.reset();
  };

  const simulateDirectOrder = (productName, isOffice, key) => {
    const newLicense = {
      id: 'sim-' + Date.now(),
      title: productName,
      licenseType: 'Official Genuine License',
      key: key,
      isOffice: isOffice,
      link: isOffice ? 'https://setup.office.com' : 'https://www.microsoft.com/zh-cn/software-download/'
    };
    setPurchasedLicenses(prev => [newLicense, ...prev]);
    showToast(`Success! Simulated dispatch [${productName}] License Key!`, "🟢");
    scrollToSection('portal');
  };

  // Filtered SKUs
  const getLiveData = (sku) => {
    if (!apiProducts) return sku;
    const live = apiProducts.find(p => p.name === sku.title);
    if (!live) return sku;
    return { ...sku, price: live.price, originalPrice: live.regular_price };
  };

const SPECIAL_OFFER_IDS = ['windows-11-pro','windows-10-pro','windows-11-home','windows-10-home','office-2019-pro-plus','office-2021-pro-plus'];
const specialOfferSkus = PREMIUM_SKUS.filter(s => SPECIAL_OFFER_IDS.includes(s.id));
const filteredSkus = PREMIUM_SKUS.filter(sku => 
    activeTab === 'all' || sku.category === activeTab
  );

  useEffect(() => {
    var pids = [13, 14, 19, 16, 22];
    var all = [];
    var loaded = 0;
    pids.forEach(function(id) {
      fetch('/wp-json/keystarter/v1/reviews/' + id)
        .then(function(r) { return r.json(); })
        .then(function(revs) {
          all = all.concat(revs);
          loaded++;
          if (loaded === pids.length) {
            all.sort(function() { return 0.5 - Math.random(); });
            setTestimonials(all.slice(0, 3));
          }
        });
    });
  }, []);

  return (
    <div className="overflow-x-hidden bg-[#f5f5f7] text-[#1d1d1f] antialiased font-sans">
      {showOffer && (
        <div className="relative bg-gradient-to-r from-[#0078d4] to-[#005a9e] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm">
              <span className="hidden sm:inline text-lg">🔥</span>
              <span className="font-semibold whitespace-nowrap">{t("home.offer.title")}</span>
              <span className="text-white/80">{t("home.offer.desc")}</span>
              <button onClick={() => scrollToSection("special-offer")} className="bg-white text-[#0078d4] text-xs font-bold px-4 py-1.5 rounded-full hover:bg-blue-50 transition flex-shrink-0">{t("home.offer.cta")}</button>
            </div>
            <button onClick={() => setShowOffer(false)} className="text-white/50 hover:text-white transition ml-2 flex-shrink-0" aria-label={t("home.offer.dismiss")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Navigation Bar */}

      {}
      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 overflow-hidden bg-white">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-green-300/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl px-4 mx-auto text-center">
          <p className="text-xs font-semibold text-[#86868b] tracking-wider uppercase mb-3">{t("hero.title")}</p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-[#1d1d1f] mb-6 leading-tight">
            {t('home.hero.headline')}
          </h1>
          <p className="text-lg sm:text-xl text-[#86868b] font-normal mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('hero.desc')}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 mb-16 sm:flex-row">
            <button 
              onClick={() => scrollToSection('store')} 
              className="w-full sm:w-auto bg-[#0078d4] hover:bg-[#0062b1] text-white font-medium px-8 py-3 rounded-full transition shadow-lg shadow-blue-500/10 text-center"
            >
              {t('hero.cta')}
            </button>
            <button 
              onClick={() => scrollToSection('business')} 
              className="w-full sm:w-auto border border-[#d2d2d7] hover:bg-[#f5f5f7] text-[#1d1d1f] font-medium px-8 py-3 rounded-full transition text-center"
            >
              {t('hero.enterprise')} <span className="ml-1 text-xs">{" > "}</span>
            </button>
          </div>

          {/* Core Trust anchors */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#f5f5f7]">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold md:text-3xl text-[#1d1d1f]">10 Min</span>
              <span className="text-xs text-[#86868b] mt-1">{t("hero.trust.delivery")}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold md:text-3xl text-[#1d1d1f]">98.7%</span>
              <span className="text-xs text-[#86868b] mt-1">{t("hero.trust.satisfaction")}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold md:text-3xl text-[#1d1d1f]">50K+</span>
              <span className="text-xs text-[#86868b] mt-1">{t("hero.trust.activation")}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold md:text-3xl text-[#1d1d1f]">100%</span>
              <span className="text-xs text-[#86868b] mt-1">{t("hero.trust.verification")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section id="testimonials" className="py-12 bg-white border-b border-[#f5f5f7] overflow-hidden">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-[#0078d4] tracking-wider uppercase">Why Our Customers Trust Us</span>
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
      <section id="special-offer" className="py-16 bg-gradient-to-b from-[#ff6b35]/5 to-[#f5f5f7]">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-8 text-center">
            <span className="inline-block text-[10px] font-bold bg-[#ff6b35] text-white px-3 py-1 rounded-full uppercase tracking-wider mb-3">Limited Time</span>
            <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">{t("home.offer.section_title")}</h2>
            <p className="text-sm text-[#86868b] mt-1">{t("home.offer.section_desc")}</p>
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
                  <div className="flex items-center space-x-3.5 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-orange-50 rounded-xl border border-orange-100">{sku.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold text-[#1d1d1f]">{sku.title}</h3>
                      <p className="text-xs text-[#86868b]">{sku.subtitle}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6 text-xs text-[#1d1d1f]/80 border-t border-[#f5f5f7] pt-4">
                    {sku.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2"><span className="text-green-500 mt-0.5">{String.fromCharCode(0x2713)}</span><span>{feat}</span></li>
                    ))}
                  </ul>
                </div>
               <div className="border-t border-[#f5f5f7] pt-4 mt-auto">
                  <div className="flex items-baseline justify-between mb-4">
                   <div>
                      <span className="text-2xl font-extrabold text-[#ff6b35]">{String.fromCharCode(0x0024)}{sku.price}</span>
                      <span className="text-xs text-[#86868b] line-through ml-1.5">{String.fromCharCode(0x0024)}{sku.originalPrice}</span>
                     <span className="text-[10px] font-semibold text-orange-600 ml-2">Special Offer</span>
                   </div>
                 </div>
                  <div className="flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); cart.add({slug: sku.id, name: sku.title, price: sku.price}); }}
                      className="flex-1 border-2 border-[#ff6b35] text-[#ff6b35] hover:bg-orange-50 text-xs font-semibold py-2.5 rounded-xl transition">
                      {t('product.add_to_cart', 'Add to Cart')}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); cart.add({slug: sku.id, name: sku.title, price: sku.price}); window.location.href='/cart'; }}
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

      <section id="store" className="py-20 bg-[#f5f5f7]">
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
                      ⚡ {t('home.sku.'+sku.id.replace(/-/g,'')+'.tag', sku.tag)}
                    </span>
                    <span className="text-xs text-[#86868b]">{t('home.sku.'+sku.id.replace(/-/g,'')+'.type', sku.type)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3.5 mb-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl border ${SPECIAL_OFFER_IDS.includes(sku.id)?"bg-orange-50 border-orange-100":"bg-gray-50 border-gray-100"}`}>
                      {sku.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#1d1d1f]">{sku.title}</h3>
                      <p className="text-xs text-[#86868b]">{t('home.sku.'+sku.id.replace(/-/g,'')+'.subtitle', sku.subtitle)}</p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6 text-xs text-[#1d1d1f]/80 border-t border-[#f5f5f7] pt-4">
                    {sku.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-green-500 font-bold">✓</span>
                        <span>{t('home.sku.'+sku.id.replace(/-/g,'')+'.f'+(idx+1), feat)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-2xl font-extrabold text-[#1d1d1f]">${getLiveData(sku).price}</span>
                      <span className="text-xs text-[#86868b] line-through ml-1.5">${getLiveData(sku).originalPrice}</span>
                    </div>
                    {sku.auditInfo && (
                      <span className="text-[11px] text-[#0078d4] font-medium">✓ {t('home.sku.'+sku.id.replace(/-/g,'')+'.audit', sku.auditInfo)}</span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); cart.add({slug: sku.id, name: sku.title, price: getLiveData(sku).price}); }} 
                      className="flex-1 border-2 border-[#0078d4] text-[#0078d4] hover:bg-blue-50 text-xs font-semibold py-2.5 rounded-xl transition"
                    >
                      {t('product.add_to_cart', 'Add to Cart')}
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); cart.add({slug: sku.id, name: sku.title, price: getLiveData(sku).price});window.location.href='/cart';}} 
                      className="flex-1 bg-[#0078d4] hover:bg-[#0062b1] text-white text-xs font-semibold py-2.5 rounded-xl transition"
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
      <section id="business" className="relative py-24 bg-[#161617] text-white overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
            
            {/* Business value propositions */}
            <div>
              <span className="text-[#0078d4] text-xs font-bold tracking-wider uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                Enterprise B2B Compliance
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-6 mb-6 leading-tight">
                Enterprise Compliance & {t("home.compare.audit")}
              </h2>
              <p className="text-sm text-[#86868b] leading-relaxed mb-8">
                When facing a Microsoft SAM Audit, opaque procurement chains put enterprises at risk. We provide Volume Licensing certificates and genuine keys for 100% compliance at low cost, avoiding legal penalties.
              </p>

              <div className="space-y-4">
                <div className="flex space-x-4 v5-card-light bg-white/5 p-4 rounded-xl border border-white/10 hover:border-blue-500/40 transition duration-300">
                  <div className="text-[#0078d4] text-xl pt-0.5">🛡️</div>
                  <div>
                    <h4  className="text-sm font-semibold">100% Official Compliance Verified</h4>
                    <p className="text-xs text-[#86868b] mt-1">{t("home.compare.enterprise_desc")}</p>
                  </div>
                </div>
                <div className="flex space-x-4 v5-card-light bg-white/5 p-4 rounded-xl border border-white/10 hover:border-blue-500/40 transition duration-300">
                  <div className="text-[#34c759] text-xl pt-0.5">💰</div>
                  <div>
                    <h4  className="text-sm font-semibold">Volume Pricing Discounts (Up to 70% Off)</h4>
                    <p className="text-xs text-[#86868b] mt-1">Supports 5+ accounts with no minimum order. Flexible CSP licensing for enterprise cloud migration.</p>
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
                  <input type="text" required placeholder="e.g. TechCorp Solutions Ltd." className="w-full px-3 py-2 text-sm bg-[#f5f5f7] border border-[#d2d2d7] rounded-lg focus:outline-none focus:border-[#0078d4] transition" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#1d1d1f] mb-1">{t("home.b2b.employees")}</label>
                    <select className="w-full px-3 py-2 text-sm bg-[#f5f5f7] border border-[#d2d2d7] rounded-lg focus:outline-none focus:border-[#0078d4] transition">
                      <option>5 - 20 Units</option>
                      <option>21 - 50 Units</option>
                      <option>51 - 100 Units</option>
                      <option>100+ Units</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1d1d1f] mb-1">{t("home.b2b.needs")}</label>
                    <select className="w-full px-3 py-2 text-sm bg-[#f5f5f7] border border-[#d2d2d7] rounded-lg focus:outline-none focus:border-[#0078d4] transition">
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
                    <input type="text" required placeholder="Mr. Zhang" className="w-full px-3 py-2 text-sm bg-[#f5f5f7] border border-[#d2d2d7] rounded-lg focus:outline-none focus:border-[#0078d4] transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1d1d1f] mb-1">{t("home.b2b.phone")}</label>
                    <input type="text" required placeholder="manager@company.com" className="w-full px-3 py-2 text-sm bg-[#f5f5f7] border border-[#d2d2d7] rounded-lg focus:outline-none focus:border-[#0078d4] transition" />
                  </div>
                </div>

                <div>
                  <button type="submit" className="w-full bg-[#0078d4] hover:bg-[#0062b1] text-white text-xs font-bold py-3.5 rounded-lg transition shadow-lg shadow-blue-500/10">
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
            <p className="text-xs font-semibold text-[#0078d4] tracking-wider uppercase mb-2">{t("home.compare.title")}</p>
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
            <span className="text-xs font-semibold text-[#0078d4] tracking-wider uppercase mb-2">{t("home.support.help_guides")}</span>
            <h2  className="text-3xl font-bold tracking-tight text-[#1d1d1f]">{t("home.support.tech_center")}</h2>
            <p className="text-sm text-[#86868b] mt-3">{t("home.b2b.self_service")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white v5-card-light rounded-2xl border border-[#e8e8ed] p-6">
              <div className="text-3xl mb-4">🔑</div>
              <h4 className="text-base font-bold mb-2">{t("home.support.activation_faq")}</h4>
              <p className="text-xs text-[#86868b] leading-relaxed mb-4">{t("home.support.activation_guide")}</p>
              <button onClick={() => scrollToSection('portal')} className="text-xs font-semibold text-[#0078d4] hover:underline focus:outline-none text-left">Go to User Portal{' > '}</button>
            </div>
            <div className="bg-white v5-card-light rounded-2xl border border-[#e8e8ed] p-6">
              <div className="text-3xl mb-4">📦</div>
              <h4 className="text-base font-bold mb-2">{t("support.download_title")}</h4>
              <p className="text-xs text-[#86868b] leading-relaxed mb-4">{t("support.download_desc")}</p>
              <a href="https://setup.office.com" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-[#0078d4] hover:underline">Go to Microsoft Activation Site{' > '}</a>
            </div>
            <div className="bg-white v5-card-light rounded-2xl border border-[#e8e8ed] p-6">
              <div className="text-3xl mb-4">📡</div>
              <h4 className="text-base font-bold mb-2">{t("support.server_title")}</h4>
              <p className="text-xs text-[#86868b] leading-relaxed mb-4">{t("support.server_desc")}</p>
              <button onClick={() => showToast("Our 24/7 tech team is ready. Apply below for compliance consultation.", "ℹ️")} className="text-xs font-semibold text-[#0078d4] hover:underline text-left focus:outline-none">{t("home.support.contact_expert")} &gt;</button>
            </div>
          </div>

          {/* Interactive Collapsible FAQ */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#e8e8ed] p-8">
            <h3 className="text-lg font-bold mb-6 text-center text-[#1d1d1f]">🤔 Your Top Concerns About Genuine Software, Answered</h3>
            
            <div className="space-y-4 divide-y divide-[#f5f5f7]">
              
              <div className="pt-4 first:pt-0">
                <button 
                  onClick={() => toggleFAQ(1)} 
                  className="w-full flex items-center justify-between font-semibold text-sm text-[#1d1d1f] hover:text-[#0078d4] focus:outline-none transition"
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
                  className="w-full flex items-center justify-between font-semibold text-sm text-[#1d1d1f] hover:text-[#0078d4] focus:outline-none transition"
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
                  className="w-full flex items-center justify-between font-semibold text-sm text-[#1d1d1f] hover:text-[#0078d4] focus:outline-none transition"
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
      <section id="blog-preview" className="py-20 bg-[#f5f5f7]">
        <div className="max-w-4xl px-4 mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-[#0078d4] tracking-wider uppercase mb-2">{t("blog.section_label")}</span>
            <h2 className="text-3xl font-bold tracking-tight text-[#1d1d1f]">{t("home.blog.guides_resources")}</h2>
            <p className="text-sm text-[#86868b] mt-3 max-w-2xl mx-auto">{t("blog.section_desc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.length === 0 ? (
              <div className="md:col-span-3 text-center text-sm text-[#86868b] py-8">Loading latest articles...</div>
            ) : blogPosts.slice(0, 3).map(post => (
              <a key={post.id} href={post.link} className="block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
                <div className="p-5">
                  <h3 className="text-base font-semibold text-[#1d1d1f] group-hover:text-[#0078d4] transition-colors mb-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  <div className="text-xs text-[#86868b] leading-relaxed line-clamp-3 mb-3" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                  <span className="text-xs text-[#0078d4] font-medium">{t("home.blog.read_more")}</span>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-[#0078d4] hover:text-[#005a9e] transition-colors">
              View All Articles
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>
        </div>
      </section>
      {}
      <section id="portal" className="py-20 bg-white border-t border-[#e8e8ed]">
        <div className="max-w-4xl px-4 mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-[#0078d4] tracking-wider uppercase mb-2">{t("portal.label")}</span>
            <h2  className="text-3xl font-bold tracking-tight text-[#1d1d1f]">{t("portal.title")}</h2>
            <p className="text-sm text-[#86868b] mt-2">{t("portal.desc")}</p>
          </div>

          <div className="bg-[#f5f5f7] rounded-3xl p-6 sm:p-10 border border-[#e8e8ed] shadow-sm">
            <div className="flex flex-col items-center justify-between gap-4 pb-6 mb-8 border-b border-[#e8e8ed] sm:flex-row">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 text-lg font-bold bg-gray-200 rounded-full border border-gray-300 text-[#1d1d1f]">
                  U
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1d1d1f]">{t("portal.demo_name")}</h4>
                  <p className="text-xs text-[#86868b]">Email: trial-buyer@keystarter.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-green-100 text-green-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-green-200">
                  ● Account Status: Active
                </span>
              </div>
            </div>

            <h4 className="text-xs font-bold text-[#86868b] uppercase tracking-wider mb-4">{t("portal.licenses_title")}</h4>
            
            <div className="space-y-4">
              {purchasedLicenses.map((lic) => (
                <div 
                  key={lic.id} 
                  className="v5-card-light bg-white p-5 rounded-2xl border border-[#e8e8ed] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-blue-500/30 transition shadow-sm"
                >
                  <div className="flex items-start space-x-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border mt-1 md:mt-0 ${lic.isOffice ? 'bg-red-50 border-red-100' : 'bg-blue-50 border-blue-100'}`}>
                      {lic.isOffice ? <OfficeIcon /> : <WindowsIcon />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-[#1d1d1f]">{lic.title}</span>
                        <span className={`text-[10px] font-semibold px-2 rounded ${lic.isOffice ? 'bg-red-50 text-[#f25022]' : 'bg-blue-50 text-[#0078d4]'}`}>
                          {lic.licenseType}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs font-mono text-gray-500 bg-gray-50 px-2 py-0.5 rounded">{lic.key}</span>
                        <button 
                          onClick={() => copyToClipboard(lic.key)} 
                          className="text-blue-500 hover:text-blue-700 text-xs transition focus:outline-none"
                        >
                          Copy All
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-auto">
                    <a 
                      href={lic.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block text-center bg-[#f5f5f7] hover:bg-[#e8e8ed] text-xs font-semibold text-[#1d1d1f] px-4 py-2.5 rounded-lg border border-[#d2d2d7] transition whitespace-nowrap"
                    >
                      Go to Official Download &gt;
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated Live Generation controls for Sandbox testing */}
            <div className="mt-8 bg-blue-50/50 p-6 rounded-2xl border border-blue-100 text-center">
              <h5 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2">🎁 Interactive: Self-Service Simulated Payment & Activation</h5>
              <p className="text-xs text-blue-700 max-w-lg mx-auto mb-4">
                Click below to simulate purchasing any Microsoft activation key. The system will auto-dispatch it to your account card above. Try it now!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => simulateDirectOrder('Windows 11 Home', false, 'TX9XD-98N7V-6WMQ6-BX7FG-H8Q99')} 
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow"
                >
                  Simulate Get Windows 11 Key
                </button>
                <button 
                  onClick={() => simulateDirectOrder('Office 2026 Pro Plus', true, 'T3N7V-8BYX2-6QBMQ-99FGH-73GX9')} 
                  className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow"
                >
                  Simulate Get Office 2026 Key
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {}
      {/* Deep-dark corporate footer */}

      {}
      {/* Checkout side drawer with pure React state binding */}
      {isDrawerOpen && <Portal>
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 transition-opacity duration-300" onClick={closeCheckoutDrawer}></div>
          
          <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-md bg-white border-l border-[#e8e8ed] shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out">
              
              {/* Header */}
              <div className="p-6 border-b border-[#e8e8ed]">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#1d1d1f]">🔒 Secure Checkout & Activation Delivery</h3>
                  <button onClick={closeCheckoutDrawer} className="text-gray-400 hover:text-gray-500 text-lg">×</button>
                </div>
                <p className="text-xs text-[#86868b] mt-1">After completing payment, your genuine license will be delivered to the fulfillment center within 5 minutes.</p>
              </div>

              {/* Form Content */}
              <form onSubmit={handlePurchase} className="flex-1 overflow-y-auto p-6 space-y-6">
                
                <div className="bg-[#f5f5f7] p-4 rounded-xl border border-[#e8e8ed]">
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{t("home.drawer.selected")}</span>
                  <h4 className="text-base font-bold mt-1 text-[#1d1d1f]">{checkoutProduct.title}</h4>
                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-xl font-bold text-[#0078d4]">${checkoutProduct.price}</span>
                    <span className="text-xs text-green-600">✓ Global Instant Delivery</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#1d1d1f]">{t("home.drawer.email_label")}</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="example@gmail.com" 
                    value={checkoutEmail}
                    onChange={(e) => setCheckoutEmail(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-[#f5f5f7] border border-[#d2d2d7] rounded-lg focus:outline-none focus:border-[#0078d4] transition" 
                  />
                  <p className="text-[10px] text-gray-400">We will register an auto-delivery account with this email for key retrieval anytime.</p>
                </div>

                {/* Simulated Payment select */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-[#1d1d1f]">{t("home.drawer.payment_label")}</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div 
                      onClick={() => setPayMethod(1)} 
                      className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition ${payMethod === 1 ? 'border-[#0078d4] bg-blue-50/25' : 'border-[#e8e8ed]'}`}
                    >
                      <span className="text-xs font-semibold">PayPal</span>
                      <span className="text-xs text-blue-600">{payMethod === 1 ? '●' : '○'}</span>
                    </div>
                    <div 
                      onClick={() => setPayMethod(2)} 
                      className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition ${payMethod === 2 ? 'border-[#0078d4] bg-blue-50/25' : 'border-[#e8e8ed]'}`}
                    >
                      <span className="text-xs font-semibold">Stripe</span>
                      <span className="text-xs text-gray-600">{payMethod === 2 ? '●' : '○'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-[#e8e8ed] space-y-2">
                  <div className="flex items-center text-[10px] text-[#86868b] gap-2">
                    <span className="text-green-500">✓</span> Supports official MSA account binding
                  </div>
                  <div className="flex items-center text-[10px] text-[#86868b] gap-2">
                    <span className="text-green-500">✓</span> 7-Day Money-Back Guarantee (No activation failure risk)
                  </div>
                  <div className="flex items-center text-[10px] text-[#86868b] gap-2">
                    <span className="text-green-500">✓</span> 256-bit SSL certificate chain encryption
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="w-full bg-[#0078d4] hover:bg-[#0062b1] text-white text-xs font-bold py-4 rounded-xl transition flex items-center justify-center space-x-1 shadow-lg shadow-blue-500/10"
                  >
                    <span>💳 Complete Simulated Payment</span>
                  </button>
                  <p className="text-[10px] text-center text-gray-400 mt-2">{t("home.drawer.payment_click")}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Portal>}

      {}

          {testimonials.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold text-center mb-4">{t("testimonial.title")}</h2>
            <p className="text-sm text-[#86868b] text-center mb-10 max-w-xl mx-auto">{t("testimonial.desc")}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map(function(t, i) {
                var stars = "";
                for (var s = 0; s < 5; s++) stars += s < t.rating ? String.fromCharCode(9733) : String.fromCharCode(9734);
                return (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-[#e8e8ed] shadow-sm">
                    <div className="text-yellow-500 text-sm mb-3">{stars}</div>
                    <div className="text-xs text-[#86868b] italic mb-3">{"\u201c"}{t.text}{"\u201d"}</div>
                    <div className="text-xs font-semibold text-[#1d1d1f]">- {t.author}</div>
                  </div>
                );
              })}
            </div>
          </section>
          )}

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
