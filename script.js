(() => {
  'use strict';
  const data = window.PORTFOLIO_DATA;
  // Detail pages are nested one directory below the repository root.
  const siteRoot = document.body.dataset.root || '';
  const asset = relativePath => siteRoot + relativePath;
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const node = (tag, className, content) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content != null) element.textContent = content;
    return element;
  };

  // Local appearance preference. Light is the default to retain the original site's look.
  const preferenceKey = 'matthew-scarpello-portfolio-theme';
  let theme = 'light';
  try { theme = localStorage.getItem(preferenceKey) === 'dark' ? 'dark' : 'light'; } catch (_) {}
  const updateTheme = () => {
    document.documentElement.dataset.theme = theme;
    $$('[data-theme-toggle]').forEach(button => {
      button.textContent = theme === 'dark' ? 'Switch to light' : 'Switch to dark';
      button.setAttribute('aria-pressed', String(theme === 'dark'));
    });
  };
  $$('[data-theme-toggle]').forEach(button => button.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(preferenceKey, theme); } catch (_) {}
    updateTheme();
  }));
  updateTheme();

  // Enlarges the ORIGINAL chart; never substitutes a generated image.
  let lastActiveElement = null;
  const modal = node('dialog', 'chart-modal');
  const closeButton = node('button', 'chart-modal-close', 'Close ×');
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Close enlarged chart');
  const originalLink = node('a', 'chart-original-link', 'Open image at full resolution ↗');
  originalLink.target = '_blank';
  originalLink.rel = 'noopener noreferrer';
  const figure = node('figure', 'chart-modal-figure');
  const modalImage = node('img');
  const modalCaption = node('figcaption');
  figure.append(modalImage, modalCaption);
  modal.append(closeButton, originalLink, figure);
  document.body.append(modal);
  const closeModal = () => modal.close();
  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
  modal.addEventListener('close', () => lastActiveElement?.focus());
  function enlargeChart(chart) {
    lastActiveElement = document.activeElement;
    modalImage.src = asset(chart.src);
    originalLink.href = asset(chart.src);
    modalImage.alt = chart.alt;
    modalCaption.textContent = chart.title + ' — ' + chart.caption;
    if (typeof modal.showModal === 'function') modal.showModal();
    else window.open(asset(chart.src), '_blank', 'noopener');
  }

  // Reusable three-pillar explorer, driven by the central project records.
  const explorer = $('#pillar-explorer');
  if (explorer && data?.pillars && data?.projects) {
    const tabs = $$('[data-pillar]');
    const list = $('#pillar-project-list');
    let pillarIndex = 0, projectIndex = 0;
    const projects = () => data.projects.filter(p => p.category === data.pillars[pillarIndex].id);
    const selected = () => projects()[projectIndex];
    function showProject(announce = true) {
      const p = selected(), all = projects();
      if (!p) return;
      const number = String(projectIndex + 1).padStart(2, '0') + ' / ' + String(all.length).padStart(2, '0');
      $('#pillar-count').textContent = number;
      $('#pillar-project-position').textContent = number;
      $$('.pillar-project-option').forEach((b,i)=>b.setAttribute('aria-pressed', String(i === projectIndex)));
      $('#pillar-project-label').textContent = p.status;
      $('#pillar-project-title').textContent = p.title;
      $('#pillar-project-summary').textContent = p.summary;
      $('#pillar-project-role').textContent = p.role;
      $('#pillar-project-link').href = asset(p.page);
      $('#pillar-media-link').href = asset(p.page);
      const figure = p.figures?.[0], img = $('#pillar-image'), empty = $('#pillar-media-empty');
      img.hidden = !figure; empty.hidden = !!figure;
      if (figure) { img.src = asset(figure.src); img.alt = figure.alt; }
      else { img.removeAttribute('src'); empty.textContent = 'Project overview available; figures are in progress.'; }
      $('#pillar-prev').disabled = projectIndex === 0;
      $('#pillar-next').disabled = projectIndex === all.length - 1;
      if (announce) $('#pillar-live').textContent = 'Showing ' + p.title;
    }
    function chooseProject(index) { projectIndex = Math.max(0, Math.min(projects().length-1, index)); showProject(); }
    function choosePillar(index, announce = true) {
      pillarIndex = Math.max(0, Math.min(data.pillars.length-1,index));
      const p = data.pillars[pillarIndex], all = projects();
      const initial = all.findIndex(item => item.id === p.featured);
      projectIndex = initial >= 0 ? initial : 0;
      tabs.forEach((tab,i)=>{const active=i===pillarIndex;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
      $('#pillar-panel').setAttribute('aria-labelledby',tabs[pillarIndex].id);
      $('#pillar-number').textContent=p.number+' / '+p.name.toUpperCase();
      $('#pillar-heading').textContent=p.heading;
      $('#pillar-description').textContent=p.description;
      $('#pillar-collection-link').href=asset(p.collection);
      $('#pillar-collection-link').textContent='View all '+p.name.toLowerCase()+' projects ↗';
      list.replaceChildren(...all.map((item,i)=>{
        const b=node('button','pillar-project-option');b.type='button';
        b.append(node('span','pillar-project-number',String(i+1).padStart(2,'0')),node('span','',item.shortTitle||item.title));
        b.addEventListener('click',()=>chooseProject(i));return b;
      }));
      showProject(announce);
    }
    tabs.forEach((tab,i)=>tab.addEventListener('click',()=>choosePillar(i)));
    $('.pillar-tabs').addEventListener('keydown',event=>{
      if (!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;
      event.preventDefault();
      const i=event.key==='Home'?0:event.key==='End'?tabs.length-1:(pillarIndex+tabs.length+(event.key==='ArrowRight'?1:-1))%tabs.length;
      choosePillar(i);tabs[i].focus();
    });
    list.addEventListener('keydown',event=>{
      if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;
      event.preventDefault();
      const i=event.key==='Home'?0:event.key==='End'?projects().length-1:projectIndex+(event.key==='ArrowDown'?1:-1);
      chooseProject(i);list.children[projectIndex]?.focus();
    });
    $('#pillar-prev').addEventListener('click',()=>chooseProject(projectIndex-1));
    $('#pillar-next').addEventListener('click',()=>chooseProject(projectIndex+1));
    choosePillar(0,false);
  }
  // Scroll-snap About-page reel with original project figures.
  const reel = $('#about-reel-track');
  if (reel && data?.projects) {
    const ids=['ercot','amazon-pick','lab-rat','studio-s','noaa','mini-bookmaker'];
    ids.map(id=>data.projects.find(p=>p.id===id)).filter(Boolean).forEach(p=>{
      const card=node('a','about-reel-card');card.href=asset(p.page);
      const visual=node('div','about-reel-media'), figure=p.figures?.[0];
      if(figure){const img=node('img');img.src=asset(figure.src);img.alt=figure.alt;img.loading='lazy';visual.append(img);}
      const copy=node('div','about-reel-copy');
      copy.append(node('span','small-label',p.category.toUpperCase()),node('h3','',p.title),node('p','',p.summary),node('span','underlined-link','Explore project ↗'));
      card.append(visual,copy);reel.append(card);
    });
    const move=sign=>{const width=reel.querySelector('.about-reel-card')?.getBoundingClientRect().width||320;
      reel.scrollBy({left:sign*(width+18),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});};
    $('#reel-prev')?.addEventListener('click',()=>move(-1));
    $('#reel-next')?.addEventListener('click',()=>move(1));
  }

  // Case-study galleries are generated ONLY for figures listed in portfolio-data.js.
  const gallery = $('[data-case-gallery]');
  if (gallery && data?.projects) {
    const project = data.projects.find(p => p.id === gallery.dataset.caseGallery);
    if (project && project.figures.length > 0) {
      project.figures.forEach((chart, index) => {
        const box = node('figure', 'case-figure');
        const button = node('button', 'case-chart-button');
        button.type = 'button';
        button.setAttribute('aria-label', `Expand original figure ${index + 1}: ${chart.title}`);
        const img = node('img'); img.src = asset(chart.src); img.alt = chart.alt; img.loading = 'lazy';
        img.addEventListener('error', () => { img.alt = 'This image did not load; please check the project figure path.'; });
        button.append(img);
        button.addEventListener('click', () => enlargeChart(chart));
        const caption = node('figcaption');
        caption.append(node('strong', '', `${String(index + 1).padStart(2, '0')} / ${chart.title}`), node('p', '', chart.caption));
        box.append(button, caption);
        gallery.append(box);
      });
    } else {
      const empty = node('div', 'case-gallery-empty');
      empty.append(node('h3', '', project.id === 'capstone-three' ? 'Project 3 is in progress.' : 'Work samples will appear here.'),
        node('p', '', project.id === 'capstone-three' ? 'Data wrangling is in progress; no unverified findings are shown.' : 'Original charts, screenshots, or approved examples have not been added yet. No fabricated visuals are displayed.'));
      gallery.append(empty);
    }
  }
})();
