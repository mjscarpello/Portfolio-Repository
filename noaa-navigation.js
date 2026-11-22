/* Section links with contextual image previews, keyboard and pointer support. */
(() => {
  "use strict";
  const nav=document.querySelector("[data-noaa-nav]");
  if(!nav)return;
  const panel=nav.querySelector(".noaa-nav-preview");
  const image=panel?.querySelector("img");
  const title=panel?.querySelector("strong");
  const copy=panel?.querySelector("p");
  const links=[...nav.querySelectorAll("a[href^='#']")];
  if(!panel||!image||!title||!copy||!links.length)return;
  const hover=matchMedia("(hover:hover)");
  function hide(){panel.hidden=true;}
  function show(link){
    title.textContent=link.textContent;
    copy.textContent=link.dataset.description||"";
    image.src=link.dataset.preview;
    const rect=nav.getBoundingClientRect(),linkRect=link.getBoundingClientRect();
    const width=Math.min(360,innerWidth-40);
    panel.style.setProperty("--preview-left",Math.max(0,Math.min(linkRect.left-rect.left,rect.width-width))+"px");
    panel.hidden=false;
  }
  function current(){
    const active=links.map(a=>({a,section:document.getElementById(a.hash.slice(1))})).filter(x=>x.section);
    let item=active[0];
    for(const x of active)if(x.section.getBoundingClientRect().top<=Math.min(innerHeight*.35,240))item=x;
    links.forEach(a=>a===item?.a?a.setAttribute("aria-current","location"):a.removeAttribute("aria-current"));
  }
  links.forEach(a=>{
    a.addEventListener("mouseenter",()=>{if(hover.matches)show(a)});
    a.addEventListener("focus",()=>show(a));
    a.addEventListener("click",()=>{hide();links.forEach(b=>b===a?b.setAttribute("aria-current","location"):b.removeAttribute("aria-current"))});
  });
  nav.addEventListener("mouseleave",hide);
  nav.addEventListener("focusout",e=>{if(!nav.contains(e.relatedTarget))hide()});
  nav.addEventListener("keydown",e=>{if(e.key==="Escape")hide()});
  addEventListener("resize",hide);
  addEventListener("scroll",current,{passive:true});
  current();
})();