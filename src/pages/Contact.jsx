import { useState } from "react";
import { useTranslation } from "react-i18next";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({name:"", email:"", subject:"general", message:"", honeypot_website:""});
  const [fs, setFs] = useState("");
  const [errs, setErrs] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!emailRe.test(form.email)) e.email = "Invalid email format";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const v = validate();
    setErrs(v);
    if (Object.keys(v).length > 0) return;
    if (form.honeypot_website) return;
    setFs("sending");
    try {
      const r = await fetch("/wp-json/keystarter/v1/send-email", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          to: "admin@keys-starter.com",
          from_email: form.email,
          from_name: form.name,
          reply_to: form.email,
          subject: "Contact: " + form.subject + " from " + form.name,
          message: "<p><b>Name:</b> " + form.name + "</p><p><b>Email:</b> " + form.email + "</p><p><b>Subject:</b> " + form.subject + "</p><p><b>Message:</b> " + form.message + "</p>"
        })
      });
      fetch("/wp-json/keystarter/v1/send-email", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          to: form.email,
          from_email: form.email,
          from_name: form.name,
          reply_to: form.email,
          subject: "Thank you for contacting KeyStarter",
          message: "<p>Hi " + form.name + ",</p><p>Thank you for contacting KeyStarter. We will review your inquiry and respond within 24 hours.</p><p>Best regards,<br>KeyStarter Team</p>"
        })
      }).catch(() => {});
      const data = await r.json();
      if (data.ok) {
        setFs("sent");
      } else {
        setErrorMsg(data.message || "Failed to send");
        setFs("error");
      }
    } catch(_e) {
      setErrorMsg("Network error. Please check your connection.");
      setFs("error");
    }
  };

  const resetForm = () => {
    setForm({name:"", email:"", subject:"general", message:"", honeypot_website:""});
    setFs("");
    setErrs({});
    setErrorMsg("");
  };

  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{t("contact.title")}</h1>
        <p className="text-[#86868b] mb-10">{t("contact.desc")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed]">
            {fs === "sent" ? (
              <div className="text-center py-8">
                <p className="text-green-600 font-semibold text-lg mb-2">✓ Thank you!</p>
                <p className="text-sm text-[#86868b] mb-4">We'll respond within 24 hours.</p>
                <button onClick={resetForm}
                  className="bg-[#7c3aed] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#6d28d9] transition border-none cursor-pointer text-sm">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{position:"absolute",left:"-9999px"}} aria-hidden="true">
                  <input tabIndex={-1} value={form.honeypot_website} onChange={e=>setForm({...form,honeypot_website:e.target.value})} />
                </div>
                <div className="mb-4">
                  <label className="text-sm font-semibold block mb-1">{t("contact.name")}</label>
                  <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required autoFocus
                    className="w-full p-2.5 border border-[#e8e8ed] rounded-xl text-sm" />
                  {errs.name && <p className="text-red-500 text-xs mt-1">{errs.name}</p>}
                </div>
                <div className="mb-4">
                  <label className="text-sm font-semibold block mb-1">{t("contact.email")}</label>
                  <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} type="email" required
                    className="w-full p-2.5 border border-[#e8e8ed] rounded-xl text-sm" />
                  {errs.email && <p className="text-red-500 text-xs mt-1">{errs.email}</p>}
                </div>
                <div className="mb-4">
                  <label className="text-sm font-semibold block mb-1">{t("contact.subject")}</label>
                  <select value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}
                    className="w-full p-2.5 border border-[#e8e8ed] rounded-xl text-sm bg-white">
                    <option value="general">{t("contact.general")}</option>
                    <option value="tech">{t("contact.tech")}</option>
                    <option value="b2b">{t("contact.b2b")}</option>
                    <option value="partnership">{t("contact.partnership")}</option>
                    <option value="other">{t("contact.other")}</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-sm font-semibold block mb-1">{t("contact.message")}</label>
                  <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} required rows={4}
                    className="w-full p-2.5 border border-[#e8e8ed] rounded-xl text-sm" />
                  {errs.message && <p className="text-red-500 text-xs mt-1">{errs.message}</p>}
                </div>
                <button type="submit" disabled={fs==="sending"}
                  className="w-full bg-[#7c3aed] text-white py-3 rounded-xl font-semibold border-none cursor-pointer hover:bg-[#6d28d9] transition disabled:opacity-50 text-sm">
                  {fs==="sending" ? "Sending..." : t("contact.send")}
                </button>
                {fs === "error" && <p className="text-red-500 text-sm text-center mt-3">{errorMsg}<br/><span className="text-xs">Or email admin@keys-starter.com directly</span></p>}
                <p className="text-xs text-[#86868b] text-center mt-3">{t("contact.response")}</p>
              </form>
            )}
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed]"><div className="font-semibold mb-1">{t("contact.email")}</div><div className="text-sm text-[#86868b]">admin@keys-starter.com</div></div>
            <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed]"><div className="font-semibold mb-1">{t("contact.chat")}</div><div className="text-sm text-[#86868b]">{t("contact.chat_avail")}</div></div>
            <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed]"><div className="font-semibold mb-1">{t("contact.phone")}</div><div className="text-sm text-[#86868b]">{t("contact.hours")}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
