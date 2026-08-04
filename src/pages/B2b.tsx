import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";


const solutions = [
  {n:"Volume Licensing", d:"Microsoft Enterprise Agreement and Open License programs for organizations of all sizes."},
  {n:"Dedicated Support", d:"Priority technical support with dedicated account management."},
  {n:"Bulk Discounts", d:"Volume-based pricing with increasing discounts for larger orders."},
  {n:"Custom Deployment", d:"Enterprise-wide deployment planning and assistance."},
];

export default function B2bPage() {
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const el = document.getElementById(window.location.hash.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, []);
  const { t } = useTranslation();
  const [form, setForm] = useState({company:"", units:"5-20 Units", product:"Windows 11 Series", contact:"", phone:"", honeypot_website:""});
  const [formStatus, setFormStatus] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState("");
  
  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.company.trim()) e.company = "Company name is required";
    if (!form.contact.trim()) e.contact = "Contact name is required";
    if (!form.phone.trim()) e.phone = "Phone or email is required";
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
          from_email: form.phone.includes("@") ? form.phone : "",
          from_name: form.company,
          reply_to: form.phone.includes("@") ? form.phone : "",
          subject: t("b2b.compliance_quote_subject") + " (from " + form.company,
          message: "<h2>Compliance Quote Request</h2><p><b>Company:</b> " + form.company + "</p><p><b>Units:</b> " + form.units + "</p><p><b>Product:</b> " + form.product + "</p><p><b>Contact:</b> " + form.contact + "</p><p><b>Phone/Email:</b> " + form.phone + "</p>"
        })
      });
      // Auto-reply to customer (best-effort, no await)
      if (form.phone.includes("@")) {
        fetch("/wp-json/keystarter/v1/send-email", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            to: form.phone,
            from_email: form.phone,
            from_name: form.contact,
            reply_to: form.phone,
            subject: "Thank you for your Compliance Quote - KeyStarter",
            message: "<p>Hi " + form.contact + ",</p><p>Thank you for your compliance quote request. Our experts will review your needs within 30 minutes.</p><p>For urgent inquiries, please email admin@keys-starter.com.</p><p>Best regards,<br>KeyStarter Compliance Team</p>"
          })
        }).catch(() => {});
      }
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
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased">
      <div id="enterprise-b2b" className="bg-gradient-to-r from-[#6d28d9] to-[#1a1a2e] text-white px-6 sm:px-12 py-20 text-center">
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
    <div className="text-center">
    <p className="text-green-600 font-semibold text-sm">Thank you! Our team will contact you within 24 hours.</p>
    <button onClick={()=>{setForm({company:"",units:"5-20 Units",product:"Windows 11 Series",contact:"",phone:"",honeypot_website:""});setFormStatus("");setErrors({});}}
      className="mt-3 bg-[#7c3aed] text-white px-5 py-2 rounded-xl text-xs font-semibold border-none cursor-pointer hover:bg-[#6d28d9] transition">{t("b2b.send_another_quote")}</button>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto text-left space-y-4">
      <div style={{position:"absolute",left:"-9999px"}} aria-hidden="true">
        <input tabIndex={-1} value={form.honeypot_website} onChange={e=>setForm({...form,honeypot_website:e.target.value})} />
      </div>
                  <input type="text" placeholder="Company / Organization Name" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} required autoFocus
        className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm" />
      {errors.company && <p className="text-red-500 text-xs">{errors.company}</p>}
      
      <label className="text-xs font-medium text-[#86868b] block mb-1">{t("b2b.estimated_licenses")}</label>
      <select value={form.units} onChange={e=>setForm({...form,units:e.target.value})}
        className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm bg-white">
        <option>5-20 Units</option><option>21-50 Units</option><option>51-200 Units</option><option>200+ Units</option>
      </select>
      
      <label className="text-xs font-medium text-[#86868b] block mb-1">{t("b2b.primary_needs")}</label>
      <select value={form.product} onChange={e=>setForm({...form,product:e.target.value})}
        className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm bg-white">
        <option>{t("b2b.product_windows11")}</option><option>{t("b2b.product_windows10")}</option><option>{t("b2b.product_office")}</option><option>{t("b2b.product_server")}</option><option>{t("b2b.product_other")}</option>
      </select>
      
      <input type="text" placeholder="Contact Name" value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})} required
        className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm" />
      {errors.contact && <p className="text-red-500 text-xs">{errors.contact}</p>}
      
      <input type="text" placeholder="Phone / Email" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required
        className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm" />
      {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                  
              <button type="submit" disabled={formStatus==="sending"}
                className="w-full bg-[#7c3aed] text-white py-3 rounded-xl font-semibold hover:bg-[#6d28d9] transition disabled:opacity-50">
                {formStatus==="sending" ? "Sending..." : "Get Free Custom Quote"}
              </button>
              {formStatus === "error" && <p className="text-red-500 text-sm text-center">{errorMsg}<br/><span className="text-xs">{t("b2b.email_admin_direct")}</span></p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
