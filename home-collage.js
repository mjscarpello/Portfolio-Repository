/* The Ordinary I homepage: actual project images, randomized on each visit,
   moving continuously from top to bottom without visible loop boundaries. */
(() => {
  "use strict";
  const hero = document.querySelector(".home-hero");
  const collage = document.querySelector("[data-home-collage]");
  const data = window.PORTFOLIO_DATA;
  if (!hero || !collage || !data?.projects) return;

  // Curated sources. Every path is also registered to a real project in
  // portfolio-data.js; never generate or substitute fake analysis images.
  const eligibleSources = new Set([
    "figures/noaa-event-frequency.png",
    "figures/noaa-economic-damage.png",
    "figures/noaa-precision-recall.png",
    "figures/noaa-feature-importance.png",
    "figures/ercot-demand-month-hour.png",
    "figures/ercot-model-error-heatmap.png",
    "figures/ercot-accuracy-by-demand.png",
    "figures/ercot-mae-by-hour.png",
    "figures/ercot-peak-week-comparison.png",
    "figures/ercot-seasonal-daily-heatmaps.png",
    "figures/amazon-pick-rolling-dashboard.png",
    "figures/amazon-pick-weekly-comparison.png",
    "figures/driver-gear-route-weather.jpg",
    "figures/driver-gear-feature-check.jpg",
    "figures/unmc-animated-analytics.jpg",
    "figures/unmc-occupational-therapy.jpg",
    "figures/unmc-lymph-node-animation.jpg",
    "figures/unmc-lab-rat-interface.jpg",
    "figures/studio-s-timeline.jpg",
    "figures/studio-s-forecast-scene.jpg",
    "figures/minibook-imposition-preview.jpg",
    "figures/minibook-page-selector.jpg"
  ]);
  const categories = ["school", "work", "personal"];
  const lanes = [...collage.querySelectorAll(".home-collage-lane")];
  // UNMC and Lab Rat Revolt share a screenshot. Deduplicate by file so a
  // single image cannot occupy two different positions in one rotation.
  const catalogue = [...new Map(data.projects.flatMap(project =>
    (project.figures || [])
      .filter(fig => eligibleSources.has(fig.src))
      .map(fig => ({src:fig.src, category:project.category, title:project.title,
        ratio:fig.src.endsWith(".png") ? 1.38 : 1.42}))
  ).map(item => [item.src, item])).values()];

  function shuffle(items) {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function makeTile(item) {
    const tile = document.createElement("div");
    tile.className = "home-collage-tile home-collage-tile--" +
      (item.src.endsWith(".png") ? "chart" : "media");
    tile.style.setProperty("--tile-ratio", item.ratio);
    tile.dataset.project = item.title;
    tile.dataset.category = item.category;
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = ""; // Decorative duplicate of original evidence on project pages.
    img.width = 480;
    img.height = 300;
    img.decoding = "async";
    img.loading = "eager";
    img.draggable = false;
    tile.append(img);
    return tile;
  }

  // Each lane always includes School, Work and Personal, but the selected
  // figures and their order change on every page load. No source repeats
  // within a loop; the second sequence is a pixel-identical repeat solely
  // for seamless infinite animation.
  const buckets = Object.fromEntries(categories.map(category => [
    category, shuffle(catalogue.filter(item => item.category === category))
  ]));
  if (lanes.length === 3 && categories.every(key => buckets[key].length >= 3)) {
    // Reserve one item from every category for every lane before allocating
    // optional images. This guarantees balanced, non-repeating selections.
    const reserved = lanes.map(() => categories.map(key => buckets[key].shift()));
    const used = new Set(reserved.flat().map(item => item.src));
    for (const [index, lane] of lanes.entries()) {
      const picks = reserved[index];
      const extras = shuffle(catalogue.filter(item => !used.has(item.src))).slice(0, 2);
      extras.forEach(item => used.add(item.src));
      const sequence = document.createElement("div");
      sequence.className = "home-collage-sequence";
      shuffle([...picks, ...extras]).forEach(item => sequence.append(makeTile(item)));
      const repeat = sequence.cloneNode(true);
      repeat.setAttribute("aria-hidden", "true");
      lane.replaceChildren(sequence, repeat);
    }
    collage.classList.add("home-collage-ready");
  }

  // Page scrolling controls only the final blur/fade; the downward image
  // stream itself is a compositor-friendly CSS animation.
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let visible = true;
  let frame = 0;
  function refresh() {
    frame = 0;
    if (reduced.matches) {
      hero.classList.add("home-collage-paused");
      collage.style.removeProperty("--hero-exit-opacity");
      collage.style.removeProperty("--hero-exit-blur");
      return;
    }
    const bounds = hero.getBoundingClientRect();
    const traveled = Math.max(0, -bounds.top);
    const begin = bounds.height * 0.50;
    const finish = bounds.height * 0.94;
    const progress = Math.max(0, Math.min(1, (traveled - begin) / Math.max(1, finish - begin)));
    collage.style.setProperty("--hero-exit-opacity", (0.77 * (1 - progress * 0.96)).toFixed(3));
    collage.style.setProperty("--hero-exit-blur", (progress * 10).toFixed(1) + "px");
    hero.classList.toggle("home-collage-paused", !visible || document.hidden);
  }
  function schedule() {
    if (!frame) frame = window.requestAnimationFrame(refresh);
  }
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? true;
      schedule();
    }, { threshold: 0 });
    observer.observe(hero);
  }
  window.addEventListener("scroll", schedule, {passive:true});
  window.addEventListener("resize", schedule);
  document.addEventListener("visibilitychange", schedule);
  if (typeof reduced.addEventListener === "function") reduced.addEventListener("change", schedule);
  else if (typeof reduced.addListener === "function") reduced.addListener(schedule);
  refresh();
})();
