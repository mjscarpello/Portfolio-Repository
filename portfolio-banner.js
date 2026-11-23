(() => {
'use strict';
const svg=document.getElementById('pb-art'), select=document.getElementById('pb-format'), button=document.getElementById('pb-download'), status=document.getElementById('pb-status');
if(!svg||!select||!button||!status)return;
const NS='http://www.w3.org/2000/svg', XL='http://www.w3.org/1999/xlink';
const data=window.PORTFOLIO_DATA;
const names={'noaa':'Storm damage','ercot':'Electricity demand','capstone-three':'NYC recycling','amazon-pick':'Package pick times','amazon-clothing':'Driver gear','unmc':'Learning media','lab-rat':'Lab Rat Revolt','studio-s':'Studio S','mini-bookmaker':'Mini Bookmaker'};
const colors={school:'#83c8ed',work:'#f6ad80',personal:'#b8cf92'};
const projects=Object.keys(names).map(id=>data?.projects?.find(p=>p.id===id)).filter(p=>p?.figures?.length===undefined?false:p.figures.length>0);
function node(tag,attrs={},parent=svg,content){const el=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,String(v)));if(content!==undefined)el.textContent=content;parent.appendChild(el);return el;}
function text(x,y,t,size,fill,weight=400,extra={}){return node('text',{x,y,'font-size':size,fill,'font-weight':weight,'font-family':'Arial, Helvetica, sans-serif',...extra},svg,t);}
function render(){
const linked=select.value==='linkedin', W=linked?1584:1280,H=linked?396:640;
svg.replaceChildren(); svg.setAttribute('viewBox','0 0 '+W+' '+H);svg.setAttribute('width',W);svg.setAttribute('height',H);svg.setAttribute('xmlns:xlink',XL);
const defs=node('defs'), gradient=node('linearGradient',{id:'pb-bg',x1:'0%',x2:'100%',y1:'0%',y2:'100%'},defs);
node('stop',{offset:'0%','stop-color':'#101e30'},gradient);node('stop',{offset:'100%','stop-color':'#294258'},gradient);
node('rect',{width:W,height:H,fill:'url(#pb-bg)'});
const left=linked?257:54, gx=linked?635:466, gy=linked?22:32, gw=W-gx-26, gh=H-gy-38;
node('rect',{x:0,y:0,width:W,height:5,fill:'#83c8ed'});
node('rect',{x:W*.57,y:0,width:W*.23,height:5,fill:'#f6ad80'});
node('rect',{x:W*.8,y:0,width:W*.2,height:5,fill:'#b8cf92'});
// LinkedIn overlays the lower-left cover with the profile portrait.
// Reserve x=0–420 below y=165, with extra room for responsive cropping.
if(linked){
  text(42,78,'Matthew Scarpello',43,'#f6f8fb',750,{'letter-spacing':-1.5});
  text(42,116,'Data science · Creative technology',20,'#d3e3ef',500);
  // Keep all secondary copy to the right of the portrait safe zone.
  node('rect',{x:430,y:185,width:168,height:1,fill:'#7694a8',opacity:.65});
  [['SCHOOL',colors.school],['WORK',colors.work],['PERSONAL',colors.personal]].forEach(([label,col],i)=>{
    node('circle',{cx:434,cy:210+i*31,r:4,fill:col});
    text(447,215+i*31,label,14,col,700,{'letter-spacing':1});
  });
  text(430,322,'Research · Software',14,'#b8cbd9',500);
  text(430,344,'Visual storytelling',14,'#b8cbd9',500);
}else{
  const y=146;
  text(left,y+56,'Matthew',58,'#f6f8fb',750,{'letter-spacing':-1.8});
  text(left,y+112,'Scarpello',58,'#f6f8fb',750,{'letter-spacing':-1.8});
  text(left,y+148,'Data science · Creative technology',19,'#d3e3ef',500);
  node('rect',{x:left,y:y+173,width:355,height:1,fill:'#7694a8',opacity:.65});
  let lx=left;[['SCHOOL',colors.school],['WORK',colors.work],['PERSONAL',colors.personal]].forEach(([label,col],i)=>{node('circle',{cx:lx+4,cy:y+200,r:4,fill:col});text(lx+14,y+205,label,12,col,700,{'letter-spacing':1});lx+=[108,92,115][i];});
  text(left,y+246,'Research. Software. Visual storytelling.',17,'#b8cbd9');
  text(left,y+285,'Portfolio / selected projects',15,'#83c8ed',700);
}
const rows=linked?[projects.slice(0,5),projects.slice(5)]:[projects.slice(0,3),projects.slice(3,6),projects.slice(6,9)];
const gap=9,rowH=(gh-gap*(rows.length-1))/rows.length;
rows.forEach((row,ri)=>{if(!row.length)return;const cellW=(gw-gap*(row.length-1))/row.length;row.forEach((p,ci)=>{
const x=gx+ci*(cellW+gap),cy=gy+ri*(rowH+gap),f=p.figures[0],col=colors[p.category]||'#83c8ed';
const a=node('a',{href:p.page,'aria-label':'Explore '+p.title,tabindex:0});node('title',{},a,p.title);
node('rect',{x,y:cy,width:cellW,height:rowH,rx:4,fill:'#182c40',stroke:'#466075','stroke-width':1,class:'pb-tile-border'},a);
node('rect',{x:x+1,y:cy+1,width:cellW-2,height:3,fill:col},a);
const imageH=rowH-29;
node('rect',{x:x+5,y:cy+7,width:cellW-10,height:imageH-8,fill:'#f7f8fa'},a);
const image=node('image',{x:x+5,y:cy+7,width:cellW-10,height:imageH-8,preserveAspectRatio:'xMidYMid meet','data-src':f.src},a);image.setAttributeNS(XL,'xlink:href',f.src);
node('text',{x:x+9,y:cy+rowH-9,fill:col,'font-family':'Arial, Helvetica, sans-serif','font-size':linked?13:14,'font-weight':700},a,names[p.id]);
});});
text(gx,H-9,'ORIGINAL PROJECT VISUALS  /  09 SELECTED PROJECTS',10,'#b8cbd9',700,{'letter-spacing':1.2});
button.disabled=projects.length!==9;
status.textContent=projects.length===9?W+' × '+H+' px · All nine projects':'Some project images are unavailable.';
}
const dataURL=async path=>{const r=await fetch(path);if(!r.ok)throw Error('Unable to load '+path);const blob=await r.blob();return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(blob);});};
const save=blob=>{const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='matthew-scarpello-'+select.value+'-banner.'+(blob.type==='image/jpeg'?'jpg':'png');document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);};
const encode=(c,type,quality)=>new Promise((resolve,reject)=>c.toBlob(b=>b?resolve(b):reject(Error('Image encoding failed')),type,quality));
button.addEventListener('click',async()=>{
button.disabled=true;select.disabled=true;status.textContent='Preparing original images…';
try{
const clone=svg.cloneNode(true),images=[...clone.querySelectorAll('image[data-src]')];
await Promise.all(images.map(async im=>{const uri=await dataURL(im.getAttribute('data-src'));im.setAttributeNS(XL,'xlink:href',uri);im.removeAttribute('data-src');}));
clone.querySelectorAll('a').forEach(a=>{const g=document.createElementNS(NS,'g');while(a.firstChild)g.appendChild(a.firstChild);a.replaceWith(g);});
const source=new XMLSerializer().serializeToString(clone),url=URL.createObjectURL(new Blob([source],{type:'image/svg+xml;charset=utf-8'}));
try{const im=new Image();await new Promise((resolve,reject)=>{im.onload=resolve;im.onerror=()=>reject(Error('Banner could not be rendered'));im.src=url;});const c=document.createElement('canvas');c.width=Number(clone.getAttribute('width'));c.height=Number(clone.getAttribute('height'));c.getContext('2d').drawImage(im,0,0,c.width,c.height);
let blob=await encode(c,'image/png');if(select.value==='github'&&blob.size>=1000000){for(const q of [.92,.85,.75,.6]){blob=await encode(c,'image/jpeg',q);if(blob.size<1000000)break;}if(blob.size>=1000000)throw Error('GitHub size limit could not be met');}
save(blob);status.textContent='Downloaded '+c.width+' × '+c.height+' '+(blob.type==='image/jpeg'?'JPG':'PNG')+'.';
}finally{URL.revokeObjectURL(url);}
}catch(e){status.textContent='Export failed: '+e.message+'. Please retry.';}finally{button.disabled=projects.length!==9;select.disabled=false;}
});
select.addEventListener('change',render);render();
})();