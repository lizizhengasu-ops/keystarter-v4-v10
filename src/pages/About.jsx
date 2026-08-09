import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ADVANTAGES = [
  {
    title: "Authorized Distributor",
    text: "Official partner for Microsoft, Kylin, UOS, Acronis and Trellix, with one-stop integration across hardware and software.",
  },
  {
    title: "Senior Integration Team",
    text: "Consulting, deployment and after-sales support delivered by engineers who work on real enterprise projects.",
  },
  {
    title: "Custom Solutions",
    text: "From PC, IPC, MiniPC and industrial OPS to OS, backup and whitelist protection, we tailor every deployment.",
  },
];

const TEAM_ROLES = [
  { role: "Solution Consulting", desc: "Requirements analysis and licensing strategy" },
  { role: "Pre-sales Engineering", desc: "Product fit, quoting and proof of concept" },
  { role: "Software Delivery", desc: "Windows, Office, server and SQL licensing" },
  { role: "Backup & Security", desc: "Acronis backup and Trellix whitelist protection" },
  { role: "Licensing & Compliance", desc: "Microsoft channel and volume licensing" },
  { role: "Deployment & Integration", desc: "PC, IPC, MiniPC and industrial OPS" },
  { role: "After-sales Support", desc: "Activation, reinstall and troubleshooting" },
  { role: "Client Success", desc: "B2B orders, renewals and account care" },
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
  "Factory Automation",
  "New Energy",
  "Transportation",
  "Video Conferencing",
  "Smart Home",
  "Healthcare",
  "Surveillance",
  "Self-service Kiosks",
  "Visual Inspection",
  "Telecom Servers",
  "PC / AIO / Mini",
  "Warehouse & Logistics",
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
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white border border-[#e8e8ed] text-[#515154]">Authorized Distributor</span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white border border-[#e8e8ed] text-[#515154]">One-stop Integration</span>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-[#7c3aed] uppercase mb-3">Who We Are</p>
          <h2 className="text-2xl font-bold mb-5">A one-stop software and hardware integration platform</h2>
          <div className="space-y-4 text-sm leading-relaxed text-[#515154]">
            <p>
              Founded in 2023, Shenzhen LogiCtech Technology Co., Ltd. specializes in IT and industry software and hardware
              integration. Our team is built by senior professionals from the industry and provides consulting, implementation
              and deployment services to customers in real time.
            </p>
            <p>
              Since its founding, LogiCtech has obtained distributor credentials from leading software and hardware brands
              including Microsoft, Kylin, UOS, Acronis and Trellix, and is committed to delivering a one-stop integration
              experience for our customers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            {ADVANTAGES.map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-[#e8e8ed] p-5">
                <div className="w-9 h-9 rounded-lg bg-[#7c3aed]/10 text-[#7c3aed] flex items-center justify-center mb-3">
                  <TeamIcon />
                </div>
                <h3 className="text-sm font-bold mb-1.5">{item.title}</h3>
                <p className="text-xs text-[#86868b] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white border-y border-[#e8e8ed]">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold text-[#7c3aed] uppercase mb-3">Our Team</p>
          <h2 className="text-2xl font-bold mb-3">Experienced engineers across the full delivery chain</h2>
          <p className="text-sm text-[#86868b] max-w-2xl mb-8">
            Our team combines senior integration engineers, licensing specialists and support staff so every project is covered
            from first consultation to after-sales care.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TEAM_ROLES.map((item) => (
              <div key={item.role} className="bg-[#f5f5f7] rounded-xl border border-[#e8e8ed] p-4">
                <div className="w-9 h-9 rounded-full bg-white border border-[#e8e8ed] flex items-center justify-center mb-3">
                  <TeamIcon />
                </div>
                <h3 className="text-sm font-bold mb-1">{item.role}</h3>
                <p className="text-xs text-[#86868b] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-[#7c3aed] uppercase mb-3">Approval & Certification</p>
          <h2 className="text-2xl font-bold mb-6">Microsoft Gold Partner</h2>
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8e8ed]">
            <img
              src="/assets/images/about/approval-cert.webp"
              alt="Microsoft Gold Partner Certificate - Shenzhen LogiCtech Technology Co., Ltd."
              className="w-full max-w-xl mx-auto rounded-lg border border-[#f0f0f2]"
              loading="lazy"
            />
            <p className="text-xs text-[#86868b] mt-4 text-center max-w-xl mx-auto">
              深圳市络基刻科技有限公司 / Shenzhen LogiCtech Technology Co., Ltd. is certified as a Microsoft Gold Partner with
              Silver Application Development and Silver Small and Midmarket Cloud Solutions competencies.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#0078d4]/10 text-[#0078d4]">Microsoft Gold Partner</span>
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#0078d4]/10 text-[#0078d4]">Kylin</span>
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#0078d4]/10 text-[#0078d4]">UOS</span>
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#0078d4]/10 text-[#0078d4]">Acronis</span>
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#0078d4]/10 text-[#0078d4]">Trellix</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-white border-y border-[#e8e8ed]">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold text-[#7c3aed] uppercase mb-3">Trusted by Industry Leaders</p>
          <h2 className="text-2xl font-bold mb-3">Customers across manufacturing, energy, healthcare and more</h2>
          <p className="text-sm text-[#86868b] max-w-2xl mb-8">
            LogiCtech serves leading enterprises with licensed software, backup and security products, and integrated hardware
            solutions.
          </p>
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
          <p className="text-xs font-semibold text-[#7c3aed] uppercase mb-3">Industries We Serve</p>
          <h2 className="text-2xl font-bold mb-6">IT plus eight major industries</h2>
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map((item) => (
              <span key={item} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#e8e8ed] text-[#515154]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed] text-center">
            <div className="text-3xl font-extrabold text-[#0078d4] mb-1">10K+</div>
            <div className="text-xs text-[#86868b]">Customers Served</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed] text-center">
            <div className="text-3xl font-extrabold text-[#0078d4] mb-1">5+</div>
            <div className="text-xs text-[#86868b]">Years of Industry Experience</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed] text-center">
            <div className="text-3xl font-extrabold text-[#0078d4] mb-1">99.9%</div>
            <div className="text-xs text-[#86868b]">On-time Delivery</div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-10 text-center">
          <p className="text-sm text-[#515154] mb-4">Need licensing, backup, security or hardware integration?</p>
          <Link
            to="/support"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-xs font-bold bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition"
          >
            Contact Our Team
          </Link>
        </div>
      </section>
    </div>
  );
}
