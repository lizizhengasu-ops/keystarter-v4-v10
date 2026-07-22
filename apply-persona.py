with open("src/pages/Home.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Wrap testimonials (after hero) with retail — use fragment wrapper
content = content.replace(
    "\n      {/* Testimonials Carousel */}",
    "\n      {heroPersona === \"retail\" && (<>\n      {/* Testimonials Carousel */}"
)

# 2. Close retail block after Store section
content = content.replace(
    "\n      {/* B2B Section */}",
    "\n      </>)}\n\n      {/* B2B Section */}"
)

# 3. Wrap B2B with enterprise
content = content.replace(
    "\n      {/* B2B Section */}\n      <section id=\"business\"",
    "\n      {heroPersona === \"enterprise\" && (<>\n      {/* B2B Section */}\n      <section id=\"business\""
)

# 4. Close enterprise block after B2B form (before Compare)
# After B2B section closes, there's a blank {} then Compare
content = content.replace(
    "      </section>\n\n      {}\n      {/* Compare Section */}",
    "      </section>\n      </>)}\n\n      {}\n      {/* Compare Section */}"
)

# 5. Wrap Blog+Portal with retail (after Support closes)
content = content.replace(
    "\n     {/* Latest from Blog */}",
    "\n     {heroPersona === \"retail\" && (<>\n     {/* Latest from Blog */}"
)

# 6. Close retail block before the toast
content = content.replace(
    "\n      {/* Global Interactive Notification Toast */}",
    "\n      </>)}\n\n      {/* Global Interactive Notification Toast */}"
)

with open("src/pages/Home.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Persona conditionals added. New size:", len(content))
