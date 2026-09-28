interface PortfolioCategory {
  title: string;
  desc: string;
  brands: { name: string; icon?: string }[];
}

const CATEGORIES: PortfolioCategory[] = [
  {
    title: "Operating Systems",
    desc: "Windows, Linux and domestic operating systems for desktop, server and embedded devices.",
    brands: [
      { name: "Microsoft Windows", icon: "/assets/logos/windows.svg" },
      { name: "Ubuntu", icon: "/assets/logos/ubuntu.svg" },
      { name: "Red Hat", icon: "/assets/logos/redhat.svg" },
      { name: "Kylin", icon: "/assets/logos/kylin2.png" },
      { name: "UOS", icon: "/assets/logos/uos2.png" },
      { name: "OpenHarmony", icon: "/assets/logos/openharmony.png" },
      { name: "Anolis OS", icon: "/assets/logos/anolis.png" },
      { name: "openEuler", icon: "/assets/logos/openeuler.png" },
    ],
  },
  {
    title: "Embedded & Real-Time",
    desc: "Real-time operating systems for industrial, financial and embedded hardware.",
    brands: [
      { name: "VxWorks", icon: "/assets/logos/windriver.png" },
      { name: "QNX", icon: "/assets/logos/qnx.svg" },
      { name: "SylixOS", icon: "/assets/logos/sylixos.png" },
      { name: "Intewell" },
    ],
  },
  {
    title: "Databases & Middleware",
    desc: "Enterprise databases, middleware and application servers.",
    brands: [
      { name: "Oracle", icon: "/assets/logos/oracle.svg" },
      { name: "DM Database", icon: "/assets/logos/dm.png" },
      { name: "KingbaseES" },
      { name: "TongWeb" },
      { name: "BES", icon: "/assets/logos/bes.png" },
      { name: "TopSec" },
    ],
  },
  {
    title: "Office & Security",
    desc: "Office suites, PDF and endpoint security products.",
    brands: [
      { name: "Microsoft Office", icon: "/assets/logos/office.png" },
      { name: "WPS Office", icon: "/assets/logos/wps.png" },
      { name: "Adobe", icon: "/assets/logos/adobe.png" },
      { name: "Foxit", icon: "/assets/logos/foxit.png" },
      { name: "Kaspersky", icon: "/assets/logos/kaspersky.svg" },
      { name: "Trellix", icon: "/assets/logos/trellix.png" },
      { name: "Kingsoft Antivirus", icon: "/assets/logos/kingsoft.png" },
    ],
  },
  {
    title: "Backup & Disaster Recovery",
    desc: "Backup, replication and disaster recovery for servers, PCs and virtual environments.",
    brands: [
      { name: "Acronis", icon: "/assets/logos/acronis.png" },
      { name: "i2", icon: "/assets/logos/i2.png" },
      { name: "AnyBackup" },
      { name: "Rose", icon: "/assets/logos/rose.png" },
      { name: "SCUTECH" },
    ],
  },
  {
    title: "CAD & Design",
    desc: "CAD, CAE and 3D measurement software for engineering teams.",
    brands: [
      { name: "AutoCAD", icon: "/assets/logos/autodesk.svg" },
      { name: "CATIA", icon: "/assets/logos/catia.png" },
      { name: "ZWCAD", icon: "/assets/logos/zwcad.png" },
      { name: "Glodon", icon: "/assets/logos/glodon.png" },
      { name: "Qt", icon: "/assets/logos/qt.svg" },
      { name: "PolyWorks", icon: "/assets/logos/polyworks.png" },
    ],
  },
  {
    title: "Cloud Services",
    desc: "Public cloud infrastructure and managed services.",
    brands: [
      { name: "Microsoft Azure", icon: "/assets/logos/azure.svg" },
      { name: "AWS", icon: "/assets/logos/aws.svg" },
      { name: "Google Cloud", icon: "/assets/logos/googlecloud.svg" },
      { name: "Alibaba Cloud", icon: "/assets/logos/alibabacloud.svg" },
      { name: "Tencent Cloud", icon: "/assets/logos/tencent.png" },
      { name: "Huawei Cloud", icon: "/assets/logos/huawei.svg" },
      { name: "Baidu Cloud", icon: "/assets/logos/baidu.svg" },
    ],
  },
  {
    title: "Industrial & Enterprise Apps",
    desc: "Industrial energy management and enterprise applications.",
    brands: [
      { name: "iEMS" },
      { name: "Yonyou", icon: "/assets/logos/yonyou.png" },
      { name: "Kingdee", icon: "/assets/logos/kingdee.png" },
      { name: "Smart Factory Solutions" },
    ],
  },
];

export default function SoftwarePortfolio({ compact = false }: { compact?: boolean }) {
  const items = compact ? CATEGORIES.slice(0, 4) : CATEGORIES;
  return (
    <div className={"grid grid-cols-1 md:grid-cols-2 gap-4 " + (compact ? "" : "lg:grid-cols-4")}>
      {items.map((cat) => (
        <div key={cat.title} className="bg-[#fafafa] rounded-2xl border border-[#e8e8ed] p-5">
          <h3 className={"font-bold text-[#1d1d1f] " + (compact ? "text-sm mb-2" : "text-sm mb-1.5")}>{cat.title}</h3>
          {!compact && <p className="text-xs text-[#86868b] leading-relaxed mb-3">{cat.desc}</p>}
          <div className="flex flex-wrap gap-1.5">
            {cat.brands.map((brand) => (
              <span key={brand.name} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white border border-[#e8e8ed] text-[#515154]">
                {brand.icon && <img src={brand.icon} alt={brand.name} className="w-4 h-4 object-contain" loading="lazy" />}
                {brand.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
