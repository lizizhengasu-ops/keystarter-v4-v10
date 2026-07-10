import { Link } from "react-router-dom";

const solutions = [
  {t:"Volume Licensing",d:"Enterprise licensing, min 5 units, dedicated manager.",c:"#0078D4"},
  {t:"OEM Partnership",d:"Pre-install licensing on new hardware, bulk pricing.",c:"#107C10"},
  {t:"Education",d:"Special pricing for schools, universities, non-profits.",c:"#D83B01"},
  {t:"Government",d:"GSA compliant, secure enterprise licensing.",c:"#5C2E91"},
];
const stats = [
  {n:"50,000+",l:"Licenses Delivered"},{n:"98.7%",l:"Client Satisfaction"},{n:"10 min",l:"Avg. Delivery Time"},{n:"24/7",l:"Tech Support"}
];

export default function B2BPage() {
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white px-6 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Enterprise Procurement</h1>
        <p className="text-lg font-light max-w-2xl mx-auto mb-8">Microsoft volume licensing for all enterprises. Bulk pricing, dedicated support, instant delivery.</p>
        <div className="flex gap-4 justify-center">
          <a href="#contact" className="bg-[#0078d4] text-white px-8 py-3 text-base font-semibold rounded-xl hover:bg-[#0062b1] transition">Contact Sales</a>
        </div>
      </div>
      <div className="bg-white px-6 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {stats.map((s,i)=>(
            <div key={i}>
              <div className="text-3xl font-extrabold text-[#0078d4] mb-1">{s.n}</div>
              <div className="text-sm text-[#86868b]">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-2">Enterprise Solutions</h2>
        <p className="text-sm text-[#86868b] mb-8">Tailored licensing solutions for every business need.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {solutions.map((s,i)=>(
            <div key={i} className="v5-card bg-white rounded-2xl p-6 border border-[#e8e8ed] hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 rounded-xl mb-3" style={{background:s.c}}></div>
              <div className="text-lg font-bold mb-2">{s.t}</div>
              <div className="text-sm text-[#86868b]">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
      <div id="contact" className="bg-gradient-to-r from-[#0078d4] to-[#106EBE] text-white px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-3">Ready to Start?</h2>
        <p className="text-base font-light mb-4">Contact our sales team for a personalized quote.</p>
        <div className="text-2xl font-semibold">sales@keystarter.com</div>
      </div>
    </div>
  );
}
