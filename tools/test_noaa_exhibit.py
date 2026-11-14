#!/usr/bin/env python3
"""NOAA case-study content and navigation checks, using Python's standard library."""
from html.parser import HTMLParser
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
HTML = (ROOT / "school/noaa.html").read_text(encoding="utf-8")
CSS = (ROOT / "noaa-exhibit.css").read_text(encoding="utf-8")
errors = []


def check(condition, message):
    if not condition:
        errors.append(message)


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.figure_images = []
        self.details_count = 0
        self.copy = []
        self.in_copy = False
        self.current_text = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if values.get("id"):
            self.ids.append(values["id"])
        if tag == "img" and "noaa-" in values.get("src", ""):
            self.figure_images.append(values)
        if tag == "details":
            self.details_count += 1
        if tag == "p" and "noaa-copy" in values.get("class", "").split():
            self.in_copy = True
            self.current_text = []

    def handle_data(self, data):
        if self.in_copy:
            self.current_text.append(data)

    def handle_endtag(self, tag):
        if tag == "p" and self.in_copy:
            self.copy.append(" ".join(self.current_text).strip())
            self.in_copy = False
            self.current_text = []


page = PageParser()
page.feed(HTML)

order = [
    "noaa-start", "noaa-question", "noaa-discovery",
    "noaa-evaluation", "noaa-interpretation", "noaa-methods", "noaa-resources",
]
positions = [HTML.find('id="' + i + '"') for i in order]
check(all(p >= 0 for p in positions), "Every research exhibit and section must have an anchor")
check(positions == sorted(positions), "Guided narrative sections are not in the expected order")
check(len(set(page.ids)) == len(page.ids), "Duplicate page IDs")

expected = [
    "noaa-event-frequency.png",
    "noaa-economic-damage.png",
    "noaa-precision-recall.png",
    "noaa-feature-importance.png",
]
for file in expected:
    check(sum(v.get("src", "").endswith(file) for v in page.figure_images) == 1,
          f"Expected exactly one displayed original figure {file}")
    check((ROOT / "figures" / file).is_file(), f"Missing original figure {file}")
    check('../figures/' + file in HTML, f"No full-resolution reference for {file}")
for figure in page.figure_images:
    check(len(figure.get("alt", "").strip()) > 28, "Missing descriptive figure alt text")

context_position = HTML.find("ROC-AUC measures ranking across decision thresholds")
first_metric = HTML.find(">0.880<")
check(context_position > 0 and first_metric > context_position,
      "Do not display prominent model metrics before their explanation")
check(HTML.find(">0.669<") > context_position, "Average Precision precedes metric context")
check("reported team evaluation" in HTML.lower(), "Model scores must be attributed")
check(page.details_count >= 2, "Methodology and limitations must remain optionally accessible")
check("noaa-hero-art" in page.ids, "Reserved original hero image placement missing")
check("documented" in HTML.lower() or "reported" in HTML.lower(), "Recorded damage distinction lost")
check("caus" in HTML.lower(), "Missing causal interpretation caution")
check("noaa-hero.has-art" in CSS, "No responsive layout for original hero illustration")
check("@media(max-width:650px)" in CSS, "Responsive NOAA CSS breakpoint missing")

counts = [len(text.split()) for text in page.copy]
check(len(counts) >= 9, "Guided descriptions missing")
check(40 <= counts[0] <= 60, f"Introduction should be about 40–60 words; found {counts[0]}")
check(all(w <= 35 for w in counts[1:]), "Individual descriptions should stay concise")
check(sum(counts) <= 250, f"Main visible explanations exceed 250 words: {sum(counts)}")

illustration = ROOT / "assets/noaa-hero.webp"
if illustration.is_file():
    check('src="../assets/noaa-hero.webp"' in HTML, "Published image must be referenced directly")
    check("Conceptual editorial illustration" in HTML, "Illustration needs a non-evidence caption")
else:
    check('id="noaa-hero-art" hidden' in HTML, "Pending original illustration must stay hidden")
    check('src="../assets/noaa-hero.webp"' not in HTML, "Do not ship a broken image reference")

print(f"NOAA guided exhibit: {len(expected)} original figures, {sum(counts)} visible guide words, {page.details_count} optional detail sections.")
if errors:
    for error in errors:
        print("FAIL:", error)
    raise SystemExit(1)
print("PASS: research story, metric context, link targets, editorial limits and image state.")
