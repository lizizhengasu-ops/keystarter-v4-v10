import { useState, useEffect } from "react";
import Portal from "../Portal";
import { useTranslation } from "react-i18next";
import { updateConsent } from "../tracking";

const CONSENT_KEY = "ks_cookie_consent";

export default function CookieConsent() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CONSENT_KEY);
      if (!saved) {
        setVisible(true);
      } else {
        updateConsent(saved === "accepted");
      }
    } catch {}
  }, []);

  const accept = () => {
    try { localStorage.setItem(CONSENT_KEY, "accepted"); } catch {}
    updateConsent(true);
    setVisible(false);
  };

  const reject = () => {
    try { localStorage.setItem(CONSENT_KEY, "rejected"); } catch {}
    updateConsent(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Portal><div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#e8e8ed] shadow-[0_-4px_12px_rgba(0,0,0,0.06)] p-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#86868b] leading-relaxed text-center sm:text-left">
          {t("cookie_banner.text", "This site uses cookies to improve your experience and for analytics.")}{" "}
          <a href="/privacy" className="text-[#7c3aed] hover:underline">{t("cookie_banner.privacy", "Privacy Policy")}</a>
          {t("cookie_banner.and", " and ")}
          <a href="/cookies" className="text-[#7c3aed] hover:underline">{t("cookie_banner.cookie", "Cookie Policy")}</a>.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button onClick={reject}
            className="min-h-[44px] px-4 py-2 text-xs font-semibold border border-[#e8e8ed] rounded-xl text-[#86868b] hover:bg-[#f5f5f7] transition bg-transparent cursor-pointer">
            {t("cookie_banner.reject", "Reject All")}
          </button>
          <button onClick={accept}
            className="min-h-[44px] px-4 py-2 text-xs font-semibold bg-[#7c3aed] text-white rounded-xl hover:bg-[#6d28d9] transition cursor-pointer">
            {t("cookie_banner.accept", "Accept All")}
          </button>
        </div>
      </div>
    </div></Portal>
  );
}
