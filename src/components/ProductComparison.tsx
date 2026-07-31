import React from "react";
import type { ComparisonGroup } from "../data/product-comparison";
export function ProductComparison({ group }: { group: ComparisonGroup | null }) {
  if (!group) return null;
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="mt-8 pt-6 border-t border-[#e8e8ed]">
        <h3 className="text-base font-bold mb-4">{group.title}</h3>
        <div className="bg-[#f5f5f7] rounded-xl p-5">
          {group.rows.map((row: any, ri: number) => (
            <div key={ri} className="flex items-center py-2.5 border-b border-[#e8e8ed] last:border-0 text-xs gap-2">
              <span className="text-[#86868b] font-medium w-[35%] flex-shrink-0">{row.label}</span>
              <div className="flex gap-2 flex-wrap justify-end flex-1">
                {group.columns.map((col: any, ci: number) => {
                  const v = row.values[col.slug];
                  const badgeCls = v == "Yes" ? "bg-green-100 text-green-700 font-medium" : v == "No" ? "bg-[#e8e8ed] text-[#bbb]" : "text-[#1d1d1f]";
                  return <span key={ci} className={"px-2.5 py-0.5 rounded text-center min-w-[60px] " + badgeCls}>{v}</span>;
                })}
              </div>
            </div>
          ))}
          <div className="flex items-center pt-3 mt-1 text-xs gap-2">
            <span className="text-[#86868b] font-medium w-[35%] flex-shrink-0">Price</span>
            <div className="flex gap-2 flex-wrap justify-end flex-1">
              {group.columns.map((col: any, ci: number) => (
                <span key={ci} className="text-center min-w-[60px] px-2.5">
                  <span className="text-sm font-bold text-[#7c3aed]">${col.price}</span>
                  {col.badge && <span className="block text-[10px] text-[#86868b] mt-0.5">{col.badge}</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
