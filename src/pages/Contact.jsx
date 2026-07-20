import { useTranslation } from "react-i18next";

export default function ContactPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{t("contact.title")}</h1>
        <p className="text-[#86868b] mb-10">{t("contact.desc")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed]">
            <div className="mb-4"><label className="text-sm font-semibold block mb-1">{t("contact.name")}</label><input className="w-full p-2.5 border border-[#e8e8ed] rounded-xl text-sm" /></div>
            <div className="mb-4"><label className="text-sm font-semibold block mb-1">{t("contact.email")}</label><input className="w-full p-2.5 border border-[#e8e8ed] rounded-xl text-sm" type="email" /></div>
            <div className="mb-4"><label className="text-sm font-semibold block mb-1">{t("contact.subject")}</label>
              <select className="w-full p-2.5 border border-[#e8e8ed] rounded-xl text-sm bg-white">
                <option>{t("contact.general")}</option><option>{t("contact.tech")}</option><option>{t("contact.b2b")}</option><option>{t("contact.partnership")}</option><option>{t("contact.other")}</option>
              </select>
            </div>
            <div className="mb-4"><label className="text-sm font-semibold block mb-1">{t("contact.message")}</label><textarea className="w-full p-2.5 border border-[#e8e8ed] rounded-xl text-sm" rows={4} /></div>
            <button className="w-full bg-[#0078d4] text-white py-3 rounded-xl font-semibold border-none cursor-pointer hover:bg-[#0062b1] transition">{t("contact.send")}</button>
            <p className="text-xs text-[#86868b] text-center mt-3">{t("contact.response")}</p>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed]"><div className="font-semibold mb-1">{t("contact.email")}</div><div className="text-sm text-[#86868b]">support@keystarter.com</div></div>
            <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed]"><div className="font-semibold mb-1">{t("contact.chat")}</div><div className="text-sm text-[#86868b]">{t("contact.chat_avail")}</div></div>
            <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed]"><div className="font-semibold mb-1">{t("contact.phone")}</div><div className="text-sm text-[#86868b]">{t("contact.hours")}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
