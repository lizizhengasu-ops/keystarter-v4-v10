export default function AboutPage() {
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-3">About KeyStarter</h1>
        <p className="text-base font-light text-white/80">Your trusted source for genuine Microsoft software licenses.</p>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <div className="bg-white rounded-2xl p-8 border border-[#e8e8ed]">
          <h2 className="text-xl font-bold mb-4">Our Story</h2>
          <p className="text-sm text-[#86868b] leading-relaxed">KeyStarter is a Microsoft-authorized supply chain partner providing genuine software licenses to businesses and individuals worldwide. Founded with the mission to make software licensing accessible and affordable, we have served thousands of customers across the globe.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed] text-center">
            <p className="text-3xl font-bold text-[#0078d4]">10K+</p>
            <p className="text-xs text-[#86868b] mt-1">Customers Served</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed] text-center">
            <p className="text-3xl font-bold text-[#0078d4]">5+</p>
            <p className="text-xs text-[#86868b] mt-1">Years Experience</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed] text-center">
            <p className="text-3xl font-bold text-[#0078d4]">99.9%</p>
            <p className="text-xs text-[#86868b] mt-1">Delivery Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}