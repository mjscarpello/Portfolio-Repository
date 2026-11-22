#!/usr/bin/env python3
"""Build GitHub Pages site and unpack the original Storyline HTML5 web player.

The .story authoring source remains PRIVATE; this build uses only the web export ZIP.
"""
from pathlib import Path
from zipfile import ZipFile
import shutil, sys

ROOT = Path(__file__).resolve().parent.parent
TARGET = ROOT / '_site'
ARCHIVE = ROOT / 'game-source' / 'lab-rat-revolt-web.zip'
if TARGET.exists(): shutil.rmtree(TARGET)
TARGET.mkdir(parents=True)
EXCLUDE = {'.git','.github','_site','game-source','__pycache__'}
for item in ROOT.iterdir():
    if item.name in EXCLUDE: continue
    dest = TARGET / item.name
    if item.is_dir(): shutil.copytree(item,dest,ignore=shutil.ignore_patterns('__pycache__'))
    elif item.is_file(): shutil.copy2(item,dest)
if not ARCHIVE.is_file(): sys.exit('Missing original Storyline web export: '+str(ARCHIVE))
player_dir = TARGET / 'demos' / 'lab-rat-revolt'
player_dir.mkdir(parents=True)
with ZipFile(ARCHIVE,'r') as z:
    members=[i for i in z.infolist() if not i.is_dir()]
    for item in members:
        path=Path(item.filename)
        if path.is_absolute() or '..' in path.parts or len(path.parts)<2 or path.parts[0]!='Lab Rat Revolt':
            raise ValueError('Unexpected Storyline ZIP member '+item.filename)
        relative=Path(*path.parts[1:])
        dest=player_dir / relative
        dest.parent.mkdir(parents=True,exist_ok=True)
        with z.open(item) as source, dest.open('wb') as output: shutil.copyfileobj(source,output)
if not (player_dir/'story.html').exists(): sys.exit('Missing player launch file story.html')
print(f'Built site: {TARGET} | game files: {len(members)} | player: demos/lab-rat-revolt/story.html')

# Optional NOAA archive: a single, verified source upload activates individual
# PDFs, notebooks and the original notebook-figure collection on the built site.
import hashlib, html, json
noaa_archive = ROOT / "downloads" / "noaa-research-sources.zip"
if noaa_archive.is_file():
    originals = {
        "originals/report.pdf": "Final research report (PDF)",
        "originals/presentation.pdf": "Final presentation (PDF)",
        "originals/modeling-v3.ipynb": "Extended modeling notebook, v3.0",
        "originals/visualizations-sarah-parsons.ipynb": "Sarah Parsons' original visualization notebook",
    }
    with ZipFile(noaa_archive) as z:
        infos = z.infolist()
        if len(infos) > 50 or sum(x.file_size for x in infos) > 60_000_000:
            raise ValueError("Unexpected NOAA archive size")
        names = z.namelist()
        if len(names) != len(set(names)):
            raise ValueError("Duplicate NOAA archive members")
        manifest = json.loads(z.read("manifest.json"))
        rows = manifest["original_files"] + manifest["notebook_figures"]
        known = {r["archive_path"]: r for r in rows}
        if not set(originals).issubset(known):
            raise ValueError("NOAA archive is missing original research files")
        if set(names) != set(known) | {"README.md", "manifest.json"}:
            raise ValueError("Unexpected NOAA archive entries")
        outdir = TARGET / "downloads" / "noaa-research"
        for name in names:
            p = Path(name)
            if p.is_absolute() or ".." in p.parts or "\\" in name:
                raise ValueError("Unsafe NOAA archive path: " + name)
            if name not in originals and name not in {"README.md","manifest.json"}:
                if len(p.parts) != 3 or p.parts[0] != "figures" or p.parts[1] not in {"modeling-v3","visualizations-sarah-parsons"} or p.suffix != ".png":
                    raise ValueError("Unexpected NOAA figure: " + name)
            raw = z.read(name)
            if name in known and hashlib.sha256(raw).hexdigest() != known[name]["sha256"]:
                raise ValueError("NOAA archive checksum mismatch: " + name)
            dest = outdir / p
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(raw)
    cards = []
    for name, label in originals.items():
        url = "../downloads/noaa-research/" + name
        cards.append(f'<a href="{html.escape(url)}"><span>ORIGINAL SOURCE</span><strong>{html.escape(label)}</strong><small>Open the supplied research artifact.</small><em aria-hidden="true">↗</em></a>')
    cards.append('<a href="../downloads/noaa-research-sources.zip" download><span>COMPLETE ARCHIVE</span><strong>Download all research materials</strong><small>Four originals, extracted notebook figures and provenance manifest.</small><em aria-hidden="true">↗</em></a>')
    cards.append('<a href="../downloads/noaa-research/manifest.json"><span>PROVENANCE</span><strong>Source manifest</strong><small>File hashes and exact notebook cell positions.</small><em aria-hidden="true">↗</em></a>')
    gallery = []
    for r in manifest["notebook_figures"]:
        name = r["archive_path"]
        p = Path(name)
        label = p.stem.replace("-", " ").capitalize()
        credit = "Matthew Scarpello / exploratory v3.0" if p.parts[1] == "modeling-v3" else "Hali Sarah Parsons / visualization notebook"
        url = "../downloads/noaa-research/" + name
        gallery.append(f'<figure><a href="{html.escape(url)}" target="_blank" rel="noopener noreferrer"><img src="{html.escape(url)}" alt="{html.escape(label)}" loading="lazy"></a><figcaption><strong>{html.escape(label)}</strong><small>{html.escape(credit)} · cell index {int(r["zero_based_cell_index"])}</small></figcaption></figure>')
    archive_markup = '<div class="noaa-archive"><h3>Original research files</h3><div class="noaa-resource-grid">' + "".join(cards) + '</div><details class="noaa-details"><summary>Browse all extracted notebook charts</summary><div class="noaa-archive-gallery">' + "".join(gallery) + '</div></details></div>'
    noaa_page = TARGET / "school" / "noaa.html"
    markup = noaa_page.read_text(encoding="utf-8")
    marker = "<!-- NOAA_ARCHIVE_SLOT -->"
    if marker not in markup:
        raise ValueError("NOAA source archive slot missing")
    markup = markup.replace(marker, archive_markup)
    markup = markup.replace("The original files are not downloadable from this site until the source archive is uploaded; no reproduction claim is made.", "The original source files and extracted figures are available above. Reproduction still requires the cleaned CSV and exact final training workflow.")
    noaa_page.write_text(markup, encoding="utf-8")
    print(f"Published NOAA archive: {len(originals)} original documents, {len(gallery)} original notebook figures")
