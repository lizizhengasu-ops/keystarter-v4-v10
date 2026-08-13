import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SoftwarePortfolio from "../components/SoftwarePortfolio";


const solutions = [
  {n:"Volume Licensing", d:"Microsoft Enterprise Agreement and Open License programs for organizations of all sizes."},
  {n:"Dedicated Support", d:"Priority technical support with dedicated account management."},
  {n:"Bulk Discounts", d:"Volume-based pricing with increasing discounts for larger orders."},
  {n:"Custom Deployment", d:"Enterprise-wide deployment planning and assistance."},
];

const INDUSTRIES = [
  { img: "/assets/images/about/industries/factory.webp", name: "Factory Automation" },
  { img: "/assets/images/about/industries/energy.webp", name: "New Energy" },
  { img: "/assets/images/about/industries/transport.webp", name: "Transportation" },
  { img: "/assets/images/about/industries/healthcare.webp", name: "Healthcare" },
  { img: "/assets/images/about/industries/monitoring.webp", name: "Monitoring & Data Centers" },
  { img: "/assets/images/about/industries/kiosk.webp", name: "Self-service Terminals" },
  { img: "/assets/images/about/industries/logistics.webp", name: "Warehouse & Logistics" },
  { img: "/assets/images/about/industries/iot.webp", name: "IoT & Embedded" },
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
    } catch {
        setErrorMsg("Network error. Please check your connection and try again.");
        setFormStatus("error");
    }
  };

  const handleWhatsAppQuote = () => {
    const text = "New B2B Quote Request\n\n" +
      "Company: " + form.company + "\n" +
      "Estimated Licenses: " + form.units + "\n" +
      "Primary Product Needs: " + form.product + "\n" +
      "Contact Name: " + form.contact + "\n" +
      "Phone / Email: " + form.phone;
    window.open("https://wa.me/14807647544?text=" + encodeURIComponent(text), "_blank");
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
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-2">Software Portfolio</h2>
          <p className="text-xs text-[#86868b] mb-8">Windows, Linux, Kylin and UOS operating systems, plus middleware, databases, office and security, backup, CAD and cloud through authorized channels.</p>
          <SoftwarePortfolio />
        </div>
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-2">Industries We Serve</h2>
          <p className="text-xs text-[#86868b] mb-8">Software and hardware integration designed for industrial, medical, energy, transportation and logistics environments.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {INDUSTRIES.map((s) => (
              <div key={s.img} className="bg-white rounded-2xl border border-[#e8e8ed] overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden bg-[#eef1f5]">
                  <img src={s.img} alt={s.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="px-4 py-3 text-sm font-bold">{s.name}</div>
              </div>
            ))}
          </div>
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
        <input tabIndex={-1} aria-hidden="true" value={form.honeypot_website} onChange={e=>setForm({...form,honeypot_website:e.target.value})} />
      </div>
                  <input type="text" name="company" aria-label="Company / Organization Name" placeholder="Company / Organization Name" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} required autoFocus
        className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm" />
      {errors.company && <p className="text-red-500 text-xs">{errors.company}</p>}
      
      <label className="text-xs font-medium text-[#86868b] block mb-1">{t("b2b.estimated_licenses")}</label>
      <select name="units" aria-label="Estimated licenses" value={form.units} onChange={e=>setForm({...form,units:e.target.value})}
        className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm bg-white">
        <option>5-20 Units</option><option>21-50 Units</option><option>51-200 Units</option><option>200+ Units</option>
      </select>
      
      <label className="text-xs font-medium text-[#86868b] block mb-1">{t("b2b.primary_needs")}</label>
      <select name="product" aria-label="Primary product needs" value={form.product} onChange={e=>setForm({...form,product:e.target.value})}
        className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm bg-white">
        <option>{t("b2b.product_windows11")}</option><option>{t("b2b.product_windows10")}</option><option>{t("b2b.product_office")}</option><option>{t("b2b.product_server")}</option><option>{t("b2b.product_other")}</option>
      </select>
      
      <input type="text" name="contact" aria-label="Contact Name" placeholder="Contact Name" value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})} required
        className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm" />
      {errors.contact && <p className="text-red-500 text-xs">{errors.contact}</p>}
      
      <input type="text" name="phone" aria-label="Phone / Email" placeholder="Phone / Email" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required
        className="w-full p-3 border border-[#e8e8ed] rounded-xl text-sm" />
      {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                  
              <div className="flex gap-3">
                <button type="submit" disabled={formStatus==="sending"}
                  className="flex-1 bg-[#7c3aed] text-white py-3 rounded-xl font-semibold hover:bg-[#6d28d9] transition disabled:opacity-50">
                  {formStatus==="sending" ? "Sending..." : "Get Free Custom Quote"}
                </button>
                <button type="button" onClick={handleWhatsAppQuote}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1faa55] text-white py-3 rounded-xl font-semibold transition">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  Get Quote by WhatsApp
                </button>
              </div>
              {formStatus === "error" && <p className="text-red-500 text-sm text-center">{errorMsg}<br/><span className="text-xs">{t("b2b.email_admin_direct")}</span></p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
