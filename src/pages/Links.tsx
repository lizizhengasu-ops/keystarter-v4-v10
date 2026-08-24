import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { pushEvent } from "../tracking";

export default function LinksPage() {
  const { search } = useLocation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const withUtm = (path: string) => path + (search ? search : "");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    pushEvent("lead", { form_name: "links_newsletter", email_present: !!email });
    fetch("/api/consumer/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((r) => r.json())
      .then((d) => {
        setStatus(d.message || "Subscribed!");
        setEmail("");
      })
      .catch(() => setStatus("Error. Please try again."));
  };

  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="text-3xl font-bold mb-2">KeyStarter</h1>
        <p className="text-sm text-[#86868b] mb-10">Genuine Microsoft licenses, instant delivery.</p>

        <div className="space-y-4">
          <Link to={withUtm("/products")} className="block bg-white rounded-2xl p-5 border border-[#e8e8ed] hover:border-[#7c3aed]/40 transition min-h-[56px] flex items-center">
            <span className="text-base font-bold">Shop Best Sellers</span>
          </Link>
          <Link to={withUtm("/blog")} className="block bg-white rounded-2xl p-5 border border-[#e8e8ed] hover:border-[#7c3aed]/40 transition min-h-[56px] flex items-center">
            <span className="text-base font-bold">Read the Blog</span>
          </Link>
          <Link to={withUtm("/b2b")} className="block bg-white rounded-2xl p-5 border border-[#e8e8ed] hover:border-[#7c3aed]/40 transition min-h-[56px] flex items-center">
            <span className="text-base font-bold">B2B &amp; Bulk Inquiry</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed] mt-8">
          <h2 className="text-lg font-bold mb-2">Stay Updated</h2>
          <p className="text-xs text-[#86868b] mb-4">Guides and news about Windows, Office and licensing.</p>
          <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-xl border border-[#e8e8ed] text-sm min-h-[44px] focus:outline-none focus:border-[#7c3aed]"
            />
            <button type="submit" className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold px-6 py-3 rounded-xl text-sm min-h-[44px] transition cursor-pointer">
              Subscribe
            </button>
          </form>
          {status && <p className="text-xs text-green-600 mt-3">{status}</p>}
        </div>
      </div>
    </div>
  );
}
