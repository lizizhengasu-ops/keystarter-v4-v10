// useWooCart.ts - WooCommerce Cart via Store API
// Uses XHR to avoid CSP issues with fetch/eval
import { useState, useEffect, useCallback } from "react";

const API = "/wp-json/wc/store/v1/cart";
export type WCItem = {
  id: number;
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

function xhr(method: string, url: string, body?: any): Promise<any> {
  // Lazily discover nonce from first response; no extra roundtrip
  if (!NONCE && method === "GET") {
    return new Promise((ok, fail) => {
      const x = new XMLHttpRequest();
      x.open("GET", url, true);
      x.setRequestHeader("Content-Type", "application/json");
      x.timeout = 15000;
      x.onload = () => {
        NONCE = x.getResponseHeader("X-WC-Store-API-Nonce") || x.getResponseHeader("nonce") || "";
        try { ok(JSON.parse(x.responseText)); } catch { ok({ items: [], items_count: 0 }); }
      };
      x.onerror = () => fail(x.statusText);
      x.ontimeout = () => fail(new Error("timeout"));
      x.send();
    });
  }
  // Subsequent requests: reuse cached nonce
  return new Promise((ok, fail) => {
    const x = new XMLHttpRequest();
    x.open(method, url, true);
    x.setRequestHeader("Content-Type", "application/json");
    x.setRequestHeader("X-WC-Store-API-Nonce", NONCE);
    x.timeout = 15000;
    x.onload = () => { try { ok(JSON.parse(x.responseText)); } catch { ok({ items: [], items_count: 0 }); } };
    x.onerror = () => fail(x.statusText);
    x.ontimeout = () => fail(new Error("timeout"));
    body ? x.send(JSON.stringify(body)) : x.send();
  });
}

// Module-level nonce cache — learned from first API response
let NONCE = "";
const CART_CACHE_KEY = "ks_cart_v1";

export function useWooCart() {
  const [cart, setCart] = useState<WCCart>(() => {
    try {
      const cached = sessionStorage.getItem(CART_CACHE_KEY);
      if (cached) {
        const c = JSON.parse(cached);
        return { ...c, loading: false };
      }
    } catch {}
    return { items: [], items_count: 0, total: "0", currency: "USD", loading: true };
  });

  const fetchCart = useCallback(async () => {
    try {
      const d = await xhr("GET", API);
      const newCart = {
        items: d.items || [],
        items_count: d.items_count || 0,
        total: d.totals?.total_items || "0",
        currency: d.totals?.currency_code || "USD",
        loading: false,
      };
      try { sessionStorage.setItem(CART_CACHE_KEY, JSON.stringify(newCart)); } catch {}
      setCart(newCart);
    } catch {
      setCart((p) => ({ ...p, loading: false }));
    }
  }, []);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addItem = useCallback(
    async (id: number, qty = 1) => {
      setCart((p) => ({ ...p, loading: true }));
      try {
        await xhr("POST", API + "/add-item", { id, quantity: qty });
        await fetchCart();
      } catch {
        setCart((p) => ({ ...p, loading: false }));
      }
    },
    [fetchCart]
  );

  return {
    cart,
    addItem,
    refresh: fetchCart,
  };
}
