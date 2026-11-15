#!/usr/bin/env node
"use strict";
/* Browser-level homepage QA; requires Playwright Core and system Chrome. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {spawn, execFileSync} = require("node:child_process");
const {chromium} = require("playwright-core");
const ROOT = path.join(__dirname, "..");
const OUTPUT = path.join(ROOT, "review-screenshots");
const PORT = 8765;
const URL = "http://127.0.0.1:" + PORT + "/index.html";
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
async function waitFor() {
  for (let i = 0; i < 75; i++) {
    try { const response = await fetch(URL); if (response.ok) return; } catch (_) {}
    await wait(150);
  }
  throw new Error("Local built-site server did not start");
}
const chromePaths = [process.env.CHROME_BINARY, "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium"].filter(Boolean);
const binary = chromePaths.find(p => fs.existsSync(p)) || (()=>{try{return execFileSync("which",["google-chrome"],{encoding:"utf8"}).trim()}catch(e){return null}})();
if (!binary) throw new Error("No system Chrome binary available for layout check");
const server = spawn("python3",["-m","http.server",String(PORT),"--bind","127.0.0.1","--directory","_site"],{cwd:ROOT,stdio:"ignore"});
let browser;
async function loadedImages(page) {
  await page.waitForFunction(() => {
    const imgs = [...document.querySelectorAll(".home-collage-tile img")];
    return imgs.length === 30 && imgs.every(img => img.complete && img.naturalWidth > 0);
  }, null, {timeout:20000});
  assert.equal(await page.locator(".home-collage-tile img").count(),30);
}
async function openPage(context) {
  const page = await context.newPage();
  await page.goto(URL,{waitUntil:"networkidle",timeout:20000});
  await loadedImages(page);
  return page;
}
async function screenshot(page,filename) { await page.screenshot({path:path.join(OUTPUT,filename),animations:"disabled",fullPage:false}); }
async function makeContext(width,height,options={}) { return browser.newContext({viewport:{width,height},deviceScaleFactor:1,...options}); }
async function checkOverflow(page,width) {
  const dims = await page.evaluate(()=>({innerWidth:innerWidth,scrollWidth:document.documentElement.scrollWidth}));
  assert(dims.scrollWidth <= dims.innerWidth + 2, "Horizontal page overflow at "+width+"px: "+JSON.stringify(dims));
}
async function main() {
  await waitFor();
  fs.mkdirSync(OUTPUT,{recursive:true});
  browser = await chromium.launch({headless:true,executablePath:binary,args:["--no-sandbox","--disable-dev-shm-usage"]});
  const desktop = await makeContext(1440,1650);
  const desktopPage = await openPage(desktop);
  await checkOverflow(desktopPage,1440);
  await screenshot(desktopPage,"home-desktop.png");
  assert.equal(await desktopPage.locator(".brand-circle").count(),1,"Original avatar must be present");
  assert.equal(await desktopPage.locator("#pillar-tab-school").getAttribute("aria-selected"),"true");
  assert.equal(await desktopPage.locator("[data-home-motion-toggle]").count(),0,"Pause motion button must be absent");
  const lanes=await desktopPage.evaluate(()=>{
    return [...document.querySelectorAll(".home-collage-lane")].map(lane=>{
      const halves=[...lane.querySelectorAll(".home-collage-sequence")];
      const images=halves.map(group=>[...group.querySelectorAll("img")].map(img=>img.getAttribute("src")));
      const categories=[...halves[0].querySelectorAll("[data-category]")].map(el=>el.dataset.category);
      return {images,categories,heights:halves.map(h=>h.getBoundingClientRect().height)};
    });
  });
  assert.equal(lanes.length,3);
  for(const lane of lanes){
    assert.deepEqual(lane.images[0],lane.images[1],"Sequence halves must match for seamless wrap");
    assert(Math.abs(lane.heights[0]-lane.heights[1])<1,"Loop halves must have equal heights");
    assert.equal(new Set(lane.categories).size,3,"Each lane should show School, Work, Personal");
  }
  assert.equal(new Set(lanes.flatMap(l=>l.images[0])).size,15,"All 15 selected figures should be distinct");
  const laneLocator=desktopPage.locator(".home-collage-lane--one");
  const before=await laneLocator.evaluate(el=>({top:el.getBoundingClientRect().top,name:getComputedStyle(el).animationName,play:getComputedStyle(el).animationPlayState}));
  assert(before.name.includes("home-collage-flow-down"),"New downward animation must be active");
  assert.equal(before.play,"running","Animation must start without user input");
  await desktopPage.waitForTimeout(2200);
  const after=await laneLocator.evaluate(el=>({top:el.getBoundingClientRect().top,play:getComputedStyle(el).animationPlayState}));
  const verticalTravel=after.top-before.top;
  assert(verticalTravel>8 && verticalTravel<130,"Downward collage should travel visibly at medium-slow speed; traveled "+verticalTravel.toFixed(1)+"px in 2.2 seconds");
  assert.equal(after.play,"running");
  const firstOrder=lanes.map(l=>l.images[0].join("|")).join("||");
  await desktopPage.reload({waitUntil:"networkidle"});
  await loadedImages(desktopPage);
  const secondOrder=await desktopPage.evaluate(()=>[...document.querySelectorAll(".home-collage-lane")].map(l=>[...l.children[0].querySelectorAll("img")].map(img=>img.getAttribute("src")).join("|")).join("||"));
  assert.notEqual(firstOrder,secondOrder,"The image selection and order should change with a page reload");

  // Real frames of the moving collage, captured from headless Chrome.
  const movingCollage=desktopPage.locator(".home-hero-visual");
  for(let i=0;i<12;i++){
    await movingCollage.screenshot({
      path:path.join(OUTPUT,"home-motion-"+String(i).padStart(2,"0")+".png"),
      animations:"allow"
    });
    await desktopPage.waitForTimeout(400);
  }
  const transition = await makeContext(1440,900);
  const transitionPage = await openPage(transition);
  await transitionPage.evaluate(()=>{
    const hero = document.querySelector(".home-hero");
    const bounds = hero.getBoundingClientRect();
    window.scrollTo({top:bounds.top+window.scrollY+bounds.height*.68,behavior:"instant"});
  });
  await transitionPage.waitForTimeout(300);
  const scroll = await transitionPage.evaluate(()=>{
    const collage=document.querySelector("[data-home-collage]");
    const hero=document.querySelector(".home-hero");
    const h1=document.querySelector("#hero-title");
    return {blur:getComputedStyle(collage).filter,opacity:Number.parseFloat(getComputedStyle(collage).opacity),paused:hero.classList.contains("home-collage-paused"),lanePlay:getComputedStyle(document.querySelector(".home-collage-lane")).animationPlayState,headlineFilter:getComputedStyle(h1).filter};
  });
  assert(!scroll.paused,"The collage must keep moving while it fades into the pillars");
  assert.equal(scroll.lanePlay,"running","Vertical image flow must remain active during the transition");
  assert(scroll.opacity<.66,"Collage must fade on exit");
  assert(scroll.blur!=="none","Collage must blur before the pillars");
  assert.equal(scroll.headlineFilter,"none","Headline must remain sharp");
  await screenshot(transitionPage,"home-transition.png");
  await transition.close();
  await desktopPage.locator("#pillar-tab-work").click();
  assert.equal(await desktopPage.locator("#pillar-tab-work").getAttribute("aria-selected"),"true");
  await desktopPage.locator("#pillar-project-list button").last().click();
  await desktopPage.locator("#pillar-next").click();
  assert.equal(await desktopPage.locator("#pillar-tab-personal").getAttribute("aria-selected"),"true");
  await desktop.close();
  const dark = await makeContext(1440,1650);
  await dark.addInitScript(() => { try {localStorage.setItem("matthew-scarpello-portfolio-theme","dark")}catch(_){} });
  const darkPage = await openPage(dark);
  assert.equal(await darkPage.locator("html").getAttribute("data-theme"),"dark");
  await screenshot(darkPage,"home-dark.png");
  await dark.close();
  for(const size of [{w:430,h:1300,name:"home-mobile.png"},{w:375,h:1300,name:"home-narrow.png"},{w:768,h:1400,name:"home-tablet.png"}]) {
    const ctx = await makeContext(size.w,size.h);
    const page = await openPage(ctx);
    await checkOverflow(page,size.w);
    await screenshot(page,size.name);
    await ctx.close();
  }
  const reduced = await makeContext(430,900,{reducedMotion:"reduce"});
  const reducedPage = await openPage(reduced);
  const reducedState = await reducedPage.evaluate(()=>{
    const lane=document.querySelector(".home-collage-lane");
    return {animation:getComputedStyle(lane).animationName};
  });
  assert.equal(reducedState.animation,"none","Reduced motion must disable drift");
  assert.equal(await reducedPage.locator("[data-home-motion-toggle]").count(),0,"No pause control on any device");
  await reduced.close();
  console.log("PASS: 15 randomized genuine images, seamless loop halves, "+verticalTravel.toFixed(1)+"px downward travel, fade while running, responsive widths, reduced motion and pillar navigation");
  for (const f of fs.readdirSync(OUTPUT)) if(f.endsWith(".png")) console.log(f,fs.statSync(path.join(OUTPUT,f)).size,"bytes");
}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{
  if(browser) await browser.close().catch(()=>{});
  server.kill("SIGTERM");
});
