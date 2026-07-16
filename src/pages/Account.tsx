import { Link } from "react-router-dom";

export default function AccountPage() {
  const orders = [
    {n:"Windows 11 Pro",date:"2026-07-01",status:"Activated"},
    {n:"Office 2021 Pro Plus",date:"2026-06-28",status:"Shipped"},
  ];
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-3">My Account</h1>
        <p className="text-base font-light text-white/80">Manage your licenses, orders, and account settings.</p>
      </div>
      <div className="max-w-lg mx-auto px-6 py-12">
        <div className="v5-card bg-white rounded-2xl p-8 border border-[#e8e8ed]">
          <h2 className="text-xl font-bold mb-6 text-center">Sign In</h2>
          <div className="mb-4">
            <label className="block text-xs font-semibold mb-1.5">Email Address</label>
            <input type="email" placeholder="you@example.com" className="w-full p-2.5 border border-[#e8e8ed] rounded-lg text-sm bg-[#f5f5f7] focus:outline-none focus:border-[#0078d4] transition" />
          </div>
          <div className="mb-5">
            <label className="block text-xs font-semibold mb-1.5">Password</label>
            <input type="password" placeholder="Enter your password" className="w-full p-2.5 border border-[#e8e8ed] rounded-lg text-sm bg-[#f5f5f7] focus:outline-none focus:border-[#0078d4] transition" />
          </div>
          <button className="w-full bg-[#0078d4] hover:bg-[#0062b1] text-white font-semibold py-3 rounded-xl transition cursor-pointer">Sign In</button>
          <div className="text-center mt-3 text-xs">
            <Link to="/" className="text-[#0078d4] hover:underline">Forgot Password?</Link>
            <span className="mx-2 text-[#e8e8ed]">|</span>
            <Link to="/" className="text-[#0078d4] hover:underline">Create New Account</Link>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {orders.map((o,i)=>(
              <div key={i} className="bg-white rounded-2xl p-4 border border-[#e8e8ed]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold">{o.n}</span>
                  <span className="text-[10px] text-[#86868b]">{o.date}</span>
                </div>
                <span className="text-xs text-green-600 font-semibold">{o.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
