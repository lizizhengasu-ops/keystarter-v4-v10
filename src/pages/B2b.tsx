import { Link } from "react-router-dom";

const solutions = [
  {t:"批量授权",d:"企业级授权方案，5套起订，专属客户经理。",c:"#0078D4"},
  {t:"OEM 合作",d:"在新硬件上预装授权，支持批量定价。",c:"#107C10"},
  {t:"教育授权",d:"为学校、大学和非营利组织提供特殊价格。",c:"#D83B01"},
  {t:"政府机构",d:"GSA 合规，安全的企业级授权方案。",c:"#5C2E91"},
];
const stats = [
  {n:"50,000+",l:"已交付授权"},{n:"98.7%",l:"客户满意度"},{n:"10分钟",l:"平均交付时间"},{n:"24/7",l:"技术支持"}
];

export default function B2BPage() {
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white px-6 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">企业批量采购</h1>
        <p className="text-lg font-light max-w-2xl mx-auto mb-8">面向各类企业的微软授权批量采购方案。量大从优，专属支持，即时交付。</p>
        <div className="flex gap-4 justify-center">
          <a href="#contact" className="bg-[#0078d4] text-white px-8 py-3 text-base font-semibold rounded-xl hover:bg-[#0062b1] transition">联系销售</a>
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
        <h2 className="text-2xl font-bold mb-2">企业方案</h2>
        <p className="text-sm text-[#86868b] mb-8">为各种企业需求量身定制的授权方案。</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {solutions.map((s,i)=>(
            <div key={i} className="bg-white rounded-2xl p-6 border border-[#e8e8ed] hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 rounded-xl mb-3" style={{background:s.c}}></div>
              <div className="text-lg font-bold mb-2">{s.t}</div>
              <div className="text-sm text-[#86868b]">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
      <div id="contact" className="bg-gradient-to-r from-[#0078d4] to-[#106EBE] text-white px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-3">准备好开始了？</h2>
        <p className="text-base font-light mb-4">联系我们的销售团队获取个性化报价。</p>
        <div className="text-2xl font-semibold">sales@keystarter.com</div>
      </div>
    </div>
  );
}
