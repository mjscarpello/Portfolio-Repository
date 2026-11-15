/* Browser-free behavior tests for home-collage.js. Run with Node (no npm dependencies). */
"use strict";
const fs = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");

const listeners = {}, docListeners = {}, motionListeners = {};
const classes = new Set();
const properties = new Map();
const stored = new Map();
const callbacks = [];
let heroBottom = 810;
let nextFrame = 0;
const toggleListeners = {};
const hero = {
  classList: {
    add: x => classes.add(x),
    toggle(x, value) { if (value) classes.add(x); else classes.delete(x); }
  },
  getBoundingClientRect() { return { bottom: heroBottom }; }
};
const collage = {
  style: {
    setProperty(key, value) { properties.set(key, value); },
    removeProperty(key) { properties.delete(key); }
  }
};
const toggle = {
  dataset: {},
  hidden: false,
  innerHTML: "",
  attrs: {},
  setAttribute(k, v) { this.attrs[k] = v; },
  addEventListener(k, fn) { toggleListeners[k] = fn; }
};
const motion = {
  matches: false,
  addEventListener(k, fn) { motionListeners[k] = fn; }
};
const document = {
  hidden: false,
  querySelector(q) { return q === ".home-hero" ? hero : q === "[data-home-collage]" ? collage : q === "[data-home-motion-toggle]" ? toggle : null; },
  addEventListener(k, fn) { docListeners[k] = fn; },
  documentElement: {clientHeight:900}
};
const window = {
  innerHeight: 900,
  matchMedia() {return motion;},
  addEventListener(k, fn) {listeners[k] = fn;},
  requestAnimationFrame(fn) {callbacks.push(fn); return ++nextFrame; }
};
class IntersectionObserver {
  constructor(fn) { this.callback = fn; globalThis.observer = this; }
  observe(target) { assert.equal(target,hero); }
}
const localStorage = {
  getItem(k) { return stored.get(k) || null; },
  setItem(k,v) { stored.set(k,v); }
};
function flush() {
  while (callbacks.length) callbacks.shift()();
}
const code = fs.readFileSync(require("node:path").join(__dirname, "..", "home-collage.js"), "utf8");
vm.runInNewContext(code, {document, window, IntersectionObserver, localStorage}, {filename:"home-collage.js"});
assert.equal(properties.get("--hero-exit-opacity"), "0.660", "Collage should start at low opacity");
assert.equal(properties.get("--hero-exit-blur"), "0.0px", "Collage should start unblurred");
assert(!classes.has("home-collage-paused"), "Collage should drift when visible");

heroBottom=360;
listeners.scroll();
flush();
assert(classes.has("home-collage-paused"), "Approaching pillars should settle collage");
assert(Number(properties.get("--hero-exit-opacity")) < .66, "Should fade during exit");
assert(Number.parseFloat(properties.get("--hero-exit-blur")) > 0, "Should blur during exit");

heroBottom=810;
listeners.scroll();
flush();
assert(!classes.has("home-collage-paused"), "Scrolling back up should resume collage");

toggleListeners.click();
flush();
assert(classes.has("home-collage-paused"), "Pause button should pause");
assert.equal(toggle.attrs["aria-pressed"], "true", "Pause state should be accessible");
assert.equal(stored.get("ordinary-i-collage-paused"), "true", "Manual pause should persist");

toggleListeners.click();
flush();
assert(!classes.has("home-collage-paused"), "Resume button should resume");
assert.equal(toggle.attrs["aria-pressed"], "false");

document.hidden=true;
docListeners.visibilitychange();
flush();
assert(classes.has("home-collage-paused"), "Background tab must pause");
document.hidden=false;
docListeners.visibilitychange();
flush();

motion.matches=true;
motionListeners.change();
flush();
assert(classes.has("home-collage-paused"), "Reduced-motion mode must pause");
assert.equal(toggle.hidden, true, "Reduced-motion users should not see pause control");
assert.equal(properties.has("--hero-exit-blur"),false,"Reduced motion should not animate blur");

motion.matches=false;
motionListeners.change();
flush();
assert.equal(toggle.hidden, false);
console.log("PASS: ambient drift, scroll settle/blur, reverse scroll, manual pause, background-tab pause and reduced motion.");
