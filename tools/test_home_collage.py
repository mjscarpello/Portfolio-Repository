#!/usr/bin/env python3
"""Check homepage collage provenance, hierarchy, motion accessibility and link safety."""
from html.parser import HTMLParser
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
home = (ROOT / "index.html").read_text(encoding="utf-8")
css = (ROOT / "home-collage.css").read_text(encoding="utf-8")
js = (ROOT / "home-collage.js").read_text(encoding="utf-8")
data_text = (ROOT / "portfolio-data.js").read_text(encoding="utf-8")
data = json.loads(data_text[data_text.index("{"):data_text.rindex("}")+1])
errors = []

def check(value, message):
    if not value: errors.append(message)

class Scan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.images = []
        self.links = []
        self.buttons = []
        self.collage_depth = 0
        self.in_collage = False
        self.collage_images = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get("id"): self.ids.append(a["id"])
        if tag == "img": self.images.append(a)
        if tag == "a": self.links.append(a)
        if tag == "button": self.buttons.append(a)
        if tag == "div" and "data-home-collage" in a:
            self.in_collage = True
            self.collage_depth = 1
            check(a.get("aria-hidden") == "true", "Collage should be decorative to assistive technology")
        elif self.in_collage and tag == "div":
            self.collage_depth += 1
        if self.in_collage and tag == "img":
            self.collage_images.append(a)
    def handle_endtag(self, tag):
        if self.in_collage and tag == "div":
            self.collage_depth -= 1
            if not self.collage_depth: self.in_collage = False

scan = Scan()
scan.feed(home)
checks = ["main", "hero-title", "home-intro", "experiences", "experiences-title",
          "pillar-explorer", "pillar-project-list", "pillar-next", "pillar-prev", "pillar-panel"]
for name in checks: check(name in scan.ids, f"Missing homepage ID #{name}")
check(len(scan.ids)==len(set(scan.ids)), "Duplicate HTML ids")
check(home.find('id="home-intro"') < home.find('id="experiences"'), "Hero must come before pillar explorer")
check("Questions worth" not in home, "Old hero headline is still rendered")
check("I learn by" in home, "Review-stage headline is missing")
check("class=\"brand-circle\"" in home, "Shared portrait/avatar header is missing")
check((ROOT / "assets/brand-avatar.jpg").is_file(), "Avatar image missing")
check(any(x.get("href")=="#experiences" for x in scan.links), "Explore my work action changed")
check(any(x.get("href")=="about.html#mini-resume" for x in scan.links), "Resume action changed")
check(not any("data-home-motion-toggle" in x for x in scan.buttons), "Remove the pause-motion button")
check(len(scan.collage_images)==9, f"Expected 9 original project images, found {len(scan.collage_images)}")
check(all(x.get("alt") == "" for x in scan.collage_images), "Decorative collage images must have empty alt text")
check(all(x.get("decoding")=="async" for x in scan.collage_images), "Collage images should decode asynchronously")

expected_categories = {
    "school": ("noaa", "ercot", "amazon-pick", "amazon-clothing"),
    "work": ("unmc", "lab-rat"),
    "personal": ("studio-s", "mini-bookmaker")
}
paths = set()
total = 0
for item in scan.collage_images:
    src = item.get("src", "")
    check(src.startswith("figures/") and not src.startswith("http"), f"Unexpected collage asset {src}")
    path = ROOT / src
    if not path.is_file():
        errors.append(f"Missing original project file {src}")
        continue
    paths.add(src)
    total += path.stat().st_size
check(len(paths)==9, "Every collage figure should be unique")
registered_figures = {f["src"] for p in data["projects"] for f in p.get("figures", [])}
check(paths.issubset(registered_figures), "Collage contains unregistered or invented project imagery")
for category, ids in expected_categories.items():
    group_assets = {f["src"] for p in data["projects"] if p["id"] in ids for f in p.get("figures", [])}
    check(bool(paths.intersection(group_assets)), f"No verified {category} assets in collage")
check(total <= 1600000, f"Fallback collage image weight exceeds target: {total:,} bytes")
pool_text=js.split('const eligibleSources = new Set([',1)[-1].split(']);',1)[0]
sources=re.findall(r'"(figures/[^"]+\\.(?:jpg|png|webp))"',pool_text)
check(len(sources)>=18 and len(sources)==len(set(sources)), "Random asset pool must contain many unique originals")
check(set(sources).issubset(registered_figures), "Random selection may use only registered figures")
check(all((ROOT / path).is_file() for path in sources), "Image pool has a missing image")
for cat in ["school","work","personal"]:
    group={f["src"] for p in data["projects"] if p["category"]==cat for f in p.get("figures",[])}
    check(len(set(sources)&group)>=3, "Too few project images for "+cat)
check("cloneNode(true)" in js and "replaceChildren(sequence, repeat)" in js, "Infinite scroll requires identical sequence halves")
check("reserved = lanes.map" in js and "Math.random()" in js, "Collage needs balanced random imagery")
check("home-collage-flow-down" in css and "linear infinite" in css, "Continuous linear motion missing")
check("from{transform:translate3d(0,-50%,0)}" in css, "Loop must start at negative half-track")
check("to{transform:translate3d(0,0,0)}" in css, "Images must move top to bottom")
check("localStorage" not in js and "home-motion-toggle" not in css, "Remove stored pause behavior and control")
check('data-motion="downward-infinite"' in home, "Animation marker missing")
check("prefers-reduced-motion" in css and "prefers-reduced-motion" in js, "Missing reduced-motion protection")
check("home-collage-paused" in css and "home-collage-paused" in js, "Offscreen motion pause must work")
check("IntersectionObserver" in js and "requestAnimationFrame" in js, "Motion must be visibility-aware and throttled")
check("visibilitychange" in js, "Moving collage must pause in background tabs")
check("home-hero-bridge" in home and "home-hero-bridge" in css, "Missing bridge into three pillars")
check('id="experiences"' in home, "Pillar deep links must remain valid")
check("home-pillar-section" in css and 'data-theme="dark"' in css, "Distinct pillar surface must work in both themes")
check(not re.search(r'<video\b|<canvas\b', home), "Collage should not use distracting live video or animation canvases")
print(f"Homepage collage: {len(paths)} initial assets; {len(sources)} verified sources in randomized downward loop pool.")
if errors:
    for error in errors: print("FAIL:", error)
    raise SystemExit(1)
print("PASS: structure, original assets, all pillars, keyboard targets, motion preferences and lightweight source media.")
