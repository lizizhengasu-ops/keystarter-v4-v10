import {useParams, Link} from "react-router-dom";
import {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {fetchProduct} from "../api/woocommerce";
import type {SPAProduct} from "../api/woocommerce";
import { api } from "../site-config";
import { products } from "../data/products";
import { useCart } from "../data/CartContext";
import { PRODUCT_DETAILS } from "../data/product-details";
import { PRODUCT_SEO_SECTIONS, SEO_H1_OVERRIDES } from "../data/product-seo-sections";
import { PRODUCT_IMAGES } from "../data/product-images";
import { GENERIC_FAQS, FAQ_BY_SERIES } from "../data/faq";
import { COMPARISON_GROUPS, COMPARISON_MAP, FAQ_SERIES_MAP } from "../data/product-comparison";
import { ProductComparison } from "../components/ProductComparison";
import { ProductFAQ } from "../components/ProductFAQ";
import { ProductReviews } from "../components/ProductReviews";
import { QuickAnswer } from "../components/QuickAnswer";
import { pushEvent } from "../tracking";
import ReviewForm from "../components/ReviewForm";
import { getWooId } from "../data/woo-ids";

const SECOND_IMAGE_SLUGS = new Set([
  "win-11-iot-2024-entry",
  "win-11-iot-ml-entry",
  "win-svr-iot-2025",
  "win-11-iot-ml-high-end",
  "win-11-iot-ml-value",
  "win-11-iot-2024-high-end",
  "win-11-iot-2024-value",
]);

// License-type transparency (AEO trust requirement): what the buyer gets and
// what the license cannot do, stated per product type instead of vague wording.
function licenseTypeFor(type: string): { label: string; summary: string; can: string[]; cannot: string[] } {
  if (type === "Microsoft Direct OEM" || type === "OEM") {
    return {
      label: "OEM (Original Equipment Manufacturer) License",
      summary: "An OEM license is sold per device, activates for the lifetime of that device, and receives official Windows/Office updates. It is sourced through authorized Microsoft partner channels.",
      can: ["Activate 1 PC for its lifetime", "Receive official security and feature updates", "Reinstall on the same device as often as needed"],
      cannot: ["Be moved to a different PC after activation", "Be resold or transferred after activation"],
    };
  }
  if (type === "Perpetual License") {
    return {
      label: "Perpetual (One-Time Purchase) License",
      summary: "A perpetual license is a one-time purchase with no subscription or recurring fees. It activates one device for life and includes security updates.",
      can: ["Activate 1 PC with no subscription", "Use classic Office apps offline", "Receive security updates for the product lifecycle"],
      cannot: ["Be installed on more than 1 device", "Be used on macOS (Windows PC only)"],
    };
  }
  if (type === "Enterprise IoT") {
    return {
      label: "Volume-Channel IoT Enterprise License",
      summary: "Windows IoT Enterprise licenses are distributed through volume channels for commercial embedded devices. LTSC editions carry a 10-year servicing lifecycle.",
      can: ["Activate 1 commercial/embedded device", "Run LTSC with 10 years of support (LTSC editions)", "Deploy in commercial products (kiosks, ATMs, medical devices)"],
      cannot: ["Be used as a general desktop OS for office staff", "Be moved freely between devices (device-bound activation)"],
    };
  }
  return {
    label: "Volume-Channel Enterprise License",
    summary: "Server and SQL runtime licenses are delivered through volume channels for business server workloads, licensed per 16-core minimum (2 processors) or as runtime editions bundled with an application.",
    can: ["License up to 16 cores (2 physical processors)", "Run in virtualized environments", "Include compliance documentation for audits"],
    cannot: ["Cover additional cores without supplementary licenses", "Be used on end-user desktops"],
  };
}

const ACTIVATION_STEPS = [
  "Activate fails or shows an error code? First confirm you installed from the official Microsoft ISO/installer linked in your delivery email — unofficial media is the most common cause.",
  "Still failing? Contact support with your order number and the exact error message. Our team responds within 24 hours (priority channel for enterprise orders).",
  "If the key cannot be activated through no fault of yours, we replace it free of charge — or refund you within 14 days of purchase.",
];

// Related-guide internal links by product family (P1 #8). All targets verified
// live-200 on 2026-09-15. Plain <a> on purpose: /guide/* and /compare/* are
// edge-served pages outside the SPA route table.
const GUIDE_FAMILY: { match: (slug: string) => boolean; guides: { href: string; title: string; desc: string }[] }[] = [
  {
    match: (s) => /^windows-1[01]-(pro|home)(-official)?$/.test(s),
    guides: [
      { href: "/blog/windows-11-pro-key-buying-guide-2026", title: "How to Buy a Windows 11 Pro Key in 2026", desc: "Prices, risks and how to spot a safe seller" },
      { href: "/blog/how-to-activate-windows-11", title: "How to Activate Windows 11", desc: "Step-by-step activation with a product key" },
      { href: "/blog/windows-11-pro-vs-home-which-one-do-you-need", title: "Windows 11 Pro vs Home", desc: "Which edition fits your PC" },
      { href: "/compare/windows-11-pro-vs-home", title: "Pro vs Home Comparison Table", desc: "Feature-by-feature breakdown" },
      { href: "/blog/best-windows-license-buying-guide-2026", title: "Best Windows License Buying Guide", desc: "OEM, retail and volume licensing explained" },
      { href: "/guide/activate-windows-error-codes", title: "Windows Activation Error Codes", desc: "Fixes for 0xC004F074 and other codes" },
    ],
  },
  {
    match: (s) => /^win-1[01]-iot/.test(s),
    guides: [
      { href: "/blog/windows-iot-enterprise-vs-windows-11-pro", title: "IoT Enterprise vs Windows 11 Pro", desc: "Which license fits your devices" },
      { href: "/compare/windows-iot-enterprise-vs-windows-11-pro", title: "IoT vs Pro Comparison Table", desc: "Lifecycle and licensing side by side" },
      { href: "/blog/windows-iot-licensing-models-oem-vs-volume", title: "IoT Licensing Models", desc: "OEM vs volume for embedded fleets" },
      { href: "/blog/ltsc-vs-regular-windows", title: "LTSC vs Regular Windows", desc: "Long-term servicing explained" },
    ],
  },
  {
    match: (s) => /^win-svr-|^sql-svr-/.test(s),
    guides: [
      { href: "/blog/windows-server-2022-licensing-explained", title: "Windows Server Licensing Explained", desc: "Per-core rules made simple" },
      { href: "/blog/bulk-windows-licenses-business", title: "Bulk Licenses for Business", desc: "Volume purchasing playbook" },
      { href: "/blog/windows-iot-licensing-models-oem-vs-volume", title: "IoT Licensing Models", desc: "OEM vs volume licensing" },
      { href: "/b2b", title: "B2B & Bulk Inquiries", desc: "Get a volume quote from KeyStarter" },
    ],
  },
  {
    match: (s) => /^office-/.test(s),
    guides: [
      { href: "/guide/activate-office-troubleshooting", title: "Office Activation Troubleshooting", desc: "Fix unlicensed-product banners" },
      { href: "/blog/office-2026-vs-microsoft-365", title: "Office 2026 vs Microsoft 365", desc: "One-time license or subscription" },
      { href: "/guide/activate-office-2021", title: "Activate Office 2021 Pro Plus", desc: "Step-by-step 2021 activation guide" },
      { href: "/guide/activate-windows-error-codes", title: "Activation Error Code Fixes", desc: "0xC004F074 and common Office errors" },
      { href: "/blog/how-to-install-office-2026", title: "How to Install Office 2026", desc: "Download and setup walkthrough" },
      { href: "/guide/digital-license-vs-product-key", title: "Digital License vs Product Key", desc: "How each activation method works" },
    ],
  },
];

export default function ProductPage() {
  const {slug} = useParams();

  const {t, i18n} = useTranslation();
  const [product, setProduct] = useState<SPAProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, buyNow } = useCart();
const [reviews, setReviews] = useState([]);
  const [imgIdx, setImgIdx] = useState(0);
  const details = PRODUCT_DETAILS[slug || ""];
  const localProduct = slug ? products.find(p => p.slug === slug) : null;
  const displayProduct: SPAProduct | null = product || (localProduct ? {
    slug: localProduct.slug,
    name: localProduct.n,
    price: localProduct.p,
    regularPrice: 0,
    description: localProduct.d,
    specs: localProduct.specs,
    color: localProduct.c,
  } : null);
  const compGroup = COMPARISON_MAP[slug || ""] ? COMPARISON_GROUPS[COMPARISON_MAP[slug || ""]] : null;
  const sKey = FAQ_SERIES_MAP[slug || ""] || "";
  const allFaqs = [...(sKey ? (FAQ_BY_SERIES[sKey] || []) : []), ...GENERIC_FAQS];
  const relatedGuides = slug ? (GUIDE_FAMILY.find(f => f.match(slug))?.guides ?? []) : [];
  const seoSections = slug ? PRODUCT_SEO_SECTIONS[slug] : undefined;
  const h1Override = slug ? SEO_H1_OVERRIDES[slug] : undefined;
  // Pre-computed sub-columns (avoids Rolldown brace-nesting issue)
  const leftCol = details ? (
    <div>
      {details.features && (
      <div>
        <h2 className="text-base font-bold mb-3">Features</h2>
        <div className="grid grid-cols-1 gap-2">
          {details.features.map(function(f:string,i:number){return(
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#e8e8ed] shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#7c3aed]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span className="text-xs leading-relaxed text-[#1d1d1f]">{f}</span>
            </div>
          );})}
        </div>
      </div>
      )}
    </div>
  ) : null;

  const reqCol = details?.requirements ? (
    <div className="md:col-span-2 mt-8 pt-8 border-t border-[#e8e8ed]">
      <h2 className="text-base font-bold mb-3">System Requirements</h2>
      <div className="bg-[#f5f5f7] rounded-xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          {details.requirements.map(function(r:any,i:number){return(
            <div key={i} className="flex justify-between py-1.5 border-b border-[#e8e8ed] last:border-0 text-xs">
              <span className="text-[#6e6e73] font-medium">{r.l}</span>
              <span className="text-right">{r.v}</span>
            </div>
          );})}
        </div>
      </div>
    </div>
  ) : null;

  const rightCol = (
    <div>
      <div className="border-t-0 pt-0">
        <h2 className="text-base font-bold mb-4">{t("product.details")}</h2>
      {(displayProduct?.specs ? Object.entries(displayProduct.specs) : []).map((f:any,i:number) => (
          <div key={i} className="flex justify-between py-2 border-b border-[#f5f5f7] text-xs">
            <span className="text-[#6e6e73]">{Array.isArray(f) ? f[0] : f[0]}</span>
            <span className="font-medium">{Array.isArray(f) ? f[1] : f[1]}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t border-[#e8e8ed] pt-6">
        <h2 className="text-base font-bold mb-4">How It Works</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center"><div className="w-10 h-10 mx-auto rounded-full bg-[#7c3aed]/10 flex items-center justify-center mb-2"><span className="text-sm font-bold text-[#7c3aed]">1</span></div><div className="text-xs font-semibold mb-1">Purchase & Pay</div><div className="text-xs text-[#6e6e73]">Complete secure checkout via PayPal or Stripe</div></div>
          <div className="text-center"><div className="w-10 h-10 mx-auto rounded-full bg-[#7c3aed]/10 flex items-center justify-center mb-2"><span className="text-sm font-bold text-[#7c3aed]">2</span></div><div className="text-xs font-semibold mb-1">Receive Instantly</div><div className="text-xs text-[#6e6e73]">License key delivered to your email within minutes</div></div>
          <div className="text-center"><div className="w-10 h-10 mx-auto rounded-full bg-[#7c3aed]/10 flex items-center justify-center mb-2"><span className="text-sm font-bold text-[#7c3aed]">3</span></div><div className="text-xs font-semibold mb-1">Activate & Enjoy</div><div className="text-xs text-[#6e6e73]">Follow email instructions to activate your license</div></div>
        </div>
      </div>
    </div>
  );

  const descBlock = (
    <div className="mb-6">
      <p className="text-sm text-[#6e6e73]">{details ? details.desc : displayProduct?.description?.substring(0,150)}</p>
      {details && details.tags && details.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {details.tags.map(function(tag:string,i:number){return(
            <span key={i} className="bg-[#7c3aed]/10 text-[#7c3aed] rounded-full px-2.5 py-1 text-xs font-medium">{tag}</span>
          );})}
        </div>
      )}
    </div>
  );

  const productImage = PRODUCT_IMAGES[slug || ""] || "";
  const galleryImages: string[] = [];
  if (productImage) galleryImages.push(productImage);
  if (productImage && SECOND_IMAGE_SLUGS.has(slug || "")) galleryImages.push("/assets/images/retail-box-verify.webp");
  const imageBlock = galleryImages.length > 0 ? (
    <div>
      <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[#e8e8ed] flex items-center justify-center">
        <img src={galleryImages[imgIdx] || galleryImages[0]} alt={displayProduct?.name || ""} className="w-full h-full object-contain p-4" loading="eager" fetchPriority="high" />
      </div>
      {galleryImages.length > 1 && (
        <div className="flex gap-2 mt-3">
          {galleryImages.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setImgIdx(i)}
              className={`w-24 h-20 rounded-lg overflow-hidden border-2 bg-white flex items-center justify-center transition ${i === imgIdx ? "border-[#7c3aed]" : "border-[#e8e8ed] hover:border-[#c4b5fd]"}`}
            >
              <img src={src} alt="" className="w-full h-full object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  ) : (
    <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#7c3aed]/10 to-[#6d28d9]/10 flex items-center justify-center">
      <span className="text-8xl font-bold text-[#7c3aed]/20">{product ? product.name[0] : ""}</span>
    </div>
  );

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setImgIdx(0);
    setLoading(true);
    fetchProduct(slug, i18n.language).then(p => {
      if (!cancelled) { setProduct(p); setLoading(false); }
    }).catch(() => {
      if (!cancelled) setLoading(false);
    });
    // Reviews (low priority: deferred off the critical path)
    var loadReviews = function () {
      var m = {"windows-11-pro":629,"windows-10-pro":630,"windows-11-home":631,"windows-10-home":632,"office-2019-pro-plus":633,"office-2021-pro-plus":634,"win-11-iot-2024-entry":637,"win-10-iot-2021-entry":643,"win-10-iot-2019-entry":646,"windows-11-pro-official":652,"windows-10-pro-official":653,"windows-11-home-official":654,"windows-10-home-official":655,"win-11-iot-2024-high-end":656,"win-11-iot-2024-value":657,"win-10-iot-2021-high-end":658,"win-10-iot-2021-value":659,"win-11-iot-ml-high-end":660,"win-11-iot-ml-value":661,"win-11-iot-ml-entry":662,"win-10-iot-2019-high-end":663,"win-10-iot-2019-value":664,"win-svr-iot-2025":665,"win-svr-iot-2022":666,"win-svr-iot-2019":667,"sql-svr-2019-runtime":668,"sql-svr-2022-runtime":669};
      var id = (m as Record<string, number | undefined>)[slug] || product?.slug;
      if (id) fetch(api("/wp-json/keystarter/v1/reviews/"+id+"?lang="+i18n.language+"&per_page=100")).then(function(r){return r.text()}).then(function(t){var d=JSON.parse(t.replace(/^\\uFEFF/,""));if(!cancelled&&d&&d.reviews)setReviews(d.reviews)}).catch(function(){});
    };
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(loadReviews, { timeout: 4000 });
    } else {
      setTimeout(loadReviews, 2000);
    }
    return () => { cancelled = true; };
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, i18n.language]);

  useEffect(() => {
    if (product) {
      pushEvent("view_item", {
        currency: "USD",
        value: product.price,
        items: [{ item_id: product.slug, item_name: product.name, price: product.price }],
      });
    }
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.slug]);

  // Products outside the edge/SEO index (e.g. the internal "testms" payment-test
  // SKU) would otherwise keep whatever title the not-found fallback set. Only
  // replaces fallback titles — never the edge-injected SEO titles.
  useEffect(() => {
    if (!product) return;
    const t = document.title;
    const isFallback = /Page Not Found/i.test(t) || /\(internal\)/i.test(t) || t === "KeyStarter — Genuine Software Licenses";
    if (!isFallback) return;
    document.title = `${product.name} — KeyStarter`;
    const desc = String(product.description || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 155);
    if (desc) {
      let m = document.head.querySelector('meta[name="description"]');
      if (!m) {
        m = document.createElement("meta");
        m.setAttribute("name", "description");
        document.head.appendChild(m);
      }
      m.setAttribute("content", desc);
    }
  }, [product]);

  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-6 py-4 text-xs text-[#6e6e73]">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link to="/" className="hover:text-[#7c3aed] transition">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link to="/products" className="hover:text-[#7c3aed] transition">Products</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-[#1d1d1f]">{displayProduct?.name || slug}</li>
        </ol>
      </nav>
      
      {!displayProduct && (
        <div className="max-w-7xl mx-auto px-6 pb-16 min-h-[80vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="shimmer w-full aspect-[4/3] rounded-2xl" />
            <div><div className="shimmer h-6 w-1/3 mb-4 rounded" /><div className="shimmer h-10 w-2/3 mb-6 rounded" /><div className="shimmer h-4 w-full mb-2 rounded" /><div className="shimmer h-4 w-3/4 mb-6 rounded" /><div className="shimmer h-12 w-full rounded-xl" /></div>
          </div>
        </div>
      )}

      {displayProduct && 
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>{imageBlock}</div>
        <div>
          <div className="text-xs text-[#7c3aed] font-semibold uppercase tracking-wider mb-2">{t("product.genuine_digital")}</div>
          <h1 className="text-3xl font-bold mb-2">{h1Override || displayProduct!.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            {(() => {
              const reg = displayProduct!.regularPrice;
              const hasReg = !!reg && reg > displayProduct!.price;
              const off = hasReg && reg ? Math.round((1 - displayProduct!.price / reg) * 100) : 0;
              return (
                <>
                  <span className="text-2xl font-extrabold text-[#7c3aed]">
                    {new Intl.NumberFormat("en",{style:"currency",currency:"USD"}).format(displayProduct!.price)}
                  </span>
                  {hasReg && reg ? <span className="text-xs text-[#6e6e73] line-through">{new Intl.NumberFormat("en",{style:"currency",currency:"USD"}).format(reg)}</span> : null}
                  {hasReg && off > 0 && <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded">Save {off}%</span>}
                </>
              );
            })()}
          </div>
          {descBlock}


          <button onClick={() => addToCart(displayProduct!.slug, displayProduct!.name, displayProduct!.price)}
            className="v5-btn w-full min-h-[44px] inline-flex items-center justify-center bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold py-3.5 rounded-xl transition mb-2">
            {t("product.add_to_cart")}
          </button>
          <button onClick={() => buyNow(displayProduct!.slug, displayProduct!.name, displayProduct!.price)}
            className="v5-btn w-full min-h-[44px] inline-flex items-center justify-center bg-[#c2410c] hover:bg-[#b03a09] text-white font-semibold py-3.5 rounded-xl transition mb-2">
            {t("product.buy_now", "Buy Now")}
          </button>
          <div className="grid grid-cols-3 gap-2 mt-2 px-1"><div className="text-center py-2 rounded-lg bg-[#7c3aed]/5 border border-[#7c3aed]/20"><svg className="w-4 h-4 mx-auto text-[#7c3aed] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg><div className="text-xs font-semibold text-green-700">Secure Checkout</div><div className="text-xs text-[#7c3aed]">SSL Encrypted</div></div><div className="text-center py-2 rounded-lg bg-[#7c3aed]/5 border border-[#7c3aed]/20"><svg className="w-4 h-4 mx-auto text-[#7c3aed] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg><div className="text-xs font-semibold text-[#7c3aed]">Instant Delivery</div><div className="text-xs text-[#7c3aed]">Within 10 Minutes</div></div><div className="text-center py-2 rounded-lg bg-[#7c3aed]/5 border border-[#7c3aed]/20"><svg className="w-4 h-4 mx-auto text-[#7c3aed] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg><div className="text-xs font-semibold text-[#7c3aed]">Genuine License</div><div className="text-xs text-[#7c3aed]">100% Authentic</div></div></div>
          <div className="grid grid-cols-2 gap-2 mt-3 px-1">
            <div className="text-center py-2 rounded-lg bg-[#7c3aed]/5 border border-[#7c3aed]/20">
              <div className="text-xs font-semibold text-[#7c3aed]">14-Day Refund</div>
              <div className="text-xs text-[#7c3aed]">No activation risk</div>
            </div>
            <div className="text-center py-2 rounded-lg bg-[#7c3aed]/5 border border-[#7c3aed]/20">
              <div className="text-xs font-semibold text-[#7c3aed]">Activation Success</div>
              <div className="text-xs text-[#7c3aed]">Verified keys</div>
            </div>
            <a href="#product-faq" className="col-span-2 min-h-[44px] flex items-center justify-center text-xs font-semibold text-[#7c3aed] border border-[#7c3aed]/30 rounded-lg hover:bg-[#f5f3ff] transition">FAQ &amp; Help</a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8 pt-8 border-t border-[#e8e8ed]">
            {leftCol}
          {rightCol}
          {reqCol}
          {seoSections && seoSections.length > 0 && (
            <div className="md:col-span-2 mt-8">
              <div className="grid grid-cols-1 gap-7">
                {seoSections.map(function(s, i) { return (
                  <section key={i}>
                    <h2 className="text-lg font-bold mb-2 text-[#1d1d1f]">{s.h}</h2>
                    <p className="text-sm leading-relaxed text-[#555]" dangerouslySetInnerHTML={{ __html: s.body }} />
                  </section>
                ); })}
              </div>
            </div>
          )}
          {displayProduct?.specs?.type && (() => {
            const lt = licenseTypeFor(displayProduct.specs.type);
            return (
              <div className="md:col-span-2 mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section aria-labelledby="license-type-heading" className="bg-white rounded-2xl border border-[#e8e8ed] p-6">
                  <h2 id="license-type-heading" className="text-base font-bold mb-1">License Type</h2>
                  <div className="text-xs text-[#7c3aed] font-semibold mb-2">{lt.label}</div>
                  <p className="text-xs leading-relaxed text-[#6e6e73] mb-4">{lt.summary}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-bold text-green-700 mb-1.5">What you can do</div>
                      <ul className="space-y-1.5">
                        {lt.can.map((c, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[#1d1d1f]"><span className="text-green-500 mt-0.5">✓</span>{c}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#c2410c] mb-1.5">Limitations</div>
                      <ul className="space-y-1.5">
                        {lt.cannot.map((c, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[#1d1d1f]"><span className="text-[#c2410c] mt-0.5">✕</span>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
                <section aria-labelledby="activation-guarantee-heading" className="bg-white rounded-2xl border border-[#e8e8ed] p-6">
                  <h2 id="activation-guarantee-heading" className="text-base font-bold mb-1">If Activation Fails</h2>
                  <div className="text-xs text-[#7c3aed] font-semibold mb-2">Free replacement · 14-day refund · 24h support response</div>
                  <ol className="space-y-2.5">
                    {ACTIVATION_STEPS.map((s, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs leading-relaxed text-[#1d1d1f]">
                        <span className="w-5 h-5 rounded-full bg-[#7c3aed]/10 text-[#7c3aed] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </section>
              </div>
            );
          })()}
        </div>
      </div>
      }
      
      {displayProduct && (
        <QuickAnswer>
          <p>
            <strong>{displayProduct.name} is a genuine {displayProduct.specs?.type || "Microsoft"} license delivered by email within 10 minutes of purchase.</strong> The key activates {displayProduct.specs?.activation === "Digital License" ? "via digital license" : displayProduct.specs?.activation} on {displayProduct.specs?.platform || "your device"}, includes lifetime support, and is covered by our activation guarantee: if the key fails to activate through no fault of yours, we replace it free of charge or refund you within 14 days. Buying for a team? <a href="/b2b" className="text-[#7c3aed] hover:underline">Request a volume quote</a> — 5+ keys qualify for tiered pricing with VAT invoices.
          </p>
        </QuickAnswer>
      )}

      {displayProduct && (
        <section aria-labelledby="volume-quote-heading" className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-[#6d28d9] to-[#1a1a2e] text-white px-6 py-6">
            <div>
              <h2 id="volume-quote-heading" className="text-base font-bold mb-1">Need 5 or more licenses?</h2>
              <p className="text-xs text-white/80">Volume pricing from 5 keys · VAT invoices · PO purchasing · CSV bulk delivery · custom quote in 24h</p>
            </div>
            <a href="/b2b#enterprise-b2b" className="flex-shrink-0 bg-white text-[#6d28d9] px-6 py-3 rounded-xl text-xs font-bold no-underline hover:bg-gray-100 transition">Get a Volume Quote</a>
          </div>
        </section>
      )}

      {displayProduct && relatedGuides.length > 0 && (
        <section aria-labelledby="related-guides-heading" className="bg-[#f5f5f7] max-w-7xl mx-auto px-6 pb-12 pt-2">
          <h2 id="related-guides-heading" className="text-base font-bold mb-3">Related Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {relatedGuides.map(function(g){return(
              <a key={g.href} href={g.href} className="group flex items-start gap-3 p-4 rounded-xl bg-white border border-[#e8e8ed] shadow-sm hover:border-[#7c3aed]/40 transition">
                <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#7c3aed]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1d1d1f] group-hover:text-[#7c3aed] transition">{g.title}</div>
                  <div className="text-xs text-[#6e6e73] mt-0.5">{g.desc}</div>
                </div>
              </a>
            );})}
          </div>
        </section>
      )}

      {displayProduct && compGroup && <ProductComparison group={compGroup} />}
      {displayProduct && allFaqs.length > 0 && <ProductFAQ faqs={allFaqs} />}
      {reviews.length > 0 && <ProductReviews reviews={reviews} t={t} />}
      {displayProduct && (
        <section className="max-w-3xl mx-auto px-6 py-12 w-full">
          <h2 className="text-xl font-bold mb-4">Write a Review</h2>
          <ReviewForm productId={getWooId(slug || "") || 0} />
        </section>
      )}

      {!displayProduct && (
        <div className="max-w-7xl mx-auto px-6 pb-16 text-center py-20">
          <div className="text-lg text-[#6e6e73]">{t("notfound.title")}</div>
          <Link to="/" className="text-sm text-[#7c3aed] hover:underline mt-4 inline-block">{t("notfound.back")}</Link>
        </div>
      )}
    </div>
  );
}
