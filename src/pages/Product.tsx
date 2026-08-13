import {useParams, Link} from "react-router-dom";
import {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {fetchProduct} from "../api/woocommerce";
import type {SPAProduct} from "../api/woocommerce";
import { useCart } from "../data/CartContext";
import { PRODUCT_DETAILS } from "../data/product-details";
import { PRODUCT_IMAGES } from "../data/product-images";
import { GENERIC_FAQS, FAQ_BY_SERIES } from "../data/faq";
import { COMPARISON_GROUPS, COMPARISON_MAP, FAQ_SERIES_MAP } from "../data/product-comparison";
import { ProductComparison } from "../components/ProductComparison";
import { ProductFAQ } from "../components/ProductFAQ";
import { ProductReviews } from "../components/ProductReviews";

export default function ProductPage() {
  const {slug} = useParams();

  const {t, i18n} = useTranslation();
  const [product, setProduct] = useState<SPAProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, buyNow } = useCart();
const [reviews, setReviews] = useState([]);
  const details = PRODUCT_DETAILS[slug || ""];
  const compGroup = COMPARISON_MAP[slug || ""] ? COMPARISON_GROUPS[COMPARISON_MAP[slug || ""]] : null;
  const sKey = FAQ_SERIES_MAP[slug || ""] || "";
  const allFaqs = [...(sKey ? (FAQ_BY_SERIES[sKey] || []) : []), ...GENERIC_FAQS];
  // Pre-computed sub-columns (avoids Rolldown brace-nesting issue)
  const leftCol = details ? (
    <div>
      {details.features && (
      <div>
        <h3 className="text-base font-bold mb-3">Features</h3>
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
      <h3 className="text-base font-bold mb-3">System Requirements</h3>
      <div className="bg-[#f5f5f7] rounded-xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          {details.requirements.map(function(r:any,i:number){return(
            <div key={i} className="flex justify-between py-1.5 border-b border-[#e8e8ed] last:border-0 text-xs">
              <span className="text-[#86868b] font-medium">{r.l}</span>
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
        <h3 className="text-base font-bold mb-4">{t("product.details")}</h3>
      {(product?.specs ? Object.entries(product.specs) : []).map((f:any,i:number) => (
          <div key={i} className="flex justify-between py-2 border-b border-[#f5f5f7] text-xs">
            <span className="text-[#86868b]">{Array.isArray(f) ? f[0] : f[0]}</span>
            <span className="font-medium">{Array.isArray(f) ? f[1] : f[1]}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t border-[#e8e8ed] pt-6">
        <h3 className="text-base font-bold mb-4">How It Works</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center"><div className="w-10 h-10 mx-auto rounded-full bg-[#7c3aed]/10 flex items-center justify-center mb-2"><span className="text-sm font-bold text-[#7c3aed]">1</span></div><div className="text-xs font-semibold mb-1">Purchase & Pay</div><div className="text-xs text-[#86868b]">Complete secure checkout via PayPal or Stripe</div></div>
          <div className="text-center"><div className="w-10 h-10 mx-auto rounded-full bg-[#7c3aed]/10 flex items-center justify-center mb-2"><span className="text-sm font-bold text-[#7c3aed]">2</span></div><div className="text-xs font-semibold mb-1">Receive Instantly</div><div className="text-xs text-[#86868b]">License key delivered to your email within minutes</div></div>
          <div className="text-center"><div className="w-10 h-10 mx-auto rounded-full bg-[#7c3aed]/10 flex items-center justify-center mb-2"><span className="text-sm font-bold text-[#7c3aed]">3</span></div><div className="text-xs font-semibold mb-1">Activate & Enjoy</div><div className="text-xs text-[#86868b]">Follow email instructions to activate your license</div></div>
        </div>
      </div>
    </div>
  );

  const descBlock = (
    <div className="mb-6">
      <p className="text-sm text-[#86868b]">{details ? details.desc : product?.description?.substring(0,150)}</p>
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
  const imageBlock = productImage ? (
    <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[#e8e8ed] flex items-center justify-center">
      <img src={productImage} alt={product?.name || ""} className="w-full h-full object-contain p-4" loading="lazy" />
    </div>
  ) : (
    <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#7c3aed]/10 to-[#6d28d9]/10 flex items-center justify-center">
      <span className="text-8xl font-bold text-[#7c3aed]/20">{product ? product.name[0] : ""}</span>
    </div>
  );

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    fetchProduct(slug, i18n.language).then(p => {
      if (!cancelled) { setProduct(p); setLoading(false); }
    }).catch(() => {
      if (!cancelled) setLoading(false);
    });
    // Reviews
    var m = {"windows-11-pro":629,"windows-10-pro":630,"windows-11-home":631,"windows-10-home":632,"office-2019-pro-plus":633,"office-2021-pro-plus":634,"win-11-iot-2024-entry":637,"win-10-iot-2021-entry":643,"win-10-iot-2019-entry":646,"windows-11-pro-official":652,"windows-10-pro-official":653,"windows-11-home-official":654,"windows-10-home-official":655,"win-11-iot-2024-high-end":656,"win-11-iot-2024-value":657,"win-10-iot-2021-high-end":658,"win-10-iot-2021-value":659,"win-11-iot-ml-high-end":660,"win-11-iot-ml-value":661,"win-11-iot-ml-entry":662,"win-10-iot-2019-high-end":663,"win-10-iot-2019-value":664,"win-svr-iot-2025":665,"win-svr-iot-2022":666,"win-svr-iot-2019":667,"sql-svr-2019-runtime":668,"sql-svr-2022-runtime":669};
    var id = (m as Record<string, number | undefined>)[slug] || product?.slug;
    if (id) fetch("/wp-json/keystarter/v1/reviews/"+id+"?lang="+i18n.language+"&per_page=100").then(function(r){return r.text()}).then(function(t){var d=JSON.parse(t.replace(/^\\uFEFF/,""));if(!cancelled&&d&&d.reviews)setReviews(d.reviews)}).catch(function(){});
    return () => { cancelled = true; };
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, i18n.language]);

  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="max-w-7xl mx-auto px-6 py-4 text-xs text-[#86868b]">
        <Link to="/" className="hover:text-[#7c3aed] transition">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#1d1d1f]">{product?.name || slug}</span>
      </div>
      
      {loading && (
        <div className="max-w-7xl mx-auto px-6 pb-16 min-h-[80vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="shimmer w-full aspect-[4/3] rounded-2xl" />
            <div><div className="shimmer h-6 w-1/3 mb-4 rounded" /><div className="shimmer h-10 w-2/3 mb-6 rounded" /><div className="shimmer h-4 w-full mb-2 rounded" /><div className="shimmer h-4 w-3/4 mb-6 rounded" /><div className="shimmer h-12 w-full rounded-xl" /></div>
          </div>
        </div>
      )}

      {!loading && product && 
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>{imageBlock}</div>
        <div>
          <div className="text-xs text-[#7c3aed] font-semibold uppercase tracking-wider mb-2">{t("product.genuine_digital")}</div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            {(() => {
              const reg = product.regularPrice;
              const hasReg = !!reg && reg > product.price;
              const off = hasReg && reg ? Math.round((1 - product.price / reg) * 100) : 0;
              return (
                <>
                  <span className="text-2xl font-extrabold text-[#7c3aed]">
                    {new Intl.NumberFormat("en",{style:"currency",currency:"USD"}).format(product.price)}
                  </span>
                  {hasReg && reg ? <span className="text-xs text-[#86868b] line-through">{new Intl.NumberFormat("en",{style:"currency",currency:"USD"}).format(reg)}</span> : null}
                  {hasReg && off > 0 && <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded">Save {off}%</span>}
                </>
              );
            })()}
          </div>
          {descBlock}


          <button onClick={() => addToCart(product.slug, product.name, product.price)}
            className="v5-btn w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold py-3.5 rounded-xl transition mb-2">
            {t("product.add_to_cart")}
          </button>
          <button onClick={() => buyNow(product.slug, product.name, product.price)}
            className="v5-btn w-full bg-[#ff6b35] hover:bg-[#e55a2b] text-white font-semibold py-3.5 rounded-xl transition mb-2">
            {t("product.buy_now", "Buy Now")}
          </button>
          <div className="grid grid-cols-3 gap-2 mt-2 px-1"><div className="text-center py-2 rounded-lg bg-[#7c3aed]/5 border border-[#7c3aed]/20"><svg className="w-4 h-4 mx-auto text-[#7c3aed] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg><div className="text-xs font-semibold text-green-700">Secure Checkout</div><div className="text-xs text-[#7c3aed]">SSL Encrypted</div></div><div className="text-center py-2 rounded-lg bg-[#7c3aed]/5 border border-[#7c3aed]/20"><svg className="w-4 h-4 mx-auto text-[#7c3aed] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg><div className="text-xs font-semibold text-[#7c3aed]">Instant Delivery</div><div className="text-xs text-[#7c3aed]">Within 10 Minutes</div></div><div className="text-center py-2 rounded-lg bg-[#7c3aed]/5 border border-[#7c3aed]/20"><svg className="w-4 h-4 mx-auto text-[#7c3aed] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg><div className="text-xs font-semibold text-[#7c3aed]">Genuine License</div><div className="text-xs text-[#7c3aed]">100% Authentic</div></div></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8 pt-8 border-t border-[#e8e8ed]">
            {leftCol}
          {rightCol}
          {reqCol}
        </div>
      </div>
      }
      
      {product && compGroup && <ProductComparison group={compGroup} />}
      {product && allFaqs.length > 0 && <ProductFAQ faqs={allFaqs} />}
      {reviews.length > 0 && <ProductReviews reviews={reviews} t={t} />}

      {!loading && !product && (
        <div className="max-w-7xl mx-auto px-6 pb-16 text-center py-20">
          <div className="text-lg text-[#86868b]">{t("notfound.title")}</div>
          <Link to="/" className="text-sm text-[#7c3aed] hover:underline mt-4 inline-block">{t("notfound.back")}</Link>
        </div>
      )}
    </div>
  );
}
