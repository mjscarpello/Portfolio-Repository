# Exactly what I need from you to add your original visualizations

You can send these files directly in a future ChatGPT conversation, ideally bundled into **one ZIP per project**. You do **not** need to upload raw datasets if the notebook already contains complete, legible saved chart outputs.

## Project 1 — NOAA storm damage

**Already included in this website:** four real charts extracted directly from `DSC450_Milestone3_Presentation.pptx` (the top-15 event-frequency chart, top-10 recorded-damage chart, precision–recall curves, and feature-importance chart).

**Only send additional files if you want to replace or expand those figures:**
- Final, executed `.ipynb` modeling notebook(s), especially your feature-engineering experiments.
- Any later NOAA PNG/SVG exports, such as the shallow classification tree or co-occurrence analysis.
- Final report with model numbers, figure titles, and the final intended interpretation.
- Exact GitHub repository or source-code link if you want it displayed.

**Verify:** data years, sample-size denominator, target definition (known outcomes only), train/test grouped by episode, baseline definition, Random Forest metrics, and whether feature-engineering experiments improved held-out performance.

## Project 2 — ERCOT electricity forecasting

**Please provide:**
- **Most recent executed and saved visualization `.ipynb` notebook.** This is the top priority.
- Andrea's final modeling/evaluation notebook or its exported tables (if you want model results explained alongside the plots).
- The final cleaned ERCOT CSV **only if** you want us to regenerate a higher-resolution image from the original code; otherwise it is optional.
- Any original figure exports, preferably `.png` at 1600+ pixels wide, or `.svg` if they were exported from Matplotlib or another plotting library.
- Most recent project report/presentation to verify evaluation periods, metric definitions, and agreed-upon claims.

**Most valuable actual figures to identify (only include those that genuinely exist):**
1. A heatmap of average ERCOT demand by month and local hour.
2. A view of daily and seasonal demand patterns and high-load hours.
3. Demand against historical temperature bands.
4. A side-by-side model metric comparison using the exact same held-out timestamps.
5. Observed versus forecast demand at a meaningful zoom (peak periods and typical weeks), with model labels.
6. If available, error behavior during high-demand hours and a diagram illustrating static versus rolling 24-hour forecasts.

**Verify before making numerical claims:** 24-hour forecast issuance cutoff, which observed lagged demand was available at each issuance, whether historical actual temperatures were used where a future weather forecast would be required, treatment of missing ERCOT reference-forecast hours, and the metric/sample for each comparison.

## Project 3 — Recycling contamination risk

**Please provide when the team has started the project:**
- The selected dataset/source URL, schema or data dictionary, and your data-wrangling notebook.
- Final target definition: what makes a record 'contaminated' versus 'not contaminated'.
- An executed EDA/modeling `.ipynb` notebook, or exported original graphs.
- Final report or findings with baseline, sample size, class balance, split method, results, and team roles.
- Relevant figure files: missing-data/quality analysis, label distribution, relevant feature distributions, evaluation plots (e.g. precision–recall/confusion matrix), and failure examples — only where they exist.

**Until then:** the project page is labeled as planned, without fabricated evidence.

## Recommended folder to send

```
project-name-original-materials/
├── final-visualizations.ipynb
├── model-evaluation.ipynb                # if applicable
├── final-report.pdf                      # if available
├── figures/
│   ├── 01-original-plot.png
│   ├── 02-original-plot.png
│   └── 03-original-plot.png
└── README.txt                            # short notes on which figures matter most
```

## Export original charts yourself, if necessary

**Option A — In Jupyter:** Right after the cell makes a Matplotlib figure and before closing it, run:

```python
fig.savefig('my-original-figure.png', dpi=200, bbox_inches='tight')
```

**Option B — Extract saved notebook images without rerunning data analysis:** Use the included `tools/extract_notebook_figures.py`:

```bash
python3 tools/extract_notebook_figures.py "/path/to/your/executed-notebook.ipynb"
```

The tool writes an output folder of the exact image bytes saved in the notebook, plus `figure-inventory.csv` indicating which cell produced each chart. Upload that output folder along with the `.ipynb` file. It does **not** create invented graphs or require your raw data.

## How the website accepts the final images

Put the chosen image under `figures/` and add an entry inside that project's `figures: []` array in `portfolio-data.js`. Example:

```js
figures: [
  {
    src: 'figures/ercot-monthly-heatmap.png',
    title: 'Seasonality by month and hour',
    alt: 'Original ERCOT heatmap with months on one axis, local hour on the other, and color representing average electricity demand.',
    caption: 'Export from the final visual-analysis notebook; specify the period and time zone.'
  }
]
```

The home-page gallery and that project's case-study gallery will populate automatically. It is fine to send the files instead and ask me to complete the integration for you.
