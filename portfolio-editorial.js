/* Explicit motion controls for existing project-reels; no network or new dependencies. */
(() => {
 'use strict';
 document.querySelectorAll('.ep-reel-band').forEach(reel=>{
   const button=reel.querySelector('.ep-motion-toggle');
   if(!button)return;
   button.addEventListener('click',()=>{
     const pause=reel.dataset.epPaused!=='true';
     reel.dataset.epPaused=String(pause);
     button.setAttribute('aria-pressed',String(pause));
     button.textContent=pause?'Resume motion':'Pause motion';
   });
 });
})();
