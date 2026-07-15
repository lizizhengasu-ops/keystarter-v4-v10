import { useEffect } from "react";
import Portal from "./Portal";

interface NavDrawerProps {
  open: boolean;
  onClose: () => void;
  isHomepage: boolean;
}

export default function NavDrawer({ open, onClose, isHomepage }: NavDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!open) return null;

  const links = [
    { label: "My Account", to: "/account" },
    { label: "Store", to: "/#store" },
    { label: isHomepage ? "Enterprise / B2B" : "Enterprise", to: isHomepage ? "/#business" : "/b2b" },
    { label: "Compare", to: "/#compare" },
    { label: isHomepage ? "Tech Support" : "Support", to: isHomepage ? "/#support" : "/support" },
    ...(isHomepage ? [{ label: "Fulfillment Center", to: "/#portal" }] : []),
    { label: "Blog", to: "/blog" },
  ];

  return (
    <Portal>
    <div className="fixed inset-0 z-[99999]">
      <div className="fixed inset-0 bg-black/30 transition-opacity" onClick={onClose} />
      <div className="fixed left-0 top-0 h-full w-72 bg-white shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e8e8ed]">
          <span className="text-sm font-semibold text-[#1d1d1f]">Menu</span>
          <button onClick={onClose} className="text-[#86868b] hover:text-[#1d1d1f] transition-colors text-lg leading-none" aria-label="Close menu">X</button>
        </div>
        <nav className="px-3 py-3 space-y-0.5">
          {links.map((link) => (
            <a key={link.to} href={link.to} onClick={(e) => { window.location.href = link.to; onClose(); }}
               className="block px-4 py-2.5 text-sm font-medium text-[#1d1d1f] hover:bg-[#f5f5f7] rounded-lg transition-colors">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
    </Portal>
  );
}
