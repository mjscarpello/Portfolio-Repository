#!/usr/bin/env node
"use strict";
/* Deterministic tests for randomized images, uninterrupted downward flow and exit fade. */
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const path=require("node:path");
const ROOT=path.join(__dirname,"..");
const source=fs.readFileSync(path.join(ROOT,"home-collage.js"),"utf8");
const raw=fs.readFileSync(path.join(ROOT,"portfolio-data.js"),"utf8");
const projectData=JSON.parse(raw.slice(raw.indexOf("{"),raw.lastIndexOf("}")+1));

class Element {
 constructor(tag="div"){
  this.tag=tag;this.children=[];this.className="";this.dataset={};this.attributes={};
  this.style={data:new Map(),setProperty(k,v){this.data.set(k,String(v));},removeProperty(k){this.data.delete(k);}};
  this.classList={values:new Set(),add(k){this.values.add(k);},toggle(k,on){if(on)this.values.add(k);else this.values.delete(k);},contains(k){return this.values.has(k);}};
 }
 append(...items){this.children.push(...items);}
 replaceChildren(...items){this.children=items;}
 querySelectorAll(selector){
  const out=[];
  const walk=node=>{for(const child of node.children){if(selector==="a"&&child.tag==="a")out.push(child);walk(child);}};
  walk(this);return out;
 }
 setAttribute(k,v){this.attributes[k]=v;}
 cloneNode(deep){
  const n=new Element(this.tag);n.className=this.className;n.dataset={...this.dataset};
  n.style.data=new Map(this.style.data);
  for(const k of ["src","alt","width","height","decoding","loading","draggable","href","tabIndex","textContent"])n[k]=this[k];
  if(deep)n.children=this.children.map(c=>c.cloneNode(true));
  return n;
 }
}
function run(seed){
 let number=seed>>>0;
 const random=()=>{number=(Math.imul(1664525,number)+1013904223)>>>0;return number/4294967296;};
 const math={random,floor:Math.floor,max:Math.max,min:Math.min};
 const lanes=[new Element(),new Element(),new Element()];
 const scene=new Element();scene.querySelectorAll=q=>q===".home-collage-lane"?lanes:[];
 let top=80,hidden=false,callback;
 const hero=new Element();hero.getBoundingClientRect=()=>({top,height:650,bottom:top+650});
 const windowHandlers={},documentHandlers={},motionHandlers={},frames=[];
 const motion={matches:false,addEventListener(k,f){motionHandlers[k]=f;}};
 const document={
  querySelector(q){return q===".home-hero"?hero:q==="[data-home-collage]"?scene:null;},
  createElement(tag){return new Element(tag);},
  addEventListener(k,f){documentHandlers[k]=f;},
  get hidden(){return hidden;},set hidden(v){hidden=v;}
 };
 const window={
  PORTFOLIO_DATA:projectData,matchMedia(){return motion;},
  addEventListener(k,f){windowHandlers[k]=f;},
  requestAnimationFrame(f){frames.push(f);return frames.length;}
 };
 class IntersectionObserver{
  constructor(f){callback=f;}observe(node){assert.equal(node,hero);}
 }
 window.IntersectionObserver=IntersectionObserver;
 vm.runInNewContext(source,{Math:math,window,document,IntersectionObserver},{filename:"home-collage.js"});
 const flush=()=>{while(frames.length)frames.shift()();};
 assert(scene.classList.contains("home-collage-ready"),"Randomization should initialize");
 assert(lanes.every(lane=>lane.children.length===2),"Each lane needs two identical sequences");
 const first=lanes.map(lane=>lane.children[0].children.map(tile=>({src:tile.children[0].children[0].src,category:tile.dataset.category})));
 for(let i=0;i<3;i++){
  assert.equal(first[i].length,5);
  assert.deepEqual(first[i].map(x=>x.src),lanes[i].children[1].children.map(t=>t.children[0].children[0].src),"Loop copies must match");
  assert.deepEqual(new Set(first[i].map(x=>x.category)),new Set(["school","work","personal"]));
 }
 const chosen=first.flat().map(x=>x.src);
 assert.equal(new Set(chosen).size,15,"Fifteen unique originals needed");
 for(const lane of lanes){
  const firstTile=lane.children[0].children[0];
  const imageLink=firstTile.children[0],caption=firstTile.children[1];
  assert(imageLink.href.includes("#figure-"),"Exact figure link needed");
  assert(caption.children[2].children[0].href.endsWith(".html"),"Project link needed");
  assert.equal(caption.children[2].children[1].href,imageLink.href,"Caption must locate same original image");
  assert.equal(imageLink.attributes["aria-label"].includes("Find"),true);
  assert(lane.children[1].querySelectorAll("a").every(a=>a.tabIndex===-1),"Repeat should not add tab stops");
 }
 assert.equal(scene.style.data.get("--hero-exit-opacity"),"0.770");
 assert(!hero.classList.contains("home-collage-paused"),"Animation should be active immediately");
 top=-520;windowHandlers.scroll();flush();
 assert(Number(scene.style.data.get("--hero-exit-opacity"))<.77,"Collage should fade near pillars");
 assert(Number.parseFloat(scene.style.data.get("--hero-exit-blur"))>0,"Collage should blur on exit");
 assert(!hero.classList.contains("home-collage-paused"),"Do not stop flow during fade");
 top=80;windowHandlers.scroll();flush();
 assert.equal(scene.style.data.get("--hero-exit-opacity"),"0.770");
 callback([{isIntersecting:false}]);flush();
 assert(hero.classList.contains("home-collage-paused"),"Offscreen movement should pause");
 callback([{isIntersecting:true}]);flush();
 assert(!hero.classList.contains("home-collage-paused"),"Returning to hero should resume");
 document.hidden=true;documentHandlers.visibilitychange();flush();
 assert(hero.classList.contains("home-collage-paused"),"Hidden tabs should pause");
 document.hidden=false;documentHandlers.visibilitychange();flush();
 motion.matches=true;motionHandlers.change();flush();
 assert(hero.classList.contains("home-collage-paused"),"Reduced motion should pause");
 assert.equal(scene.style.data.has("--hero-exit-blur"),false,"No animated blur in reduced motion");
 return chosen.join("|");
}
assert.notEqual(run(42),run(99),"Separate visits should produce different image selections");
const html=fs.readFileSync(path.join(ROOT,"index.html"),"utf8");
assert(!html.includes("data-home-motion-toggle"),"Pause button must be removed");
console.log("PASS: 15 unique authentic images, 3 balanced lanes, duplicated seamless loops, random selection, fade while moving, visibility and reduced motion.");
