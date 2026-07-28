import { useState } from "react";
import { useTranslation } from "react-i18next";


const [form, setForm] = useState({name:"", email:"", phone:"", subject:"", message:""});
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
        subject: "Support: " + form.subject,
        message: "<p><b>Name:</b> " + form.name + "</p><p><b>Email:</b> " + form.email + "</p><p><b>Phone:</b> " + form.phone + "</p><p><b>Subject:</b> " + form.subject + "</p><p><b>Message:</b> " + form.message + "</p>"
      })
    });
    // Auto-reply to customer
    fetch("/wp-json/keystarter/v1/send-email", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        to: form.email,
        subject: "Thank you for contacting KeyStarter Support",
        message: "<p>Hi " + form.name + ",</p><p>Thank you for reaching out. Our support team will review your request and respond within 24 hours.</p><p>For urgent issues, email admin@keys-starter.com.</p><p>Best regards,<br>KeyStarter Support Team</p>"
      })
    }).catch(() => {});
    const data = await r.json();
    setFormStatus(data.ok ? "sent" : "error");
  } catch(e) { setFormStatus("error"); }
};

const topics = [
  {n:"Activation", d:"How to activate your Windows, Office, or Server license."},
  {n:"Installation", d:"Step-by-step installation guides for all Microsoft products."},
  {n:"Licensing", d:"Understanding digital licenses, retail vs OEM, and transfer policies."},
  {n:"Account", d:"Managing your orders, keys, and account settings."},
  {n:"Payments", d:"Payment methods, invoices, and billing questions."},
  {n:"Refunds", d:"Our 30-day money-back guarantee and refund process."},
];

export default function SupportPage() {
  const { t } = useTranslation();
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{t("support.title")}</h1>
        <p className="text-[#86868b] mb-10">{t("support.desc")}</p>
        <h2 className="text-xl font-bold mb-4">{t("support.topics")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {topics.map((tp,i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-[#e8e8ed]">
              <h3 className="font-semibold text-sm mb-1">{tp.n}</h3>
              <p className="text-xs text-[#86868b]">{tp.d}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed] text-center">
          <h2 className="text-xl font-bold mb-2">{t("support.more")}</h2>
          {formStatus === "sent" ? (
            <p className="text-green-600 font-semibold text-sm">Thank you! We will respond within 24 hours.</p>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto text-left space-y-4">
              <input type="text" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required
                className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm" />
              <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required
                className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm" />
              <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}
                className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm" />
              <input type="text" placeholder="Subject" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} required
                className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm" />
              <textarea placeholder="Message" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} required rows={4}
                className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm resize-none" />
              <button type="submit" disabled={formStatus==="sending"}
                className="w-full bg-[#7c3aed] text-white py-3 rounded-xl font-semibold hover:bg-[#6d28d9] transition disabled:opacity-50">
                {formStatus==="sending" ? "Sending..." : "Send Request"}
              </button>
              {formStatus === "error" && <p className="text-red-500 text-sm text-center">Failed to send. Please email admin@keys-starter.com</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
