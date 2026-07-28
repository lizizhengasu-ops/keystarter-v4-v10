import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function AccountPage() {
  const { t } = useTranslation();
  const [mode, setMode] = useState("login");
  const [loggedIn, setLoggedIn] = useState(null); // null=checking, true, false
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [orderError, setOrderError] = useState(false);
  const [loginForm, setLoginForm] = useState({email:"", password:""});
  const [loginError, setLoginError] = useState("");
  const [loginSending, setLoginSending] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerMsg, setRegisterMsg] = useState("");
  const [registerSending, setRegisterSending] = useState(false);

  useEffect(() => {
    fetch("/wp-json/keystarter/v1/nonce",{credentials:"same-origin"})
      .then(r => r.ok ? setLoggedIn(true) : setLoggedIn(false))
      .catch(() => setLoggedIn(false));
  }, []);

  useEffect(() => {
    if (loggedIn === true) {
      setOrderError(false);
      fetch("/wp-json/keystarter/v1/customer-orders", {credentials: "same-origin"})
        .then(r => r.json())
        .then(data => { setOrders(data.orders || []); setLoadingOrders(false); })
        .catch(() => { setLoadingOrders(false); setOrderError(true); });
    }
  }, [loggedIn]);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setLoginError("");
    setLoginSending(true);
    try {
      const fd = new URLSearchParams();
      fd.append("log", loginForm.email);
      fd.append("pwd", loginForm.password);
      fd.append("redirect_to", "https://keys-starter.com/account");
      fd.append("testcookie", "1");
      fd.append("rememberme", "forever");
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 15000);
      await fetch("/wp-login.php", {method: "POST", body: fd, redirect: "manual", credentials: "same-origin", signal: controller.signal});
      const nr = await fetch("/wp-json/keystarter/v1/nonce", {credentials: "same-origin"});
      if (nr.ok) { setLoggedIn(true); }
      else { setLoginError("Invalid email or password."); setLoginSending(false); }
    } catch(e) { setLoginError("Network error. Please try again."); setLoginSending(false); }
  };
  const handleRegister = async (e) => {
    if (e) e.preventDefault();
    setRegisterMsg("");
    setRegisterSending(true);
    try {
      const fd = new URLSearchParams();
      fd.append("user_login", registerEmail);
      fd.append("user_email", registerEmail);
      fd.append("redirect_to", "https://keys-starter.com/account");
      const r = await fetch("/wp-login.php?action=register", {method: "POST", body: fd, redirect: "manual", credentials: "same-origin"});
      const loc = r.headers.get("location") || "";
      setRegisterMsg(loc.includes("checkemail") ? "Account created! Check your email for password." : "Registration failed. Email may be taken.");
    } catch(e) { setRegisterMsg("Network error. Please try again."); }
    setRegisterSending(false);
  };
  // While checking login state
  if (loggedIn === null) {
    return (
      <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased px-6 py-12">
        <div className="max-w-md mx-auto text-center py-20">
          <p className="text-[#86868b]">Loading...</p>
        </div>
      </div>
    );
  }

  // Logged in - show orders
  if (loggedIn === true) {
    return (
      <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased px-6 py-12 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">{t("account.title")}</h1>
          <p className="text-[#86868b] text-sm mb-8">{t("account.orders_desc") || "Your order history and license key delivery status."}</p>

          {loadingOrders ? (
            <div className="text-center py-12">
              <p className="text-[#86868b]">Loading orders...</p>
            </div>
          ) : orderError ? (
            <div className="bg-white rounded-2xl p-8 border border-[#e8e8ed] text-center">
              <p className="text-red-500 text-sm">Failed to load orders.</p>
              <button onClick={()=>window.location.reload()} className="mt-4 bg-[#7c3aed] text-white px-5 py-2 rounded-xl text-xs font-semibold border-none cursor-pointer hover:bg-[#6d28d9] transition">Retry</button>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-[#e8e8ed] text-center">
              <p className="text-[#86868b]">No orders found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(o => (
                <div key={o.id} className="bg-white rounded-2xl p-5 border border-[#e8e8ed]">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="font-bold text-sm">Order #{o.id}</span>
                      <span className="text-xs text-[#86868b] ml-3">{o.date}</span>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">{o.status}</span>
                  </div>
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#f0f0f2]">
                        <th className="text-left py-2 font-semibold text-[#86868b]">Product</th>
                        <th className="text-right py-2 font-semibold text-[#86868b]">Qty</th>
                        <th className="text-right py-2 font-semibold text-[#86868b]">Key Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {o.items.map((item, idx) => (
                        <tr key={idx} className="border-b border-[#f5f5f7]">
                          <td className="py-2.5">{item.name}</td>
                          <td className="text-right py-2.5">{item.qty}</td>
                          <td className="text-right py-2.5">
                            {item.virtual ? (
                              o.key_email_status === "sent" ? <span className="text-green-600 font-medium">✅ Sent</span> :
                              o.key_email_status === "failed" ? <span className="text-red-500 font-medium">❌ Failed</span> :
                              <span className="text-yellow-600 font-medium">⏳ Pending</span>
                            ) : <span className="text-[#86868b]">📦 Physical</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="text-right mt-2">
                    <span className="text-xs font-semibold">Total: ${o.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Not logged in - show login/register form
  return (
    <div className="bg-[#f5f5f7] text-[#1d1d1f] antialiased px-6 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">{t("account.title")}</h1>
        <p className="text-[#86868b] text-center mb-8">{t("account.desc")}</p>
        <div className="bg-white rounded-2xl p-6 border border-[#e8e8ed]">
          {mode === "login" && (
            <div>
              <div className="text-center space-x-4 mb-6">
                <button onClick={()=>setMode("login")} className="font-semibold text-[#7c3aed] border-b-2 border-[#7c3aed] pb-1 bg-transparent border-none cursor-pointer">{t("account.signin")}</button>
                <button onClick={()=>setMode("register")} className="text-[#86868b] hover:text-[#1d1d1f] bg-transparent border-none cursor-pointer">{t("account.register")}</button>
              </div>
                <form onSubmit={handleLogin} noValidate>
                  <input type="hidden" name="redirect_to" value="https://keys-starter.com/account" />
                  <div className="mb-4"><label className="text-sm font-semibold block mb-1">{t("account.email")}</label><input name="log" className="w-full p-2.5 border border-[#e8e8ed] rounded-xl text-sm" type="text" value={loginForm.email} onChange={e=>{setLoginForm({...loginForm,email:e.target.value});setLoginError("");}} required autoFocus disabled={loginSending} /></div>
                  <div className="mb-4"><label className="text-sm font-semibold block mb-1">{t("account.password")}</label><input name="pwd" className="w-full p-2.5 border border-[#e8e8ed] rounded-xl text-sm" type="password" value={loginForm.password} onChange={e=>{setLoginForm({...loginForm,password:e.target.value});setLoginError("");}} required disabled={loginSending} /></div>
                  <div className="flex items-center mb-6"><input type="checkbox" name="rememberme" id="remember" className="mr-2" defaultChecked disabled={loginSending} /><label htmlFor="remember" className="text-xs text-[#86868b]">{t("account.remember")}</label></div>
                  <a href="/wp-login.php?action=lostpassword" className="text-xs text-[#7c3aed] hover:underline block text-right -mt-4 mb-4">Lost your password?</a>
                  <button type="submit" disabled={loginSending} className="w-full bg-[#7c3aed] text-white py-3 rounded-xl font-semibold border-none cursor-pointer hover:bg-[#6d28d9] transition mb-4">{loginSending ? "Signing in..." : t("account.signin")}</button>
                  {loginError && <p className="text-red-500 text-sm text-center mb-4">{loginError}</p>}
                </form>
              <p className="text-xs text-center text-[#86868b]">{t("account.no_account")} <button onClick={()=>setMode("register")} className="text-[#7c3aed] bg-transparent border-none cursor-pointer">{t("account.register")}</button></p>
            </div>
          )}
          {mode === "register" && (
            <div>
              <div className="text-center space-x-4 mb-6">
                <button onClick={()=>setMode("login")} className="text-[#86868b] hover:text-[#1d1d1f] bg-transparent border-none cursor-pointer">{t("account.signin")}</button>
                <button onClick={()=>setMode("register")} className="font-semibold text-[#7c3aed] border-b-2 border-[#7c3aed] pb-1 bg-transparent border-none cursor-pointer">{t("account.register")}</button>
              </div>
              <h2 className="text-lg font-bold mb-2">{t("account.register")}</h2>
                <div className="mb-4"><label className="text-sm font-semibold block mb-1">{t("account.email")}</label><input type="email" className="w-full p-2.5 border border-[#e8e8ed] rounded-xl text-sm" value={registerEmail} onChange={e=>{setRegisterEmail(e.target.value);setRegisterMsg("");}} required autoFocus /></div>
                <p className="text-xs text-[#86868b] -mt-2 mb-4">A password will be emailed to you after registration.</p>
                <button onClick={handleRegister} disabled={registerSending} className="w-full bg-[#7c3aed] text-white py-3 rounded-xl font-semibold border-none cursor-pointer hover:bg-[#6d28d9] transition mb-4">{registerSending ? "Creating..." : "Create Account"}</button>
                {registerMsg && <p className={"text-sm text-center mb-4 " + (registerMsg.includes("fail")||registerMsg.includes("error")?"text-red-500":"text-green-600")}>{registerMsg}</p>}
              <p className="text-xs text-center text-[#86868b]">{t("account.has_account")} <button onClick={()=>setMode("login")} className="text-[#7c3aed] bg-transparent border-none cursor-pointer">{t("account.signin")}</button></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
