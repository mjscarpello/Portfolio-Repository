#!/usr/bin/env node
"use strict";
/* Regression check: one accent per pillar, horizontal-only project/pillar
   reels, and preserved vertical homepage waterfall (checked separately). */
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const {spawn,execFileSync}=require("node:child_process");
const {chromium}=require("playwright-core");
const ROOT=path.join(__dirname,"..");
const OUTPUT=path.join(ROOT,"review-screenshots");
const PORT=8774, SITE="http://127.0.0.1:"+PORT;
const binaries=[process.env.CHROME_BINARY,"/usr/bin/google-chrome","/usr/bin/google-chrome-stable","/usr/bin/chromium"].filter(Boolean);
const chrome=binaries.find(x=>fs.existsSync(x))||(()=>{try{return execFileSync("which",["google-chrome"],{encoding:"utf8"}).trim()}catch(_){return null}})();
if(!chrome)throw Error("Chrome is required for pillar-theme browser tests");
const server=spawn("python3",["-m","http.server",String(PORT),"--bind","127.0.0.1","--directory","_site"],{cwd:ROOT,stdio:"ignore"});
let browser;
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function ready(){
  for(let i=0;i<85;i++){try{const r=await fetch(SITE+"/school/index.html");if(r.ok)return;}catch(_){}await sleep(150);}
  throw Error("Portfolio local server not ready");
}
async function open(ctx,p){
  const page=await ctx.newPage();
  await page.goto(SITE+"/"+p,{waitUntil:"networkidle",timeout:30000});
  return page;
}
async function checkOverflow(page,width){
  const d=await page.evaluate(()=>({viewport:innerWidth,content:document.documentElement.scrollWidth}));
  assert(d.content<=d.viewport+2,"Unexpected horizontal page overflow at "+width+": "+JSON.stringify(d));
}
const categories=[
  {id:"school",hex:"#226b9f",index:"school/index.html",samples:["school/noaa.html","school/ercot.html","school/capstone-three.html","school/amazon-pick-times.html","school/weather-clothing.html"]},
  {id:"work",hex:"#a84e2b",index:"work/index.html",samples:["work/unmc.html","work/lab-rat-revolt.html"]},
  {id:"personal",hex:"#53723c",index:"personal/index.html",samples:["personal/studio-s.html","personal/mini-bookmaker.html"]}
];
async function main(){
  await ready();
  fs.mkdirSync(OUTPUT,{recursive:true});
  browser=await chromium.launch({headless:true,executablePath:chrome,args:["--no-sandbox","--disable-dev-shm-usage"]});
  const desktop=await browser.newContext({viewport:{width:1440,height:1050}});
  for(const item of categories){
    const page=await open(desktop,item.index);
    await page.waitForFunction(()=>document.querySelector("[data-pillar-reel]")?.classList.contains("project-reel-ready"));
    await checkOverflow(page,1440);
    assert.equal(await page.locator("body").getAttribute("data-pillar"),item.id);
    assert.equal(await page.locator("[data-pillar-reel]").getAttribute("data-reel-style"),"gallery");
    const computed=await page.evaluate(()=>{
      const body=document.body,style=getComputedStyle(body);
      const bar=getComputedStyle(document.querySelector(".site-header"),"::after");
      const heading=getComputedStyle(document.querySelector(".page-hero h1 em"));
      const reel=document.querySelector(".pillar-reel-section .project-reel");
      const track=reel.querySelector(".project-reel-track");
      return {accent:style.getPropertyValue("--pillar-accent").trim(),
        theme:style.getPropertyValue("--teal").trim(),
        bar:bar.backgroundColor,heading:heading.color,
        animation:getComputedStyle(track).animationName};
    });
    assert.equal(computed.accent,item.hex,"Pillar theme token should match category");
    assert.equal(computed.theme,item.hex,"The default UI accent should be pillar-specific");
    assert(computed.animation.includes("project-reel-left"),"Pillar reels must move horizontally");
    assert(!/project-reel-up|project-reel-down|home-collage/.test(computed.animation));
    const first=await page.locator(".pillar-reel-section .project-reel-sequence:first-child .project-reel-link").evaluateAll(nodes=>nodes.map(x=>x.href));
    const second=await page.locator(".pillar-reel-section .project-reel-sequence:nth-child(2) .project-reel-link").evaluateAll(nodes=>nodes.map(x=>x.href));
    assert.deepEqual(first,second,"The horizontal loop should duplicate the precise sequence");
    assert(first.length>=3,"Pillar collection must show multiple genuine project visuals");
    assert(first.every(h=>h.includes("/"+item.id+"/")),"Each frame should link to a project in its pillar");
    await page.waitForFunction(()=>[...document.querySelectorAll(".pillar-reel-section .project-reel-frame img")].every(img=>img.complete&&img.naturalWidth>0));
    await page.locator(".pillar-reel-section").screenshot({path:path.join(OUTPUT,"pillar-"+item.id+"-horizontal.png"),animations:"disabled"});
    await page.close();
    for(const target of item.samples){
      const detail=await open(desktop,target);
      assert.equal(await detail.locator("body").getAttribute("data-pillar"),item.id,"Project's pillar must be explicit");
      const accent=await detail.locator("body").evaluate(x=>getComputedStyle(x).getPropertyValue("--pillar-accent").trim());
      assert.equal(accent,item.hex,"Project must use only the category accent");
      await checkOverflow(detail,1440);
      await detail.close();
    }
  }
  await desktop.close();
  const mobile=await browser.newContext({viewport:{width:390,height:840}});
  for(const item of categories){
    const page=await open(mobile,item.index);
    await page.waitForFunction(()=>document.querySelector("[data-pillar-reel]")?.classList.contains("project-reel-ready"));
    await checkOverflow(page,390);
    await page.close();
  }
  await mobile.close();
  const reduced=await browser.newContext({viewport:{width:430,height:900},reducedMotion:"reduce"});
  const still=await open(reduced,"school/index.html");
  await still.waitForFunction(()=>document.querySelector("[data-pillar-reel]")?.classList.contains("project-reel-ready"));
  const animation=await still.locator(".pillar-reel-section .project-reel-track").evaluate(x=>getComputedStyle(x).animationName);
  assert.equal(animation,"none","Reduced-motion pillar must not animate");
  await reduced.close();
  const dark=await browser.newContext({viewport:{width:1440,height:950}});
  await dark.addInitScript(()=>{try{localStorage.setItem("matthew-scarpello-portfolio-theme","dark")}catch(_){}});
  for(const item of categories){
    const page=await open(dark,item.index);
    const accent=await page.locator("body").evaluate(x=>getComputedStyle(x).getPropertyValue("--pillar-accent").trim());
    assert(accent.startsWith("#")&&accent!==item.hex,"Dark theme should use the accessible tint of its one pillar hue");
    await checkOverflow(page,1440);
    await page.close();
  }
  await dark.close();
  console.log("PASS: 3 pillar galleries, 12 category-tagged pages, horizontal animations, consistent accents, mobile, dark, and reduced motion");
}
main().catch(err=>{console.error(err);process.exitCode=1}).finally(async()=>{
  if(browser)await browser.close().catch(()=>{});
  server.kill("SIGTERM");
});
