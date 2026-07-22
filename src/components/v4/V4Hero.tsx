import { Link } from 'react-router-dom';

export default function V4Hero() {
  return (
    <section className="relative pt-32 pb-20 bg-white overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-green-300/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
        <p className="text-xs font-semibold text-[#86868b] tracking-wider uppercase mb-3">Genuine Microsoft Software Solutions</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#1d1d1f] mb-6 leading-tight">
          Genuine Licenses,<br/>Delivered Instantly.
        </h1>
        <p className="text-lg sm:text-xl text-[#86868b] font-normal mb-8 max-w-2xl mx-auto leading-relaxed">
          Authorized Microsoft software reseller. 10 core SKUs in stock, delivered within 10 minutes. 
          Built for enterprise compliance audits and power users.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to="/store" className="w-full sm:w-auto bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium px-8 py-3 rounded-full transition shadow-lg shadow-blue-500/10 text-center">
            Shop Licenses Now
          </Link>
          <a href="#b2b-section" className="w-full sm:w-auto border border-[#d2d2d7] hover:bg-[#f5f5f7] text-[#1d1d1f] font-medium px-8 py-3 rounded-full transition text-center">
            Enterprise Licensing →
          </a>
        </div>

        <V4TrustBar />
      </div>
    </section>
  );
}

function V4TrustBar() {
  const stats = [
    { num: "10 Min", label: "Instant Digital Delivery", icon: "⚡" },
    { num: "98.7%", label: "Customer Satisfaction", icon: "⭐" },
    { num: "50K+", label: "Licenses Activated", icon: "🛡️" },
    { num: "100%", label: "Genuine & Verifiable", icon: "✅" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#f5f5f7]">
      {stats.map((s, i) => (
        <div key={i} className="flex flex-col items-center">
          <span className="text-2xl md:text-3xl font-bold text-[#1d1d1f]">{s.num}</span>
          <span className="text-xs text-[#86868b] mt-1">{s.icon} {s.label}</span>
        </div>
      ))}
    </div>
  );
}
