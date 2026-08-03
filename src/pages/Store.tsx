import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProducts } from "../api/woocommerce";
import type { SPAProduct } from "../api/woocommerce";
import { useCart } from "../data/CartContext";
import ProductImage from "../components/ProductImage";
import CountdownTimer from "../components/CountdownTimer";
import { SPECIAL_OFFER_IDS, SPECIAL_REGULAR_PRICES } from "../data/constants";

// categories removed - using filter tabs from homepage style

export default function StorePage() {
    const { t, i18n } = useTranslation();
  const [products, setProducts] = useState<SPAProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart, buyNow } = useCart();
  const [activeTab, setActiveTab] = useState("all");

  const filterTabs = [
    { key: "all", label: "All Products" },
    { key: "windows", label: "Windows" },
    { key: "office", label: "Office" },
    { key: "server", label: "Server / SQL" },
  ];

  const filteredProducts = activeTab === "all"
    ? products
    : products.filter(function(p) {
        var s = (p.slug || "").toLowerCase();
        if (activeTab === "windows") return /windows/.test(s) || /^win-/.test(s);
        if (activeTab === "office") return /office/.test(s);
        if (activeTab === "server") return /svr/.test(s) || /sql/.test(s);
        return true;
      });

  function countByTab(tabKey: string): number {
    if (tabKey === "all") return products.length;
    return products.filter(function(p) {
      var s = (p.slug || "").toLowerCase();
      if (tabKey === "windows") return /windows/.test(s) || /^win-/.test(s);
      if (tabKey === "office") return /office/.test(s);
      if (tabKey === "server") return /svr/.test(s) || /sql/.test(s);
      return true;
    }).length;
  }

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    fetchProducts(i18n.language).then(data => {
      if (!cancelled) { setProducts(data); setLoading(false); }
    }).catch(err => {
      if (!cancelled) { setError(err.message); setLoading(false); }
    });
   return () => { cancelled = true; };
   }, [i18n.language]);

  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#7c3aed] via-[#106EBE] to-[#6d28d9] text-white px-6 sm:px-12 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{t("store.title")}</h1>
        <p className="text-lg font-light max-w-2xl mx-auto">Browse by category. Each card includes a genuine delivery guarantee for worry-free compliance.</p>
      </div>
      <div className="flex justify-center px-6 pt-6">
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-orange-50 border-2 border-[#ff6b35]/30 px-6 py-4 shadow-[0_8px_24px_rgba(255,107,53,0.12)]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#ff6b35]">Limited Time Offer ends in</span>
          <CountdownTimer large />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Filter Tabs - matching homepage style */}
          <div className="flex justify-center mb-10 py-2 overflow-x-auto">
            <div className="flex space-x-1.5 bg-white p-1.5 rounded-full border border-[#e8e8ed] shadow-[0_4px_12px_rgba(0,0,0,0.03)] whitespace-nowrap">
              {filterTabs.map(function(t) {
                var cnt = countByTab(t.key);
                return (
                  <button key={t.key}
                    onClick={function(){setActiveTab(t.key)}}
                    className={"px-6 py-2 rounded-full text-xs font-semibold transition " + (activeTab === t.key ? "bg-[#1d1d1f] text-white" : "text-[#86868b] hover:text-black")}
                  >
                    {t.label} ({cnt})
                  </button>
                );
              })}
            </div>
          </div>
        
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-[#e8e8ed]">
                <div className="shimmer w-full h-[140px] rounded-xl mb-3" />
                <div className="shimmer h-4 w-3/4 mb-2 rounded" />
                <div className="shimmer h-3 w-1/2 mb-2 rounded" />
                <div className="shimmer h-8 w-full rounded-xl" />
              </div>
            ))}
          </div>
        )}
        
        {error && <div className="text-red-500 text-center py-8">{t("store.load_error")}</div>}
        
        {!loading && !error && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {filteredProducts.map((x,i) => {
              const isSpecial = SPECIAL_OFFER_IDS.includes(x.slug);
              const orig = isSpecial ? (SPECIAL_REGULAR_PRICES[x.slug] || x.regularPrice || 0) : 0;
              const off = orig > x.price ? Math.round((1 - x.price / orig) * 100) : 0;
              return (
              <div key={i} className={"bg-white rounded-2xl border p-5 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden " + (isSpecial ? "border-[#ff6b35]/40" : "border-[#e8e8ed]")}
                onClick={() => window.location.href='/product/'+x.slug}>
                {isSpecial && off > 0 && <div className="absolute top-0 right-0 bg-[#ff6b35] text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg">-{off}%</div>}
                <div>
                  <ProductImage slug={x.slug} name={x.name} />
                  {isSpecial && <span className="inline-block text-[9px] font-bold uppercase tracking-wide text-[#ff6b35] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded mt-2 mb-2">Special Price</span>}
                  <h3 className="text-sm font-bold text-[#1d1d1f] mb-1">{x.name}</h3>
                  <p className="text-[10px] text-[#86868b] mb-4">{x.category || 'Microsoft License'}</p>
                  <ul className="space-y-1.5 mb-4 text-[10px] text-[#1d1d1f]/80 border-t border-[#f5f5f7] pt-3">
                    {(x.specs ? Object.entries(x.specs).slice(0, 4) : []).map(([k,v],fi) => (
                      <li key={fi} className="flex items-start space-x-1.5"><span className="text-green-500 font-bold">✓</span><span>{v}</span></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="flex items-baseline gap-1.5">
                    <span className={"text-xl font-extrabold " + (isSpecial ? "text-[#ff6b35]" : "text-[#1d1d1f]")}>
                      {new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(x.price)}
                    </span>
                    {off > 0 && <span className="text-[10px] text-[#86868b] line-through">{new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(orig)}</span>}
                    </div>
                  </div>
                  {isSpecial && <CountdownTimer className="mb-3" />}
                  <div className="flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); addToCart(x.slug, x.name, x.price); }}
                      className={"flex-1 border-2 text-[10px] font-semibold py-2 rounded-xl transition " + (isSpecial ? "border-[#ff6b35] text-[#ff6b35] hover:bg-orange-50" : "border-[#7c3aed] text-[#7c3aed] hover:bg-blue-50")}>{t("product.add_to_cart")}</button>
                    <button onClick={(e) => { e.stopPropagation(); buyNow(x.slug, x.name, x.price); }}
                      className={"flex-1 text-white text-[10px] font-semibold py-2 rounded-xl transition " + (isSpecial ? "bg-[#ff6b35] hover:bg-[#e55a2b]" : "bg-[#7c3aed] hover:bg-[#6d28d9]")}>{t('product.buy_now', 'Buy Now')}</button>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

