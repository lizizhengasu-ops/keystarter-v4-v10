import { useState } from "react";
import { useTranslation } from "react-i18next";


const topics = [
  {n:"Activation", d:"How to activate your Windows, Office, or Server license."},
  {n:"Installation", d:"Step-by-step installation guides for all Microsoft products."},
  {n:"Licensing", d:"Understanding digital licenses, retail vs OEM, and transfer policies."},
  {n:"Account", d:"Managing your orders, keys, and account settings."},
  {n:"Payments", d:"Payment methods, invoices, and billing questions."},
  {n:"Refunds", d:"Our 14-day refund policy and refund process."},
];

export default function SupportPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({name:"", email:"", phone:"", subject:"", message:"", honeypot_website:""});
  const [formStatus, setFormStatus] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState("");
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!emailRe.test(form.email)) e.email = "Invalid email format";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    if (form.honeypot_website) return;
    setFormStatus("sending");
    try {
      const r = await fetch("/wp-json/keystarter/v1/send-email", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          to: "admin@keys-starter.com",
          from_email: form.email,
          from_name: form.name,
          reply_to: form.email,
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
          from_email: form.email,
          from_name: form.name,
          reply_to: form.email,
          subject: "Thank you for contacting KeyStarter Support",
          message: "<p>Hi " + form.name + ",</p><p>Thank you for reaching out. Our support team will review your request and respond within 24 hours.</p><p>For urgent issues, email admin@keys-starter.com.</p><p>Best regards,<br>KeyStarter Support Team</p>"
        })
      }).catch(() => {});
      const data = await r.json();
      if (data.ok) {
        setFormStatus("sent");
      } else {
        setErrorMsg(data.message || "Failed to send");
        setFormStatus("error");
      }
    } catch(e) {
        setErrorMsg("Network error. Please check your connection and try again.");
        setFormStatus("error");
    }
  };
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
    <div className="text-center">
    <p className="text-green-600 font-semibold text-sm">Thank you! We will respond within 24 hours.</p>
    <button onClick={()=>{setForm({name:"",email:"",phone:"",subject:"",message:"",honeypot_website:""});setFormStatus("");setErrors({});}}
      className="mt-3 bg-[#7c3aed] text-white px-5 py-2 rounded-xl text-xs font-semibold border-none cursor-pointer hover:bg-[#6d28d9] transition">{t("support.send_another")}</button>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto text-left space-y-4">
      <div style={{position:"absolute",left:"-9999px"}} aria-hidden="true">
        <input tabIndex={-1} value={form.honeypot_website} onChange={e=>setForm({...form,honeypot_website:e.target.value})} />
      </div>
              <input type="text" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required autoFocus
        className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm" />
      {errors.name && <p className="text-red-500 text-xs -mt-2">{errors.name}</p>}
      <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required
        className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm" />
      {errors.email && <p className="text-red-500 text-xs -mt-2">{errors.email}</p>}
      <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}
                className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm" />
              <input type="text" placeholder="Subject" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} required
                className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm" />
      <textarea placeholder="Message" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} required rows={4}
        className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm resize-none" />
      {errors.message && <p className="text-red-500 text-xs -mt-2">{errors.message}</p>}
              <button type="submit" disabled={formStatus==="sending"}
                className="w-full bg-[#7c3aed] text-white py-3 rounded-xl font-semibold hover:bg-[#6d28d9] transition disabled:opacity-50">
                {formStatus==="sending" ? "Sending..." : "Send Request"}
              </button>
              {formStatus === "error" && <p className="text-red-500 text-sm text-center">{errorMsg}<br/><span className="text-xs">{t("support.email_admin_direct")}</span></p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
