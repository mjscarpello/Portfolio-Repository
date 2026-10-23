#!/usr/bin/env python3
"""Check that all release images and internal site links exist. Requires Python only."""
from pathlib import Path
import json,re,html.parser
R=Path(__file__).resolve().parents[1]
errors=[]
source=(R/'portfolio-data.js').read_text()
data=json.loads(source[source.index('{'):].rstrip().removesuffix(';'))
for project in data['projects']:
 if not (R/project['page']).is_file():errors.append('Missing project page '+project['page'])
 for fig in project['figures']:
  if not (R/fig['src']).is_file():errors.append('Missing figure '+fig['src'])
class Scanner(html.parser.HTMLParser):
 def __init__(self,parent):super().__init__();self.parent=parent
 def handle_starttag(self,tag,attrs):
  kv=dict(attrs)
  for key in (('src',) if tag in ('script','img') else ('href',) if tag in ('a','link') else ()): 
   val=kv.get(key,'')
   if not val or val.startswith(('http:','https:','mailto:','tel:','#','data:')):continue
   target=(self.parent/val.split('#')[0].split('?')[0]).resolve()
   if not target.is_file():errors.append('Missing HTML asset '+str(target))
for htmlfile in R.rglob('*.html'):
 Scanner(htmlfile.parent).feed(htmlfile.read_text())
for source in R.rglob('*'):
 if source.is_file() and source.suffix in ('.html','.css','.js','.md') and re.search(r'ordinary\s*i|theordinaryi',source.read_text(),re.I):errors.append('Old branding in '+str(source))
print('Checked',len(list(R.rglob('*.html'))),'HTML pages and',sum(len(p['figures']) for p in data['projects']),'registered figures.')
if errors:
 print('FAIL:')
 for e in errors:print('-',e)
 raise SystemExit(1)
print('PASS: all local references exist.')
