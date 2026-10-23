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
