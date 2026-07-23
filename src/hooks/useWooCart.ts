// useWooCart.ts - WooCommerce Cart via Store API
// Uses XHR to avoid CSP issues with fetch/eval
import { useState, useEffect, useCallback } from "react";

const API = "/wp-json/wc/store/v1/cart";
// Module-level nonce: fetched once on first use
let NONCE = "";
let noncePromise: Promise<string> | null = null;
function ensureNonce(): Promise<string> {
  if (NONCE) return Promise.resolve(NONCE);
  if (noncePromise) return noncePromise;
  noncePromise = new Promise((ok) => {
    const x = new XMLHttpRequest();
    x.open("GET", API, true);
    x.onload = () => {
      // WC Store API returns nonce in either header name
      NONCE = x.getResponseHeader("X-WC-Store-API-Nonce") || x.getResponseHeader("nonce") || "";
      ok(NONCE);
    };
    x.onerror = () => { NONCE = ""; ok(""); };
    x.send();
  });
  return noncePromise;
}

export type WCItem = {
  id: number;
  name: string;
  quantity: number;
  line_total: string;
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
  return ensureNonce().then(() => new Promise((ok, fail) => {
    const x = new XMLHttpRequest();
    x.open(method, url, true);
    x.setRequestHeader("Content-Type", "application/json");
    x.setRequestHeader("X-WC-Store-API-Nonce", NONCE);
    x.onload = () => ok(JSON.parse(x.responseText));
    x.onerror = () => fail(x.statusText);
    body ? x.send(JSON.stringify(body)) : x.send();
  }));
}

export function useWooCart() {
  const [cart, setCart] = useState<WCCart>({
    items: [], items_count: 0, total: "0", currency: "USD", loading: true,
  });

  const fetchCart = useCallback(async () => {
    try {
      const d = await xhr("GET", API);
      setCart({
        items: d.items || [],
        items_count: d.items_count || 0,
        total: d.totals?.total_items || "0",
        currency: d.totals?.currency_code || "USD",
        loading: false,
      });
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
