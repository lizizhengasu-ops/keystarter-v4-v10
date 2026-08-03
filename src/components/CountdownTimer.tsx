import { useEffect, useState } from "react";

function nextWeekTarget(): number {
  const now = new Date();
  const target = new Date(now);
  target.setHours(0, 0, 0, 0);
  const add = (8 - now.getDay()) % 7 || 7;
  target.setDate(now.getDate() + add);
  return target.getTime();
}

export default function CountdownTimer({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, nextWeekTarget() - now);
  const total = Math.floor(diff / 1000);
  const cells = [
    { label: "Days", value: String(Math.floor(total / 86400)).padStart(2, "0") },
    { label: "Hours", value: String(Math.floor((total % 86400) / 3600)).padStart(2, "0") },
    { label: "Mins", value: String(Math.floor((total % 3600) / 60)).padStart(2, "0") },
    { label: "Secs", value: String(total % 60).padStart(2, "0") },
  ];

  return (
    <div className={"flex items-center gap-1 " + className}>
      {cells.map((c) => (
        <div key={c.label} className="min-w-[44px] rounded-lg border border-[#ff6b35]/25 bg-orange-50 px-1.5 py-1 text-center">
          <div className="text-[13px] font-bold leading-tight text-[#ff6b35] tabular-nums">{c.value}</div>
          <div className="text-[8px] uppercase tracking-wide text-[#a05c34]">{c.label}</div>
        </div>
      ))}
    </div>
  );
}
