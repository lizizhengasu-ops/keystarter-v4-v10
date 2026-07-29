import { useTranslation } from "react-i18next";

export default function DownloadsPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased px-6 py-12 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{t("downloads.title") || "Official Microsoft Downloads"}</h1>
        <p className="text-[#86868b] text-sm mb-8">{t("downloads.desc") || "Direct links to official Microsoft software downloads. All keys are separate from downloads."}</p>
        
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed]">
            <h2 className="font-bold text-base mb-3">Windows 11</h2>
            <a href="https://www.microsoft.com/software-download/windows11" target="_blank" rel="noopener noreferrer" className="text-sm text-[#7c3aed] hover:underline">{t("downloads.win11") || "Download Windows 11 (Official)"}</a>
            <p className="text-xs text-[#86868b] mt-1">{t("downloads.win11_desc") || "Create installation media or upgrade this PC."}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed]">
            <h2 className="font-bold text-base mb-3">Windows 10</h2>
            <a href="https://www.microsoft.com/software-download/windows10" target="_blank" rel="noopener noreferrer" className="text-sm text-[#7c3aed] hover:underline">{t("downloads.win10") || "Download Windows 10 (Official)"}</a>
            <p className="text-xs text-[#86868b] mt-1">{t("downloads.win10_desc") || "Download tool to create installation media."}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed]">
            <h2 className="font-bold text-base mb-3">Microsoft Office</h2>
            <a href="https://setup.office.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-[#7c3aed] hover:underline">{t("downloads.office") || "Install Office (Official)"}</a>
            <p className="text-xs text-[#86868b] mt-1">{t("downloads.office_desc") || "Sign in and install Office using your license key."}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed]">
            <h2 className="font-bold text-base mb-3">Windows Server</h2>
            <a href="https://www.microsoft.com/evalcenter/evaluate-windows-server-2025" target="_blank" rel="noopener noreferrer" className="text-sm text-[#7c3aed] hover:underline">{t("downloads.server") || "Windows Server Evaluation (Official)"}</a>
            <p className="text-xs text-[#86868b] mt-1">{t("downloads.server_desc") || "Download evaluation ISO for Windows Server."}</p>
          </div>
        </div>
        <p className="text-xs text-[#86868b] mt-8 text-center">{t("downloads.note") || "License keys are sent via email after purchase. Downloads are separate and free."}</p>
      </div>
    </div>
  );
}