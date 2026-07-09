import {useParams, Link} from "react-router-dom";
import {useState} from "react";
import {useCart} from "../CartContext";

const products = [{"id":1,"n":"Windows 10 Pro","p":13.99,"slug":"windows-10-pro","c":"#0078D4"},{"id":2,"n":"Windows 11 Pro","p":14.99,"slug":"windows-11-pro","c":"#0078D4"},{"id":3,"n":"Office 2021 Pro Plus","p":24.99,"slug":"office-2021-pro","c":"#D83B01"},{"id":4,"n":"Office 2024 Pro Plus","p":8.99,"slug":"office-2024-pro","c":"#D83B01"}];

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

  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="max-w-7xl mx-auto px-6 py-4 text-xs text-[#86868b]">
        <Link to="/" className="hover:text-[#0078d4] transition">首页</Link>
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
          <div className="text-[10px] text-[#0078d4] font-semibold uppercase tracking-wider mb-2">正版数字授权</div>
          <h1 className="text-3xl font-bold mb-2">{p.n}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-extrabold text-[#0078d4]">${p.p.toFixed(2)}</span>
            <span className="text-xs text-[#86868b] line-through">$199.00</span>
            <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded">省92%</span>
          </div>
          <p className="text-sm text-[#86868b] mb-6">正版微软授权密钥，付款后立即通过邮件发货，终身激活支持。</p>

          <div className="mb-6">
            <div className="text-sm font-semibold mb-3">选择版本</div>
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
            加入购物车
          </button>
          <p className="text-[10px] text-[#86868b] text-center">正版产品 · 即时发货 · 安全结算</p>

          <div className="mt-8 border-t border-[#e8e8ed] pt-6">
            <h3 className="text-base font-bold mb-4">产品详情</h3>
            {features.map((f,i) => (
              <div key={i} className="flex justify-between py-2 border-b border-[#f5f5f7] text-xs">
                <span className="text-[#86868b]">{f[0]}</span>
                <span className="font-medium">{f[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
