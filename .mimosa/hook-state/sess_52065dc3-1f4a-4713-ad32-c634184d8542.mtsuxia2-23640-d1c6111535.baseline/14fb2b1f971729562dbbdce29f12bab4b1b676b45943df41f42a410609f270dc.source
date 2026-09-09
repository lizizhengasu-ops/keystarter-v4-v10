import { Link } from "react-router-dom";

const topics = [
  {t:"Windows Activation Guide",d:"Windows 10/11 Pro digital license activation steps"},
  {t:"Office Installation",d:"Office 2016-2024 Professional Plus install & activate"},
  {t:"Server Setup",d:"Windows Server / SQL / Exchange deployment guide"},
  {t:"Bundle Activation",d:"Multi-product bundle activation method"},
  {t:"License Transfer",d:"Transfer licenses after changing devices"},
  {t:"FAQ",d:"Activation error codes and solutions"},
];

export default function SupportPage() {
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-3">Tech Support</h1>
        <p className="text-base font-light text-white/80 mb-8">Get help with activation, installation, and licensing.</p>
        <div className="max-w-xl mx-auto">
          <input type="text" placeholder="Search support topics..." className="w-full p-3.5 text-sm border-none rounded-xl outline-none text-[#1d1d1f]" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-6">Popular Topics</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {topics.map((t,i)=>(
            <div key={i} className="v5-card-light bg-white rounded-2xl p-5 border border-[#e8e8ed] hover:shadow-md transition cursor-pointer">
              <div className="text-sm font-bold mb-2">{t.t}</div>
              <div className="text-xs text-[#86868b]">{t.d}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white border-t border-[#e8e8ed] py-8">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div>
            <div className="text-base font-bold">Need More Help?</div>
            <div className="text-xs text-[#86868b]">Email us at support@keystarter.com</div>
          </div>
          <Link to="/" className="bg-[#0078d4] hover:bg-[#0062b1] text-white px-6 py-2.5 text-sm font-semibold rounded-xl transition">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
