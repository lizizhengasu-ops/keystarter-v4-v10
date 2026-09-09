import re

with open("src/pages/Home.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Persona consistency
retail_hides = len(re.findall(r'heroPersona!=="retail".*persona-hidden', content))
ent_hides = len(re.findall(r'heroPersona!=="enterprise".*persona-hidden', content))
print(f"Retail-only sections: {retail_hides}")
print(f"Enterprise-only sections: {ent_hides}")

# Scroll targets vs IDs
sections = set(re.findall(r'scrollToSection\("([^"]+)"\)', content))
existing = set(re.findall(r'id="([^"]+)"', content))
print(f"scrollToSection targets: {sorted(sections)}")
print(f"Section IDs in DOM: {sorted(existing)}")
missing = sections - existing
if missing:
    print(f"WARNING - missing IDs: {missing}")
else:
    print("OK - all section IDs match")

# Check persona conditions are balanced
retail_opens = content.count('heroPersona === "retail"')
ent_opens = content.count('heroPersona === "enterprise"')
print(f"Retail conditions: {retail_opens}")
print(f"Enterprise conditions: {ent_opens}")

# Check for hardcoded links
links = re.findall(r'href="([^"]+)"', content)
external = [l for l in links if l.startswith("http")]
print(f"External links: {len(external)}")
print(f"Internal links: {len(links) - len(external)}")
