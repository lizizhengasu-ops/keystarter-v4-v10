 // Map WooCommerce API product data to SPA format
 // API: /wp-json/wc/store/v1/products  (no auth needed)
 // API: /wp-json/wc/v3/products  (needs API key)
 
 import { products as localProducts } from "./products";
 
 export interface SPAProduct {
   slug: string;
   name: string;
   price: number;
   description: string;
   specs: Record<string, string>;
   color: string;
   category?: string;
   image?: string;
 }
 
 const DEFAULT_SPECS = {
   version: "",
   platform: "PC / 64-bit",
   lang: "Multi-language",
   activation: "Digital License",
   type: "Retail",
   support: "Lifetime",
 };
 
 // Map Store API product to SPA format
 export function mapStoreProduct(apiItem: any): SPAProduct | null {
   if (!apiItem || !apiItem.slug) return null;
   
   // Try to find local product for specs/color fallback
   const local = localProducts.find(p => p.slug === apiItem.slug);
   
   return {
     slug: apiItem.slug,
     name: apiItem.name || apiItem.title || local?.n || apiItem.slug,
     price: parseFloat(apiItem.prices?.price || apiItem.price || local?.p || "0"),
     description: apiItem.description || apiItem.short_description || local?.d || "",
     specs: local?.specs || DEFAULT_SPECS,
     color: local?.c || "#0078D4",
     category: apiItem.categories?.[0]?.name || "",
     image: apiItem.images?.[0]?.src || "",
   };
 }
 
 // Map WC REST API v3 product to SPA format
 export function mapV3Product(apiItem: any): SPAProduct | null {
   if (!apiItem || !apiItem.slug) return null;
   
   const local = localProducts.find(p => p.slug === apiItem.slug);
   
   return {
     slug: apiItem.slug,
     name: apiItem.name || local?.n || apiItem.slug,
     price: parseFloat(apiItem.price || local?.p || "0"),
     description: apiItem.short_description || apiItem.description || local?.d || "",
     specs: local?.specs || DEFAULT_SPECS,
     color: local?.c || "#0078D4",
     category: apiItem.categories?.[0]?.name || "",
     image: apiItem.images?.[0]?.src || "",
   };
 }
 
 // Batch: fetch products with language support
 export async function fetchProducts(lang = "en", useV3 = false): Promise<SPAProduct[]> {
   const langSuffix = lang !== "en" ? `?lang=${lang}` : "";
   const apiBase = useV3 ? "/wp-json/wc/v3/products" : "/wp-json/wc/store/v1/products";
   
   try {
     const res = await fetch(`${apiBase}${langSuffix}`, {
       signal: AbortSignal.timeout?.() ? AbortSignal.timeout(8000) : undefined
     });
     if (!res.ok) throw new Error(`HTTP ${res.status}`);
     const data = await res.json();
     
     if (!Array.isArray(data)) return [];
     const mapper = useV3 ? mapV3Product : mapStoreProduct;
     return data.map(mapper).filter(Boolean) as SPAProduct[];
   } catch (err) {
     console.warn("fetchProducts failed, using local fallback:", err);
     return localProducts.map(p => ({
       slug: p.slug,
       name: p.n,
       price: p.p,
       description: p.d,
       specs: p.specs || DEFAULT_SPECS,
       color: p.c || "#0078D4",
     }));
   }
 }
 
 // Single: fetch one product by slug
 export async function fetchProduct(slug: string, lang = "en"): Promise<SPAProduct | null> {
   const all = await fetchProducts(lang);
   return all.find(p => p.slug === slug) || null;
 }
