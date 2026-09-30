import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TrustBar from "../components/bf/TrustBar";
import FunnelForm from "../components/bf/FunnelForm";

/** Black Friday 2026: Nov 27. Countdown renders client-side only (no SSR mismatch). */
const BF_DATE = new Date("2026-11-27T00:00:00Z").getTime();

function useCountdown(): { days: number; hours: number; mins: number } {
  const [left, setLeft] = useState<{ days: number; hours: number; mins: number } | null>(null);
  useEffect(() => {
    const tick = (): void => {
      const diff = Math.max(0, BF_DATE - Date.now());
      setLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
      });
    };
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, []);
  return left ?? { days: 0, hours: 0, mins: 0 };
}

const DEALS: Array<{ to: string; name: string; blurb: string }> = [
  { to: "/product/windows-11-pro", name: "Windows 11 Pro", blurb: "OEM key, instant email delivery" },
  { to: "/product/windows-11-home", name: "Windows 11 Home", blurb: "OEM key for one device" },
  { to: "/product/office-2021-pro-plus", name: "Office 2021 Pro Plus", blurb: "One-time purchase, no subscription" },
  { to: "/product/win-svr-iot-2022", name: "Windows Server IoT 2022", blurb: "Fixed-purpose systems" },
];

export default function BlackFriday(): React.ReactElement {
  const c = useCountdown();
  return (
    <div className="min-h-screen bg-[#0b1020] text-white" data-testid="bf-page">
      <TrustBar />
      <header className="max-w-5xl mx-auto px-4 pt-12 pb-6 text-center">
        <p className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#7c3aed] mb-5">
          Black Friday 2026 — Early Access
        </p>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Genuine Microsoft keys,
          <br />
          <span className="text-[#a78bfa]">Black Friday prices.</span>
        </h1>
        <p className="text-[#9ca3af] max-w-2xl mx-auto mb-6">
          Join the early-access list and get our Black Friday Windows &amp; Office key deals
          before anyone else. One email when the deals go live — no spam.
        </p>
        <FunnelForm source="bf_vip" />
      </header>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-center mb-10" data-testid="bf-countdown">
          {[
            { v: c.days, l: "days" },
            { v: c.hours, l: "hours" },
            { v: c.mins, l: "mins" },
          ].map((x) => (
            <div key={x.l} className="bg-[#111827] rounded-xl py-4 border border-[#1f2937]">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#a78bfa]">{x.v}</div>
              <div className="text-xs text-[#9ca3af] uppercase">{x.l}</div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-2">What to expect on Black Friday</h2>
        <p className="text-[#9ca3af] mb-6">
          Early-access list members get first pick of our limited stock of Windows and Office keys.
          Everyone else sees whatever is left. Deals apply to the catalog below:
        </p>
        <div className="grid sm:grid-cols-2 gap-4" data-testid="bf-deals">
          {DEALS.map((d) => (
            <Link
              key={d.to}
              to={d.to}
              className="block bg-[#111827] border border-[#1f2937] rounded-xl p-5 hover:border-[#7c3aed] transition"
            >
              <div className="font-bold mb-1">{d.name}</div>
              <div className="text-sm text-[#9ca3af]">{d.blurb}</div>
              <div className="text-[#a78bfa] text-sm font-semibold mt-3">View details →</div>
            </Link>
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-4">Black Friday FAQ</h2>
        <div className="space-y-4 max-w-3xl">
          <div className="bg-[#111827] rounded-xl p-4 border border-[#1f2937]">
            <h3 className="font-semibold mb-1">When do the deals go live?</h3>
            <p className="text-sm text-[#9ca3af]">Black Friday, November 27, 2026. Early-access list members receive the links first, by email.</p>
          </div>
          <div className="bg-[#111827] rounded-xl p-4 border border-[#1f2937]">
            <h3 className="font-semibold mb-1">Are the keys genuine?</h3>
            <p className="text-sm text-[#9ca3af]">Yes — every key is a genuine Microsoft license, verified and activated before delivery, with a 14-day refund guarantee.</p>
          </div>
          <div className="bg-[#111827] rounded-xl p-4 border border-[#1f2937]">
            <h3 className="font-semibold mb-1">How fast is delivery?</h3>
            <p className="text-sm text-[#9ca3af]">Instant: your key arrives by email within minutes of checkout, around the clock.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
