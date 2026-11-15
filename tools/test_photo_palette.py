#!/usr/bin/env python3
"""Validate the photo-derived color system, contrast and gallery deep links."""
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
css=(ROOT/"photo-palette.css").read_text(encoding="utf-8")
errors=[]
def check(ok,msg):
 if not ok: errors.append(msg)
def luminance(color):
 color=color.lstrip("#")
 values=[int(color[i:i+2],16)/255 for i in (0,2,4)]
 values=[v/12.92 if v<=.04045 else ((v+.055)/1.055)**2.4 for v in values]
 return sum(a*b for a,b in zip((.2126,.7152,.0722),values))
def ratio(first,second):
 a,b=sorted((luminance(first),luminance(second)),reverse=True)
 return (a+.05)/(b+.05)
checks=[
 ("#1a2845","#f6f7f5","light main"),
 ("#526376","#f6f7f5","light secondary"),
 ("#115f88","#ffffff","light links"),
 ("#aa4523","#ffffff","light accent"),
 ("#185f91","#ffffff","School tab"),
 ("#9c4325","#ffffff","Work tab"),
 ("#50643a","#ffffff","Personal tab"),
 ("#f5f7f5","#131d31","dark main"),
 ("#c3d1e1","#131d31","dark secondary"),
 ("#91d7f5","#1e2e49","dark links"),
 ("#ffb68b","#1e2e49","dark accent")
]
for fg,bg,name in checks:
 c=ratio(fg,bg)
 print(f"{name}: {c:.2f}:1")
 check(c>=4.5,"Insufficient contrast: "+name)
palette=["navy","white","cobalt","sky","cyan","copper","orange","coral","gold","sunflower","leaf"]
for name in palette:check("--photo-"+name+":" in css,"Missing photo color "+name)
for selector in ['html[data-theme="dark"]','.site-header::after','.site-footer::before','.skill-group:nth-child','.home-pillar-section','.home-hero']:
 check(selector in css,"Missing palette treatment "+selector)
pages=[p for p in ROOT.rglob("*.html") if "_site" not in p.parts and ".git" not in p.parts]
styled=[p for p in pages if "style.css" in p.read_text(encoding="utf-8")]
for p in styled:
 text=p.read_text(encoding="utf-8")
 prefix="../" if p.parent!=ROOT else ""
 check('href="'+prefix+'photo-palette.css?v=1"' in text,"Missing stylesheet on "+str(p))
 check('script.js?v=22' in text,"Missing fresh deep-link JS on "+str(p))
check(len(styled)==14,"Expected fourteen primary styled pages")
script=(ROOT/"script.js").read_text(encoding="utf-8")
check("box.id = 'figure-'" in script,"Generated figures need stable IDs")
check("getElementById(hash)" in script,"Direct figure hashes must scroll correctly")
noaa=(ROOT/"school/noaa.html").read_text(encoding="utf-8")
for name in ["noaa-event-frequency","noaa-economic-damage","noaa-precision-recall","noaa-feature-importance"]:
 check('id="figure-'+name+'"' in noaa,"Missing original NOAA image anchor "+name)
print(f"Palette: {len(palette)} named colors across {len(styled)} pages.")
if errors:
 for error in errors:print("FAIL:",error)
 raise SystemExit(1)
print("PASS: contrast, photo palette, sitewide styles, figure deep links.")
