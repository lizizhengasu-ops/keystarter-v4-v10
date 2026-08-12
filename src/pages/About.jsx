import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ADVANTAGES = [
  {
    title: "about.adv1.title",
    text: "about.adv1.text",
  },
  {
    title: "about.adv2.title",
    text: "about.adv2.text",
  },
  {
    title: "about.adv3.title",
    text: "about.adv3.text",
  },
];

const TEAM_ROLES = [
  { role: "about.team.r1.role", desc: "about.team.r1.desc" },
  { role: "about.team.r2.role", desc: "about.team.r2.desc" },
  { role: "about.team.r3.role", desc: "about.team.r3.desc" },
  { role: "about.team.r4.role", desc: "about.team.r4.desc" },
  { role: "about.team.r5.role", desc: "about.team.r5.desc" },
  { role: "about.team.r6.role", desc: "about.team.r6.desc" },
  { role: "about.team.r7.role", desc: "about.team.r7.desc" },
  { role: "about.team.r8.role", desc: "about.team.r8.desc" },
];

const CLIENTS = [
  { name: "SUPCON", file: "supcon.webp" },
  { name: "HollySys", file: "hollysys.webp" },
  { name: "BYD", file: "byd.webp" },
  { name: "NAURA", file: "naura.webp" },
  { name: "GRG Banking", file: "grg.webp" },
  { name: "GWI", file: "gwi.webp" },
  { name: "DAS", file: "das.webp" },
  { name: "HIKVISION", file: "hikvision.webp" },
  { name: "Dahua", file: "dahua.webp" },
  { name: "GE HealthCare", file: "gehealthcare.webp" },
  { name: "Mindray", file: "mindray.webp" },
  { name: "Centerm", file: "centerm.webp" },
  { name: "Star-Net", file: "star-net.webp" },
  { name: "SmartMore", file: "smartmore.webp" },
  { name: "Mogulinker", file: "mogulinker.webp" },
  { name: "SF Technology", file: "sftech.webp" },
];

const INDUSTRIES = [
  "about.ind1",
  "about.ind2",
  "about.ind3",
  "about.ind4",
  "about.ind5",
  "about.ind6",
  "about.ind7",
  "about.ind8",
  "about.ind9",
  "about.ind10",
  "about.ind11",
  "about.ind12",
];

