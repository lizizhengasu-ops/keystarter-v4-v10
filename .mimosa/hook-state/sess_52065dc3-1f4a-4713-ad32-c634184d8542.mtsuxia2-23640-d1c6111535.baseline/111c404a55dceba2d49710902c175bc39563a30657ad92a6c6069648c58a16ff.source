import re

with open("src/pages/Home.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Find partner block at top (lines ~299-326) and CTA at bottom
# Use content.find to locate exact positions

p_start = content.find("{heroPersona === \"enterprise\" && (\n      <section className=\"py-12 bg-white border-b")
if p_start < 0:
    p_start = content.find("{heroPersona === \"enterprise\" && (\n     <section className=\"py-12 bg-white border-b")

if p_start > 0:
    print(f"Partner start: {p_start}")
    # Find the closing )} after partner section - look for the conditional close
    # The structure is: {heroPersona... && (\n <section>... </section>\n )}
    # Find the second )} line after partner start
    search_from = content.find("Our Partners and Integrations", p_start)
    if search_from > 0:
        # Find section close then conditional close
        sec_close = content.find("</section>", search_from)
        if sec_close > 0:
            cond_close = content.find(")}", sec_close)
            if cond_close > 0:
                p_end = cond_close + 2  # Include the )}
                partner_block = content[p_start:p_end]
                print(f"Partner block: {len(partner_block)} chars")
                
                # Remove partner from this position
                content = content[:p_start] + content[p_end:]
                
                # Now find CTA block at bottom
                cta_marker = "Ready to Scale Your Licensing"
                c_idx = content.find(cta_marker)
                if c_idx > 0:
                    c_start = content.rfind("{heroPersona === \"enterprise\"", 0, c_idx)
                    c_end = content.find(")}", c_idx + 50)
                    if c_end > 0:
                        c_end = c_end + 2
                        cta_block = content[c_start:c_end]
                        
                        # Re-insert partner AFTER CTA (but before toast)
                        # Find the CTA position to insert partner after
                        cta_pos = content.find(cta_block)
                        insert_at = cta_pos + len(cta_block)
                        content = content[:insert_at] + "\n\n" + partner_block + content[insert_at:]
                        
                        with open("src/pages/Home.tsx", "w", encoding="utf-8") as f:
                            f.write(content)
                        print("Partner moved after CTA")
                    else:
                        print("CTA end not found")
                else:
                    print("CTA not found")
else:
    print("Partner block not found at expected position")
