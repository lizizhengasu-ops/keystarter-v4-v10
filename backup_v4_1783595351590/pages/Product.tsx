import {useParams, Link} from 'react-router-dom';
import {useState} from 'react';
import {useCart} from '../CartContext';

const products = [{"id":1,"n":"Windows 10 Pro","p":13.08,"slug":"windows-10-pro","c":"#0078D4","img":"win10"},{"id":2,"n":"Windows 11 Pro","p":14.09,"slug":"windows-11-pro","c":"#0078D4","img":"win11"},{"id":3,"n":"Office 2021 Pro Plus","p":24.09,"slug":"office-2021-pro","c":"#D83B01","img":"office21"},{"id":4,"n":"Win10+Office Bundle","p":30.09,"slug":"win10-office-bundle","c":"#0078D4","img":"bundle1"},{"id":5,"n":"Server 2019","p":9.09,"slug":"win-svr-2019","c":"#005A9E","img":"svr19"},{"id":6,"n":"Server 2022","p":11.09,"slug":"win-svr-2022","c":"#005A9E","img":"svr22"},{"id":7,"n":"Office 2019 Pro","p":19.09,"slug":"office-2019-pro","c":"#D83B01","img":"off19"},{"id":8,"n":"Office 2016 Pro","p":14.09,"slug":"office-2016-pro","c":"#D83B01","img":"off16"},{"id":9,"n":"Office 2024 Pro","p":8.09,"slug":"office-2024-pro","c":"#D83B01","img":"off24"},{"id":10,"n":"Project 2021 Pro","p":15.09,"slug":"project-2021-pro","c":"#217346","img":"proj21"},{"id":11,"n":"Visio 2021 Pro","p":15.09,"slug":"visio-2021-pro","c":"#5C2E91","img":"vis21"},{"id":12,"n":"Exchange 2019","p":9.09,"slug":"exchange-server","c":"#0072C6","img":"exch19"},{"id":13,"n":"SQL Server 2019","p":9.09,"slug":"sql-server","c":"#CC2927","img":"sql19"},{"id":14,"n":"Win11+Office Bundle","p":34.09,"slug":"win11-office-bundle","c":"#0078D4","img":"bundle2"},{"id":15,"n":"Win11 Pro 2PC","p":26.09,"slug":"win11-pro-2pc","c":"#0078D4","img":"win112pc"},{"id":16,"n":"Win10 Pro 2PC","p":24.09,"slug":"win10-pro-2pc","c":"#0078D4","img":"win102pc"},{"id":17,"n":"Win11+Office+Visio","p":45.09,"slug":"win11-office-visio-bundle","c":"#0078D4","img":"bundle3"},{"id":18,"n":"Svr2019+Office","p":29.09,"slug":"svr2019-office-bundle","c":"#005A9E","img":"bundle4"},{"id":19,"n":"Office+Visio Bundle","p":34.09,"slug":"office-visio-bundle","c":"#D83B01","img":"bundle5"}];

const editions = [
  {name:"Home",desc:"For everyday use",price:""},
  {name:"Pro",desc:"For business",price:""},
  {name:"Enterprise",desc:"For organizations",price:"Contact"}
];

const features = [
  ["Platform","Windows PC / 64-bit"],["Language","Multi-language"],["Delivery","Instant via email"],
  ["Activation","Digital License"],["Support","Lifetime"],["Updates","Automatic"],
  ["Security","Built-in"],["Cloud","OneDrive"],["AI","Copilot ready"],
  ["Compatibility","All modern apps"],["License","Retail / OEM"],["Validity","Lifetime"],
  ["Install","USB or Digital"],["Region","Worldwide"],["Refund","60-day policy"]
];

