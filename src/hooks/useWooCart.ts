// useWooCart.ts - Local cart state (no WooCommerce Store API)
// Cart is stored in memory + sessionStorage
// Add to cart = instant (0ms network)
// Checkout/Buy Now = sync to WooCommerce via checkout-sync.php
import { useState, useCallback } from "react";

const CART_KEY = "ks_local_cart_v4";

export type WCItem = {
  id: number;
  slug: string;
  name: string;
  quantity: number;
  totals: { line_total: string; line_subtotal?: string };
  images?: { src: string }[];
};

export type WCCart = {
  items: WCItem[];
  items_count: number;
  total: string;
  currency: string;
  loading: boolean;
};

const EMPTY_CART: WCCart = {
  items: [], items_count: 0, total: "0", currency: "USD", loading: false,
};

function loadCart(): WCCart {
  try {
    const c = sessionStorage.getItem(CART_KEY);
    if (c) return { ...JSON.parse(c), loading: false };
  } catch {}
  return EMPTY_CART;
}

function saveCart(cart: WCCart) {
  try { sessionStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {}
}

export function useWooCart() {
  const [cart, setCart] = useState<WCCart>(loadCart);

  const addToCart = useCallback((slug: string, name: string, price: number, qty = 1) => {
    setCart(prev => {
      const existing = prev.items.find(i => i.slug === slug);
      let newItems: WCItem[];
      if (existing) {
        const newQty = existing.quantity + qty;
        newItems = prev.items.map(i =>
          i.slug === slug
            ? { ...i, quantity: newQty, totals: { ...i.totals, line_total: String(newQty * price * 100) } }
            : i
        );
      } else {
        newItems = [...prev.items, {
          id: 0, slug, name, quantity: qty,
          totals: { line_total: String(qty * price * 100) },
        }];
      }
      const newCart: WCCart = {
        items: newItems,
        items_count: newItems.reduce((s, i) => s + i.quantity, 0),
        total: String(newItems.reduce((s, i) => s + parseInt(i.totals.line_total), 0)),
        currency: "USD", loading: false,
      };
      saveCart(newCart);
      return newCart;
    });
  }, []);

  const checkout = useCallback(() => {
    const items = cart.items.filter(i => i.slug).map(i => ({ slug: i.slug, qty: i.quantity }));
    if (items.length === 0) { window.location.href = '/cart/'; return; }
    window.location.href = '/checkout-sync.php?items=' + encodeURIComponent(JSON.stringify(items));
  }, [cart]);

  const buyNow = useCallback((slug: string, name: string, price: number) => {
    addToCart(slug, name, price, 1);
    setTimeout(() => {
      window.location.href = '/checkout-sync.php?items=' + encodeURIComponent(JSON.stringify([{ slug, qty: 1 }]));
    }, 50);
  }, [addToCart]);

  const removeItem = useCallback((slug: string) => {
    setCart(prev => {
      const newItems = prev.items.filter(i => i.slug !== slug);
      const newCart = {
        items: newItems,
        items_count: newItems.reduce((s, i) => s + i.quantity, 0),
        total: String(newItems.reduce((s, i) => s + parseInt(i.totals.line_total), 0)),
        currency: "USD", loading: false,
      };
      saveCart(newCart);
      return newCart;
    });
  }, []);

  const clearCart = useCallback(() => {
    saveCart(EMPTY_CART);
    setCart(EMPTY_CART);
  }, []);

  return { cart, addToCart, checkout, buyNow, removeItem, clearCart, refresh: () => {} };
}
