import { useEffect, useState } from "react";

const WEEKLY_DEADLINE = (() => {
  const now = new Date();
  const target = new Date(now);
  target.setHours(0, 0, 0, 0);
  const add = (8 - now.getDay()) % 7 || 7;
  target.setDate(now.getDate() + add);
  return target.getTime();
})();

let sharedNow = Date.now();
const listeners = new Set<() => void>();
setInterval(() => {
  sharedNow = Date.now();
  listeners.forEach((fn) => fn());
}, 1000);

export default function CountdownTimer({ className = "", large = false }: { className?: string; large?: boolean }) {
  const [now, setNow] = useState<number>(sharedNow);

  useEffect(() => {
    const fn = () => setNow(sharedNow);
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }, []);

  const diff = Math.max(0, WEEKLY_DEADLINE - now);
  const total = Math.floor(diff / 1000);
  const cells = [
    { label: "Days", value: String(Math.floor(total / 86400)).padStart(2, "0") },
    { label: "Hours", value: String(Math.floor((total % 86400) / 3600)).padStart(2, "0") },
    { label: "Mins", value: String(Math.floor((total % 3600) / 60)).padStart(2, "0") },
    { label: "Secs", value: String(total % 60).padStart(2, "0") },
  ];

  return (
    <div className={"flex items-center " + (large ? "gap-2 " : "gap-1 ") + className}>
      {cells.map((c) => (
        <div key={c.label} className={(large ? "min-w-[58px] rounded-xl px-2.5 py-2 " : "min-w-[44px] rounded-lg px-1.5 py-1 ") + "border border-[#ff6b35]/25 bg-orange-50 text-center"}>
          <div className={(large ? "text-2xl " : "text-[13px] ") + "font-bold leading-tight text-[#c2410c] tabular-nums"}>{c.value}</div>
          <div className={(large ? "text-[10px] " : "text-[8px] ") + "uppercase tracking-wide text-[#9a3412]"}>{c.label}</div>
        </div>
      ))}
    </div>
  );
}
