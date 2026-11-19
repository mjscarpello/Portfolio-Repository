/* ERCOT hero: uses the homepage's three-lane, randomized, seamlessly looping
   figure collage. Each image opens its exact record in the public research website. */
(() => {
  "use strict";
  const scene = document.querySelector("[data-ercot-collage]");
  const project = window.PORTFOLIO_DATA?.projects?.find(item => item.id === "ercot");
  if (!scene || !project?.figures?.length) return;
  const explorer = "https://mjscarpello.github.io/DSC450-ERCOT-Presentation/ERCOT%20project%20context%20web/explorer.html";
  // Exact notebook IDs verified against the Research Explorer's FIG-* nodes.
  const ids = {
    "ercot-demand-month-hour.png": "F03",
    "ercot-seven-models-mape.png": "F15",
    "ercot-accuracy-by-demand.png": "F17",
    "ercot-mae-by-hour.png": "F11",
    "ercot-model-error-correlation.png": "F20",
    "ercot-later-period-blend-mae.png": "F22",
    "ercot-blend-by-demand.png": "F23",
    "ercot-hourly-model-mae.png": "F26",
    "ercot-season-hour-improvement.png": "F31",
    "ercot-actual-vs-operator-forecast.png": "F10"
  };
  const items = project.figures.flatMap(fig => {
    const id = ids[fig.src.split("/").pop()];
    return id ? [{...fig, id}] : [];
  });
  const lanes = [...scene.querySelectorAll(".home-collage-lane")];
  if (items.length < 3 || lanes.length !== 3) return;

  function shuffle(array) {
    const values = [...array];
    for (let i = values.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }
    return values;
  }
  function tile(item) {
    const outer = document.createElement("div");
    outer.className = "home-collage-tile home-collage-tile--chart";
    outer.style.setProperty("--tile-ratio", "1.36");
    outer.dataset.category = "school";
    outer.dataset.figure = item.id;

    const link = document.createElement("a");
    link.className = "home-collage-image-link";
    link.href = explorer + "#node=FIG-" + item.id;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "Open research website figure " + item.id + ": " + item.title);
    const img = document.createElement("img");
    img.src = "../" + item.src;
    img.alt = "";
    img.width = 480;
    img.height = 300;
    img.decoding = "async";
    img.loading = "eager";
    img.draggable = false;

    const wash = document.createElement("span");
    wash.className = "home-collage-hover-wash";
    wash.setAttribute("aria-hidden", "true");
    const caption = document.createElement("span");
    caption.className = "home-collage-open-label";
    caption.textContent = "Open: " + item.title;
    caption.setAttribute("aria-hidden", "true");
    link.append(img, wash, caption);
    outer.append(link);
    return outer;
  }
  // Exactly one use of each original per full rotation; duplicates only make
  // the loop seamless and are excluded from keyboard navigation / reading order.
  const shuffled = shuffle(items);
  const groups = [[], [], []];
  shuffled.forEach((item, index) => groups[index % 3].push(item));
  lanes.forEach((lane, index) => {
    const sequence = document.createElement("div");
    sequence.className = "home-collage-sequence";
    groups[index].forEach(item => sequence.append(tile(item)));
    const repeat = sequence.cloneNode(true);
    repeat.setAttribute("aria-hidden", "true");
    repeat.querySelectorAll("a").forEach(a => { a.tabIndex = -1; });
    lane.replaceChildren(sequence, repeat);
  });
  scene.classList.add("home-collage-ready");
  scene.closest(".cv3-cover")?.classList.add("cv3-ready");

  // Match the homepage's compositor-friendly animation and pause behavior.
  let visible = true;
  function refresh() {
    scene.classList.toggle("home-collage-paused", !visible || document.hidden);
  }
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? true;
      refresh();
    }, {threshold: 0});
    observer.observe(scene);
  }
  document.addEventListener("visibilitychange", refresh);
  refresh();

  // Current-section navigation is a progressive enhancement.
  const links = [...document.querySelectorAll(".cv2-page-nav a[href^='#']")];
  if ("IntersectionObserver" in window && links.length) {
    const sections = links.map(a => document.getElementById(a.hash.slice(1))).filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      const candidates = entries.filter(entry => entry.isIntersecting)
        .sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (!candidates.length) return;
      links.forEach(link => {
        if (link.hash.slice(1) === candidates[0].target.id) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }, {rootMargin:"-12% 0px -68% 0px", threshold:0});
    sections.forEach(section => observer.observe(section));
  }

  // Context previews follow the existing section links. They never replace
  // anchor navigation and never open a new location on hover.
  const nav = document.querySelector("[data-ercot-nav]");
  const preview = nav?.querySelector(".cv4-nav-preview");
  const previewImage = preview?.querySelector("img");
  const previewTitle = preview?.querySelector("strong");
  const previewCopy = preview?.querySelector("p");
  const previews = {
    "#story": {
      title: "The finding",
      detail: "See why overall error can hide the strongest-demand hours.",
      image: "../figures/ercot-accuracy-by-demand.png"
    },
    "#findings": {
      title: "The investigation",
      detail: "Compare the errors that motivated testing a hybrid.",
      image: "../figures/ercot-model-error-correlation.png"
    },
    "#presentation": {
      title: "The presentation",
      detail: "See the research turned into narrated educational media.",
      image: "../figures/studio-s-forecast-scene.jpg"
    },
    "#explorer": {
      title: "Evidence map",
      detail: "Trace a finding to original figures and scientific limits.",
      image: "../figures/ercot-blend-by-demand.png"
    },
    "#evidence": {
      title: "Project resources",
      detail: "Open the figure library, report, notebook, and sources.",
      image: "../figures/ercot-seven-models-mape.png"
    },
    "#contribution": {
      title: "My role",
      detail: "My visual analysis, learning-media, and website contributions.",
      image: "../assets/brand-avatar.jpg"
    }
  };
  if (nav && preview && previewImage && previewTitle && previewCopy) {
    const canHover = window.matchMedia("(hover: hover)");
    function hide() { nav.removeAttribute("data-preview-open"); }
    function show(link) {
      const item = previews[link.hash];
      if (!item) return;
      previewTitle.textContent = item.title;
      previewCopy.textContent = item.detail;
      if (previewImage.getAttribute("src") !== item.image) previewImage.src = item.image;
      const offset = link.getBoundingClientRect().left - nav.getBoundingClientRect().left;
      const max = Math.max(0, nav.clientWidth - Math.min(385, window.innerWidth - 48));
      nav.style.setProperty("--cv4-preview-left", Math.max(0, Math.min(max, offset)).toFixed(0) + "px");
      nav.dataset.previewOpen = "true";
    }
    links.forEach(link => {
      link.addEventListener("mouseenter", () => { if (canHover.matches) show(link); });
      link.addEventListener("focus", () => show(link));
      link.addEventListener("click", hide);
    });
    nav.addEventListener("mouseleave", hide);
    nav.addEventListener("focusout", event => {
      if (!nav.contains(event.relatedTarget)) hide();
    });
    nav.addEventListener("keydown", event => { if (event.key === "Escape") hide(); });
    window.addEventListener("scroll", hide, {passive:true});
    window.addEventListener("resize", hide);
  }
})();
