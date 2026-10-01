import React from "react";

/**
 * Factual trust strip (compliance-safe: no authorization/reseller claims).
 * Items are stable, verifiable facts only — do not add volatile numbers here
 * unless they are rendered from live backend data (G4 discipline).
 */
const ITEMS: Array<{ icon: string; text: string }> = [
  { icon: "⚡", text: "Instant email delivery" },
  { icon: "🔄", text: "14-day refund guarantee" },
  { icon: "✅", text: "Genuine licenses, verified activation" },
  { icon: "💬", text: "Support included with every order" },
];

export default function TrustBar(): React.ReactElement {
  return (
    <div className="w-full bg-[#111827] border-y border-[#1f2937]">
      <div className="max-w-6xl mx-auto px-4 py-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
        {ITEMS.map((it) => (
          <div key={it.text} className="text-[#e5e7eb] text-xs sm:text-sm font-semibold">
            <span className="mr-1">{it.icon}</span>
            {it.text}
          </div>
        ))}
      </div>
    </div>
  );
}
