 // KeyStarter API service - fetches product data with multi-language support
 import { fetchProducts as fetchProductsMapped, fetchProduct } from "../data/mapProduct";
 import type { SPAProduct } from "../data/mapProduct";
 
 export { fetchProduct };
 export type { SPAProduct };
 
 export async function fetchProducts(lang = "en"): Promise<SPAProduct[]> {
   return await fetchProductsMapped(lang, false);
 }
 
 export function getProductData(
   apiProducts: SPAProduct[],
   slug: string
 ): SPAProduct | null {
   if (!apiProducts || apiProducts.length === 0) return null;
   return apiProducts.find(p => p.slug === slug) || null;
 }
 
 export { fetchProductsMapped };
