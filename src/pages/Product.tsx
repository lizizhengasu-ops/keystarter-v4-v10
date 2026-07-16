import {useParams, Link} from "react-router-dom";
import {useState, useEffect} from "react";
import {useCart} from "../CartContext";

const products = [
  {id:1,n:"Windows 10 Pro",p:16.99,slug:"windows-10-pro",c:"#106EBE"},
  {id:2,n:"Windows 11 Home",p:14.99,slug:"windows-11-home",c:"#0078D4"},
  {id:3,n:"Windows 11 Pro",p:14.99,slug:"windows-11-pro",c:"#0078D4"},
  {id:4,n:"Office 2021 Pro Plus",p:24.09,slug:"office-2021-pro",c:"#D83B01"},
  {id:5,n:"Office 2026 Home and Student",p:24.99,slug:"office-2026-home",c:"#D83B01"},
  {id:6,n:"Office 2026 Professional Plus",p:34.99,slug:"office-2026-pro",c:"#D83B01"},
  {id:7,n:"Microsoft 365 Personal",p:29.99,slug:"m365-personal",c:"#0078D4"},
  {id:8,n:"Microsoft 365 Family",p:39.99,slug:"m365-family",c:"#0078D4"},
  {id:9,n:"M365 Business Standard",p:49.99,slug:"m365-business",c:"#0078D4"},
  {id:10,n:"Windows Server 2022",p:11.09,slug:"win-svr-2022",c:"#005A9E"},
  {id:11,n:"Windows Server 2025",p:89.99,slug:"server-2025",c:"#005A9E"},
  {id:12,n:"SQL Server 25 Standard",p:149.99,slug:"sql-2025",c:"#005A9E"}
];

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
  const cart = useCart();
  const p = products.find(x => x.slug === slug) || products[1];
  const [selEdition, setSelEdition] = useState(1);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    var m = {"windows-11-pro":13,"windows-11-home":14,"windows-10-pro":15,"m365-personal":16,"m365-family":17,"m365-business":18,"office-2026-pro":19,"office-2026-home":20,"server-2025":21,"sql-2025":22};
    var id = m[p.slug];
    if (id) fetch("/wp-json/keystarter/v1/reviews/"+id).then(function(r){return r.json()}).then(function(d){setReviews(d)}).catch(function(){});
  }, []);


  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="max-w-7xl mx-auto px-6 py-4 text-xs text-[#86868b]">
        <Link to="/" className="hover:text-[#0078d4] transition">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-[#1d1d1f]">{p.n}</span>
      </div>
      <div className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#0078D4]/10 to-[#005A9E]/10 flex items-center justify-center">
            <span className="text-8xl font-bold text-[#0078D4]/20">{p.n[0]}</span>
          </div>
        </div>
        <div>
          <div className="text-[10px] text-[#0078d4] font-semibold uppercase tracking-wider mb-2">Genuine Digital License</div>
          <h1 className="text-3xl font-bold mb-2">{p.n}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-extrabold text-[#0078d4]">${p.p.toFixed(2)}</span>
            <span className="text-xs text-[#86868b] line-through">$199.00</span>
            <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded">Save 92%</span>
          </div>
          <p className="text-sm text-[#86868b] mb-6">Genuine Microsoft license. Instant email delivery. Lifetime activation support.</p>

          <div className="mb-6">
            <div className="text-sm font-semibold mb-3">Select Edition</div>
            <div className="flex gap-2">
              {editions.map((e,i) => (
                <div key={i} onClick={()=>setSelEdition(i)}
                  className={"flex-1 p-3 rounded-xl cursor-pointer text-center border-2 transition-all " +
                    (selEdition===i ? "border-[#0078d4] bg-blue-50" : "border-[#e8e8ed] bg-white")}>
                  <div className="text-xs font-semibold">{e.name}</div>
                  <div className="text-[10px] text-[#86868b]">{e.desc}</div>
                  <div className="text-xs font-semibold text-[#0078d4] mt-1">{e.price}</div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={()=>cart.add({slug:p.slug,name:p.n,price:p.p})}
            className="v5-btn w-full bg-[#0078d4] hover:bg-[#0062b1] text-white font-semibold py-3.5 rounded-xl transition mb-2">
            Add to Cart
          </button>
          <p className="text-[10px] text-[#86868b] text-center">Genuine product - Instant delivery - Secure checkout</p>

          <div className="mt-8 border-t border-[#e8e8ed] pt-6">
            <h3 className="text-base font-bold mb-4">Product Details</h3>
            {features.map((f,i) => (
              <div key={i} className="flex justify-between py-2 border-b border-[#f5f5f7] text-xs">
                <span className="text-[#86868b]">{f[0]}</span>
                <span className="font-medium">{f[1]}</span>
              </div>
            ))}
          
          {reviews.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[#e8e8ed]">
            <h3 className="text-base font-bold mb-4">Customer Reviews</h3>
            {reviews.map(function(r,i){return(
              <div key={i} className="border-b border-[#f5f5f7] py-4">
                <div className="text-yellow-500 text-sm">{String.fromCharCode(9733).repeat(r.rating)}{String.fromCharCode(9734).repeat(5-r.rating)}</div>
                <div className="text-xs font-medium mt-1">{r.author}</div>
                <div className="text-xs text-[#86868b] mt-1">{r.text}</div>
              </div>
            );})}
          </div>
          )}
</div>
        </div>
      </div>
    </div>
  );
}
