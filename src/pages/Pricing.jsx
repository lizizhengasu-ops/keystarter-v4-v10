import { useLanguage } from "../I18nContext";

const plans = [
  {n:"Starter", p:"$0", d:"Perfect for getting started", popular:false, f:["Basic support","1 license","Email delivery"]},
  {n:"Professional", p:"$29", d:"For growing businesses", popular:true, f:["Priority support","Up to 10 licenses","Bulk discount","Volume licensing"]},
  {n:"Enterprise", p:"$99", d:"For large organizations", popular:false, f:["Dedicated support","Unlimited licenses","Custom pricing","API access","SLA guarantee"]},
];

export default function PricingPage() {
  const { t } = useLanguage();
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">{t("pricing.title")}</h1>
        <p className="text-[#86868b] text-center mb-10">{t("pricing.subtitle")}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((pl,i) => (
            <div key={i} className={"bg-white rounded-2xl p-6 border " + (pl.popular ? "border-[#0078d4] ring-2 ring-[#0078d4]/20" : "border-[#e8e8ed]")}>
              {pl.popular && <div className="text-[10px] font-bold text-[#0078d4] uppercase tracking-wider mb-2">{t("pricing.popular")}</div>}
              <h3 className="text-xl font-bold mb-1">{pl.n}</h3>
              <p className="text-xs text-[#86868b] mb-4">{pl.d}</p>
              <div className="text-3xl font-extrabold mb-6">{pl.p}<span className="text-sm font-normal text-[#86868b]">/mo</span></div>
              <button className="w-full bg-[#0078d4] text-white py-3 rounded-xl font-semibold mb-6 hover:bg-[#0062b1] transition border-none cursor-pointer">{t("pricing.get_started")}</button>
              <div className="space-y-2">
                {pl.f.map((fe,j) => <div key={j} className="text-xs flex items-center gap-2"><span className="text-green-500">&#10003;</span>{fe}</div>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
