import { Link } from "react-router-dom";

export default function PricingPage() {
  var plans = [
    {name:"Personal",price:"$19.99",desc:"For individual users",features:["1 license key","Email support","30-day warranty","Instant delivery"]},
    {name:"Business",price:"$49.99",desc:"For small teams",features:["10 license keys","Priority support","Bulk discount","60-day warranty","Team management"],popular:true},
    {name:"Enterprise",price:"$99.99",desc:"For organizations",features:["Unlimited licenses","Dedicated manager","Custom pricing","Volume discounts","API access","White-glove support"],popular:false}
  ];
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-3">Simple Pricing</h1>
        <p className="text-base font-light text-white/80">Choose the plan that works for you.</p>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map(function(p, i) {
            return (
              <div key={i} className={"bg-white rounded-2xl p-8 border border-[#e8e8ed] relative " + (p.popular ? "ring-2 ring-[#0078d4]" : "")}>
                {p.popular ? <span className='absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0078d4] text-white text-xs font-semibold px-4 py-1 rounded-full'>Most Popular</span> : null}
                <h2 className="text-lg font-bold mb-1">{p.name}</h2>
                <p className="text-[#86868b] text-xs mb-4">{p.desc}</p>
                <p className="text-3xl font-bold mb-6">{p.price}<span className="text-sm font-normal text-[#86868b]">/mo</span></p>
                <div className="space-y-2 mb-8">
                  {p.features.map(function(f, j) {
                    return <div key={j} className='flex items-center gap-2 text-sm'><svg className='w-4 h-4 text-green-500 flex-shrink-0' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><polyline points='20 6 9 17 4 12'/></svg>{f}</div>;
                  })}
                </div>
                <Link to="/#store" className={"block text-center py-3 rounded-xl font-semibold transition " + (p.popular ? "bg-[#0078d4] text-white hover:bg-[#0062b1]" : "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]")}>Get Started</Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}