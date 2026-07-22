import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { useTranslation } from "react-i18next";

export default function CartFlyout({ open, onClose }) {
  const cart = useCart();
  const { t } = useTranslation();
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    if (open) setTimeout(() => document.addEventListener("click", h), 0);
    return () => document.removeEventListener("click", h);
  }, [open, onClose]);
  if (!open || cart.items.length === 0) return null;
  return (
    <div ref={ref} className="absolute right-0 top-full mt-1 w-[340px] bg-white rounded-2xl shadow-2xl border border-[#e8e8ed] p-5 z-[200] max-h-[70vh] overflow-y-auto">
      <p className="text-sm font-bold text-[#1d1d1f] mb-4">{t("cart.bag").replace("{count}", String(cart.count))}</p>
      {cart.items.map((x, i) => (
        <div key={i} className="flex items-center gap-3 mb-3 pb-3 border-b border-[#f5f5f7] last:border-none last:mb-0 last:pb-0">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#7c3aed]/10 to-[#6d28d9]/10 flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold text-[#7c3aed]/30">{x.name[0]}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#1d1d1f] truncate">{x.name}</p>
            <p className="text-[10px] text-[#86868b]">{t("cart.qty")}: {x.qty} × ${x.price.toFixed(2)}</p>
          </div>
          <p className="text-sm font-bold text-[#1d1d1f] flex-shrink-0">${(x.price * x.qty).toFixed(2)}</p>
        </div>
      ))}
      <div className="flex justify-between text-sm font-bold text-[#1d1d1f] mt-4 pt-3 border-t border-[#e8e8ed]">
        <span>{t("cart.subtotal")}</span><span>${cart.total.toFixed(2)}</span>
      </div>
      <Link to="/cart" onClick={onClose} className="block text-center text-sm font-semibold bg-[#7c3aed] text-white py-2.5 rounded-xl mt-4 no-underline hover:bg-[#6d28d9] transition">{t("cart.checkout")}</Link>
      <Link to="/cart" onClick={onClose} className="block text-center text-xs text-[#7c3aed] mt-2 no-underline hover:underline">{t("cart.view")}</Link>
    </div>
  );
}
