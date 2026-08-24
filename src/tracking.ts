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

let initialized = false;

export function initTracking() {
  if (initialized) return;
  initialized = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || gtag;

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
    ...params,
  });
}

initTracking();
