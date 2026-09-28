import { TRACKING_CONFIG } from "./data/tracking-config";

declare global {
  interface Window {
    dataLayer: any[];
    __gtagLoaded?: number;
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push([...args]);
}

function makeEventId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function setCookie(name: string, value: string, days = 30) {
  const expires = new Date(Date.now() + days * 86400 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires}; SameSite=Lax`;
}

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

function isTestMode() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("test") === "1" || params.get("ks_test") === "1") return true;
  try {
    if (localStorage.getItem("ks_test_mode") === "1") return true;
  } catch {
    return false;
  }
  if (getCookie("ks_test") === "1") return true;
  return window.location.hostname.includes("staging") || window.location.hostname.startsWith("test.");
}

export function enableTestMode() {
  try {
    localStorage.setItem("ks_test_mode", "1");
  } catch {
    // ignore storage limits
  }
  setCookie("ks_test", "1");
  pushEvent("test_mode_enabled", { test: "1" });
}

export function disableTestMode() {
  try {
    localStorage.removeItem("ks_test_mode");
  } catch {
    // ignore storage limits
  }
  setCookie("ks_test", "0", 0);
  pushEvent("test_mode_disabled");
}

let initialized = false;

export function initTracking() {
  if (initialized) return;
  initialized = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || gtag;
  const params = new URLSearchParams(window.location.search);
  if (params.get("test") === "1" || params.get("ks_test") === "1") {
    try {
      localStorage.setItem("ks_test_mode", "1");
    } catch {
      // ignore storage limits
    }
    setCookie("ks_test", "1");
  }

  if (TRACKING_CONFIG.consentMode) {
    gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      functionality_storage: "granted",
      personalization_storage: "granted",
      security_storage: "granted",
      wait_for_update: 500,
    });
  }

  const id = TRACKING_CONFIG.gaMeasurementId;
  if (!id) return;
  gtag("js", new Date());
  gtag("config", id, { send_page_view: false });
  if (TRACKING_CONFIG.adsId && TRACKING_CONFIG.adsId !== id) {
    gtag("config", TRACKING_CONFIG.adsId);
  }
  const load = () => {
    if (window.__gtagLoaded) return;
    window.__gtagLoaded = 1;
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s);
  };
  const ric = (window as any).requestIdleCallback;
  if (typeof ric === "function") {
    window.addEventListener("load", () => ric(load, { timeout: 3000 }));
  } else {
    window.addEventListener("load", () => setTimeout(load, 1500));
  }
}

export function updateConsent(accepted: boolean) {
  if (!TRACKING_CONFIG.consentMode) return;
  gtag("consent", "update", {
    analytics_storage: accepted ? "granted" : "denied",
    ad_storage: accepted ? "granted" : "denied",
    ad_user_data: accepted ? "granted" : "denied",
    ad_personalization: accepted ? "granted" : "denied",
  });
}

export function pushEvent(name: string, params: Record<string, unknown> = {}) {
  if (!name) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: name,
    event_id: makeEventId(),
    ...(isTestMode() ? { test: "1" } : {}),
    ...(isTestMode() ? { debug_mode: true } : {}),
    ...params,
  });
}

initTracking();
