import {useEffect,useRef} from "react";
import {Link} from "react-router-dom";
import {useCart} from "./CartContext";

export default function CartFlyout({open,onClose}) {
  const cart = useCart();
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if(ref.current && !ref.current.contains(e.target)) onClose(); };
    if(open) setTimeout(() => document.addEventListener("click",h),0);
    return () => document.removeEventListener("click",h);
  }, [open, onClose]);
  if(!open||cart.items.length===0) return null;
  return (
    <div ref={ref} style={{position:"absolute",top:"100%",right:0,width:320,background:"#fff",borderRadius:14,boxShadow:"0 8px 30px rgba(0,0,0,0.15)",border:"1px solid #e6e6ea",zIndex:200,padding:"20px",marginTop:4}}>
      <p style={{fontSize:14,fontWeight:600,color:"#1d1d1f",marginBottom:16}}>Your Bag ({cart.count})</p>
      {cart.items.slice(0,4).map((x,i) => (
        <div key={i} style={{display:"flex",alignItems:"center",gap:12,marginBottom:12,paddingBottom:12,borderBottom:i<cart.items.length-1?"1px solid #f0f0f2":"none"}}>
          <div style={{width:80,height:60,background:"#f5f5f7",borderRadius:8,flexShrink:0}} />
          <div style={{flex:1}}>
            <p style={{fontSize:13,fontWeight:600,color:"#1d1d1f"}}>{x.name}</p>
            <p style={{fontSize:12,color:"#6e6e73"}}>Qty: {x.qty}</p>
          </div>
          <p style={{fontSize:13,color:"#1d1d1f"}}>${x.price*x.qty}</p>
        </div>
      ))}
      <div style={{display:"flex",justifyContent:"space-between",fontSize:15,fontWeight:600,color:"#1d1d1f",marginBottom:16}}>
        <span>Subtotal</span><span>${cart.total}</span>
      </div>
      <Link to="/cart" onClick={onClose} style={{display:"block",fontSize:14,background:"#0071e3",color:"#fff",padding:"10px 18px",borderRadius:980,textDecoration:"none",textAlign:"center",marginBottom:8}}>Check Out</Link>
      <Link to="/cart" onClick={onClose} style={{display:"block",fontSize:13,color:"#0071e3",textDecoration:"none",textAlign:"center"}}>View Cart</Link>
    </div>
  );
}
