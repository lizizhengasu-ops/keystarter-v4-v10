import { useCart } from "../CartContext";
import { Link } from "react-router-dom";

const categories = [
  {name:"Windows 11 Pro", slug:"windows-11-pro", color:"#0078D4", items:["Single PC","2 PCs","Pro + Office Bundle","Pro + Office + Visio"]},
  {name:"Windows 10 Pro", slug:"windows-10-pro", color:"#106EBE", items:["Single PC","2 PCs","Pro + Office Bundle","Server 2019 + Office"]},
  {name:"Office 2021 Pro", slug:"office-2021-pro", color:"#D83B01", items:["Office 2021 Pro Plus","Office 2019 Pro Plus","Office 2016 Pro Plus","2024 Pro Plus"]},
  {name:"Server and Tools", slug:"win-svr-2022", color:"#005A9E", items:["Server 2019","Server 2022","Exchange 2019","SQL Server 2019"]}
];

const featured = [
  {n:"Windows 11 Pro",p:14.99,s:"windows-11-pro",desc:"Latest OS, Copilot AI"},
  {n:"Office 2021 Pro Plus",p:24.99,s:"office-2021-pro",desc:"Word, Excel, PowerPoint"},
  {n:"Windows Server 2022",p:11.99,s:"win-svr-2022",desc:"Enterprise server"},
  {n:"Office 2024 Pro Plus",p:8.99,s:"office-2024-pro",desc:"Latest suite release"},
];

export default function StorePage() {
  const { addToCart } = useCart();
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#0078D4] via-[#106EBE] to-[#005A9E] text-white px-6 sm:px-12 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">All Products</h1>
        <p className="text-lg font-light max-w-2xl mx-auto">Microsoft authorized software. Genuine products guaranteed. Instant digital delivery.</p>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">Categories</h2>
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
              <Link to={"/products"} className="inline-block mt-3 text-xs font-semibold text-[#0078d4] hover:underline">View Details &gt;</Link>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-8">Featured</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {featured.map((x,i)=>(
            <div key={i} className="bg-white rounded-2xl p-4 border border-[#e8e8ed] hover:shadow-md transition-shadow">
              <div className="w-full h-[140px] rounded-xl mb-3 bg-gradient-to-br from-[#0078D4]/10 to-[#005A9E]/10 flex items-center justify-center">
                <span className="text-4xl font-bold text-[#0078D4]/30">{x.n[0]}</span>
              </div>
              <div className="text-[10px] text-[#86868b] font-semibold uppercase tracking-wider mb-1">Microsoft License</div>
              <div className="text-sm font-bold mb-1">{x.n}</div>
              <div className="text-xs text-[#86868b] mb-2">{x.desc}</div>
              <div className="text-lg font-extrabold text-[#0078d4] mb-3">${x.p.toFixed(2)}</div>
              <button onClick={()=>addToCart({slug:x.s,name:x.n,price:x.p})}
                className="w-full bg-[#0078d4] hover:bg-[#0062b1] text-white text-xs font-semibold py-2.5 rounded-xl transition">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
