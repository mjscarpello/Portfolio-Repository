#!/usr/bin/env python3
"""Extract EXISTING embedded chart images from an executed Jupyter notebook.

This script does not run data analysis, invent plots, or modify the notebook.
It writes the original image bytes from notebook cell outputs to a new folder.

Usage:
  python3 tools/extract_notebook_figures.py /path/to/notebook.ipynb
  python3 tools/extract_notebook_figures.py /path/to/notebook.ipynb --out /path/to/exports

Charts must be saved as outputs in the notebook (Run All + Save first).
"""
import argparse
import base64
import csv
import json
from pathlib import Path
import re
import sys

MIME_TYPES = [('image/png', '.png'), ('image/jpeg', '.jpg'), ('image/svg+xml', '.svg')]


def text_of(value):
    if isinstance(value, list):
        return ''.join(value)
    if isinstance(value, str):
        return value
    return ''


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('notebook', type=Path, help='Executed .ipynb file')
    parser.add_argument('--out', type=Path, help='Target folder (default: notebook-name-figures)')
    args = parser.parse_args()
    source = args.notebook.expanduser().resolve()
    if not source.is_file():
        parser.error(f'Notebook file not found: {source}')
    if source.suffix.lower() != '.ipynb':
        parser.error('The source must be a .ipynb notebook')
    try:
        notebook = json.loads(source.read_text(encoding='utf-8'))
    except (OSError, ValueError) as error:
        parser.error(f'Cannot read notebook: {error}')
    target = (args.out or source.with_name(source.stem + '-figures')).expanduser().resolve()
    target.mkdir(parents=True, exist_ok=True)
    log = []
    saved = 0
    for cell_number, cell in enumerate(notebook.get('cells', []), start=1):
        if cell.get('cell_type') != 'code':
            continue
        context = re.sub(r'\s+', ' ', text_of(cell.get('source')))[:120]
        for output_number, output in enumerate(cell.get('outputs', []), start=1):
            data = output.get('data', {})
            for mime, extension in MIME_TYPES:
                if mime not in data:
                    continue
                content = text_of(data[mime])
                try:
                    content_bytes = (content.encode('utf-8') if extension == '.svg'
                                     else base64.b64decode(content, validate=False))
                except Exception as error:
                    print(f'Skipping cell {cell_number} output {output_number}: {error}', file=sys.stderr)
                    continue
                if not content_bytes:
                    continue
                filename = f'cell-{cell_number:03d}-output-{output_number:02d}{extension}'
                path = target / filename
                path.write_bytes(content_bytes)
                saved += 1
                log.append([filename, cell_number, output_number, cell.get('execution_count') or '', mime, context])
                break  # Do not duplicate the same output as both SVG and PNG.
    with (target / 'figure-inventory.csv').open('w', newline='', encoding='utf-8') as inventory:
        writer = csv.writer(inventory)
        writer.writerow(['filename', 'cell', 'output', 'execution_count', 'format', 'source_code_excerpt'])
        writer.writerows(log)
    print(f'Extracted {saved} original chart files to: {target}')
    if saved == 0:
        print('No embedded image outputs found. In Jupyter, run the plotting cells, SAVE the notebook, and try again.')
        print('For high-resolution figures, prefer fig.savefig(..., dpi=200, bbox_inches="tight")')


if __name__ == '__main__':
    main()
