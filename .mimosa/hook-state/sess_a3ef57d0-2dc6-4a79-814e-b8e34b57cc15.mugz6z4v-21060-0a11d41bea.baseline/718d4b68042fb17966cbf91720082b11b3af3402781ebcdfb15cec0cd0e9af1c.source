with open("src/pages/Home.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Find partner block - use unique markers
partner_marker = "Trusted by Industry Leaders"
cta_marker = "Ready to Scale Your Licensing"

p_idx = content.find(partner_marker)
c_idx = content.find(cta_marker)

if p_idx > 0 and c_idx > 0:
    # Find partner block boundaries
    # Go back to find {heroPersona === "enterprise" &&
    p_start = content.rfind("{heroPersona === \"enterprise\"", 0, p_idx)
    # Find the closing )} after the partner section
    p_end = content.find(")}", p_idx + 50)
    # Find the actual closing - need to find the one after the partner section close
    p_end = content.find(")}", p_end + 2)  # second )} (first closes the map, second closes the conditional)
    
    partner_block = content[p_start:p_end]
    print(f"Partner block: {len(partner_block)} chars")
    
    # Find CTA block boundaries
    c_start = content.rfind("{heroPersona === \"enterprise\"", 0, c_idx)
    c_end = content.find(")}", c_idx + 50)
    
    cta_block = content[c_start:c_end]
    print(f"CTA block: {len(cta_block)} chars")
    
    # Remove partner from top
    content = content.replace(partner_block + "\n\n", "")
    
    # Find where to insert - right before the toast
    toast_marker = "{/* Global Interactive Notification Toast */}"
    toast_idx = content.find(toast_marker)
    if toast_idx > 0:
        content = content[:toast_idx] + partner_block + "\n\n" + content[toast_idx:]
        print("Swapped: partner now after CTA, before toast")
    
    with open("src/pages/Home.tsx", "w", encoding="utf-8") as f:
        f.write(content)
    print("Done")
else:
    print(f"Markers not found: p={p_idx}, c={c_idx}")
