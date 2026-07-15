import { useCart } from "../CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { items, remove, updateQty, total } = useCart();
  const tax = total * 0.08;
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">购物车</h1>
        {items.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-6 text-[#e8e8ed]">
              <svg className="w-24 h-24 mx-auto text-[#d2d2d7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <div className="text-lg text-[#86868b] mb-6">购物车是空的</div>
            <Link to="/store" className="inline-block bg-[#0078d4] text-white px-8 py-3 text-sm font-semibold rounded-xl hover:bg-[#0062b1] transition">去选购商品</Link>
          </div>
        ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((it,i)=>(
              <div key={i} className="bg-white rounded-2xl p-5 border border-[#e8e8ed] flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex-1 flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0078D4]/10 to-[#005A9E]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-[#0078D4]/30">{it.name[0]}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold">{it.name}</div>
                    <div className="text-[10px] text-[#86868b] mt-0.5">数字授权 · 即时发货</div>
                    <button onClick={()=>remove(it.slug)} className="text-xs text-[#86868b] hover:text-red-500 bg-transparent border-none p-0 mt-1 cursor-pointer transition">删除</button>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="text-xs text-[#86868b]">${it.price.toFixed(2)}</div>
                  <select value={it.qty} onChange={e=>updateQty(it.slug,Number(e.target.value))} className="p-1.5 border border-[#e8e8ed] rounded-lg text-xs bg-white">
                    {[1,2,3,4,5].map(n=><option key={n} value={n}>{n}</option>)}
                  </select>
                  <div className="text-sm font-bold w-16 text-right">${(it.price * it.qty).toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed] h-fit">
            <h2 className="text-lg font-bold mb-4">订单摘要</h2>
            <div className="flex justify-between text-xs mb-3"><span>小计</span><span>${total.toFixed(2)}</span></div>
            <div className="flex justify-between text-xs mb-3 text-green-600"><span>运费</span><span>免费（数字商品）</span></div>
            <div className="flex justify-between text-xs mb-3"><span>预估税费</span><span>${tax.toFixed(2)}</span></div>
            <div className="border-t border-[#e8e8ed] my-4 pt-4 flex justify-between text-lg font-bold"><span>合计</span><span>${(total + tax).toFixed(2)}</span></div>
            <p className="text-[10px] text-green-600 mb-4 text-center">付款后密钥将通过邮件立即发送</p>
            <button className="v5-btn w-full bg-[#0078d4] hover:bg-[#0062b1] text-white font-semibold py-3 rounded-xl transition cursor-pointer">去结算</button>
            <Link to="/store" className="block text-center py-2 text-xs text-[#0078d4] hover:underline mt-3">继续购物</Link>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
