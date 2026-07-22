with open("src/pages/Home.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Find CTA block  
cta_start = content.rfind("Ready to Scale Your Licensing")
c_start = content.rfind("{heroPersona === ", 0, cta_start)
c_end = content.find(")}", cta_start + 50)
c_end = c_end + 2
cta_block = content[c_start:c_end]

# Find Partner block
p_start = content.rfind("Trusted by Industry Leaders")
ps = content.rfind("{heroPersona === ", 0, p_start)
pe = content.find(")}", p_start + 50)
pe = pe + 2
partner_block = content[ps:pe]

print(f"CTA: {len(cta_block)} chars")
print(f"Partner: {len(partner_block)} chars")

# Remove both from bottom
content = content.replace(cta_block + "\n\n", "")
content = content.replace(partner_block + "\n\n", "")

# Insert at top between Hero and Testimonials: CTA first, Partner second
marker = "{/* Testimonials Carousel */}"
content = content.replace(
    marker,
    cta_block + "\n\n" + partner_block + "\n\n" + marker
)
print("Inserted CTA + Partner at top")

with open("src/pages/Home.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Done. Size:", len(content))
