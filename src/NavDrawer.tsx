import { useEffect } from "react";
import Portal from "./Portal";
import { useTranslation } from "react-i18next";

interface NavDrawerProps {
  open: boolean;
  onClose: () => void;
  isHomepage: boolean;
}

export default function NavDrawer({ open, onClose, isHomepage }: NavDrawerProps) {
  const { t } = useTranslation();
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!open) return null;

  const links: { label: string; to: string; bf?: boolean }[] = [
    { label: t("nav.black_friday", "🔥 Black Friday early access"), to: "/black-friday", bf: true },
    { label: t("nav.account", "My Account"), to: "/account" },
    { label: t("nav.store"), to: "/#store" },
    { label: isHomepage ? t("nav.enterprise", "Enterprise / B2B") : t("nav.enterprise_short", "Enterprise"), to: isHomepage ? "/#business" : "/b2b" },
    { label: t("nav.compare"), to: "/#compare" },
    { label: isHomepage ? t("nav.support", "Tech Support") : t("nav.support_short", "Support"), to: isHomepage ? "/#support" : "/support" },
    ...(isHomepage ? [{ label: t("nav.portal"), to: "/#portal" }] : []),
    { label: t("nav.blog"), to: "/blog" },
  ];

  return (
    <Portal>
    <div className="fixed inset-0 z-[99999]">
      <div className="fixed inset-0 bg-black/30 transition-opacity" onClick={onClose} />
      <div className="fixed left-0 top-0 h-full w-72 bg-white shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8e8ed]">
          <span className="text-sm font-semibold text-[#1d1d1f]">{t("nav.menu", "Menu")}</span>
          <button onClick={onClose} className="text-[#6e6e73] hover:text-[#1d1d1f] transition-colors text-lg leading-none" aria-label={t("nav.close_menu", "Close menu")}>X</button>
        </div>
        <nav className="px-3 py-3 space-y-0.5">
          {links.map((link) => (
            <a key={link.to} href={link.to} onClick={() => { window.location.href = link.to; onClose(); }}
               className={(link.bf
                 ? "bg-orange-50 text-[#c2410c] font-semibold hover:bg-orange-100 "
                 : "text-[#1d1d1f] hover:bg-[#f5f5f7] ") +
               "block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors"}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
    </Portal>
  );
}
