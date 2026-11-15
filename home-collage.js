/* Homepage-only ambient project collage.
   Animation is visual-only; project navigation remains in script.js. */
(() => {
  "use strict";
  const hero = document.querySelector(".home-hero");
  const collage = document.querySelector("[data-home-collage]");
  if (!hero || !collage) return;

  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const motionToggle = document.querySelector("[data-home-motion-toggle]");
  const storageKey = "ordinary-i-collage-paused";
  let manuallyPaused = false;
  try { manuallyPaused = localStorage.getItem(storageKey) === "true"; } catch (_) {}
  let inView = true;
  let frame = 0;
  let lastOpacity = "";
  let lastBlur = "";

  function updateToggle() {
    if (motionToggle) {
      motionToggle.hidden = motion.matches;
      const paused = String(manuallyPaused);
      if (motionToggle.dataset.paused !== paused) {
        motionToggle.dataset.paused = paused;
        motionToggle.setAttribute("aria-pressed", paused);
        motionToggle.setAttribute("aria-label", manuallyPaused ? "Resume moving project collage" : "Pause moving project collage");
        motionToggle.innerHTML = manuallyPaused ? 'Resume motion <span aria-hidden="true">▶</span>' : 'Pause motion <span aria-hidden="true">Ⅱ</span>';
      }
    }
  }

  function refresh() {
    frame = 0;
    updateToggle();
    if (motion.matches) {
      hero.classList.add("home-collage-paused");
      collage.style.removeProperty("--hero-exit-opacity");
      collage.style.removeProperty("--hero-exit-blur");
      return;
    }
    const bounds = hero.getBoundingClientRect();
    // Tie the transition to how far the hero itself has scrolled, not to
    // viewport height. This avoids prematurely blurring on tall monitors.
    const traveled = Math.max(0, -bounds.top);
    const from = bounds.height * 0.42;
    const to = bounds.height * 0.79;
    const progress = Math.max(0, Math.min(1, (traveled - from) / Math.max(1, to - from)));
    const opacity = (0.66 * (1 - progress * 0.94)).toFixed(3);
    const blur = (progress * 9).toFixed(1) + "px";
    if (opacity !== lastOpacity) {
      collage.style.setProperty("--hero-exit-opacity", opacity);
      lastOpacity = opacity;
    }
    if (blur !== lastBlur) {
      collage.style.setProperty("--hero-exit-blur", blur);
      lastBlur = blur;
    }
    hero.classList.toggle("home-collage-paused", manuallyPaused || !inView || document.hidden || progress >= 0.08);
  }

  function schedule() {
    if (frame) return;
    frame = window.requestAnimationFrame(refresh);
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      inView = entries[0]?.isIntersecting ?? true;
      schedule();
    }, { threshold: 0 });
    observer.observe(hero);
  }

  if (motionToggle) {
    motionToggle.addEventListener("click", () => {
      manuallyPaused = !manuallyPaused;
      try { localStorage.setItem(storageKey, String(manuallyPaused)); } catch (_) {}
      updateToggle();
      schedule();
    });
  }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  document.addEventListener("visibilitychange", schedule);
  if (typeof motion.addEventListener === "function") {
    motion.addEventListener("change", schedule);
  } else if (typeof motion.addListener === "function") {
    motion.addListener(schedule);
  }
  refresh();
})();
