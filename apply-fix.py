with open("src/pages/Home.tsx", "r", encoding="utf-8") as f:
    c = f.read()

# Emoji fixes
c = c.replace("String.fromCharCode(0x1F464)", "String.fromCodePoint(0x1F464)")
c = c.replace("String.fromCharCode(0x1F3E2)", "String.fromCodePoint(0x1F3E2)")

# Remove partner from top position
p_top = c.find("Trusted by Industry Leaders")
if p_top > 0:
    ps = c.rfind("{heroPersona", 0, p_top)
    pe = c.find(")}", p_top + 50) + 2
    c = c[:ps] + c[pe:]

# Find CTA at bottom, insert simple partner after it
cta = c.rfind("Ready to Scale")
if cta > 0:
    cs = c.rfind("{heroPersona", 0, cta)
    ce = c.find(")}", cta + 50) + 2
    partner = open("docs/analysis/partner-block.txt", "r", encoding="utf-8").read()
    c = c[:ce] + "\n\n" + partner + c[ce:]

with open("src/pages/Home.tsx", "w", encoding="utf-8") as f:
    f.write(c)
print("Done")
