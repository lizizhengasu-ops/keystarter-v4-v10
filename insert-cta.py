lines = open("src/pages/Home.tsx", "r", encoding="utf-8").readlines()

cta = """      {heroPersona === "enterprise" && (
      <section className="py-16 bg-[#f3f4f6] border-t border-[#d1d5db] text-center">
        <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mb-4">Ready to Scale Your Licensing?</h2>
        <p className="text-sm text-[#86868b] mb-6 max-w-xl mx-auto">Get volume pricing, dedicated support, and full SAM Audit compliance.</p>
        <div className="flex justify-center gap-4 flex-wrap items-center">
          <a href="mailto:admin@keys-starter.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-[#7c3aed] text-white hover:bg-[#6d28d9] transition cursor-pointer no-underline">Contact Enterprise Sales</a>
          <span className="text-sm text-[#7c3aed] font-semibold">admin@keys-starter.com</span>
        </div>
      </section>
      )}
"""

# Insert after Hero close (line 298, index 297)
lines.insert(298, cta + "\n")
print("CTA inserted at top")

# Find and remove old CTA from bottom
content = "".join(lines)
cta_pos = content.rfind("Ready to Scale")
if cta_pos > 1000:  # Ensure we find the bottom one, not the new top one
    bs = content.rfind("{heroPersona", 0, cta_pos)
    be = content.find(")}", cta_pos + 50) + 2
    content = content[:bs] + content[be:]
    print("Old CTA removed from bottom")
    
    with open("src/pages/Home.tsx", "w", encoding="utf-8") as f:
        f.write(content)
    print("Done")
else:
    print("CTA bottom not found")
