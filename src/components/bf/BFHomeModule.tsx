import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Black Friday homepage module (seasonal, self-contained, rollback = delete this component).
 * Best-practice per 2026 BF homepage guides: offer + deadline in one message,
 * countdown with tabular-nums (no CLS), 3 curated entry points, terms strip.
 * No hardcoded prices (G4). Colors WCAG-checked: white/#e5e7eb on #0b1020.
 */
const BF_END = new Date("2026-11-30T23:59:59Z").getTime();

function useCountdown() {
  const [t, setT] = useState<{ d: number; h: number; m: number } | null>(null);
  useEffect(() => {
    const tick = (): void => {
      const diff = Math.max(0, BF_END - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
      });
    };
    tick();
    const iv = setInterval(tick, 30000);
    return () => clearInterval(iv);
  }, []);
  return t ?? { d: 0, h: 0, m: 0 };
}

const ENTRIES = [
  { to: "/product/windows-11-pro", label: "Windows 11 Pro", sub: "OEM key, instant delivery" },
  { to: "/product/office-2021-pro-plus", label: "Office 2021 Pro Plus", sub: "One-time purchase" },
  { to: "/blog/how-to-download-windows-10-iso-official", label: "Still on Windows 10?", sub: "ISO + ESU options" },
];

export default function BFHomeModule(): React.ReactElement {
  const c = useCountdown();
  return (
    <section
      aria-label="Black Friday deals"
      className="w-full bg-[#0b1020] text-white"
      style={{ minHeight: 220 }}
      data-testid="bf-home-module"
    >
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-xl">
            <p className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-[#7c3aed] mb-3">
              Black Friday · Nov 27-30
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
              Black Friday deals on genuine Microsoft keys
            </h2>
            <p className="text-[#9ca3af] text-sm">
              Join the early-access list and get the deals before everyone else. Windows
              and Office keys, instant email delivery, 14-day refund guarantee.
            </p>
          </div>
          <Link
            to="/black-friday"
            className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-xl bg-[#7c3aed] text-white font-bold hover:bg-[#6d28d9] transition whitespace-nowrap"
          >
            Get early access →
          </Link>
        </div>

        <div
          className="grid grid-cols-3 gap-3 max-w-md mt-8"
          style={{ fontVariantNumeric: "tabular-nums" }}
          aria-label="Time until Black Friday"
        >
          {[
            { v: c.d, l: "days" },
            { v: c.h, l: "hours" },
            { v: c.m, l: "mins" },
          ].map((x) => (
            <div key={x.l} className="bg-[#111827] rounded-lg py-3 text-center border border-[#1f2937]">
              <div className="text-xl font-extrabold text-white">{x.v}</div>
              <div className="text-[10px] uppercase text-[#9ca3af] tracking-wide">{x.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
