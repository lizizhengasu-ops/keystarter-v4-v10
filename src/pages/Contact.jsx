export default function ContactPage() {
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-white px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
        <p className="text-base font-light text-white/80">We're here to help. Get in touch with our team.</p>
      </div>
      <div className="max-w-lg mx-auto px-6 py-16">
        <div className="v5-card bg-white rounded-2xl p-8 border border-[#e8e8ed]">
          <div className="mb-4">
            <label className="block text-xs font-semibold mb-1.5">Your Name</label>
            <input type="text" placeholder="John Doe" className="w-full p-2.5 border border-[#e8e8ed] rounded-lg text-sm bg-[#f5f5f7] focus:outline-none focus:border-[#0078d4] transition" />
          </div>
          <div className="mb-4">
            <label className="block text-xs font-semibold mb-1.5">Email Address</label>
            <input type="email" placeholder="you@example.com" className="w-full p-2.5 border border-[#e8e8ed] rounded-lg text-sm bg-[#f5f5f7] focus:outline-none focus:border-[#0078d4] transition" />
          </div>
          <div className="mb-4">
            <label className="block text-xs font-semibold mb-1.5">Subject</label>
            <select className="w-full p-2.5 border border-[#e8e8ed] rounded-lg text-sm bg-[#f5f5f7] focus:outline-none focus:border-[#0078d4] transition text-[#1d1d1f]">
              <option>General Inquiry</option>
              <option>Technical Support</option>
              <option>Bulk / B2B Inquiry</option>
              <option>Partnership</option>
              <option>Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-semibold mb-1.5">Message</label>
            <textarea rows="5" placeholder="How can we help you?" className="w-full p-2.5 border border-[#e8e8ed] rounded-lg text-sm bg-[#f5f5f7] focus:outline-none focus:border-[#0078d4] transition" />
          </div>
          <button className="w-full bg-[#0078d4] hover:bg-[#0062b1] text-white font-semibold py-3 rounded-xl transition cursor-pointer">Send Message</button>
          <p className="text-center text-xs text-[#86868b] mt-4">We'll respond within 24 hours.</p>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="text-center bg-white rounded-xl p-4 border border-[#e8e8ed]">
            <p className="text-sm font-bold mb-1">Email</p>
            <p className="text-xs text-[#86868b]">support@keystarter.com</p>
          </div>
          <div className="text-center bg-white rounded-xl p-4 border border-[#e8e8ed]">
            <p className="text-sm font-bold mb-1">Chat</p>
            <p className="text-xs text-[#86868b]">Live chat available</p>
          </div>
          <div className="text-center bg-white rounded-xl p-4 border border-[#e8e8ed]">
            <p className="text-sm font-bold mb-1">Phone</p>
            <p className="text-xs text-[#86868b]">Mon-Fri 9-5 EST</p>
          </div>
        </div>
      </div>
    </div>
  );
}