// WooCommerce product ID mapping — shared single source of truth
// KEY = SPA slug, VALUE = WC product ID
const WC_IDS: Record<string, number> = {
  "windows-11-pro": 629, "windows-10-pro": 630,
  "windows-11-home": 631, "windows-10-home": 632,
  "office-2019-pro-plus": 633, "office-2021-pro-plus": 634,
  "win-11-iot-2024-entry": 637, "win-10-iot-2021-entry": 643,
  "win-10-iot-2019-entry": 646, "windows-11-pro-official": 652,
  "windows-10-pro-official": 653, "windows-11-home-official": 654,
  "windows-10-home-official": 655, "win-11-iot-2024-high-end": 656,
  "win-11-iot-2024-value": 657, "win-10-iot-2021-high-end": 658,
  "win-10-iot-2021-value": 659, "win-11-iot-ml-high-end": 660,
  "win-11-iot-ml-value": 661, "win-11-iot-ml-entry": 662,
  "win-10-iot-2019-high-end": 663, "win-10-iot-2019-value": 664,
  "win-svr-iot-2025": 665, "win-svr-iot-2022": 666,
  "win-svr-iot-2019": 667, "sql-svr-2019-runtime": 668,
  "sql-svr-2022-runtime": 669,
};

export function getWooId(slug: string): number | undefined {
  return WC_IDS[slug];
}

export { WC_IDS };
export default WC_IDS;
