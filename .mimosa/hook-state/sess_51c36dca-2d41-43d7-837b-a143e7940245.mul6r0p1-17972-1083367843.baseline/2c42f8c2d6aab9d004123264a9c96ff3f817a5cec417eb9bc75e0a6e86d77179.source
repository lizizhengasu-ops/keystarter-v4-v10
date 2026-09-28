import re

with open("src/pages/Home.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Simple regex approach: add persona class to sections
sections = {
    '<section id="testimonials" className="py-12 bg-white border-b border-[#f5f5f7] overflow-hidden">': 'retail',
    '<section id="store" className="py-20 bg-[#f5f5f7]">': 'retail',
    '<section id="business" className="relative py-24 bg-[#161617] text-white overflow-hidden">': 'enterprise',
    '<section id="blog-preview" className="py-20 bg-[#f5f5f7]">': 'retail',  
    '<section id="portal" className="py-20 bg-white border-t border-[#e8e8ed]">': 'retail',
}

for old, persona in sections.items():
    new = old.replace('className="', 'className={`') + ' ${heroPersona!=="' + persona + '"?"persona-hidden":""}`}>'
    if old in content:
        content = content.replace(old, new)
        print(f"OK: {old[:40]}...")
    else:
        print(f"MISS: {old[:40]}...")

with open("src/pages/Home.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Done. Size:", len(content))
