// useWooCart.ts - Dual-sync cart: local state + WooCommerce
// Reads from Store API (GET, no nonce needed)
// Writes via cart-sync.php (our endpoint, no nonce needed)
import { useState, useEffect, useCallback } from "react";

const CART_KEY = "ks_cart_v5";
const API = "/wp-json/wc/store/v1/cart";
const SYNC = "/cart-sync.php";

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

const EMPTY: WCCart = { items: [], items_count: 0, total: "0", currency: "USD", loading: false };

function loadCart(): WCCart {
  try {
    const c = sessionStorage.getItem(CART_KEY);
    if (c) return { ...JSON.parse(c), loading: false };
  } catch {}
  return EMPTY;
}

function saveCart(c: WCCart) {
  try { sessionStorage.setItem(CART_KEY, JSON.stringify(c)); } catch {}
}

function parseCartFromApi(d: any): WCCart {
  const items: WCItem[] = (d.items || []).map((i: any) => ({
    id: i.id || 0,
    slug: "",
    name: i.name || "",
    quantity: i.quantity || 0,
    totals: i.totals || { line_total: "0" },
  }));
  return {
    items,
    items_count: d.items_count || items.reduce((s: number, i: WCItem) => s + i.quantity, 0),
    total: d.totals?.total_items || "0",
    currency: d.totals?.currency_code || "USD",
    loading: false,
  };
}

function xhr(method: string, url: string, body?: any): Promise<any> {
  return new Promise((ok, fail) => {
    const x = new XMLHttpRequest();
    x.open(method, url, true);
    x.setRequestHeader("Content-Type", "application/json");
    x.timeout = 20000;
    x.onload = () => {
      try { ok(JSON.parse(x.responseText)); } catch { ok({}); }
    };
    x.onerror = () => fail(x.statusText);
    x.ontimeout = () => fail(new Error("timeout"));
    body ? x.send(JSON.stringify(body)) : x.send();
  });
}

export function useWooCart() {
  const [cart, setCart] = useState<WCCart>(loadCart);

  const fetchCart = useCallback(async () => {
    try {
      const d = await xhr("GET", API);
      const newCart = parseCartFromApi(d);
      saveCart(newCart);
      setCart(newCart);
    } catch (e) {
      setCart(p => ({ ...p, loading: false }));
    }
  }, []);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addToCart = useCallback((slug: string, name: string, price: number, qty = 1) => {
    // 1. Update local state immediately
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
        newItems = [...prev.items, { id: 0, slug, name, quantity: qty, totals: { line_total: String(qty * price * 100) } }];
      }
      const nc = { items: newItems, items_count: newItems.reduce((s, i) => s + i.quantity, 0), total: String(newItems.reduce((s, i) => s + parseInt(i.totals.line_total), 0)), currency: "USD", loading: false };
      saveCart(nc);
      return nc;
    });
    // 2. Sync to WooCommerce in background (fire-and-forget)
    xhr("POST", SYNC, { items: [{ slug, qty }] }).catch(() => {});
  }, []);

  const checkout = useCallback(async () => {
    // Sync ALL items to WC, then redirect to checkout
    const items = cart.items.filter(i => i.slug).map(i => ({ slug: i.slug, qty: i.quantity }));
    const encoded = encodeURIComponent(JSON.stringify(items));
    window.location.href = '/checkout-sync.php?items=' + encoded;
  }, [cart]);

  const buyNow = useCallback(async (slug: string, name: string, price: number) => {
    addToCart(slug, name, price, 1);
    // Let local state update, then redirect to checkout-sync with this item
    setTimeout(() => {
      window.location.href = '/checkout-sync.php?items=' + encodeURIComponent(JSON.stringify([{ slug, qty: 1 }]));
    }, 100);
  }, [addToCart]);

  const clearCart = useCallback(() => {
    saveCart(EMPTY);
    setCart(EMPTY);
  }, []);

  return { cart, addToCart, checkout, buyNow, clearCart, refresh: fetchCart };
}
