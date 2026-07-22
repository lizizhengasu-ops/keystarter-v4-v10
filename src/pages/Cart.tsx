import { useState } from "react";
import { useCart } from "../CartContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const SLUG_TO_ID = {"office-2019-pro-plus":633,"office-2021-pro-plus":634,"sql-svr-2019-runtime":668,"sql-svr-2022-runtime":669,"win-10-iot-2019-entry":646,"win-10-iot-2019-high-end":663,"win-10-iot-2019-value":664,"win-10-iot-2021-entry":643,"win-10-iot-2021-high-end":658,"win-10-iot-2021-value":659,"win-11-iot-2024-entry":637,"win-11-iot-2024-high-end":656,"win-11-iot-2024-value":657,"win-11-iot-ml-entry":662,"win-11-iot-ml-high-end":660,"win-11-iot-ml-value":661,"win-svr-iot-2019":667,"win-svr-iot-2022":666,"win-svr-iot-2025":665,"windows-10-home":632,"windows-10-home-official":655,"windows-10-pro":630,"windows-10-pro-official":653,"windows-11-home":631,"windows-11-home-official":654,"windows-11-pro":629,"windows-11-pro-official":652};

export default function CartPage() {
 const { items, remove, setQty, total } = useCart();
  
  const { t } = useTranslation();
  const tax = total * 0.08;
  const [guestEmail, setGuestEmail] = useState("");
  const [guestName, setGuestName] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{t("cart.title")}</h1>
        {items.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-6 text-[#e8e8ed]">
              <svg className="w-24 h-24 mx-auto text-[#d2d2d7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <div className="text-lg text-[#86868b] mb-6">{t("cart.empty")}</div>
            <Link to="/store" className="inline-block bg-[#7c3aed] text-white px-8 py-3 text-sm font-semibold rounded-xl hover:bg-[#6d28d9] transition">{t("cart.browse")}</Link>
          </div>
        ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((it,i)=>(
              <div key={i} className="bg-white rounded-2xl p-5 border border-[#e8e8ed] flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex-1 flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#7c3aed]/10 to-[#6d28d9]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-[#7c3aed]/30">{it.name[0]}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold">{it.name}</div>
                    <div className="text-[10px] text-[#86868b] mt-0.5">{t("cart.digital")}</div>
                    <button onClick={()=>remove(it.slug)} className="text-xs text-[#86868b] hover:text-red-500 bg-transparent border-none p-0 mt-1 cursor-pointer transition">{t("cart.delete")}</button>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                 <div className="text-xs text-[#86868b]">${it.price.toFixed(2)}</div>
                  <div className="flex items-center border border-[#e8e8ed] rounded-lg overflow-hidden">
                    <button onClick={()=>setQty(it.slug,it.qty-1)} className="px-2 py-1 text-xs hover:bg-[#f5f5f7] transition bg-transparent border-none cursor-pointer" disabled={it.qty<=1}>-</button>
                    <input type="number" value={it.qty} onChange={e=>{const v=parseInt(e.target.value)||1;setQty(it.slug,Math.min(99,Math.max(1,v)))}} className="w-10 text-center text-xs border-none bg-transparent outline-none" min="1" max="99" />
                    <button onClick={()=>setQty(it.slug,it.qty+1)} className="px-2 py-1 text-xs hover:bg-[#f5f5f7] transition bg-transparent border-none cursor-pointer">+</button>
                  </div>
                  <div className="text-sm font-bold w-16 text-right">${(it.price * it.qty).toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed] h-fit">
            <h2 className="text-lg font-bold mb-4">{t("cart.order_summary")}</h2>
            <div className="flex justify-between text-xs mb-3"><span>{t("cart.subtotal")}</span><span>${total.toFixed(2)}</span></div>
            <div className="flex justify-between text-xs mb-3 text-green-600"><span>{t("cart.shipping")}</span><span>{t("cart.free")}</span></div>
            <div className="flex justify-between text-xs mb-3"><span>{t("cart.tax")}</span><span>${tax.toFixed(2)}</span></div>
            <div className="border-t border-[#e8e8ed] my-4 pt-4 flex justify-between text-lg font-bold"><span>{t("cart.total")}</span><span>${(total + tax).toFixed(2)}</span></div>
            <p className="text-[10px] text-green-600 mb-4 text-center">No account needed. Guest checkout.</p>
            <input type="text" placeholder="Your Name" value={guestName} onChange={e=>setGuestName(e.target.value)} className="w-full px-3 py-2 text-xs border border-[#e8e8ed] rounded-lg mb-2 bg-white focus:outline-none focus:border-[#7c3aed]" />
            <input type="email" placeholder="your@email.com" value={guestEmail} onChange={e=>setGuestEmail(e.target.value)} className="w-full px-3 py-2 text-xs border border-[#e8e8ed] rounded-lg mb-3 bg-white focus:outline-none focus:border-[#7c3aed]" />
           <button onClick={()=>{sessionStorage.setItem("ks_checkout_cart",JSON.stringify(items));sessionStorage.setItem("ks_guest",JSON.stringify({name:guestName,email:guestEmail}));window.location.href="/checkout.html";}} disabled={!guestEmail||!guestEmail.includes("@")} className="v5-btn w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold py-3 rounded-xl transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Guest Checkout</button>
            <button onClick={()=>{window.location.href="/checkout-sync.php?items="+encodeURIComponent(JSON.stringify(items.map(i=>({slug:i.slug,qty:i.qty}))));}} disabled={!guestEmail||!guestEmail.includes("@")} className="v5-btn w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold py-3 rounded-xl transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Proceed to Checkout</button>
            <Link to="/store" className="block text-center py-2 text-xs text-[#7c3aed] hover:underline mt-3">{t("cart.continue")}</Link>
          </div>
        </div>
        )}
        {orderPlaced && (
          <div className="max-w-md mx-auto text-center py-16">
            <div className="text-5xl mb-6">{String.fromCodePoint(0x2705)}</div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Order Confirmed!</h2>
            <p className="text-sm text-[#86868b] mb-2">Thank you, {guestName}!</p>
            <p className="text-sm text-[#86868b] mb-6">Your order has been received. We will send the license keys to <strong>{guestEmail}</strong> within 10 minutes.</p>
            <p className="text-xs text-green-600 mb-8">Order Total: ${(total + tax).toFixed(2)} ({items.length} items)</p>
            <Link to="/store" className="inline-block bg-[#7c3aed] text-white px-8 py-3 text-sm font-semibold rounded-xl hover:bg-[#6d28d9] transition no-underline">Continue Shopping</Link>
          </div>
        )}
      </div>
    </div>
  );
}
