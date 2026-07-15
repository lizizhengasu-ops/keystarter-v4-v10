// KeyStarter API service - fetches product data from WooCommerce
const API_BASE = "/wp-json/ks/v1";

export async function fetchProducts() {
  const res = await fetch(API_BASE + "/products");
  if (!res.ok) throw new Error("API error: " + res.status);
  return await res.json();
}

export function getProductData(apiProducts, name) {
  if (!apiProducts || apiProducts.length === 0) return null;
  return apiProducts.find(p => p.name === name) || null;
}