function TeamIcon() {
  return (
    <svg className="w-7 h-7 text-[#7c3aed]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <section className="px-6 py-12 border-b border-[#e8e8ed] bg-gradient-to-b from-white to-[#f5f5f7]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">{t("about.title")}</h1>
          <p className="text-[#86868b] mb-6 text-lg max-w-2xl">{t("about.desc")}</p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-[#7c3aed] text-white">Microsoft Gold Partner</span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white border border-[#e8e8ed] text-[#515154]">{t("about.badge_distributor")}</span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white border border-[#e8e8ed] text-[#515154]">{t("about.badge_integration")}</span>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-[#7c3aed] uppercase mb-3">{t("about.whoweare_label")}</p>
          <h2 className="text-2xl font-bold mb-5">{t("about.whoweare_title")}</h2>
          <div className="space-y-4 text-sm leading-relaxed text-[#515154]">
            <p>{t("about.whoweare_p1")}</p>
            <p>{t("about.whoweare_p2")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            {ADVANTAGES.map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-[#e8e8ed] p-5">
                <div className="w-9 h-9 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] flex items-center justify-center mb-3">
                  <TeamIcon />
                </div>
                <h3 className="text-sm font-bold mb-1.5">{t(item.title)}</h3>
                <p className="text-xs text-[#86868b] leading-relaxed">{t(item.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white border-y border-[#e8e8ed]">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold text-[#7c3aed] uppercase mb-3">{t("about.team_label")}</p>
          <h2 className="text-2xl font-bold mb-3">{t("about.team_title")}</h2>
          <p className="text-sm text-[#86868b] max-w-2xl mb-8">{t("about.team_desc")}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TEAM_ROLES.map((item) => (
              <div key={item.role} className="bg-[#f5f5f7] rounded-xl border border-[#e8e8ed] p-4">
                <div className="w-9 h-9 rounded-full bg-white border border-[#e8e8ed] flex items-center justify-center mb-3">
                  <TeamIcon />
                </div>
                <h3 className="text-sm font-bold mb-1">{t(item.role)}</h3>
                <p className="text-xs text-[#86868b] leading-relaxed">{t(item.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-[#7c3aed] uppercase mb-3">{t("about.cert_label")}</p>
          <h2 className="text-2xl font-bold mb-6">{t("about.cert_title")}</h2>
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8e8ed]">
            <img
              src="/assets/images/about/approval-cert.webp"
              alt="Microsoft Gold Partner Certificate - Shenzhen Luojike Technology Co., Ltd. (LogiCtech)"
              className="w-full max-w-xl mx-auto rounded-lg border border-[#f0f0f2]"
              loading="lazy"
            />
            <p className="text-xs text-[#86868b] mt-4 text-center max-w-xl mx-auto">{t("about.cert_desc")}</p>
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#0078d4]/10 text-[#0078d4]">Microsoft Gold Partner</span>
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#0078d4]/10 text-[#0078d4]">Kylin</span>
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#0078d4]/10 text-[#0078d4]">UOS</span>
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#0078d4]/10 text-[#0078d4]">Acronis</span>
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#0078d4]/10 text-[#0078d4]">Trellix</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8e8ed] mt-6">
            <h3 className="text-sm font-bold mb-3">{t("about.appsource_title")}</h3>
            <img
              src="/assets/images/about/appsource-partner.webp"
              alt="Shenzhen LogiCtech Technology Co., Ltd. listed on Microsoft AppSource partner directory"
              className="w-full max-w-3xl mx-auto rounded-lg border border-[#f0f0f2]"
              loading="lazy"
            />
            <p className="text-xs text-[#86868b] mt-4 text-center max-w-3xl mx-auto">{t("about.appsource_desc")}</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold text-[#7c3aed] uppercase mb-3">{t("about.clients_eyebrow")}</p>
          <h2 className="text-2xl font-bold mb-3">{t("about.clients_title")}</h2>
          <p className="text-sm text-[#86868b] max-w-2xl mb-8">{t("about.clients_desc")}</p>
          <div className="flex flex-wrap gap-4">
            {CLIENTS.map((client) => (
              <div
                key={client.name}
                className="w-[calc(50%-8px)] sm:w-[calc(25%-12px)] md:w-[calc(16.666%-14px)] bg-white rounded-xl border border-[#e8e8ed] p-4 flex items-center justify-center min-h-[72px]"
              >
                <img
                  src={`/assets/images/about/clients/${client.file}`}
                  alt={`${client.name} logo`}
                  className="max-h-10 max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-[#7c3aed] uppercase mb-3">{t("about.industries_label")}</p>
          <h2 className="text-2xl font-bold mb-6">{t("about.industries_title")}</h2>
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((item) => (
              <span key={item} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#e8e8ed] text-[#515154]">
                {t(item)}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed] text-center">
            <div className="text-3xl font-extrabold text-[#0078d4] mb-1">10K+</div>
            <div className="text-xs text-[#86868b]">{t("about.stat_customers")}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed] text-center">
            <div className="text-3xl font-extrabold text-[#0078d4] mb-1">5+</div>
            <div className="text-xs text-[#86868b]">{t("about.stat_experience")}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed] text-center">
            <div className="text-3xl font-extrabold text-[#0078d4] mb-1">99.9%</div>
            <div className="text-xs text-[#86868b]">{t("about.stat_delivery")}</div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-10 text-center">
          <p className="text-sm text-[#515154] mb-4">{t("about.cta_text")}</p>
          <Link
            to="/support"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-xs font-bold bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition"
          >
            {t("about.cta_button")}
          </Link>
        </div>
      </section>
    </div>
  );
}
