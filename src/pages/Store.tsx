import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProducts } from "../api/woocommerce";
import type { SPAProduct } from "../api/woocommerce";
import { useCart } from "../data/CartContext";

const categories = [
  {name:"Windows 11 Pro", slug:"windows-11-pro", color:"#7c3aed", items:["Single PC","2 PCs","Pro + Office Bundle","Pro + Office + Visio"]},
  {name:"Windows 10 Pro", slug:"windows-10-pro", color:"#106EBE", items:["Single PC","2 PCs","Pro + Office Bundle","Server 2019 + Office"]},
  {name:"Office 2021 Pro", slug:"office-2021-pro", color:"#D83B01", items:["Office 2021 Pro Plus","Office 2019 Pro Plus","Office 2016 Pro Plus","2024 Pro Plus"]},
  {name:"Server and Tools", slug:"win-svr-2022", color:"#6d28d9", items:["Server 2019","Server 2022","Exchange 2019","SQL Server 2019"]}
];

export default function StorePage() {
    const { t, i18n } = useTranslation();
  const [products, setProducts] = useState<SPAProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart, buyNow } = useCart();

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
        <p className="text-lg font-light max-w-2xl mx-auto">{t("store.desc")}</p>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">{t("store.categories")}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {categories.map((c,i)=>(
            <div key={i} className="bg-white rounded-2xl p-6 border border-[#e8e8ed] hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{background:c.color}}>
                <span className="text-white text-xl font-bold">{c.name[0]}</span>
              </div>
              <h3 className="text-lg font-bold mb-3">{c.name}</h3>
              {c.items.map((it,j)=>(
                <div key={j} className="flex justify-between py-2 text-xs border-b border-[#e8e8ed] last:border-0">
                  <span className="text-[#86868b]">{it}</span>
                </div>
              ))}
              <Link to={"/products"} className="inline-block mt-3 text-xs font-semibold text-[#7c3aed] hover:underline">View Details &gt;</Link>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-8">{t("store.featured")}</h2>
        
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
            {products.map((x,i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#e8e8ed] p-5 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => window.location.href='/product/'+x.slug}>
                <div>
                  <div className="flex items-center space-x-3.5 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#f3f4f6] text-sm font-bold text-[#7c3aed]">
                      {x.name[0]}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#1d1d1f]">{x.name}</h3>
                      <p className="text-[10px] text-[#86868b]">{x.category || 'Microsoft License'}</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 mb-4 text-[10px] text-[#1d1d1f]/80 border-t border-[#f5f5f7] pt-3">
                    {(x.specs ? Object.entries(x.specs).slice(0, 4) : []).map(([k,v],fi) => (
                      <li key={fi} className="flex items-start space-x-1.5"><span className="text-green-500 font-bold">✓</span><span>{v}</span></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-xl font-extrabold text-[#1d1d1f]">
                      {new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(x.price)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); addToCart(x.slug, x.name, x.price); }}
                      className="flex-1 border-2 border-[#7c3aed] text-[#7c3aed] hover:bg-blue-50 text-[10px] font-semibold py-2 rounded-xl transition">{t("product.add_to_cart")}</button>
                    <button onClick={(e) => { e.stopPropagation(); buyNow(x.slug, x.name, x.price); }}
                      className="flex-1 bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-[10px] font-semibold py-2 rounded-xl transition">{t('product.buy_now', 'Buy Now')}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