export default function ProductPage() {
  const {slug} = useParams();
  const cart = useCart();
  const p = products.find(x => x.slug === slug) || products[1];
  const [selEdition, setSelEdition] = useState(1);
  
  return (
    <div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"SF Pro Display","Helvetica Neue",sans-serif',background:"#fff",color:"#1d1d1f"}}>
      {/* Breadcrumb */}
      <div style={{maxWidth:980,margin:"0 auto",padding:"16px 20px 0",fontSize:12,color:"#6e6e73"}}>
        <Link to="/" style={{color:"#6e6e73",textDecoration:"none"}}>Home</Link>
        <span style={{margin:"0 8px"}}>/</span>
        <Link to="/products" style={{color:"#6e6e73",textDecoration:"none"}}>Products</Link>
        <span style={{margin:"0 8px"}}>/</span>
        <span style={{color:"#1d1d1f"}}>{p.n}</span>
      </div>

      {/* Product detail */}
      <div style={{maxWidth:980,margin:"0 auto",padding:"32px 20px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:48}}>
        <div>
          <img src={"https://picsum.photos/seed/"+p.img+"/500/400"} alt={p.n}
            style={{width:"100%",borderRadius:16,boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}} />
          <div style={{display:"flex",gap:8,marginTop:12}}>
            {[p.img+"_1",p.img+"_2",p.img+"_3",p.img+"_4"].map((s,i) => (
              <img key={i} src={"https://picsum.photos/seed/"+s+"/100/80"} alt=""
                style={{width:80,height:64,objectFit:"cover",borderRadius:8,cursor:"pointer",border:"1px solid #e6e6ea"}} />
            ))}
          </div>
        </div>
        <div>
          <div style={{fontSize:12,color:"#0071e3",fontWeight:600,marginBottom:8,letterSpacing:"0.5px",textTransform:"uppercase"}}>DIGITAL LICENSE</div>
          <h1 style={{fontSize:32,fontWeight:700,lineHeight:1.125,marginBottom:8}}>{p.n}</h1>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
            <span style={{fontSize:28,fontWeight:700,color:"#1d1d1f"}}></span>
            <span style={{fontSize:13,color:"#6e6e73",textDecoration:"line-through"}}></span>
            <span style={{background:"#ffd60a",fontSize:11,fontWeight:700,padding:"2px 6px",borderRadius:4}}>SALE</span>
          </div>
          <p style={{fontSize:15,color:"#6e6e73",lineHeight:1.47059,marginBottom:20}}>Genuine Microsoft license key. Instant email delivery. Lifetime activation support.</p>
          
          {/* Edition selector */}
          <div style={{marginBottom:20}}>
            <div style={{fontSize:14,fontWeight:600,marginBottom:8,color:"#1d1d1f"}}>Edition</div>
            <div style={{display:"flex",gap:8}}>
              {editions.map((e,i) => (
                <div key={i} onClick={()=>setSelEdition(i)}
                  style={{flex:1,padding:"10px 8px",borderRadius:10,cursor:"pointer",textAlign:"center",
                    border: selEdition===i ? "2px solid #0071e3" : "1px solid #e6e6ea",
                    background: selEdition===i ? "#f0f7ff" : "#fff",transition:"all 0.2s"}}>
                  <div style={{fontSize:13,fontWeight:600,color:"#1d1d1f"}}>{e.name}</div>
                  <div style={{fontSize:11,color:"#6e6e73"}}>{e.desc}</div>
                  <div style={{fontSize:13,fontWeight:600,color:"#0071e3",marginTop:4}}>{e.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <button onClick={()=>cart.add({slug:p.slug,name:p.n,price:p.p})}
            style={{width:"100%",background:"#0071e3",color:"#fff",border:"none",padding:"14px 0",fontSize:17,borderRadius:12,cursor:"pointer",fontWeight:600,marginBottom:8,transition:"background 0.2s"}}
            onMouseEnter={e=>e.target.style.background="#0077ed"}
            onMouseLeave={e=>e.target.style.background="#0071e3"}>
            Add to Cart
          </button>
          <p style={{fontSize:12,color:"#6e6e73",textAlign:"center"}}>Genuine product. Instant delivery. Secure checkout.</p>

          {/* Specs */}
          <div style={{marginTop:24,borderTop:"1px solid #e6e6ea",paddingTop:20}}>
            <h3 style={{fontSize:17,fontWeight:600,marginBottom:12}}>Product Details</h3>
            {features.map((f,i) => (
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #f5f5f7",fontSize:13}}>
                <span style={{color:"#6e6e73"}}>{f[0]}</span>
                <span style={{fontWeight:500,color:"#1d1d1f"}}>{f[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
