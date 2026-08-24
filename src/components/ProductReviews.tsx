import React, { useState } from "react";
interface Review { rating: number; author: string; text: string; }
export function ProductReviews({ reviews, t }: { reviews: Review[]; t: (k: string) => string }) {
  const [showAll, setShowAll] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const totalPages = Math.ceil(reviews.length / PER_PAGE);
  const visible = showAll ? reviews.slice((page - 1) * PER_PAGE, page * PER_PAGE) : reviews.slice(0, 5);
  const pgArr = Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1);
  if (reviews.length === 0) return null;
  return (
    <div className="max-w-7xl mx-auto px-6 pb-8 mt-8 pt-6 border-t border-[#e8e8ed]">
      <h3 className="text-base font-bold mb-4">{t("reviews") || "Customer Reviews"}</h3>
      <div className="space-y-3">
        {visible.map((r, i) => (
          <div key={i} className="bg-white rounded-xl border border-[#e8e8ed] p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="text-yellow-500 text-sm">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
              <span className="text-xs font-medium text-[#1d1d1f]">{r.author}</span>
            </div>
            <div className="text-xs leading-relaxed text-[#86868b]">{r.text}</div>
          </div>
        ))}
      </div>
      {showAll && totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-4">
          <button onClick={() => setPage(Math.max(1, page - 1))}
            className="v5-btn min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-xs text-[#86868b] border border-[#e8e8ed] rounded-lg px-3 py-1.5 hover:bg-white transition disabled:opacity-30"
            disabled={page <= 1}>Prev</button>
          {pgArr.map((p) => (
            <button key={p} onClick={() => setPage(p)}
              className={"v5-btn min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-xs rounded-lg px-3 py-1.5 transition " + (p == page ? "bg-[#7c3aed] text-white font-semibold" : "text-[#86868b] border border-[#e8e8ed] hover:bg-white")}>
              {p}
            </button>
          ))}
          <button onClick={() => setPage(Math.min(totalPages, page + 1))}
            className="v5-btn min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-xs text-[#86868b] border border-[#e8e8ed] rounded-lg px-3 py-1.5 hover:bg-white transition disabled:opacity-30"
            disabled={page >= totalPages}>Next</button>
        </div>
      )}
      {reviews.length > 5 && (
        <button onClick={() => { setShowAll(!showAll); setPage(1); }}
          className="v5-btn mt-4 min-h-[44px] inline-flex items-center justify-center text-xs text-[#7c3aed] font-semibold border border-[#7c3aed]/20 rounded-lg px-4 py-2 hover:bg-[#7c3aed]/5 transition">
          {showAll ? "Hide Reviews" : "View All Reviews (" + reviews.length + ")"}
        </button>
      )}
    </div>
  );
}
