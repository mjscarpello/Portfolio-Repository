#!/usr/bin/env node
"use strict";
/* Browser-level ERCOT case study review: original assets, hover/focus previews,
   findings, evidence links, resource cards, responsive widths and reduced motion. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {spawn,execFileSync} = require("node:child_process");
const {chromium} = require("playwright-core");
const ROOT = path.join(__dirname,"..");
const OUTPUT = path.join(ROOT,"review-screenshots");
const PORT = 8766;
const TARGET_URL = "http://127.0.0.1:"+PORT+"/school/ercot.html";
const candidateBinaries = [process.env.CHROME_BINARY,"/usr/bin/google-chrome","/usr/bin/google-chrome-stable","/usr/bin/chromium"].filter(Boolean);
const binary = candidateBinaries.find(x=>fs.existsSync(x)) || (()=>{try{return execFileSync("which",["google-chrome"],{encoding:"utf8"}).trim()}catch(_){return null}})();
if(!binary)throw new Error("System Chrome required for ERCOT browser checks");
const server = spawn("python3",["-m","http.server",String(PORT),"--bind","127.0.0.1","--directory","_site"],{cwd:ROOT,stdio:"ignore"});
const wait = ms=>new Promise(resolve=>setTimeout(resolve,ms));
let browser;
async function ready(){
  for(let i=0;i<80;i++){try{const res=await fetch(TARGET_URL);if(res.ok)return;}catch(_){}
    await wait(150);}
  throw Error("ERCOT site server not ready");
}
async function open(context) {
  const page=await context.newPage();
  await page.goto(TARGET_URL,{waitUntil:"networkidle",timeout:30000});
  await page.waitForFunction(()=>document.querySelector("[data-ercot-collage]")?.classList.contains("home-collage-ready"),null,{timeout:15000});
  return page;
}
async function checkOverflow(page,width){
  const sizes=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth}));
  assert(sizes.document<=sizes.viewport+2, "ERCOT horizontal overflow at "+width+": "+JSON.stringify(sizes));
}
async function main(){
  await ready();
  fs.mkdirSync(OUTPUT,{recursive:true});
  browser=await chromium.launch({headless:true,executablePath:binary,args:["--no-sandbox","--disable-dev-shm-usage"]});
  const desktop=await browser.newContext({viewport:{width:1440,height:1250},deviceScaleFactor:1});
  const page=await open(desktop);
  await checkOverflow(page,1440);
  assert.equal(await page.locator(".cv2-metric-strip").count(),0,"The redundant metrics strip should be absent");
  assert.equal(await page.locator(".cv4-story-figure img").count(),1,"Finding should feature original F17");
  assert.equal(await page.locator(".cv4-path-thumbnail img").count(),2,"Evidence path requires F17 and F23 originals");
  assert.equal(await page.locator(".cv2-resource").count(),6,"Six resources must remain");
  assert.equal(await page.locator(".cv4-team-identity img").getAttribute("src"),"../assets/brand-avatar.jpg");
  assert.equal(await page.locator(".cv4-resource-feature").getAttribute("href").then(x=>x.endsWith("#figures")),true);
  const figures=await page.locator(".home-collage-lane .home-collage-tile").count();
  assert.equal(figures,20,"Ten authentic ERCOT images must be duplicated once for seamless animation");
  const unique=await page.locator(".home-collage-lane .home-collage-sequence:first-child .home-collage-tile a").evaluateAll(links=>links.map(a=>a.getAttribute("href")));
  assert.equal(new Set(unique).size,10,"Ten separate figure links expected");
  assert(unique.every(s=>s.includes("#node=FIG-")),"Figure cards should link to specific research records");
  const menu=page.locator("[data-ercot-nav]");
  const link=menu.locator('a[href="#findings"]');
  await link.hover();
  await page.waitForTimeout(230);
  assert.equal(await menu.getAttribute("data-preview-open"),"true","Hover should expose a context preview");
  assert((await menu.locator(".cv4-nav-preview img").getAttribute("src")).includes("ercot-model-error-correlation.png"));
  assert(await menu.locator(".cv4-nav-preview").isVisible(),"Nav preview needs to render");
  await page.screenshot({path:path.join(OUTPUT,"ercot-nav-hover.png"),fullPage:false});
  await page.mouse.move(0,0);
  await page.waitForTimeout(220);
  assert.notEqual(await menu.getAttribute("data-preview-open"),"true","Preview must close when pointer leaves");
  await link.focus();
  assert.equal(await menu.getAttribute("data-preview-open"),"true","Keyboard focus must reveal the preview");
  await link.press("Escape");
  assert.notEqual(await menu.getAttribute("data-preview-open"),"true","Escape should dismiss preview");
  await link.click();
  assert.equal(new URL(page.url()).hash,"#findings","Navigation click must still jump to the section");
  await page.locator("#story").scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>{const img=document.querySelector(".cv4-story-figure img");return img?.complete&&img.naturalWidth>0;});
  await page.locator("#story").screenshot({path:path.join(OUTPUT,"ercot-finding.png"),animations:"disabled"});
  await page.locator("#explorer").scrollIntoViewIfNeeded();
  for(const image of await page.locator(".cv4-path-thumbnail img").all()){
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(img=>{if(img.loading==="lazy")img.loading="eager"});
  }
  await page.waitForFunction(()=>[...document.querySelectorAll(".cv4-path-thumbnail img")].every(img=>img.complete&&img.naturalWidth>0));
  const figureLinks=await page.locator(".cv4-path-figure").evaluateAll(anchors=>anchors.map(a=>a.href));
  assert(figureLinks.some(x=>x.endsWith("#node=FIG-F17")));
  assert(figureLinks.some(x=>x.endsWith("#node=FIG-F23")));
  await page.locator(".cv3-evidence-path").screenshot({path:path.join(OUTPUT,"ercot-evidence-path.png"),animations:"disabled"});
  await page.locator("#evidence").scrollIntoViewIfNeeded();
  await page.locator("#evidence").screenshot({path:path.join(OUTPUT,"ercot-resources.png"),animations:"disabled"});
  await desktop.close();
  for(const width of [768,430,375]){
    const context=await browser.newContext({viewport:{width,height:950},deviceScaleFactor:1});
    const mobilePage=await open(context);
    await checkOverflow(mobilePage,width);
    await mobilePage.locator(".cv4-path-thumbnail").first().scrollIntoViewIfNeeded();
    assert(await mobilePage.locator(".cv4-path-thumbnail img").first().isVisible());
    if(width===430){
      await mobilePage.locator("#story").scrollIntoViewIfNeeded();
      await mobilePage.screenshot({path:path.join(OUTPUT,"ercot-mobile.png"),animations:"disabled"});
    }
    await context.close();
  }
  const reduced=await browser.newContext({viewport:{width:430,height:900},reducedMotion:"reduce"});
  const still=await open(reduced);
  const animation=await still.locator(".home-collage-lane").first().evaluate(el=>getComputedStyle(el).animationName);
  assert.equal(animation,"none","Reduced-motion users should not see the animated hero");
  await reduced.close();
  const dark=await browser.newContext({viewport:{width:1440,height:1100}});
  await dark.addInitScript(()=>{try{localStorage.setItem("matthew-scarpello-portfolio-theme","dark")}catch(_){}});
  const darkPage=await open(dark);
  assert.equal(await darkPage.locator("html").getAttribute("data-theme"),"dark");
  await checkOverflow(darkPage,1440);
  await darkPage.locator("#contribution").scrollIntoViewIfNeeded();
  await darkPage.screenshot({path:path.join(OUTPUT,"ercot-dark-team.png"),animations:"disabled"});
  await dark.close();
  console.log("PASS ERCOT V4: source-linked original images, hover/focus previews, figures, resources, branded contribution, responsive design, reduced motion, dark theme");
}
main().catch(error=>{console.error(error);process.exitCode=1;}).finally(async()=>{
  if(browser)await browser.close().catch(()=>{});
  server.kill("SIGTERM");
});
