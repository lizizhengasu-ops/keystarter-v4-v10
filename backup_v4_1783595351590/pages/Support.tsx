import { Link } from "react-router-dom";

const topics = [
  {t:"Windows Activation",d:"Guide to activate Windows 10/11 Pro using your digital license key.",h:"windows-activation"},
  {t:"Office Installation",d:"Step-by-step setup for Office 2016-2024 Professional Plus.",h:"office-install"},
  {t:"Server Setup",d:"Installation and configuration guides for Windows Server, SQL, Exchange.",h:"server-setup"},
  {t:"Bundle Activation",d:"How to activate multiple products from your value bundle purchase.",h:"bundle-activation"},
  {t:"License Transfer",d:"Transfer your license to a new PC or reinstall after hardware changes.",h:"license-transfer"},
  {t:"Troubleshooting",d:"Common activation errors and how to resolve them quickly.",h:"troubleshooting"},
  {t:"Refund Policy",d:"60-day money-back guarantee. Full refund for unactivated keys.",h:"refund"},
  {t:"B2B Support",d:"Dedicated support for enterprise and volume licensing customers.",h:"b2b-support"},
];

const articles = [
  {t:"How to Activate Windows 11 Pro",d:"Complete activation guide with screenshots and common error solutions.",c:"Activation"},
  {t:"Installing Office 2021 on Windows 10/11",d:"Step-by-step installation from download to full activation.",c:"Installation"},
  {t:"Transferring Your License to a New PC",d:"How to deactivate and transfer your digital license.",c:"License"},
  {t:"Understanding Activation Methods",d:"Digital license vs product key vs volume activation explained.",c:"Guide"},
  {t:"Windows Server 2022 First-Time Setup",d:"Server configuration from installation to active directory.",c:"Server"},
  {t:"Office Bundle Activation Guide",d:"Activating multiple Office products from a single bundle purchase.",c:"Bundle"},
  {t:"Common Activation Error Codes",d:"Error 0x004C0205, 0x004F0506 and other common codes explained.",c:"Troubleshooting"},
  {t:"SQL Server 2019 License Activation",d:"Installing and activating SQL Server Standard Edition.",c:"Server"},
  {t:"Project and Visio Installation Guide",d:"Separate installer for Project Professional and Visio Professional.",c:"Tools"},
  {t:"Exchange Server 2019 Setup",d:"Mail server installation and license key activation.",c:"Server"},
  {t:"Windows 11 Pro vs Enterprise Features",d:"Compare features and choose the right edition for your needs.",c:"Comparison"},
];

export default function SupportPage() {
  return (
    <div style={{fontFamily:'"Segoe UI Variable Text","Segoe UI",sans-serif',color:"#000",background:"#fff"}}>
      {/* Hero Search */}
      <div style={{background:"linear-gradient(135deg,#1a1a2e,#16213e)",padding:"60px 48px",textAlign:"center",color:"#fff"}}>
        <h1 style={{fontSize:44,fontWeight:500,margin:"0 0 12px 0"}}>KeyStarter Support</h1>
        <p style={{fontSize:17,fontWeight:200,marginBottom:32}}>Get help with activation, installation, and licensing.</p>
        <div style={{maxWidth:600,margin:"0 auto"}}>
          <input type="text" placeholder="Search support topics..." style={{width:"100%",padding:"14px 16px",fontSize:15,border:"none",borderRadius:2,outline:"none"}} />
        </div>
      </div>

      {/* Topics Grid */}
      <div style={{padding:"48px 48px",maxWidth:1200,margin:"0 auto"}}>
        <h2 style={{fontSize:28,fontWeight:500,marginBottom:24}}>Popular Support Topics</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
          {topics.map((t,i)=>(
            <Link key={i} to={"/support/"+t.h} style={{textDecoration:"none",color:"inherit"}}>
              <div style={{background:"#f5f5f5",padding:20,borderRadius:2,minHeight:120}}>
                <div style={{fontSize:16,fontWeight:600,marginBottom:6}}>{t.t}</div>
                <div style={{fontSize:13,color:"#616161",lineHeight:"20px"}}>{t.d}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div style={{padding:"0 48px 48px",maxWidth:1200,margin:"0 auto"}}>
        <h2 style={{fontSize:28,fontWeight:500,marginBottom:24}}>Articles</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
          {articles.map((a,i)=>(
            <Link key={i} to={"/support/"+a.c.toLowerCase()} style={{textDecoration:"none",color:"inherit"}}>
              <div style={{background:"#f5f5f5",padding:16,borderRadius:2}}>
                <div style={{fontSize:11,color:"#0078D4",fontWeight:600,textTransform:"uppercase",marginBottom:4}}>{a.c}</div>
                <div style={{fontSize:15,fontWeight:600,marginBottom:4,lineHeight:"22px"}}>{a.t}</div>
                <div style={{fontSize:12,color:"#616161",lineHeight:"18px"}}>{a.d}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div style={{background:"#f5f5f5",padding:"32px 48px"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontSize:17,fontWeight:600}}>Need more help?</div><div style={{fontSize:13,color:"#616161"}}>Email us at support@keystarter.com</div></div>
          <Link to="/" style={{background:"#0078D4",color:"#fff",padding:"10px 24px",fontSize:14,fontWeight:600,textDecoration:"none",borderRadius:2}}>Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
