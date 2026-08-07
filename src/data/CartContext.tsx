import { createContext, useContext } from "react";
import { useWooCart } from "../hooks/useWooCart";
import type { WCCart } from "../hooks/useWooCart";

export interface CartContextType {
  cart: WCCart;
  addToCart: (slug: string, name: string, price: number, qty?: number) => void;
  checkout: () => void;
  buyNow: (slug: string, name: string, price: number) => void;
  openCart: () => void;
  flushCart: () => Promise<void>;
  clearCart: () => void;
  refresh: () => Promise<void>;
}

export const CartCtx = createContext<CartContextType>(null!);
export const useCart = () => useContext(CartCtx);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const wooCart = useWooCart();
  return <CartCtx.Provider value={wooCart}>{children}</CartCtx.Provider>;
}
