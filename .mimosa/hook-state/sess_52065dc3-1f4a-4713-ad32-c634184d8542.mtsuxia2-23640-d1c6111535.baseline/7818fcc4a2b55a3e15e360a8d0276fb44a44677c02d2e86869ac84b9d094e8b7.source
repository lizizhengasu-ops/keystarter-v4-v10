import { createContext, useContext, useState } from 'react';
type Item = { slug: string; name: string; price: number; qty: number };
type Ctx = { items: Item[]; add: (i:Omit<Item,'qty'>)=>void; remove: (s:string)=>void; updateQty: (slug:string, delta:number)=>void; total: number; count: number; toast: string };
const C = createContext<Ctx>(null!);
export function CartProvider({children}:{children:React.ReactNode}) {
  const [items,set] = useState<Item[]>([]);
  const [toast, setToast] = useState('');
  const add = (item:Omit<Item,'qty'>) => {
    set(p => { const e=p.find(x=>x.slug===item.slug); if(e) return p.map(x=>x.slug===item.slug?{...x,qty:x.qty+1}:x); return [...p,{...item,qty:1}]; });
    setToast(item.name + ' added to Bag');
    setTimeout(() => setToast(''), 2500);
  };
  const remove = (slug:string) => set(p => p.filter(x=>x.slug!==slug));
  const updateQty = (slug:string, delta:number) => set(p => p.map(x=>x.slug===slug?{...x,qty:Math.max(0,x.qty+delta)}:x).filter(x=>x.qty>0));
  const total = items.reduce((s,x)=>s+x.price*x.qty,0);
  const count = items.reduce((s,x)=>s+x.qty,0);
  return <C.Provider value={{items,add,remove,updateQty,total,count,toast}}>{children}</C.Provider>;
}
export const useCart = () => useContext(C);
