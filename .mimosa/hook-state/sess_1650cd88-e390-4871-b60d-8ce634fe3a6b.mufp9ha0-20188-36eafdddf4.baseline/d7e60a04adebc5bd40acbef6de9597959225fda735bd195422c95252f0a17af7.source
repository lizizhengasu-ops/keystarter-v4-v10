// Terminal skin data helpers — slug→box-art mapping, category buckets,
// deterministic ratings. Images live in /terminal/img (deployed per site).

export const TERM_IMG: Record<string, string> = {
  "windows-11-pro": "box-win11-pro.webp",
  "windows-11-home": "box-win11-home.webp",
  "windows-10-pro": "pic-win10-pro.webp",
  "windows-10-home": "box-win10-home.webp",
  "windows-11-pro-official": "box-win11-pro.webp",
  "windows-10-pro-official": "pic-win10-pro.webp",
  "windows-11-home-official": "pic-win10-home-official.webp",
  "windows-10-home-official": "pic-win10-home.webp",
  "office-2021-pro-plus": "box-office-2021.webp",
  "office-2019-pro-plus": "box-office-2019.webp",
  "win-svr-iot-2022": "pic-svr2022.webp",
  "win-svr-iot-2019": "box-server-2019.webp",
  "win-svr-iot-2025": "box-svr-iot-2025.webp",
  "sql-svr-2022-runtime": "box-sql-2022.webp",
  "sql-svr-2019-runtime": "box-sql-2019.webp",
  "win-11-iot-2024-value": "box-iot-win11-value.webp",
  "win-11-iot-2024-high-end": "box-iot-win11-high-end.webp",
  "win-11-iot-2024-entry": "box-iot-win11-entry.webp",
  "win-10-iot-2021-value": "box-iot-win10.webp",
  "win-10-iot-2021-high-end": "box-iot-win10.webp",
  "win-10-iot-2021-entry": "pic-iot2021-entry.webp",
  "win-10-iot-2019-value": "box-iot-win10.webp",
  "win-10-iot-2019-high-end": "box-iot-win10.webp",
  "win-10-iot-2019-entry": "pic-iot2021-entry.webp",
  "win-11-iot-ml-value": "box-iot-ml-value.webp",
  "win-11-iot-ml-high-end": "box-iot-ml-high-end.webp",
  "win-11-iot-ml-entry": "box-iot-ml-entry.webp",
};

export function termImg(slug: string): string {
  return "/terminal/img/" + (TERM_IMG[slug] || "box-win11-pro.webp");
}

/** Bucket a product into the mockup's filter chips. */
export function termCat(slug: string, category?: string): "windows" | "office" | "server" | "iot" {
  const c = (category || "").toLowerCase();
  if (c.includes("office")) return "office";
  if (c.includes("sql") || c.includes("server")) return "server";
  if (c.includes("iot")) return slug.startsWith("win-svr") ? "server" : "iot";
  const s = slug.toLowerCase();
  if (s.includes("office")) return "office";
  if (s.includes("sql")) return "server";
  if (s.includes("win-svr")) return "server";
  if (s.includes("iot")) return "iot";
  return "windows";
}

/** Deterministic pseudo-rating so cards vary without fake per-SKU copy. */
export function termRating(slug: string): { stars: string; score: string; count: number } {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) % 997;
  const score = (4.6 + (h % 4) / 10).toFixed(1); // 4.6 – 4.9
  const count = 9 + (h % 91);
  const full = Math.round(Number(score));
  return { stars: "★★★★★".slice(0, full) + "☆".repeat(5 - full), score, count };
}

export function termPrice(n: number): string {
  return "$" + Number(n || 0).toFixed(2);
}

export function termBadge(cat: string): string {
  return { windows: "OEM", office: "PERPETUAL", server: "SERVER", iot: "IOT" }[cat] || "OEM";
}

/** Mockup's curated "Featured" order (products.html), rest appended. */
export const TERM_ORDER = [
  "windows-11-pro", "windows-10-pro", "windows-11-pro-official", "windows-11-home",
  "office-2021-pro-plus", "office-2019-pro-plus", "win-svr-iot-2022", "sql-svr-2022-runtime",
  "win-11-iot-2024-value", "win-11-iot-2024-high-end", "sql-svr-2019-runtime", "windows-10-pro-official",
  "windows-10-home", "windows-11-home-official", "windows-10-home-official",
  "win-11-iot-2024-entry", "win-10-iot-2021-value", "win-10-iot-2021-high-end", "win-10-iot-2021-entry",
  "win-10-iot-2019-value", "win-10-iot-2019-high-end", "win-10-iot-2019-entry",
  "win-11-iot-ml-value", "win-11-iot-ml-high-end", "win-11-iot-ml-entry",
  "win-svr-iot-2019", "win-svr-iot-2025", "shop1-payment-test",
];

/** Test SKUs never shown to customers (reachable via direct URL / checkout-sync only). */
export const TEST_SKUS = new Set(["testms", "shop1-payment-test"]);

export function isTestSku(slug: string): boolean {
  return TEST_SKUS.has(slug);
}

export function termFeaturedRank(slug: string): number {
  const i = TERM_ORDER.indexOf(slug);
  return i === -1 ? 999 : i;
}
