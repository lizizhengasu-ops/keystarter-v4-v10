import React from "react";

/**
 * Answer-first extractable block (AEO/GEO). Renders a 40–60 word complete
 * answer that AI search engines can lift verbatim. Pure presentational;
 * accepts children so callers can compose per-page answers.
 */
export function QuickAnswer({ title = "Quick Answer", children }: { title?: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby="quick-answer-heading" className="bg-white border-b border-[#e8e8ed]">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h2 id="quick-answer-heading" className="text-xs font-semibold uppercase tracking-wider text-[#7c3aed] mb-3">{title}</h2>
        <div className="text-sm leading-relaxed text-[#1d1d1f]">{children}</div>
      </div>
    </section>
  );
}
