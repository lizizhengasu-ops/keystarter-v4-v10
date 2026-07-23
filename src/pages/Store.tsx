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
  const { addItem } = useCart();

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
            {products.slice(0, 8).map((x,i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-[#e8e8ed] hover:shadow-md transition-shadow">
                <Link to={`/product/${x.slug}`}>
                  <div className="w-full h-[140px] rounded-xl mb-3 bg-gradient-to-br from-[#7c3aed]/10 to-[#6d28d9]/10 flex items-center justify-center">
                    <span className="text-4xl font-bold text-[#7c3aed]/30">{x.name[0]}</span>
                  </div>
                </Link>
                <div className="text-[10px] text-[#86868b] font-semibold uppercase tracking-wider mb-1">Microsoft License</div>
                <Link to={`/product/${x.slug}`}>
                  <div className="text-sm font-bold mb-1">{x.name}</div>
                </Link>
                <div className="text-xs text-[#86868b] mb-2">{x.description?.substring(0, 50)}</div>
                <div className="text-lg font-extrabold text-[#7c3aed] mb-3">
                  {new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(x.price)}
                </div>
                <button onClick={() => {
                  const WC_IDS = {
                    "windows-11-pro":629,"windows-10-pro":630,"windows-11-home":631,"windows-10-home":632,
                    "office-2019-pro-plus":633,"office-2021-pro-plus":634,"win-11-iot-2024-entry":637,
                    "win-10-iot-2021-entry":643,"win-10-iot-2019-entry":646,"win-11-iot-2024-high-end":656,
                    "win-11-iot-2024-value":657,"win-10-iot-2021-high-end":658,"win-10-iot-2021-value":659,
                    "win-11-iot-ml-high-end":660,"win-11-iot-ml-value":661,"win-11-iot-ml-entry":662,
                    "win-10-iot-2019-high-end":663,"win-10-iot-2019-value":664,"win-svr-iot-2025":665,
                    "win-svr-iot-2022":666,"win-svr-iot-2019":667,"sql-svr-2019-runtime":668,"sql-svr-2022-runtime":669
                  };
                  const wid = WC_IDS[x.slug];
                  if (wid) window.location.href = '/cart/?add-to-cart=' + wid;
                }}
                  className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-semibold py-2.5 rounded-xl transition">{t("product.add_to_cart")}</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
