import { Link } from "react-router-dom";
import { useLanguage } from "../I18nContext";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-8xl font-bold text-[#1d1d1f] mb-4">{t("notfound.title")}</div>
        <p className="text-lg text-[#86868b] mb-8">{t("notfound.subtitle")}</p>
        <Link to="/" className="inline-block bg-[#0078d4] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#0062b1] transition">{t("notfound.back")}</Link>
      </div>
    </div>
  );
}
