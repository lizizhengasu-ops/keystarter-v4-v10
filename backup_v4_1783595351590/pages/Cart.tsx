import { useCart } from "../CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { items, remove, updateQty, total } = useCart();
  const tax = total * 0.08;
  return (
    <div style={{fontFamily:'"Segoe UI Variable Text","Segoe UI",sans-serif',color:"#000",background:"#fff",padding:"48px 48px",maxWidth:1200,margin:"0 auto"}}>
      <h1 style={{fontSize:48,fontWeight:500,lineHeight:"56px",margin:"0 0 32px 0"}}>Shopping Cart</h1>
      {items.length === 0 ? (
        <div style={{textAlign:"center",padding:"64px 0"}}>
          <div style={{fontSize:18,color:"#616161",marginBottom:16}}>Your cart is empty</div>
          <Link to="/products" style={{background:"#0078D4",color:"#fff",display:"inline-block",padding:"10px 24px",fontSize:14,textDecoration:"none",borderRadius:2,fontWeight:600}}>Browse Products</Link>
        </div>
      ) : (
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:32}}>
        <div>
          <div style={{display:"grid",gridTemplateColumns:"2fr 80px 100px 60px",gap:12,padding:"12px 0",fontSize:13,fontWeight:600,color:"#616161",borderBottom:"1px solid #ddd"}}>
            <span>License</span><span>Price</span><span>Qty</span><span></span>
          </div>
          {items.map((it,i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"2fr 80px 100px 60px",gap:12,padding:"16px 0",borderBottom:"1px solid #ddd",alignItems:"center"}}>
              <div style={{display:"flex",gap:12,alignItems:"center"}}>
                <img src={"https://picsum.photos/seed/"+it.slug+"/80/80"} alt={it.name} style={{width:80,height:80,objectFit:"cover",borderRadius:4}} />
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:"#000"}}>{it.name}</div>
                  <div style={{fontSize:11,color:"#616161",marginTop:2}}>Digital License — Instant Delivery</div>
                  <button onClick={()=>remove(it.slug)} style={{background:"none",border:"none",fontSize:12,color:"#616161",cursor:"pointer",padding:0,marginTop:4}}>Remove</button>
                </div>
              </div>
              <span style={{fontSize:14,color:"#000"}}></span>
              <select value={it.qty} onChange={e=>updateQty(it.slug,Number(e.target.value))} style={{padding:"4px 8px",border:"1px solid #ddd",borderRadius:2,fontSize:13}}>
                {[1,2,3,4,5].map(n=><option key={n} value={n}>{n}</option>)}
              </select>
              <span style={{fontSize:14,fontWeight:600,color:"#000"}}></span>
            </div>
          ))}
        </div>
        <div style={{background:"#f5f5f5",padding:24,borderRadius:2}}>
          <div style={{fontSize:18,fontWeight:600,marginBottom:16}}>Order Summary</div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"#000",marginBottom:8}}><span>Subtotal</span><span></span></div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"#107C10",marginBottom:8}}><span>Shipping</span><span>Free (Digital)</span></div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"#000",marginBottom:8}}><span>Estimated Tax</span><span></span></div>
          <div style={{borderTop:"1px solid #ddd",margin:"12px 0",paddingTop:12,display:"flex",justifyContent:"space-between",fontSize:18,fontWeight:700}}><span>Total</span><span></span></div>
          <div style={{fontSize:11,color:"#107C10",marginBottom:16,textAlign:"center"}}>License keys delivered via email instantly.</div>
          <button style={{width:"100%",background:"#0078D4",color:"#fff",border:"none",padding:"12px 0",fontSize:14,fontWeight:600,borderRadius:2,cursor:"pointer"}}>Checkout</button>
          <Link to="/products" style={{display:"block",textAlign:"center",padding:"10px 0",fontSize:13,color:"#0067b8",textDecoration:"none",marginTop:8}}>Continue shopping</Link>
        </div>
      </div>
      )}
    </div>
  );
}
