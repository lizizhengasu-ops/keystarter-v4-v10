import { Link } from "react-router-dom";

const solutions = [
  {t:"Volume Licensing",d:"Enterprise agreements starting at 5 licenses. Dedicated account manager.",c:"#0078D4"},
  {t:"OEM Partnerships",d:"Pre-install licenses on new hardware. Bulk pricing available.",c:"#107C10"},
  {t:"Education Licensing",d:"Special pricing for schools, universities, and non-profits.",c:"#D83B01"},
  {t:"Government",d:"GSA schedules, compliance-ready. Secure enterprise licensing.",c:"#5C2E91"},
];

const stats = [
  {n:"50,000+",l:"Licenses Delivered"},{n:"98.7%",l:"Customer Satisfaction"},{n:"10min",l:"Average Delivery"},{n:"24/7",l:"Support Available"}
];

const testimonials = [
  {q:"KeyStarter saved us 60% on our Microsoft licensing. The volume discount program is excellent.",n:"Sarah Chen",t:"IT Director, TechGlobal Inc."},
  {q:"We switched to KeyStarter for all our Windows deployments. Reliable, fast, and great support.",n:"Marcus Johnson",t:"CTO, DataStream Corp"},
  {q:"The education licensing program helped us equip 500+ student workstations affordably.",n:"Dr. Emily Park",t:"Dean of IT, Westfield University"},
];

export default function B2BPage() {
  return (
    <div style={{fontFamily:'"Segoe UI Variable Text","Segoe UI",sans-serif',color:"#000",background:"#fff"}}>
      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)",color:"#fff",padding:"80px 48px",textAlign:"center"}}>
        <h1 style={{fontSize:48,fontWeight:500,lineHeight:"56px",margin:"0 0 16px 0"}}>KeyStarter for Business</h1>
        <p style={{fontSize:20,fontWeight:200,lineHeight:"28px",margin:"0 0 32px 0",maxWidth:700,marginLeft:"auto",marginRight:"auto"}}>Enterprise-grade Microsoft licensing for organizations of all sizes. Volume discounts, dedicated support, instant deployment.</p>
        <div style={{display:"flex",gap:16,justifyContent:"center"}}>
          <a href="#contact" style={{background:"#0078D4",color:"#fff",padding:"12px 32px",fontSize:16,fontWeight:600,textDecoration:"none",borderRadius:2}}>Contact Sales</a>
          <a href="#solutions" style={{background:"rgba(255,255,255,0.1)",color:"#fff",padding:"12px 32px",fontSize:16,fontWeight:600,textDecoration:"none",borderRadius:2}}>View Solutions</a>
        </div>
      </div>

      {/* Stats */}
      <div style={{padding:"48px 48px",background:"#f5f5f5"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,textAlign:"center"}}>
          {stats.map((s,i)=>(
            <div key={i}>
              <div style={{fontSize:36,fontWeight:700,color:"#0078D4",marginBottom:4}}>{s.n}</div>
              <div style={{fontSize:14,color:"#616161"}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Solutions */}
      <div id="solutions" style={{padding:"48px 48px",maxWidth:1200,margin:"0 auto"}}>
        <h2 style={{fontSize:28,fontWeight:500,marginBottom:8}}>Enterprise Solutions</h2>
        <p style={{fontSize:15,color:"#616161",marginBottom:32}}>Tailored licensing programs for every business need.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16}}>
          {solutions.map((s,i)=>(
            <div key={i} style={{background:"#f5f5f5",padding:24,borderRadius:2}}>
              <div style={{width:40,height:40,background:s.c,borderRadius:8,marginBottom:12}}></div>
              <div style={{fontSize:20,fontWeight:600,marginBottom:8}}>{s.t}</div>
              <div style={{fontSize:14,color:"#616161",lineHeight:"22px"}}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{padding:"48px 48px",background:"#f5f5f5"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <h2 style={{fontSize:28,fontWeight:500,textAlign:"center",marginBottom:32}}>Trusted by Industry Leaders</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
            {testimonials.map((t,i)=>(
              <div key={i} style={{background:"#fff",padding:24,borderRadius:2}}>
                <p style={{fontSize:14,color:"#616161",lineHeight:"22px",fontStyle:"italic",marginBottom:16}}>"{t.q}"</p>
                <div style={{fontWeight:600,fontSize:14}}>{t.n}</div>
                <div style={{fontSize:12,color:"#616161"}}>{t.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div id="contact" style={{background:"linear-gradient(135deg,#0078D4,#106EBE)",padding:"60px 48px",textAlign:"center",color:"#fff"}}>
        <h2 style={{fontSize:34,fontWeight:500,marginBottom:12}}>Ready to get started?</h2>
        <p style={{fontSize:17,fontWeight:300,marginBottom:24}}>Contact our sales team for a customized quote.</p>
        <div style={{fontSize:24,fontWeight:600}}>sales@keystarter.com</div>
      </div>
    </div>
  );
}
