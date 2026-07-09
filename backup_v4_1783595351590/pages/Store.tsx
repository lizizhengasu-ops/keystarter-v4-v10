import { useCart } from "../CartContext";
import { Link } from "react-router-dom";

const categories = [
  {name:"Windows 11 Pro", slug:"windows-11-pro", color:"#0078D4", items:["Single PC .09","2 PCs .09","Pro + Office Bundle .09","Pro + Office + Visio .09"]},
  {name:"Windows 10 Pro", slug:"windows-10-pro", color:"#106EBE", items:["Single PC .08","2 PCs .09","Pro + Office Bundle .09","Server 2019 + Office .09"]},
  {name:"Office 2021 Pro", slug:"office-2021-pro", color:"#D83B01", items:["Office 2021 Pro Plus .09","Office 2019 Pro Plus .09","Office 2016 Pro Plus .09","2024 Pro Plus .09"]},
  {name:"Server & Tools", slug:"win-svr-2022", color:"#005A9E", items:["Server 2019 .09","Server 2022 .09","Exchange 2019 .09","SQL Server 2019 .09"]}
];

const deals = [
  {title:"Windows 11 Pro on sale", desc:"From .09 — latest OS with Copilot AI"},
  {title:"Office 2021 Pro Plus", desc:"Full suite .09 — Word, Excel, PowerPoint"},
  {title:"Bundle & save up to 40%", desc:"Windows + Office combos from .09"},
  {title:"Server licenses from .09", desc:"Windows Server, SQL, Exchange — instant delivery"}
];

export default function StorePage() {
  const { addToCart } = useCart();
  return (
    <div style={{fontFamily:'"Segoe UI Variable Text","Segoe UI",system-ui,sans-serif',color:"#000",background:"#fff"}}>
      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#0078D4 0%,#106EBE 50%,#005A9E 100%)",color:"#fff",padding:"60px 48px"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <h1 style={{fontSize:48,fontWeight:500,lineHeight:"56px",margin:"0 0 12px 0"}}>KeyStarter Store</h1>
          <p style={{fontSize:20,fontWeight:200,lineHeight:"24px",margin:"0 0 32px 0"}}>Genuine Microsoft software licenses at unbeatable prices.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
            {deals.slice(0,4).map((d,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,0.1)",padding:20,borderRadius:2,border:"1px solid rgba(255,255,255,0.15)"}}>
                <div style={{fontSize:16,fontWeight:600,marginBottom:4}}>{d.title}</div>
                <div style={{fontSize:13,color:"rgba(255,255,255,0.8)",marginBottom:8}}>{d.desc}</div>
                <Link to="/products" style={{fontSize:13,color:"#fff",textDecoration:"none",fontWeight:600}}>Shop now</Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Grid */}
      <div style={{padding:"48px 48px",maxWidth:1200,margin:"0 auto"}}>
        <div style={{fontSize:24,fontWeight:600,color:"#000",marginBottom:24}}>Shop by category</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
          {categories.map((c,i)=>(
            <div key={i} style={{background:"#f5f5f5",padding:"24px",borderRadius:2}}>
              <div style={{width:48,height:48,background:c.color,borderRadius:8,marginBottom:12,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span style={{color:"#fff",fontSize:20,fontWeight:700}}>{c.name[0]}</span>
              </div>
              <div style={{fontSize:20,fontWeight:600,marginBottom:12}}>{c.name}</div>
              {c.items.map((it,j)=>(
                <div key={j} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",fontSize:13,borderBottom:j<c.items.length-1?"1px solid #ddd":"none"}}>
                  <span style={{flex:1}}>{it.split("$")[0].trim()}</span>
                  <span style={{fontWeight:600}}></span>
                </div>
              ))}
              <Link to={"/product/"+c.slug} style={{fontSize:13,color:"#0067b8",display:"block",marginTop:8,textDecoration:"none",fontWeight:600}}>Shop {c.name} &gt;</Link>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div style={{padding:"48px 48px",background:"#f5f5f5"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{fontSize:24,fontWeight:600,color:"#000",marginBottom:24}}>Featured Products</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
            {[
              {n:"Windows 11 Pro",p:14.09,s:"windows-11-pro",desc:"Latest OS, Copilot AI"},
              {n:"Office 2021 Pro Plus",p:24.09,s:"office-2021-pro",desc:"Word, Excel, PowerPoint"},
              {n:"Windows Server 2022",p:11.09,s:"win-svr-2022",desc:"Enterprise server"},
              {n:"Office 2024 Pro Plus",p:8.09,s:"office-2024-pro",desc:"Latest suite release"},
            ].map((x,i)=>(
              <div key={i} style={{background:"#fff",padding:16,borderRadius:2}}>
                <img src={"https://picsum.photos/seed/"+x.s+"_box/400/250"} alt={x.n} style={{width:"100%",height:140,objectFit:"cover",marginBottom:8,borderRadius:2}} />
                <div style={{fontSize:12,color:"#616161",marginBottom:4}}>Microsoft License</div>
                <div style={{fontSize:15,fontWeight:600,marginBottom:4}}>{x.n}</div>
                <div style={{fontSize:13,color:"#616161",marginBottom:4}}>{x.desc}</div>
                <div style={{fontSize:16,fontWeight:700,color:"#000",marginBottom:8}}></div>
                <button onClick={()=>addToCart({slug:x.s,name:x.n,price:x.p})}
                  style={{background:"#0078D4",color:"#fff",border:"none",padding:"6px 16px",fontSize:13,borderRadius:2,cursor:"pointer",fontWeight:600}}>Add to cart</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why KeyStarter */}
      <div style={{padding:"48px 48px",background:"#fff"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <div style={{fontSize:24,fontWeight:600,color:"#000",marginBottom:24}}>Why KeyStarter?</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
            {[
              {t:"Genuine Licenses",d:"100% authentic Microsoft keys. Verified and guaranteed."},
              {t:"Instant Delivery",d:"Keys delivered via email within minutes of purchase."},
              {t:"Lifetime Support",d:"Free activation support, anytime."},
              {t:"Best Prices",d:"Up to 70% off retail. Price match guarantee."},
            ].map((f,i)=>(
              <div key={i} style={{background:"#f5f5f5",padding:24,borderRadius:2,textAlign:"center"}}>
                <div style={{width:48,height:48,background:["#0078D4","#D83B01","#107C10","#5C2E91"][i],borderRadius:24,margin:"0 auto 12px"}}></div>
                <div style={{fontSize:16,fontWeight:600,marginBottom:4}}>{f.t}</div>
                <div style={{fontSize:13,color:"#616161"}}>{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
