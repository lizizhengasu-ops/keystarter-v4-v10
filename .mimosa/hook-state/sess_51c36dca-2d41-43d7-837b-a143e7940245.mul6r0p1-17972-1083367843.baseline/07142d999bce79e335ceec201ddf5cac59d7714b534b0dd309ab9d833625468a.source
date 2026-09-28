import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { products } from "./data/products";
import Portal from "./Portal";


export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  const results = q.length >= 1 ? products.filter(p => p.n.toLowerCase().includes(q.toLowerCase()) || p.d.toLowerCase().includes(q.toLowerCase())) : [];

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
    if (!open) setQ("");
  }, [open]);

  const [selIdx, setSelIdx] = useState(-1);
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setSelIdx(i => Math.min(i + 1, results.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelIdx(i => Math.max(i - 1, 0)); }
      if (e.key === "Enter" && selIdx >= 0 && results[selIdx]) {
        window.location.href = "/product/" + results[selIdx].slug;
        onClose();
      }
    };
    if (open) { window.addEventListener("keydown", handleKey); setSelIdx(-1); }
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose, results, selIdx]);

  if (!open) return null;

  return <Portal>
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,0.4)", backdropFilter: "blur(20px)",
      display: "flex", justifyContent: "center"
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 650, marginTop: 100, padding: "0 20px"
      }}>
        {/* Search input */}
        <div style={{
          display: "flex", alignItems: "center",
          background: "#1d1d1f", borderRadius: 14, padding: "0 18px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.3)"
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="1.5" style={{flexShrink:0}}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input ref={inputRef} autoFocus placeholder="Search KeyStarter.com" value={q} onChange={e => setQ(e.target.value)}
            style={{
              width: "100%", fontSize: 21, padding: "14px 14px", border: "none",
              background: "transparent", color: "#f5f5f7", outline: "none",
              fontFamily: "-apple-system, 'SF Pro Display', sans-serif"
            }} />
          {q && (
            <div onClick={() => setQ("")} style={{cursor:"pointer",flexShrink:0}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#86868b" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </div>
          )}
        </div>

        {/* Results */}
        {q.length >= 1 && (
          <div style={{
            background: "#fff", borderRadius: 14, marginTop: 8, overflow: "hidden",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)"
          }}>
            {results.length === 0 ? (
              <div style={{padding:"24px 18px",textAlign:"center",color:"#6e6e73",fontSize:15}}>
                No results found for "{q}"
              </div>
            ) : (
              <>
                <div style={{padding:"12px 18px 4px",fontSize:11,fontWeight:600,color:"#6e6e73",textTransform:"uppercase",letterSpacing:".05em"}}>
                  Products
                </div>
                {results.map((p,i) => (
                  
                  <Link key={i} to={"/product/"+p.slug} onClick={onClose}
                    style={{
                      display:"flex",alignItems:"center",gap:12,padding:"10px 18px",
                      textDecoration:"none",color:"inherit",transition:"background 0.15s",
                      borderBottom: i < results.length-1 ? "1px solid #f0f0f2" : "none"
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f5f5f7"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <div style={{width:36,height:54,flexShrink:0}}><img color={p.color} /></div>
                    <div style={{flex:1}}>
                      <p style={{fontSize:15,fontWeight:600,color:"#1d1d1f",marginBottom:2}}>{p.n}</p>
                      <p style={{fontSize:12,color:"#6e6e73"}}>{p.d}</p>
                    </div>
                    <p style={{fontSize:15,fontWeight:400,color:"#0071e3"}}>${p.p}</p>
                  </Link>
                ))}
              </>
            )}
          </div>
        )}

        {/* Suggestions when empty */}
        {q.length === 0 && (
          <div style={{
            background: "#fff", borderRadius: 14, marginTop: 8, overflow: "hidden",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)", padding: "18px"
          }}>
            <p style={{fontSize:11,fontWeight:600,color:"#6e6e73",textTransform:"uppercase",letterSpacing:".05em",marginBottom:12}}>Quick Links</p>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {[{n:"Windows 11 Pro - ",s:"windows-11-pro"},{n:"Windows 10 Pro - ",s:"windows-10-pro"},{n:"Office 2021 Pro - ",s:"office-2021-pro"},{n:"Win Server 2022 - ",s:"win-svr-2022"},{n:"All Products",s:"store",a:"/store"}].map((l,i) => (
                <Link key={i} to={l.a||"/product/"+l.s} onClick={onClose} style={{display:"block",fontSize:15,fontWeight:400,color:"#0071e3",textDecoration:"none",padding:"6px 0",borderBottom:i<4?"1px solid #f0f0f2":"none",transition:"color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.color="#0077ed"} onMouseLeave={e=>e.currentTarget.style.color="#0071e3"}>{l.n}</Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </Portal>;
}

