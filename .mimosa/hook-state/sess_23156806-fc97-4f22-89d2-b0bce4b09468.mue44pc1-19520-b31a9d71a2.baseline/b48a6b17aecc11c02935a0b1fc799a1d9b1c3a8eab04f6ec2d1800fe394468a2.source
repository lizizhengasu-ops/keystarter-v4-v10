with open("src/pages/Home.tsx", "r", encoding="utf-8") as f:
    c = f.read()

# 1. Remove partner from top
p_top = c.find("Trusted by Industry Leaders")
if p_top > 0:
    ps = c.rfind("{heroPersona", 0, p_top)
    # Find the closing )} after the partner section
    pe = c.find(")}", p_top + 60)
    if pe > 0:
        pe = pe + 2
        # Remove the entire block
        before = c[:ps]
        after = c[pe:]
        # Clean up trailing whitespace after removal
        while after.startswith("\n"):
            after = after[1:]
        c = before + after
        print("Partner removed from top")

# 2. Add emoji fix
c = c.replace("String.fromCharCode(0x1F464)", "String.fromCodePoint(0x1F464)")
c = c.replace("String.fromCharCode(0x1F3E2)", "String.fromCodePoint(0x1F3E2)")

# 3. Insert simplified partner after CTA at bottom
cta_marker = "Ready to Scale"
cta_pos = c.rfind(cta_marker)
if cta_pos > 0:
    ce = c.find(")}", cta_pos + 60)
    if ce > 0:
        ce = ce + 2
        # Insert partner after CTA
        partner_block = open("docs/analysis/partner-block.txt", "r", encoding="utf-8").read()
        c = c[:ce] + "\n\n" + partner_block + c[ce:]
        print("Partner added after CTA at bottom")

with open("src/pages/Home.tsx", "w", encoding="utf-8") as f:
    f.write(c)
print("Done. Size:", len(c))
