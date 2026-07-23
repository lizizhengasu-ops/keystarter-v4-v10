import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AccountPage() {
  const { t } = useTranslation();
  const [mode, setMode] = useState("login");
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
              <div className="mb-4"><label className="text-sm font-semibold block mb-1">{t("account.email")}</label><input className="w-full p-2.5 border border-[#e8e8ed] rounded-xl text-sm" type="email" /></div>
              <div className="mb-4"><label className="text-sm font-semibold block mb-1">{t("account.password")}</label><input className="w-full p-2.5 border border-[#e8e8ed] rounded-xl text-sm" type="password" /></div>
              <div className="flex items-center mb-6"><input type="checkbox" id="remember" className="mr-2" /><label htmlFor="remember" className="text-xs text-[#86868b]">{t("account.remember")}</label></div>
              <button className="w-full bg-[#7c3aed] text-white py-3 rounded-xl font-semibold border-none cursor-pointer hover:bg-[#6d28d9] transition mb-4">{t("account.signin")}</button>
              <a href="/my-account/" className="block w-full bg-[#7c3aed] text-white py-3 rounded-xl font-semibold no-underline text-center hover:bg-[#6d28d9] transition mb-4">{t("account.signin")}</a>
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
              <p className="text-xs text-[#86868b] mb-6">{t("account.register_desc")}</p>
              <div className="grid grid-cols-2 gap-3 mb-4"><div><label className="text-sm font-semibold block mb-1">{t("account.first_name")}</label><input className="w-full p-2.5 border border-[#e8e8ed] rounded-xl text-sm" /></div><div><label className="text-sm font-semibold block mb-1">{t("account.last_name")}</label><input className="w-full p-2.5 border border-[#e8e8ed] rounded-xl text-sm" /></div></div>
              <div className="mb-4"><label className="text-sm font-semibold block mb-1">{t("account.email")}</label><input className="w-full p-2.5 border border-[#e8e8ed] rounded-xl text-sm" type="email" /></div>
              <div className="mb-4"><label className="text-sm font-semibold block mb-1">{t("account.phone")}</label><input className="w-full p-2.5 border border-[#e8e8ed] rounded-xl text-sm" /></div>
              <div className="mb-4"><label className="text-sm font-semibold block mb-1">{t("account.password")}</label><input className="w-full p-2.5 border border-[#e8e8ed] rounded-xl text-sm" type="password" /></div>
              <div className="mb-4"><label className="text-sm font-semibold block mb-1">{t("account.confirm_password")}</label><input className="w-full p-2.5 border border-[#e8e8ed] rounded-xl text-sm" type="password" /></div>
              <button className="w-full bg-[#7c3aed] text-white py-3 rounded-xl font-semibold border-none cursor-pointer hover:bg-[#6d28d9] transition mb-4">{t("account.register")}</button>
              <a href="/my-account/" className="block w-full bg-[#7c3aed] text-white py-3 rounded-xl font-semibold no-underline text-center hover:bg-[#6d28d9] transition mb-4">{t("account.register")}</a>
              <p className="text-xs text-center text-[#86868b]">{t("account.has_account")} <button onClick={()=>setMode("login")} className="text-[#7c3aed] bg-transparent border-none cursor-pointer">{t("account.signin")}</button></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
