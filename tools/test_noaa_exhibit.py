#!/usr/bin/env python3
"""NOAA guided research exhibit: source integrity and navigation."""
from pathlib import Path
from html.parser import HTMLParser
import json

ROOT = Path(__file__).resolve().parents[1]
HTML = (ROOT / "school/noaa.html").read_text(encoding="utf-8")
CSS = (ROOT / "noaa-exhibit.css").read_text(encoding="utf-8")
JS = (ROOT / "noaa-navigation.js").read_text(encoding="utf-8")
BUILD = (ROOT / "tools/build_portfolio.py").read_text(encoding="utf-8")
errors = []

def check(ok, msg):
    if not ok:
        errors.append(msg)

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.figures = []
        self.nav = []
        self.details_count = 0
        self.figure_id = ""
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get("id"):
            self.ids.append(a["id"])
        if tag == "figure":
            self.figure_id = a.get("id", "")
        if tag == "img" and self.figure_id.startswith("figure-noaa-"):
            self.figures.append((self.figure_id, a))
        if tag == "a" and "data-preview" in a:
            self.nav.append(a)
        if tag == "details":
            self.details_count += 1
    def handle_endtag(self, tag):
        if tag == "figure":
            self.figure_id = ""

p = PageParser()
p.feed(HTML)
order = ["noaa-start","noaa-question","noaa-discovery","noaa-evaluation","noaa-interpretation","noaa-methods","noaa-future","noaa-resources"]
positions = [HTML.find('id="' + name + '"') for name in order]
check(all(x >= 0 for x in positions) and positions == sorted(positions), "Research sections missing or out of order")
check(len(p.ids) == len(set(p.ids)), "Duplicate page IDs")
data = (ROOT / "portfolio-data.js").read_text(encoding="utf-8")
project = next(x for x in json.loads(data[data.index("{"):data.rindex("}")+1])["projects"] if x["id"]=="noaa")
expected = {Path(f["src"]).stem for f in project["figures"]}
check(len(expected)==4, "Expected four curated original figures")
check({i.removeprefix("figure-") for i,a in p.figures}==expected and len(p.figures)==4, "Curated figure anchors must match the reel registry")
for id,a in p.figures:
    path = a.get("src","")
    check((ROOT / "school" / path).is_file(), "Missing original figure " + path)
    check(len(a.get("alt","")) > 28, "Missing meaningful figure alt text")
    check('href="'+path+'"' in HTML, "No direct original file link")
check(len(p.nav)==7, "Seven contextual section previews required")
for a in p.nav:
    check(a["href"].lstrip("#") in p.ids, "Navigation target missing")
    check((ROOT/"school"/a["data-preview"]).is_file(), "Navigation preview image missing")
    check(bool(a.get("data-description")), "Missing navigation preview description")
check('data-project-reel="noaa"' in HTML and 'data-reel-style="research"' in HTML, "Missing horizontal research reel")
check("home-collage.css" not in HTML and HTML.count("data-reel-lane")==1, "Keep the vertical waterfall exclusive to homepage")
check('data-pillar="school"' in HTML and "var(--pillar-accent)" in CSS, "Missing School accent")
check("EPISODE_ID" in HTML and "102,409" in HTML and "237,603" in HTML and "70,299" in HTML, "Required target and validation context absent")
check("ROC-AUC measures ranking" in HTML and HTML.find("ROC-AUC measures ranking") < HTML.find(">0.880<"), "Metrics must follow interpretation")
for score in ["0.219","0.500","0.652","0.871","0.669","0.880","0.691","0.703"]:
    check(">"+score+"<" in HTML, "Missing verified team report score " + score)
check("0.4439" in HTML and "different experiment" in HTML and "do not contain saved final comparison scores" in HTML, "Exploratory results need separate interpretation")
check("reported team evaluation" in HTML.lower() and "not the exact original final-model training notebook" in HTML, "Reproducibility caveat absent")
check("not a deployed forecast system" in HTML and "caus" in HTML.lower(), "Future work or association boundary missing")
check(p.details_count>=4,"Use progressive disclosure for supplementary methodology")
check("mouseenter" in JS and '"focus"' in JS and '"Escape"' in JS, "Context previews need keyboard and mouse behavior")
check("NOAA_ARCHIVE_SLOT" in HTML and "NOAA_ARCHIVE_SLOT" in BUILD and "sha256" in BUILD, "Source archive publishing integration absent")
check("noaa-archive-gallery" in CSS and "@media(max-width:650px)" in CSS, "Missing compact source library and responsive layout")
check((ROOT/"docs/NOAA-RESEARCH-SOURCES.md").is_file(), "Missing research provenance guide")
check("role" not in HTML.split('id="noaa-question"')[0].lower().split('class="noaa-hero-copy"')[-1].split('</header>')[0], "Do not foreground role before research")
if errors:
    for e in errors: print("FAIL:",e)
    raise SystemExit(1)
print("PASS: NOAA source-linked reel, four original figures, interactive navigation, verified report metrics, limitations, optional archive and mobile CSS.")
