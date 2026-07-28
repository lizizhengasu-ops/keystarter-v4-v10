import { useState } from "react";
import { useTranslation } from "react-i18next";


const [form, setForm] = useState({name:"", email:"", phone:"", company:"", product_interest:"", message:""});
const [formStatus, setFormStatus] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setFormStatus("sending");
  try {
    const r = await fetch("/wp-json/keystarter/v1/send-email", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        to: "admin@keys-starter.com",
        subject: "B2B Inquiry from " + form.name,
        message: "<p><b>Name:</b> " + form.name + "</p><p><b>Email:</b> " + form.email + "</p><p><b>Phone:</b> " + form.phone + "</p><p><b>Company:</b> " + form.company + "</p><p><b>Product Interest:</b> " + form.product_interest + "</p><p><b>Message:</b> " + form.message + "</p>"
      })
    });
    // Auto-reply to customer (best-effort, no await)
    fetch("/wp-json/keystarter/v1/send-email", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        to: form.email,
        subject: "Thank you for your B2B Inquiry - KeyStarter",
        message: "<p>Hi " + form.name + ",</p><p>Thank you for your interest in KeyStarter's B2B solutions. Our enterprise sales team will review your inquiry and contact you within 24 hours.</p><p>For urgent inquiries, please email admin@keys-starter.com or call our sales team.</p><p>Best regards,<br>KeyStarter Enterprise Sales</p>"
      })
    }).catch(() => {});
    const data = await r.json();
    setFormStatus(data.ok ? "sent" : "error");
  } catch(e) { setFormStatus("error"); }
};

const solutions = [
  {n:"Volume Licensing", d:"Microsoft Enterprise Agreement and Open License programs for organizations of all sizes."},
  {n:"Dedicated Support", d:"Priority technical support with dedicated account management."},
  {n:"Bulk Discounts", d:"Volume-based pricing with increasing discounts for larger orders."},
  {n:"Custom Deployment", d:"Enterprise-wide deployment planning and assistance."},
];

export default function B2bPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div className="bg-gradient-to-r from-[#6d28d9] to-[#1a1a2e] text-white px-6 sm:px-12 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">{t("b2b.title")}</h1>
        <p className="text-lg font-light max-w-2xl mx-auto mb-8">{t("b2b.desc")}</p>
        <a href="mailto:admin@keys-starter.com?subject=Enterprise%20B2B%20Inquiry" className="inline-block bg-white text-[#6d28d9] px-8 py-3 rounded-xl font-semibold text-sm no-underline hover:bg-gray-100 transition">{t("b2b.contact")}</a>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">{t("b2b.solutions")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {solutions.map((s,i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-[#e8e8ed]">
              <h3 className="font-bold text-sm mb-2">{s.n}</h3>
              <p className="text-xs text-[#86868b]">{s.d}</p>
            </div>
          ))}
        </div>
        <div className="text-center py-12 border-t border-[#e8e8ed]">
          <h2 className="text-2xl font-bold mb-4">{t("b2b.ready")}</h2>
          {formStatus === "sent" ? (
            <p className="text-green-600 font-semibold text-sm">Thank you! Our team will contact you within 24 hours.</p>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto text-left space-y-4">
              <input type="text" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required
                className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm" />
              <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required
                className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm" />
              <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}
                className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm" />
              <input type="text" placeholder="Company" value={form.company} onChange={e=>setForm({...form,company:e.target.value})}
                className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm" />
              <input type="text" placeholder="Product Interest (e.g., Windows Server, Office)" value={form.product_interest} onChange={e=>setForm({...form,product_interest:e.target.value})}
                className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm" />
              <textarea placeholder="Message" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} required rows={4}
                className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm resize-none" />
              <button type="submit" disabled={formStatus==="sending"}
                className="w-full bg-[#7c3aed] text-white py-3 rounded-xl font-semibold hover:bg-[#6d28d9] transition disabled:opacity-50">
                {formStatus==="sending" ? "Sending..." : "Send Inquiry"}
              </button>
              {formStatus === "error" && <p className="text-red-500 text-sm text-center">Failed to send. Please email admin@keys-starter.com</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
