import { useEffect } from "react";
import { type WCItem } from "../hooks/useWooCart";
import { useCart } from "../data/CartContext";
import Portal from "../Portal";

export default function WooCartFlyout({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cart, checkout, refresh, openCart } = useCart();

  // Background verification when cart opens — always before early return
  useEffect(() => { if (open) refresh(); }, [open, refresh]);

  if (!open) return null;

  return (
    <Portal>
    <div
      className="fixed inset-0 z-50"
      onClick={onClose}
    >
      <div
        className="absolute right-4 top-16 w-[360px] bg-white rounded-2xl shadow-2xl border border-[#e8e8ed] p-5 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm font-bold text-[#1d1d1f] mb-4">
          Your Bag ({cart.items_count})
        </p>

        {cart.loading ? (
          <p className="text-xs text-[#86868b]">Loading...</p>
        ) : cart.items.length === 0 ? (
          <p className="text-xs text-[#86868b]">Your cart is empty</p>
        ) : (
          <>
            {cart.items.map((item: WCItem) => (
              <div
                key={item.id}
                className="flex items-center gap-3 mb-3 pb-3 border-b border-[#f5f5f7] last:border-none last:mb-0 last:pb-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#1d1d1f] truncate">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-[#86868b]">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-bold text-[#1d1d1f] flex-shrink-0">
                  ${(parseInt(item.totals?.line_total || "0") / 100).toFixed(2)}
                </p>
              </div>
            ))}
            <a
              href="/cart/"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); openCart(); }}
              className="block text-center text-sm font-semibold bg-[#7c3aed] text-white py-2.5 rounded-xl mt-4 no-underline hover:bg-[#6d28d9] transition"
            >
              View Cart
            </a>
            <button
              onClick={(e) => { e.stopPropagation(); checkout(); }}
              className="block w-full text-center text-xs text-[#7c3aed] mt-2 no-underline hover:underline cursor-pointer bg-transparent border-none"
            >
              Checkout
            </button>
        </>
        )}
      </div>
    </div>
    </Portal>
  );
}
