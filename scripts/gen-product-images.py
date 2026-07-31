import os
from PIL import Image, ImageDraw, ImageFont

ROOT = r"C:\Users\31961\Documents\microsoft web\keystarter-v4-v10"
OUT = os.path.join(ROOT, "public", "assets", "images")
os.makedirs(OUT, exist_ok=True)

def font(size, bold=True):
    cands = [r"C:\Windows\Fonts\segoeuib.ttf", r"C:\Windows\Fonts\arialbd.ttf"] if bold else [r"C:\Windows\Fonts\segoeui.ttf", r"C:\Windows\Fonts\arial.ttf"]
    for c in cands:
        if os.path.exists(c):
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()

def paste_layer(img, layer, cx, cy, max_w, max_h):
    layer = layer.copy()
    layer.thumbnail((max_w, max_h), Image.LANCZOS)
    img.paste(layer, (int(cx - layer.width / 2), int(cy - layer.height / 2)), layer)

def win10_logo():
    layer = Image.new("RGBA", (400, 400), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    blue = (0, 120, 215, 255)
    d.rectangle([24, 24, 188, 188], fill=blue)
    d.rectangle([212, 24, 376, 188], fill=blue)
    d.rectangle([24, 212, 188, 376], fill=blue)
    d.rectangle([212, 212, 376, 376], fill=blue)
    return layer.rotate(-12, expand=False, resample=Image.BICUBIC)

def office_logo():
    layer = Image.new("RGBA", (400, 400), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    colors = [(43, 87, 154, 255), (33, 115, 70, 255), (183, 71, 42, 255), (119, 25, 169, 255)]
    rects = [(20, 20, 190, 190), (210, 20, 380, 190), (20, 210, 190, 380), (210, 210, 380, 380)]
    for r, c in zip(rects, colors):
        d.rounded_rectangle(r, radius=26, fill=c)
    return layer

def sql_logo():
    layer = Image.new("RGBA", (400, 400), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rounded_rectangle([16, 16, 384, 384], radius=80, fill=(204, 41, 39, 255))
    d.text((200, 208), "SQL", font=font(150), fill=(255, 255, 255, 255), anchor="mm")
    return layer

def make_image(spec):
    kind, title, subtitle = spec["kind"], spec["title"], spec["subtitle"]
    img = Image.new("RGB", (1024, 768), (255, 255, 255))
    logo = None
    if kind == "win11":
        logo = Image.open(os.path.join(ROOT, "tmp", "logos", "win11.png")).convert("RGBA")
        paste_layer(img, logo, 512, 250, 340, 320)
    elif kind == "win10":
        paste_layer(img, win10_logo(), 512, 250, 360, 340)
    elif kind == "office":
        paste_layer(img, office_logo(), 512, 250, 360, 340)
    elif kind == "sql":
        paste_layer(img, sql_logo(), 512, 250, 340, 340)
    elif kind == "server11":
        logo = Image.open(os.path.join(ROOT, "tmp", "logos", "win11.png")).convert("RGBA")
        paste_layer(img, logo, 512, 250, 340, 320)
    elif kind == "server10":
        paste_layer(img, win10_logo(), 512, 250, 360, 340)

    d = ImageDraw.Draw(img)
    tsize = 44 if len(title) <= 24 else 34
    tf = font(tsize)
    sf = font(26, bold=False)
    d.text((512, 512), title, font=tf, fill=(29, 29, 31, 255), anchor="mm")
    d.text((512, 572), subtitle, font=sf, fill=(134, 134, 139, 255), anchor="mm")
    d.rectangle([0, 0, 1023, 767], outline=(232, 232, 237, 255), width=2)
    return img

products = [
    {"slug": "windows-11-home", "kind": "win11", "title": "Windows 11 Home", "subtitle": "OEM Key - Lifetime Activation"},
    {"slug": "windows-11-home-official", "kind": "win11", "title": "Windows 11 Home", "subtitle": "Official Microsoft Order"},
    {"slug": "windows-11-pro", "kind": "win11", "title": "Windows 11 Pro", "subtitle": "OEM Key - Lifetime Activation"},
    {"slug": "windows-11-pro-official", "kind": "win11", "title": "Windows 11 Pro", "subtitle": "Official Microsoft Order"},
    {"slug": "windows-10-home", "kind": "win10", "title": "Windows 10 Home", "subtitle": "OEM Key - Lifetime Activation"},
    {"slug": "windows-10-home-official", "kind": "win10", "title": "Windows 10 Home", "subtitle": "Official Microsoft Order"},
    {"slug": "windows-10-pro", "kind": "win10", "title": "Windows 10 Pro", "subtitle": "OEM Key - Lifetime Activation"},
    {"slug": "windows-10-pro-official", "kind": "win10", "title": "Windows 10 Pro", "subtitle": "Official Microsoft Order"},
    {"slug": "office-2019-pro-plus", "kind": "office", "title": "Office 2019 Professional Plus", "subtitle": "One-time Purchase - 1 PC"},
    {"slug": "office-2021-pro-plus", "kind": "office", "title": "Office 2021 Professional Plus", "subtitle": "One-time Purchase - 1 PC"},
    {"slug": "win-11-iot-2024-entry", "kind": "win11", "title": "Windows 11 IoT Enterprise LTSC 2024", "subtitle": "Entry Edition"},
    {"slug": "win-11-iot-2024-value", "kind": "win11", "title": "Windows 11 IoT Enterprise LTSC 2024", "subtitle": "Value Edition"},
    {"slug": "win-11-iot-2024-high-end", "kind": "win11", "title": "Windows 11 IoT Enterprise LTSC 2024", "subtitle": "High End Edition"},
    {"slug": "win-10-iot-2021-entry", "kind": "win10", "title": "Windows 10 IoT Enterprise LTSC 2021", "subtitle": "Entry Edition"},
    {"slug": "win-10-iot-2021-value", "kind": "win10", "title": "Windows 10 IoT Enterprise LTSC 2021", "subtitle": "Value Edition"},
    {"slug": "win-10-iot-2021-high-end", "kind": "win10", "title": "Windows 10 IoT Enterprise LTSC 2021", "subtitle": "High End Edition"},
    {"slug": "win-10-iot-2019-entry", "kind": "win10", "title": "Windows 10 IoT Enterprise LTSC 2019", "subtitle": "Entry Edition"},
    {"slug": "win-10-iot-2019-value", "kind": "win10", "title": "Windows 10 IoT Enterprise LTSC 2019", "subtitle": "Value Edition"},
    {"slug": "win-10-iot-2019-high-end", "kind": "win10", "title": "Windows 10 IoT Enterprise LTSC 2019", "subtitle": "High End Edition"},
    {"slug": "win-11-iot-ml-entry", "kind": "win11", "title": "Windows 11 IoT Enterprise MultiLanguage", "subtitle": "Entry Edition"},
    {"slug": "win-11-iot-ml-value", "kind": "win11", "title": "Windows 11 IoT Enterprise MultiLanguage", "subtitle": "Value Edition"},
    {"slug": "win-11-iot-ml-high-end", "kind": "win11", "title": "Windows 11 IoT Enterprise MultiLanguage", "subtitle": "High End Edition"},
    {"slug": "win-svr-iot-2019", "kind": "server10", "title": "Windows Server IoT 2019", "subtitle": "Standard - 16 Core"},
    {"slug": "win-svr-iot-2022", "kind": "server11", "title": "Windows Server IoT 2022", "subtitle": "Standard - 16 Core"},
    {"slug": "win-svr-iot-2025", "kind": "server11", "title": "Windows Server IoT 2025", "subtitle": "Standard - 16 Core"},
    {"slug": "sql-svr-2019-runtime", "kind": "sql", "title": "SQL Server 2019 Standard", "subtitle": "IoT Runtime License"},
    {"slug": "sql-svr-2022-runtime", "kind": "sql", "title": "SQL Server 2022 Standard", "subtitle": "IoT Runtime License"},
]

for p in products:
    out = os.path.join(OUT, "p-" + p["slug"] + ".png")
    make_image(p).save(out)
    print("OK", out)
