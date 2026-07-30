import {useParams, Link} from "react-router-dom";
import {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {fetchProduct} from "../api/woocommerce";
import type {SPAProduct} from "../api/woocommerce";
import { useCart } from "../data/CartContext";
import { PRODUCT_DETAILS } from "../data/product-details";

const editions = [
  {name:"Home",desc:"For everyday use",price:"$12.99"},
  {name:"Pro",desc:"For business",price:"$14.99"},
  {name:"Enterprise",desc:"For organizations",price:"$29.99"}
];

const features = [
  ["Platform","Windows PC / 64-bit"],["Delivery","Instant via email"],
  ["Activation","Digital License"],["Support","Lifetime"],
  ["Security","Built-in"],["AI","Copilot ready"]
];

export default function ProductPage() {
  const {slug} = useParams();

  const {t, i18n} = useTranslation();
  const [product, setProduct] = useState<SPAProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, buyNow } = useCart();
const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviewPage, setReviewPage] = useState(1);
  const details = PRODUCT_DETAILS[slug || ""];

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
    var id = m[slug] || product?.slug;
    if (id) fetch("/wp-json/keystarter/v1/reviews/"+id+"?lang="+i18n.language+"&per_page=100").then(function(r){return r.text()}).then(function(t){var d=JSON.parse(t.replace(/^\\uFEFF/,""));if(!cancelled&&d&&d.reviews)setReviews(d.reviews)}).catch(function(){});
    return () => { cancelled = true; };
  }, [slug, i18n.language]);

  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="max-w-7xl mx-auto px-6 py-4 text-xs text-[#86868b]">
        <Link to="/" className="hover:text-[#7c3aed] transition">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#1d1d1f]">{product?.name || slug}</span>
      </div>
      
      {loading && (
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="shimmer w-full aspect-[4/3] rounded-2xl" />
            <div><div className="shimmer h-6 w-1/3 mb-4 rounded" /><div className="shimmer h-10 w-2/3 mb-6 rounded" /><div className="shimmer h-4 w-full mb-2 rounded" /><div className="shimmer h-4 w-3/4 mb-6 rounded" /><div className="shimmer h-12 w-full rounded-xl" /></div>
          </div>
        </div>
      )}

      {!loading && product && (
      <div className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#7c3aed]/10 to-[#6d28d9]/10 flex items-center justify-center">
            <span className="text-8xl font-bold text-[#7c3aed]/20">{product.name[0]}</span>
          </div>
        </div>
        <div>
          <div className="text-[10px] text-[#7c3aed] font-semibold uppercase tracking-wider mb-2">{t("product.genuine_digital")}</div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-extrabold text-[#7c3aed]">
              {new Intl.NumberFormat("en",{style:"currency",currency:"USD"}).format(product.price)}
            </span>
            <span className="text-xs text-[#86868b] line-through">$199.00</span>
            <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded">Save 92%</span>
          </div>
          <p className="text-sm text-[#86868b] mb-6">{details ? details.desc : product.description?.substring(0,150)}</p>


          <button onClick={() => addToCart(product.slug, product.name, product.price)}
            className="v5-btn w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold py-3.5 rounded-xl transition mb-2">
            {t("product.add_to_cart")}
          </button>
          <button onClick={() => buyNow(product.slug, product.name, product.price)}
            className="v5-btn w-full bg-[#ff6b35] hover:bg-[#e55a2b] text-white font-semibold py-3.5 rounded-xl transition mb-2">
            {t("product.buy_now", "Buy Now")}
          </button>
          <div className="grid grid-cols-3 gap-2 mt-2 px-1"><div className="text-center py-2 rounded-lg bg-green-50/50 border border-green-100"><svg className="w-4 h-4 mx-auto text-green-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg><div className="text-[10px] font-semibold text-green-700">Secure Checkout</div><div className="text-[9px] text-green-600">SSL Encrypted</div></div><div className="text-center py-2 rounded-lg bg-blue-50/50 border border-blue-100"><svg className="w-4 h-4 mx-auto text-blue-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg><div className="text-[10px] font-semibold text-blue-700">Instant Delivery</div><div className="text-[9px] text-blue-600">2-5 Minutes</div></div><div className="text-center py-2 rounded-lg bg-purple-50/50 border border-purple-100"><svg className="w-4 h-4 mx-auto text-purple-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg><div className="text-[10px] font-semibold text-purple-700">Genuine License</div><div className="text-[9px] text-purple-600">100% Authentic</div></div></div>

          <div className="mt-8 border-t border-[#e8e8ed] pt-6">
            <h3 className="text-base font-bold mb-4">{t("product.details")}</h3>
            {(product.specs ? Object.entries(product.specs) : features).map((f:any,i:number) => (
              <div key={i} className="flex justify-between py-2 border-b border-[#f5f5f7] text-xs">
                <span className="text-[#86868b]">{Array.isArray(f) ? f[0] : f[0]}</span>
                <span className="font-medium">{Array.isArray(f) ? f[1] : f[1]}</span>
              </div>
            ))}
          <div className="mt-8 border-t border-[#e8e8ed] pt-6"><h3 className="text-base font-bold mb-4">How It Works</h3><div className="grid grid-cols-3 gap-4"><div className="text-center"><div className="w-10 h-10 mx-auto rounded-full bg-[#7c3aed]/10 flex items-center justify-center mb-2"><span className="text-sm font-bold text-[#7c3aed]">1</span></div><div className="text-xs font-semibold mb-1">Purchase & Pay</div><div className="text-[10px] text-[#86868b]">Complete secure checkout via PayPal or Stripe</div></div><div className="text-center"><div className="w-10 h-10 mx-auto rounded-full bg-[#7c3aed]/10 flex items-center justify-center mb-2"><span className="text-sm font-bold text-[#7c3aed]">2</span></div><div className="text-xs font-semibold mb-1">Receive Instantly</div><div className="text-[10px] text-[#86868b]">License key delivered to your email within minutes</div></div><div className="text-center"><div className="w-10 h-10 mx-auto rounded-full bg-[#7c3aed]/10 flex items-center justify-center mb-2"><span className="text-sm font-bold text-[#7c3aed]">3</span></div><div className="text-xs font-semibold mb-1">Activate & Enjoy</div><div className="text-[10px] text-[#86868b]">Follow email instructions to activate your license</div></div></div></div>{details && details.features && (
          <div className="mt-6">
            <h3 className="text-base font-bold mb-3">Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
          {details && details.requirements && (
          <div className="mt-6">
            <h3 className="text-base font-bold mb-3">System Requirements</h3>
            <div className="bg-[#f5f5f7] rounded-xl p-4">
              {details.requirements.map(function(r:any,i:number){return(
                <div key={i} className="flex justify-between py-1.5 border-b border-[#e8e8ed] last:border-0 text-xs">
                  <span className="text-[#86868b] font-medium">{r.l}</span>
                  <span className="text-right max-w-[60%]">{r.v}</span>
                </div>
              );})}
            </div>
          </div>
          )}
          
          {reviews.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[#e8e8ed]">
            <h3 className="text-base font-bold mb-4">{t("product.reviews")}</h3>
            {reviews.map(function(r:any,i:number){return(
              <div key={i} className="border-b border-[#f5f5f7] py-4">
                <div className="text-yellow-500 text-sm">{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</div>
                <div className="text-xs font-medium mt-1">{r.author}</div>
                <div className="text-xs text-[#86868b] mt-1">{r.text}</div>
              </div>
            );})}
          </div>
          )}
        </div>
        </div>
      </div>
      )}

      {!loading && !product && (
        <div className="max-w-7xl mx-auto px-6 pb-16 text-center py-20">
          <div className="text-lg text-[#86868b]">{t("notfound.title")}</div>
          <Link to="/" className="text-sm text-[#7c3aed] hover:underline mt-4 inline-block">{t("notfound.back")}</Link>
        </div>
      )}
    </div>
  );
}

