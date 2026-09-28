import re
with open("docs/analysis/gemini-code-v7.html", "r", encoding="utf-8") as f:
    html = f.read()

schemes = {}
scripts = re.findall(r"<script[^>]*>(.*?)</script>", html, re.DOTALL)
for s in scripts:
    if "setScheme" not in s:
        continue
    cases = re.findall(r"case\s+(\d+)\s*:(.*?)(?=case\s+\d+\s*:|default:)", s, re.DOTALL)
    for num, body in cases:
        hex_colors = list(set(re.findall(r"#([0-9a-fA-F]{6})", body)))
        schemes[int(num)] = hex_colors
    break

names = {
    1: "Obsidian Cobalt (深曜石钴蓝)", 2: "Apple Studio (苹果磨砂灰)",
    3: "Cyber Shield (网络盾牌绿)", 4: "Stripe Midnight (Stripe午夜)",
    5: "Titanium Gold (钛金香槟金)", 6: "Nordic Frost (北欧冰霜白)",
    7: "Aurora Grid (极光网格青)", 8: "Carbon Matrix (碳纤硬核黑)",
    9: "Velvet Rose (钛金玫瑰红)", 10: "Azure Mint (蔚蓝薄荷绿)",
    11: "Neon Cyan (深空霓虹青)", 12: "Platinum White (铂金纯净白)",
    13: "Matrix Green (黑曜石矩阵)", 14: "Amber Dark (煤烟琥珀黄)",
    15: "Quantum Violet (量子紫罗兰)", 16: "Slate Mono (板岩灰单色)",
    17: "Electric Blue (电光发光蓝)", 18: "Titanium Dark (钛金石墨黑)",
    19: "Crystal Ice (水晶纯冰白)", 20: "Cyberpunk Yellow (赛博高对比)",
}

print(f"Extracted {len(schemes)} schemes")
for n in sorted(schemes.keys()):
    name = names.get(n, f"Scheme {n}")
    print(f"{n:2d}. {name}: {schemes[n][:5]}")
