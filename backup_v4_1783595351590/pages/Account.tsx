import { useCart } from "../CartContext";
import { Link } from "react-router-dom";

export default function AccountPage() {
  const { items } = useCart();
  return (
    <div style={{fontFamily:'"Segoe UI Variable Text","Segoe UI",sans-serif',color:"#000",background:"#fff"}}>
      {/* Sign In Hero */}
      <div style={{background:"linear-gradient(135deg,#1a1a2e,#16213e)",padding:"80px 48px",textAlign:"center",color:"#fff"}}>
        <h1 style={{fontSize:48,fontWeight:500,margin:"0 0 12px 0"}}>Your Account</h1>
        <p style={{fontSize:17,fontWeight:200,color:"rgba(255,255,255,0.8)"}}>Manage your licenses, orders, and account settings.</p>
      </div>

      {/* Sign In Form */}
      <div style={{maxWidth:480,margin:"0 auto",padding:"48px 20px"}}>
        <div style={{background:"#f5f5f5",padding:32,borderRadius:2}}>
          <h2 style={{fontSize:21,fontWeight:600,marginBottom:24,textAlign:"center"}}>Sign in to your account</h2>
          <div style={{marginBottom:16}}>
            <label style={{display:"block",fontSize:13,fontWeight:600,marginBottom:6,color:"#333"}}>Email</label>
            <input type="email" placeholder="you@example.com" style={{width:"100%",padding:"10px 12px",border:"1px solid #ddd",borderRadius:2,fontSize:14,boxSizing:"border-box"}} />
          </div>
          <div style={{marginBottom:20}}>
            <label style={{display:"block",fontSize:13,fontWeight:600,marginBottom:6,color:"#333"}}>Password</label>
            <input type="password" placeholder="Enter password" style={{width:"100%",padding:"10px 12px",border:"1px solid #ddd",borderRadius:2,fontSize:14,boxSizing:"border-box"}} />
          </div>
          <button style={{width:"100%",background:"#0078D4",color:"#fff",border:"none",padding:"12px 0",fontSize:15,fontWeight:600,borderRadius:2,cursor:"pointer"}}>Sign In</button>
          <div style={{textAlign:"center",marginTop:12}}>
            <Link to="/" style={{fontSize:13,color:"#0067b8",textDecoration:"none"}}>Forgot password?</Link>
            <span style={{margin:"0 8px",color:"#ddd"}}>|</span>
            <Link to="/" style={{fontSize:13,color:"#0067b8",textDecoration:"none"}}>Create account</Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div style={{marginTop:32}}>
          <h3 style={{fontSize:18,fontWeight:600,marginBottom:16}}>Recent Orders</h3>
          {[
            {n:"Windows 11 Pro",date:"2026-07-01",status:"Activated",price:".09",key:"XXXXX-XXXXX-XXXXX-XXXXX"},
            {n:"Office 2021 Pro Plus",date:"2026-06-28",status:"Delivered",price:".09",key:"XXXXX-XXXXX-XXXXX-XXXXX"},
          ].map((o,i)=>(
            <div key={i} style={{background:"#f5f5f5",padding:16,borderRadius:2,marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <span style={{fontSize:15,fontWeight:600}}>{o.n}</span>
                <span style={{fontSize:13,color:"#616161"}}>{o.date}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"#616161"}}>
                <span>Status: <span style={{color:"#107C10",fontWeight:600}}>{o.status}</span></span>
                <span>{o.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div style={{marginTop:24,display:"flex",gap:12}}>
          <Link to="/products" style={{flex:1,background:"#f5f5f5",padding:"16px",textAlign:"center",borderRadius:2,textDecoration:"none",color:"#0078D4",fontSize:14,fontWeight:600}}>My Licenses</Link>
          <Link to="/support" style={{flex:1,background:"#f5f5f5",padding:"16px",textAlign:"center",borderRadius:2,textDecoration:"none",color:"#0078D4",fontSize:14,fontWeight:600}}>Support</Link>
        </div>
      </div>
    </div>
  );
}
