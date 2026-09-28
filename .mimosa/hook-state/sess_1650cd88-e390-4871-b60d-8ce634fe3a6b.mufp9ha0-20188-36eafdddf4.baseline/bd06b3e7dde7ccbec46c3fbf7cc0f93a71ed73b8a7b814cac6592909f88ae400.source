c = open("src/pages/Cart.tsx", "r", encoding="utf-8").read()

# Add useState import
c = c.replace("import { useCart }", "import { useState } from \"react\";\nimport { useCart }")

# Add guest checkout states after tax line
c = c.replace(
    "const tax = total * 0.08;",
    "const tax = total * 0.08;\n  const [guestEmail, setGuestEmail] = useState(\"\");\n  const [guestName, setGuestName] = useState(\"\");\n  const [orderPlaced, setOrderPlaced] = useState(false);"
)

# Replace checkout section with guest checkout form
old = '            <p className="text-[10px] text-green-600 mb-4 text-center">{t("cart.pay_hint")}</p>\n            <button onClick={()=>{sessionStorage.setItem("ks_checkout_cart",JSON.stringify(items));window.location.href="/checkout.html";}} className="v5-btn w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold py-3 rounded-xl transition cursor-pointer">{t("cart.checkout")}</button>'

new = '''            <p className="text-[10px] text-green-600 mb-4 text-center">No account needed. Guest checkout.</p>
            <input type="text" placeholder="Your Name" value={guestName} onChange={e=>setGuestName(e.target.value)} className="w-full px-3 py-2 text-xs border border-[#e8e8ed] rounded-lg mb-2 bg-white focus:outline-none focus:border-[#7c3aed]" />
            <input type="email" placeholder="your@email.com" value={guestEmail} onChange={e=>setGuestEmail(e.target.value)} className="w-full px-3 py-2 text-xs border border-[#e8e8ed] rounded-lg mb-3 bg-white focus:outline-none focus:border-[#7c3aed]" />
            <button onClick={()=>{sessionStorage.setItem("ks_checkout_cart",JSON.stringify(items));sessionStorage.setItem("ks_guest",JSON.stringify({name:guestName,email:guestEmail}));window.location.href="/checkout.html";}} disabled={!guestEmail||!guestEmail.includes("@")} className="v5-btn w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold py-3 rounded-xl transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Guest Checkout</button>'''

if old in c:
    c = c.replace(old, new)
    open("src/pages/Cart.tsx", "w", encoding="utf-8").write(c)
    print("Guest checkout added")
else:
    print("Pattern not found")
