#!/usr/bin/env python3
"""Validate the original portfolio source or a built GitHub Pages directory.

Run from the repository:
  python3 tools/validate_portfolio.py
  python3 tools/build_portfolio.py
  python3 tools/validate_portfolio.py _site
"""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit
import json
import sys

SOURCE = Path(__file__).resolve().parents[1]
ROOT = (SOURCE / sys.argv[1]).resolve() if len(sys.argv) > 1 else SOURCE
ERRORS = []
PAGES = list(ROOT.rglob("*.html"))
if ROOT == SOURCE:
    PAGES = [p for p in PAGES if "_site" not in p.relative_to(ROOT).parts and ".git" not in p.relative_to(ROOT).parts]
CACHE = {}

def add(message):
    ERRORS.append(message)

def content(path):
    return path.read_text(encoding="utf-8")

def ids(path):
    if path not in CACHE:
        class IDScanner(HTMLParser):
            def __init__(self):
                super().__init__()
                self.found = set()
            def handle_starttag(self, tag, attrs):
                attributes = dict(attrs)
                if attributes.get("id"):
                    self.found.add(attributes["id"])
        parser = IDScanner()
        markup = content(path)
        parser.feed(markup)
        # The case-gallery renderer creates figure IDs after page load. Validate
        # only anchors backed by an exact registered project figure and the
        # matching data-case-gallery marker; never accept arbitrary hashes.
        relative = path.relative_to(ROOT).as_posix()
        for project in projects:
            if project.get("page") != relative:
                continue
            if f'data-case-gallery="{project.get("id")}"' not in markup:
                continue
            for figure in project.get("figures", []):
                image_stem = Path(figure.get("src", "")).stem.lower()
                if image_stem:
                    parser.found.add("figure-" + image_stem)
        CACHE[path] = parser.found
    return CACHE[path]

class LinkScanner(HTMLParser):
    def __init__(self, page):
        super().__init__()
        self.page = page

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        refs = []
        if tag in {"a", "link"} and "href" in a:
            refs.append(a["href"])
        if tag in {"img", "script", "video", "source", "iframe"} and "src" in a:
            refs.append(a["src"])
        for raw in refs:
            parsed = urlsplit(raw)
            if parsed.scheme or parsed.netloc or raw.startswith("//"):
                continue
            relative = unquote(parsed.path)
            dest = (self.page.parent / relative).resolve() if relative else self.page
            if not dest.is_relative_to(ROOT):
                add(f"{self.page.relative_to(ROOT)}: path escapes site: {raw}")
                continue
            if not dest.is_file():
                # The original Storyline export is unpacked only during build.
                generated = ROOT == SOURCE and dest == ROOT / "demos/lab-rat-revolt/story.html"
                if generated and (ROOT / "game-source/lab-rat-revolt-web.zip").is_file():
                    continue
                if ROOT == SOURCE and dest == ROOT / "downloads/matthew-scarpello-resume.pdf" and (ROOT / "tools/generate_resume.py").is_file():
                    continue
                add(f"{self.page.relative_to(ROOT)}: missing reference {raw}")
                continue
            if parsed.fragment and dest.suffix == ".html" and parsed.fragment not in ids(dest):
                add(f"{self.page.relative_to(ROOT)}: missing anchor {raw}")

try:
    raw = content(ROOT / "portfolio-data.js")
    data = json.loads(raw[raw.index("{"):raw.rindex("}") + 1])
except (OSError, ValueError, json.JSONDecodeError) as exc:
    sys.exit(f"FAIL: invalid portfolio-data.js: {exc}")
projects = data.get("projects", [])
pillars = data.get("pillars", [])
if len({p.get("id") for p in projects}) != len(projects):
    add("Duplicate project identifiers")
if {p.get("id") for p in pillars} != {"school", "work", "personal"}:
    add("Expected School, Work and Personal pillar records")
for p in projects:
    target = ROOT / p.get("page", "")
    if not target.is_file():
        add(f"Missing project page: {p.get('page')}")
    for figure in p.get("figures", []):
        if not (ROOT / figure.get("src", "")).is_file():
            add(f"Missing original figure: {figure.get('src')}")
for category in pillars:
    if not (ROOT / category["collection"]).is_file():
        add(f"Missing collection: {category['collection']}")
    if category["featured"] not in {p["id"] for p in projects if p["category"] == category["id"]}:
        add(f"Invalid featured project: {category['id']}")
for name, required in {
    "index.html": ["experiences", "pillar-explorer", "pillar-project-list", "pillar-panel"],
    "about.html": ["mini-resume", "about-reel-track", "reel-prev", "reel-next"],
    "work/lab-rat-revolt.html": ["game-load", "game-host"],
}.items():
    path = ROOT / name
    if not path.is_file():
        add(f"Missing required page: {name}")
    else:
        for anchor in required:
            if anchor not in ids(path):
                add(f"Missing expected element: {name}#{anchor}")
for page in PAGES:
    LinkScanner(page).feed(content(page))
print(f"Checked {len(PAGES)} HTML pages, {len(projects)} projects and {sum(len(p.get('figures', [])) for p in projects)} original figures in {ROOT.name}.")
if ERRORS:
    for error in ERRORS:
        print("FAIL:", error)
    sys.exit(1)
print("PASS: project data, page links, anchors, and original figure paths.")
