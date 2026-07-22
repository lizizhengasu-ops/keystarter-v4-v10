import {useParams, Link} from "react-router-dom";
import {useState, useEffect} from "react";
import {useCart} from "../CartContext";
import {useTranslation} from "react-i18next";
import {fetchProduct} from "../api/woocommerce";
import type {SPAProduct} from "../api/woocommerce";

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
  const slugMap: Record<string, string> = {
    'windows-11-pro': 'windows-11-pro', 'windows-10-pro': 'windows-10-pro',
    'windows-11-home': 'windows-11-home', 'windows-10-home': 'windows-10-home',
    'office-2019-pro-plus': 'office-2019-pro-plus', 'office-2021-pro-plus': 'office-2021-pro-plus',
  };
  const wcSlug = slugMap[slug || ''] || slug;

  const cart = useCart();
  const {t, i18n} = useTranslation();
  const [product, setProduct] = useState<SPAProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selEdition, setSelEdition] = useState(1);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    fetchProduct(wcSlug, i18n.language).then(p => {
      if (!cancelled) { setProduct(p); setLoading(false); }
    }).catch(() => {
      if (!cancelled) setLoading(false);
    });
    // Reviews
    var m = {"windows-11-pro":13,"windows-11-home":14,"windows-10-pro":15,"m365-personal":16,"m365-family":17,"m365-business":18,"office-2026-pro":19,"office-2026-home":20,"server-2025":21,"sql-2025":22};
    var id = m[slug] || product?.slug;
    if (id) fetch("/wp-json/keystarter/v1/reviews/"+id+"?lang="+i18n.language).then(function(r){return r.json()}).then(function(d){if(!cancelled)setReviews(d)}).catch(function(){});
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
          <div className="text-[10px] text-[#7c3aed] font-semibold uppercase tracking-wider mb-2">Genuine Digital License</div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-extrabold text-[#7c3aed]">
              {new Intl.NumberFormat("en",{style:"currency",currency:"USD"}).format(product.price)}
            </span>
            <span className="text-xs text-[#86868b] line-through">$199.00</span>
            <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded">Save 92%</span>
          </div>
          <p className="text-sm text-[#86868b] mb-6">{product.description?.substring(0,150)}</p>

          <div className="mb-6">
            <div className="text-sm font-semibold mb-3">{t("product.select_edition")}</div>
            <div className="flex gap-2">
              {editions.map((e,i) => (
                <div key={i} onClick={()=>setSelEdition(i)}
                  className={"flex-1 p-3 rounded-xl cursor-pointer text-center border-2 transition-all " +
                    (selEdition===i ? "border-[#7c3aed] bg-blue-50" : "border-[#e8e8ed] bg-white")}>
                  <div className="text-xs font-semibold">{e.name}</div>
                  <div className="text-[10px] text-[#86868b]">{e.desc}</div>
                  <div className="text-xs font-semibold text-[#7c3aed] mt-1">{e.price}</div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={()=>cart.add({slug:product.slug,name:product.name,price:product.price})}
            className="v5-btn w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold py-3.5 rounded-xl transition mb-2">
            {t("product.add_to_cart")}
          </button>
          <p className="text-[10px] text-[#86868b] text-center">Genuine product - Instant delivery - Secure checkout</p>

          <div className="mt-8 border-t border-[#e8e8ed] pt-6">
            <h3 className="text-base font-bold mb-4">{t("product.details")}</h3>
            {(product.specs ? Object.entries(product.specs) : features).map((f:any,i:number) => (
              <div key={i} className="flex justify-between py-2 border-b border-[#f5f5f7] text-xs">
                <span className="text-[#86868b]">{Array.isArray(f) ? f[0] : f[0]}</span>
                <span className="font-medium">{Array.isArray(f) ? f[1] : f[1]}</span>
              </div>
            ))}
          
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
