import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const nav = useNavigate();
  useEffect(() => { window.location.href = "/cart/"; }, []);
  return <div className="bg-[#f5f5f7] min-h-screen" />;
}
