/* Ordinary I project reels.
   Shared engine; individual project pages choose their own visual preset via
   data-reel-style and supply real images through PORTFOLIO_DATA.projects.
   "storyboard" = opposed horizontal filmstrips (UNMC)
   "gallery"    = single horizontal editorial strip (future projects)
   "waterfall"  = vertical waterfall lanes (future projects).
   ERCOT's existing research-collage implementation remains independent. */
(() => {
  "use strict";
  const data = window.PORTFOLIO_DATA?.projects;
  if (!Array.isArray(data)) return;
  document.querySelectorAll("[data-project-reel]").forEach(reel => {
    const project = data.find(p => p.id === reel.dataset.projectReel);
    const lanes = [...reel.querySelectorAll("[data-reel-lane]")];
    const figures = project?.figures?.filter(fig =>
      /^figures\/[a-z0-9-]+\.(?:png|jpe?g|webp)$/i.test(fig.src));
    if (!figures?.length || !lanes.length) return;
    const mode = reel.dataset.reelStyle || "gallery";
    const home = document.body.dataset.root || "../";

    function shuffle(array) {
      const out = [...array];
      for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
      }
      return out;
    }
    function figureAnchor(fig) {
      return "figure-" + fig.src.split("/").pop().replace(/\.[^.]+$/, "").toLowerCase();
    }
    function tile(fig, index) {
      const card = document.createElement("div");
      card.className = "project-reel-frame";
      card.style.setProperty("--frame-shift", index % 3 === 1 ? "3px" : index % 3 === 2 ? "-2px" : "0px");
      const a = document.createElement("a");
      a.className = "project-reel-link";
      a.href = "#" + figureAnchor(fig);
      a.setAttribute("aria-label","Go to original work sample: " + fig.title);
      const img = document.createElement("img");
      img.src = home + fig.src;
      img.alt = "";
      img.width = 460;
      img.height = 290;
      img.loading = "eager";
      img.decoding = "async";
      img.draggable = false;
      const overlay = document.createElement("span");
      overlay.className = "project-reel-overlay";
      overlay.setAttribute("aria-hidden","true");
      const label = document.createElement("span");
      label.className = "project-reel-label";
      label.textContent = "Open: " + fig.title;
      label.setAttribute("aria-hidden","true");
      a.append(img,overlay,label);
      card.append(a);
      return card;
    }
    const groups = Array.from({length:lanes.length},()=>[]);
    shuffle(figures).forEach((figure,index) => groups[index % lanes.length].push(figure));
    lanes.forEach((lane,index) => {
      const track = document.createElement("div");
      track.className = "project-reel-track";
      const first = document.createElement("div");
      first.className = "project-reel-sequence";
      groups[index].forEach((fig,n) => first.append(tile(fig,n)));
      const repeat = first.cloneNode(true);
      repeat.setAttribute("aria-hidden","true");
      repeat.querySelectorAll("a").forEach(a=>{a.tabIndex=-1;});
      track.append(first,repeat);
      lane.replaceChildren(track);
      lane.dataset.direction = mode === "storyboard" && index % 2 === 1 ? "right" : "left";
      lane.style.setProperty("--reel-duration", (mode === "storyboard" ? 37 + index * 7 : 34 + index * 5) + "s");
    });
    reel.classList.add("project-reel-ready");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    function refresh() {
      reel.classList.toggle("project-reel-paused",!visible || document.hidden || reduced.matches);
    }
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries=>{
        visible = entries[0]?.isIntersecting ?? true;
        refresh();
      }, {threshold:0});
      observer.observe(reel);
    }
    document.addEventListener("visibilitychange",refresh);
    if (reduced.addEventListener) reduced.addEventListener("change",refresh);
    refresh();
  });
})();
