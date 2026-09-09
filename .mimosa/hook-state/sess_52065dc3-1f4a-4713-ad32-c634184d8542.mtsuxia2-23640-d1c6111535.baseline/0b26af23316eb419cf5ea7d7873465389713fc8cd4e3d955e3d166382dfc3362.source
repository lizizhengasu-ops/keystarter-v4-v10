import re

with open("src/pages/Home.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Fix: replace exact className patterns
fixes = [
    # (section_id, old_className_value, persona)
    ("testimonials", 'className="py-12 bg-white border-b border-[#f5f5f7] overflow-hidden"', "retail"),
    ("store", 'className="py-20 bg-[#f5f5f7]"', "retail"),
    ("business", 'className="relative py-24 bg-[#161617] text-white overflow-hidden"', "enterprise"),
    ("blog-preview", 'className="py-20 bg-[#f5f5f7]"', "retail"),
    ("portal", 'className="py-20 bg-white border-t border-[#e8e8ed]"', "retail"),
]

for sid, old_class, persona in fixes:
    new_class = old_class.replace('className="', 'className={`') 
    # Remove the closing '"' and add template expression with backtick
    new_class = new_class[:-1]  # remove trailing "
    new_class = new_class + ' ${heroPersona!=="' + persona + '"?"persona-hidden":""}`}'
    # Also need to fix the '>' that comes after className in the original
    # The original is: className="value">
    # New should be: className={`value ${expr}`}>
    # But old_class already includes className="...", we need to replace it in context
    
    # Find the full pattern in the original code
    # Search for: className="value">
    full_pattern = old_class + '>'
    full_replacement = new_class + '>'
    
    if full_pattern in content:
        count_before = content.count(full_pattern)
        content = content.replace(full_pattern, full_replacement)
        count_after = content.count(full_replacement)
        print(f"OK: {sid} ({count_before}x -> {count_after}x)")
    else:
        # Try without the trailing >
        if old_class in content:
            content = content.replace(old_class, new_class)
            print(f"OK (partial): {sid}")
        else:
            print(f"MISS: {sid} - pattern not found")
            # Show what's actually there
            idx = content.find(f'<section id="{sid}"')
            if idx > 0:
                chunk = content[idx:idx+120]
                print(f"  Found: {chunk[:100]}")

with open("src/pages/Home.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("\nDone. Size:", len(content))
