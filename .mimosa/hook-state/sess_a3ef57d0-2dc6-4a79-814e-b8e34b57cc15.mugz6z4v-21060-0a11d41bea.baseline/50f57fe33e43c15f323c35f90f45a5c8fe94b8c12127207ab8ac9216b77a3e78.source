c = open("src/pages/Cart.tsx", "r", encoding="utf-8").read()

# Add slug-to-ID mapping constant
SLUG_MAP = {
    "windows-11-pro": 629, "windows-10-pro": 630,
    "windows-11-home": 631, "windows-10-home": 632,
    "office-2019-pro-plus": 633, "office-2021-pro-plus": 634,
    "win-11-iot-2024-entry": 637, "win-10-iot-2021-entry": 643,
    "win-10-iot-2019-entry": 646,
    "windows-11-pro-official": 652, "windows-10-pro-official": 653,
    "windows-11-home-official": 654, "windows-10-home-official": 655,
    "win-11-iot-2024-high-end": 656, "win-11-iot-2024-value": 657,
    "win-10-iot-2021-high-end": 658, "win-10-iot-2021-value": 659,
    "win-11-iot-ml-high-end": 660, "win-11-iot-ml-value": 661, "win-11-iot-ml-entry": 662,
    "win-10-iot-2019-high-end": 663, "win-10-iot-2019-value": 664,
    "win-svr-iot-2025": 665, "win-svr-iot-2022": 666, "win-svr-iot-2019": 667,
    "sql-svr-2019-runtime": 668, "sql-svr-2022-runtime": 669,
}

# Generate the JS object string
map_js = "const SLUG_TO_ID = {" + ",".join(f'"{k}":{v}' for k,v in sorted(SLUG_MAP.items())) + "};"

# Insert after imports
c = c.replace(
    "import { Link } from \"react-router-dom\";",
    f"import {{ Link }} from \"react-router-dom\";\n\n{map_js}"
)

# Replace the checkout button to sync cart then redirect
old_checkout = '<button onClick={()=>{fetch("https://keys-starter.com/wp-json/keystarter/v1/send-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:guestEmail,name:guestName,items:items,total:total+tax})}).catch(()=>{});setOrderPlaced(true)}} disabled={!guestEmail||!guestEmail.includes("@")} className="v5-btn w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold py-3 rounded-xl transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Guest Checkout</button>'

new_checkout = """<button onClick={async()=>{try{for(const it of items){const pid=SLUG_TO_ID[it.slug];if(pid){await fetch("https://keys-starter.com/wp-json/wc/store/v1/cart/add-item",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:pid,quantity:it.qty})});await new Promise(r=>setTimeout(r,200));}}window.location.href="/checkout/";}catch(e){window.location.href="/checkout/";}}} disabled={!guestEmail||!guestEmail.includes("@")} className="v5-btn w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold py-3 rounded-xl transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">Proceed to Checkout</button>"""

if old_checkout in c:
    c = c.replace(old_checkout, new_checkout)
    print("Checkout button updated: sync + redirect to /checkout/")
else:
    # Try with different whitespace
    for old in [old_checkout, old_checkout.replace("  ","    ")]:
        if old in c:
            c = c.replace(old, new_checkout)
            print("Checkout button updated (alt pattern)")
            break
    else:
        print("Pattern not found")

open("src/pages/Cart.tsx", "w", encoding="utf-8").write(c)
print("Done")
