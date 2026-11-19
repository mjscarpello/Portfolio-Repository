#!/usr/bin/env node
"use strict";
/* UNMC case-study browser regression and reusable project reel validation. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {spawn,execFileSync} = require("node:child_process");
const {chromium} = require("playwright-core");
const ROOT = path.resolve(__dirname,"..");
const OUTPUT = path.join(ROOT,"review-screenshots");
const PORT = 8771, SITE = "http://127.0.0.1:"+PORT;
const candidates=[process.env.CHROME_BINARY,"/usr/bin/google-chrome","/usr/bin/google-chrome-stable","/usr/bin/chromium"].filter(Boolean);
const chrome=candidates.find(x=>fs.existsSync(x)) || (()=>{try{return execFileSync("which",["google-chrome"],{encoding:"utf8"}).trim()}catch(_){return null}})();
if(!chrome)throw Error("Chrome required to inspect UNMC storyboard");
const server=spawn("python3",["-m","http.server",String(PORT),"--bind","127.0.0.1","--directory","_site"],{cwd:ROOT,stdio:"ignore"});
let browser;
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function ready(){
  for(let i=0;i<90;i++){try{const response=await fetch(SITE+"/work/unmc.html");if(response.ok)return;}catch(_){}await wait(150);}
  throw Error("UNMC local site server not ready");
}
async function openPage(ctx,hash=""){
  const page=await ctx.newPage();
  await page.goto(SITE+"/work/unmc.html"+hash,{waitUntil:"networkidle",timeout:30000});
  await page.waitForFunction(()=>document.querySelector("[data-project-reel]")?.classList.contains("project-reel-ready"));
  return page;
}
async function overflow(page,width){
  const dimensions=await page.evaluate(()=>({innerWidth:innerWidth,scrollWidth:document.documentElement.scrollWidth}));
  assert(dimensions.scrollWidth<=dimensions.innerWidth+2,"Horizontal overflow at "+width+": "+JSON.stringify(dimensions));
}
async function main(){
  await ready();
  fs.mkdirSync(OUTPUT,{recursive:true});
  browser=await chromium.launch({headless:true,executablePath:chrome,args:["--no-sandbox","--disable-dev-shm-usage"]});
  const ctx=await browser.newContext({viewport:{width:1440,height:1150}});
  const page=await openPage(ctx);
  await overflow(page,1440);
  assert.equal(await page.locator("[data-reel-lane]").count(),2);
  assert.equal(await page.locator(".project-reel-frame img").count(),12);
  assert.equal(await page.locator(".unmc-work-card").count(),4);
  assert.equal(await page.locator(".case-gallery .case-figure").count(),6);
  const linkHrefs=await page.locator(".project-reel-sequence:first-child a").evaluateAll(els=>els.map(a=>a.getAttribute("href")));
  assert.equal(new Set(linkHrefs).size,6,"All six work samples should be represented once per loop");
  assert(linkHrefs.every(h=>/^#figure-unmc-[a-z0-9-]+$/.test(h)),"Reel links must target generated original gallery figures");
  for(const link of linkHrefs) assert.equal(await page.locator(link).count(),1,"Every reel target should exist");
  const laneModes=await page.locator("[data-reel-lane]").evaluateAll(els=>els.map(l=>({direction:l.dataset.direction,animation:getComputedStyle(l.querySelector(".project-reel-track")).animationName})));
  assert(laneModes[0].animation.includes("project-reel-left"));
  assert(laneModes[1].animation.includes("project-reel-right"));
  await page.waitForFunction(()=>[...document.querySelectorAll(".project-reel-frame img")].every(x=>x.complete&&x.naturalWidth>0),null,{timeout:15000});
  await page.locator(".unmc-hero").screenshot({path:path.join(OUTPUT,"unmc-storyboard-hero.png"),animations:"disabled"});
  await page.locator("#workstreams").screenshot({path:path.join(OUTPUT,"unmc-workstreams.png"),animations:"disabled"});
  await page.locator("#collaboration").screenshot({path:path.join(OUTPUT,"unmc-collaboration.png"),animations:"disabled"});
  const targetPage=await openPage(ctx,linkHrefs[0]);
  await targetPage.waitForTimeout(250);
  const located=await targetPage.evaluate(()=>{const node=document.querySelector(":target");const r=node?.getBoundingClientRect();return {id:node?.id,top:r?.top,bottom:r?.bottom,view:innerHeight}});
  assert(located.id===linkHrefs[0].slice(1),"Deep link should select the exact gallery sample");
  assert(located.top<located.view&&located.bottom>0,"Gallery deep link should scroll into view");
  await targetPage.close();
  await ctx.close();
  for(const width of [768,430,375]){
    const context=await browser.newContext({viewport:{width,height:950}});
    const responsive=await openPage(context);
    await overflow(responsive,width);
    if(width===430){
      await responsive.locator(".unmc-hero").screenshot({path:path.join(OUTPUT,"unmc-storyboard-mobile.png"),animations:"disabled"});
    }
    await context.close();
  }
  const reduced=await browser.newContext({viewport:{width:430,height:900},reducedMotion:"reduce"});
  const still=await openPage(reduced);
  const animations=await still.locator(".project-reel-track").evaluateAll(els=>els.map(el=>getComputedStyle(el).animationName));
  assert(animations.every(name=>name==="none"),"Reduced-motion users must see a static storyboard");
  await reduced.close();
  const dark=await browser.newContext({viewport:{width:1440,height:1000}});
  await dark.addInitScript(()=>{try{localStorage.setItem("matthew-scarpello-portfolio-theme","dark")}catch(_){}});
  const darkPage=await openPage(dark);
  assert.equal(await darkPage.locator("html").getAttribute("data-theme"),"dark");
  await overflow(darkPage,1440);
  await darkPage.locator(".unmc-hero").screenshot({path:path.join(OUTPUT,"unmc-storyboard-dark.png"),animations:"disabled"});
  await dark.close();
  console.log("PASS: Six source-linked UNMC frames, unique opposing horizontal loops, gallery anchors, mobile widths, reduced motion and dark mode.");
}
main().catch(err=>{console.error(err);process.exitCode=1;}).finally(async()=>{if(browser)await browser.close().catch(()=>{});server.kill("SIGTERM")});
