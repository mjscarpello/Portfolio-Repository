#!/usr/bin/env node
"use strict";
const assert=require("node:assert/strict"), fs=require("node:fs"), path=require("node:path");
const {spawn,execFileSync}=require("node:child_process");
const {chromium}=require("playwright-core");
const ROOT=path.join(__dirname,".."), OUTPUT=path.join(ROOT,"review-screenshots");
const PORT=8776,TARGET_URL="http://127.0.0.1:"+PORT+"/school/noaa.html";
const chrome=[process.env.CHROME_BINARY,"/usr/bin/google-chrome","/usr/bin/google-chrome-stable","/usr/bin/chromium"].filter(Boolean).find(x=>fs.existsSync(x))||(()=>{try{return execFileSync("which",["google-chrome"],{encoding:"utf8"}).trim()}catch(_){return null}})();
if(!chrome)throw Error("Chrome required for NOAA checks");
const server=spawn("python3",["-m","http.server",String(PORT),"--bind","127.0.0.1","--directory","_site"],{cwd:ROOT,stdio:"ignore"});
const wait=ms=>new Promise(r=>setTimeout(r,ms));
let browser;
async function ready(){for(let i=0;i<80;i++){try{if((await fetch(TARGET_URL)).ok)return}catch(_){}await wait(150)}throw Error("NOAA server not ready")}
async function open(ctx){
 const p=await ctx.newPage();await p.goto(TARGET_URL,{waitUntil:"networkidle",timeout:30000});
 await p.waitForFunction(()=>document.querySelector('[data-project-reel="noaa"]')?.classList.contains("project-reel-ready"));
 return p;
}
async function noOverflow(p,width){
 const d=await p.evaluate(()=>({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth}));
 assert(d.scrollWidth<=d.viewport+2,"NOAA overflow at "+width+": "+JSON.stringify(d));
}
async function main(){
 await ready();fs.mkdirSync(OUTPUT,{recursive:true});
 browser=await chromium.launch({executablePath:chrome,headless:true,args:["--no-sandbox","--disable-dev-shm-usage"]});
 const ctx=await browser.newContext({viewport:{width:1440,height:1100}});
 const p=await open(ctx);await noOverflow(p,1440);
 assert.equal(await p.locator("body").getAttribute("data-pillar"),"school");
 assert.equal(await p.locator(".noaa-boxed-hero").count(),1);
 assert.equal(await p.locator(".noaa-hero-reel .project-reel-frame").count(),8);
 const targets=await p.locator(".noaa-hero-reel .project-reel-sequence:first-child a").evaluateAll(a=>a.map(x=>x.hash));
 assert.equal(new Set(targets).size,4);for(const t of targets)assert.equal(await p.locator(t).count(),1);
 assert.equal(await p.locator(".noaa-hero-reel .project-reel-track").evaluate(e=>getComputedStyle(e).animationName),"project-reel-left");
 await p.waitForFunction(()=>[...document.querySelectorAll(".noaa-hero-reel img")].every(x=>x.complete&&x.naturalWidth>0));
 await p.locator(".noaa-boxed-hero").screenshot({path:path.join(OUTPUT,"noaa-boxed-hero.png"),animations:"disabled"});
 const nav=p.locator("[data-noaa-nav]"),link=nav.locator('a[href="#noaa-evaluation"]');
 await link.hover();await p.waitForTimeout(100);assert(await nav.locator(".noaa-nav-preview").isVisible());
 assert((await nav.locator(".noaa-nav-preview img").getAttribute("src")).includes("noaa-precision-recall.png"));
 await p.mouse.move(0,0);assert(!(await nav.locator(".noaa-nav-preview").isVisible()));
 await link.focus();assert(await nav.locator(".noaa-nav-preview").isVisible());
 await link.press("Escape");assert(!(await nav.locator(".noaa-nav-preview").isVisible()));
 await link.click();assert.equal(new URL(p.url()).hash,"#noaa-evaluation");
 for(const id of ["noaa-question","noaa-discovery","noaa-evaluation","noaa-interpretation","noaa-methods"]){
   const section=p.locator("#"+id);await section.scrollIntoViewIfNeeded();
   for(const img of await section.locator("img").all())await img.evaluate(x=>x.loading="eager");
   await section.screenshot({path:path.join(OUTPUT,id+".png"),animations:"disabled"});
 }
 const sourceCards=p.locator("#noaa-resources .noaa-resource-grid a");
 assert(await sourceCards.count()>=6);
 await ctx.close();
 for(const width of [768,430,375]){const c=await browser.newContext({viewport:{width,height:950}});const page=await open(c);await noOverflow(page,width);if(width===430)await page.locator(".noaa-boxed-hero").screenshot({path:path.join(OUTPUT,"noaa-mobile-hero.png"),animations:"disabled"});await c.close();}
 const reduced=await browser.newContext({viewport:{width:430,height:900},reducedMotion:"reduce"});const still=await open(reduced);
 assert.equal(await still.locator(".noaa-hero-reel .project-reel-track").evaluate(e=>getComputedStyle(e).animationName),"none");await reduced.close();
 const dark=await browser.newContext({viewport:{width:1440,height:1100}});await dark.addInitScript(()=>{try{localStorage.setItem("matthew-scarpello-portfolio-theme","dark")}catch(_){}});
 const night=await open(dark);assert.equal(await night.locator("html").getAttribute("data-theme"),"dark");await noOverflow(night,1440);await night.locator(".noaa-boxed-hero").screenshot({path:path.join(OUTPUT,"noaa-dark-hero.png"),animations:"disabled"});await dark.close();
 console.log("PASS NOAA: original figure targets, single horizontal reel, contextual navigation, responsive layout, dark theme and reduced motion.");
}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close().catch(()=>{});server.kill("SIGTERM")});
