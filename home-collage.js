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

  function refresh() {
    frame = 0;
    if (motionToggle) {
      motionToggle.hidden = motion.matches;
      motionToggle.setAttribute("aria-pressed", String(manuallyPaused));
      motionToggle.setAttribute("aria-label", manuallyPaused ? "Resume moving project collage" : "Pause moving project collage");
      motionToggle.innerHTML = manuallyPaused ? 'Resume motion <span aria-hidden="true">▶</span>' : 'Pause motion <span aria-hidden="true">Ⅱ</span>';
    }
    if (motion.matches) {
      hero.classList.add("home-collage-paused");
      collage.style.removeProperty("--hero-exit-opacity");
      collage.style.removeProperty("--hero-exit-blur");
      return;
    }
    const bounds = hero.getBoundingClientRect();
    const height = window.innerHeight || document.documentElement.clientHeight || 800;
    // Enter the visual transition only as the hero's lower edge approaches the
    // browsing section. Never intercept or change the visitor's scrolling.
    const from = height * 0.66;
    const to = height * 0.21;
    const progress = Math.max(0, Math.min(1, (from - bounds.bottom) / (from - to)));
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
