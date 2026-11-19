/* ERCOT navigation enhancements. Figure movement and deep links are now
   powered by the horizontal, project-agnostic project-reels.js engine. */
(() => {
  "use strict";
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
