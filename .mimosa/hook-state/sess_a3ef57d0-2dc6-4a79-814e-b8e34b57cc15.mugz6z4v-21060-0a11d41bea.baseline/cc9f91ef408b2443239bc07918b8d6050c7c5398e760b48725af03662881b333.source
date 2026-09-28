c = open("src/pages/Cart.tsx", "r", encoding="utf-8").read()

old = "        </div>\n        )}\n      </div>\n    </div>\n  );"
new = """        </div>
        )}
        {orderPlaced && (
          <div className="max-w-md mx-auto text-center py-16">
            <div className="text-5xl mb-6">{String.fromCodePoint(0x2705)}</div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Order Confirmed!</h2>
            <p className="text-sm text-[#86868b] mb-2">Thank you, {guestName}!</p>
            <p className="text-sm text-[#86868b] mb-6">Your order has been received. We will send the license keys to <strong>{guestEmail}</strong> within 10 minutes.</p>
            <p className="text-xs text-green-600 mb-8">Order Total: ${(total + tax).toFixed(2)} ({items.length} items)</p>
            <Link to="/store" className="inline-block bg-[#7c3aed] text-white px-8 py-3 text-sm font-semibold rounded-xl hover:bg-[#6d28d9] transition no-underline">Continue Shopping</Link>
          </div>
        )}
      </div>
    </div>
  );"""

if old in c:
    c = c.replace(old, new)
    open("src/pages/Cart.tsx", "w", encoding="utf-8").write(c)
    print("Confirmation added")
else:
    print("Not found")
