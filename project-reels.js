/* Ordinary I / case-study reels.
   The homepage alone uses the vertical waterfall (home-collage.js).
   Project and pillar reels always scroll horizontally. Different presets
   provide distinct editorial frames and motion without changing content.
   Original figure links are sourced from PORTFOLIO_DATA, not fabricated. */
(() => {
  "use strict";
  const projects = window.PORTFOLIO_DATA?.projects;
  if (!Array.isArray(projects)) return;
  const root = document.body.dataset.root || "";
  const ercotExplorer = "https://mjscarpello.github.io/DSC450-ERCOT-Presentation/ERCOT%20project%20context%20web/explorer.html";
  // Exact figure IDs recorded in the ERCOT Research Explorer's published graph.
  const ercotFigures = {
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
  const goodPath = src => /^figures\/[a-z0-9-]+\.(?:png|jpe?g|webp)$/i.test(src);
  function shuffle(items) {
    const out = [...items];
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }
  function galleryAnchor(src) {
    return "figure-" + src.split("/").pop().replace(/\.[^.]+$/, "").toLowerCase();
  }
  function dataset(reel) {
    // A compact companion strip uses only curated, source-verified heatmaps.
    // It is distinct from the ten-figure introductory research reel.
    if (reel.dataset.heatmapReel === "ercot") {
      const project = projects.find(p => p.id === "ercot");
      const verified = new Set(["F03A", "F30", "F31"]);
      return (project?.heatmaps || [])
        .filter(fig => goodPath(fig.src) && verified.has(fig.id))
        .map(fig => ({
          src: fig.src,
          title: fig.title,
          name: fig.id + " · " + fig.title,
          href: ercotExplorer + "#node=FIG-" + fig.id,
          external: true,
          figureId: fig.id,
          category: "school"
        }));
    }
    const projectId = reel.dataset.projectReel;
    const pillar = reel.dataset.pillarReel;
    if (pillar) {
      // The category pages offer broad exploration; link each original visual
      // to the project page where the caption, context, and work are explained.
      const used = new Set();
      return projects.filter(project => project.category === pillar)
        .flatMap(project => (project.figures || []).slice(0, 4)
          .filter(fig => goodPath(fig.src) && !used.has(fig.src))
          .map(fig => {
            used.add(fig.src);
            return {src:fig.src, title:fig.title, name:project.shortTitle || project.title,
              href:root + project.page, category:pillar};
          }));
    }
    const project = projects.find(p=>p.id===projectId);
    if (!project) return [];
    return (project.figures || []).filter(fig=>goodPath(fig.src)).flatMap(fig=>{
      const file = fig.src.split("/").pop();
      if (projectId === "ercot") {
        const id = ercotFigures[file];
        if (!id) return [];
        return [{src:fig.src,title:fig.title,name:fig.title,
          href:ercotExplorer+"#node=FIG-"+id,external:true,figureId:id,
          category:project.category}];
      }
      return [{src:fig.src,title:fig.title,name:fig.title,
        href:"#"+galleryAnchor(fig.src),category:project.category}];
    });
  }
  function tile(item) {
    const frame=document.createElement("div");
    frame.className="project-reel-frame";
    frame.dataset.category=item.category;
    if (item.figureId) frame.dataset.figure=item.figureId;
    const a=document.createElement("a");
    a.className="project-reel-link";
    a.href=item.href;
    if(item.external){a.target="_blank";a.rel="noopener noreferrer";}
    a.setAttribute("aria-label",item.external
      ? "Open research website figure "+item.figureId+": "+item.title
      : "Open: "+item.name+(item.name!==item.title?" · "+item.title:""));
    const img=document.createElement("img");
    img.src=root+item.src;
    img.alt="";
    img.width=460;
    img.height=290;
    img.loading="eager";
    img.decoding="async";
    img.draggable=false;
    const wash=document.createElement("span");
    wash.className="project-reel-overlay";
    wash.setAttribute("aria-hidden","true");
    const label=document.createElement("span");
    label.className="project-reel-label";
    label.textContent="Open: "+item.name;
    label.setAttribute("aria-hidden","true");
    a.append(img,wash,label);
    frame.append(a);
    return frame;
  }
  document.querySelectorAll("[data-project-reel], [data-pillar-reel], [data-heatmap-reel]").forEach(reel=>{
    const laneElements=[...reel.querySelectorAll("[data-reel-lane]")];
    const items=dataset(reel);
    if (!laneElements.length || !items.length) return;
    const style = reel.dataset.reelStyle === "storyboard" || reel.dataset.reelStyle === "research"
      ? reel.dataset.reelStyle : "gallery";
    const groups=laneElements.map(()=>[]);
    shuffle(items).forEach((item,index)=>groups[index % groups.length].push(item));
    laneElements.forEach((lane,index)=>{
      const track=document.createElement("div");
      track.className="project-reel-track";
      const first=document.createElement("div");
      first.className="project-reel-sequence";
      groups[index].forEach(item=>first.append(tile(item)));
      const repeat=first.cloneNode(true);
      repeat.setAttribute("aria-hidden","true");
      repeat.querySelectorAll("a").forEach(a=>{a.tabIndex=-1;});
      track.append(first,repeat);
      lane.replaceChildren(track);
      lane.dataset.direction=style!=="gallery" && index%2===1?"right":"left";
      // Pillar strips have different numbers of frames. A fixed loop time
      // makes longer strips move faster. Use a shared time per frame instead,
      // keeping the visual speed consistent at the same viewport width.
      const duration = reel.dataset.pillarReel
        ? groups[index].length * (reel.dataset.pillarReel === "school" ? 18 : 9)
        : (style==="research"?48+index*7:style==="storyboard"?37+index*7:45+index*6);
      lane.style.setProperty("--reel-duration", duration+"s");
    });
    reel.classList.add("project-reel-ready");
    const reduce=window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible=true;
    function refresh(){
      reel.classList.toggle("project-reel-paused",!visible||document.hidden||reduce.matches);
    }
    if ("IntersectionObserver" in window){
      const observer=new IntersectionObserver(entries=>{
        visible=entries[0]?.isIntersecting??true;
        refresh();
      },{threshold:0});
      observer.observe(reel);
    }
    document.addEventListener("visibilitychange",refresh);
    if(reduce.addEventListener)reduce.addEventListener("change",refresh);
    refresh();
  });
})();