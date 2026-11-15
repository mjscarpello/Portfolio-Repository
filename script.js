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
    const scrollHint = $('#pillar-scroll-hint');
    const scrollControls = $('#pillar-scroll-controls');
    const scrollPrev = $('#pillar-scroll-prev');
    const scrollNext = $('#pillar-scroll-next');
    const smallScreen = () => window.matchMedia('(max-width:760px)').matches;
    function updateScrollControls() {
      const scrollable = smallScreen() && list.scrollWidth > list.clientWidth + 5;
      scrollHint.hidden = !scrollable;
      scrollControls.hidden = !scrollable;
      list.classList.toggle('has-overflow', scrollable);
      scrollPrev.disabled = !scrollable || list.scrollLeft <= 5;
      scrollNext.disabled = !scrollable || list.scrollLeft + list.clientWidth >= list.scrollWidth - 5;
    }
    function scrollProjects(direction) {
      const width = Math.max(175, Math.round(list.clientWidth * 0.68));
      list.scrollBy({ left: direction * width, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
    function revealProjectButton() {
      if (!smallScreen()) return;
      const button = list.children[projectIndex];
      if (!button) return;
      const bounds = button.getBoundingClientRect(), container = list.getBoundingClientRect();
      const overflow = bounds.left < container.left ? bounds.left - container.left - 8 :
        bounds.right > container.right ? bounds.right - container.right + 8 : 0;
      if (overflow) list.scrollBy({ left: overflow, behavior: 'smooth' });
    }
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
      const atEnd = projectIndex === all.length - 1;
      const forward = $('#pillar-next');
      const nextPillar = data.pillars[(pillarIndex + 1) % data.pillars.length];
      const forwardLabel = atEnd
        ? (pillarIndex === data.pillars.length - 1 ? 'Start over: ' + nextPillar.name + ' ↻' : 'Next pillar: ' + nextPillar.name + ' →')
        : 'Next project →';
      forward.textContent = forwardLabel;
      forward.setAttribute('aria-label', forwardLabel);
      forward.classList.toggle('pillar-transition', atEnd);
      forward.disabled = false;
      if (announce) $('#pillar-live').textContent = 'Showing ' + p.title;
    }
    function chooseProject(index) {
      projectIndex = Math.max(0, Math.min(projects().length - 1, index));
      showProject();
      revealProjectButton();
      updateScrollControls();
    }
    function choosePillar(index, announce = true, startAtFirst = false) {
      pillarIndex = Math.max(0, Math.min(data.pillars.length - 1, index));
      const p = data.pillars[pillarIndex], all = projects();
      const initial = all.findIndex(item => item.id === p.featured);
      projectIndex = startAtFirst ? 0 : initial >= 0 ? initial : 0;
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
      list.scrollLeft = 0;
      showProject(announce);
      window.requestAnimationFrame(updateScrollControls);
    }
    tabs.forEach((tab,i)=>tab.addEventListener('click',()=>choosePillar(i)));
    $('.pillar-tabs').addEventListener('keydown',event=>{
      if (!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;
      event.preventDefault();
      const i=event.key==='Home'?0:event.key==='End'?tabs.length-1:(pillarIndex+tabs.length+(event.key==='ArrowRight'?1:-1))%tabs.length;
      choosePillar(i);tabs[i].focus();
    });
    list.addEventListener('keydown',event=>{
      const mobile = smallScreen();
      const keys = mobile ? ['ArrowRight','ArrowLeft','Home','End'] : ['ArrowDown','ArrowUp','Home','End'];
      if (!keys.includes(event.key)) return;
      event.preventDefault();
      const forward = mobile ? 'ArrowRight' : 'ArrowDown';
      const i = event.key === 'Home' ? 0 : event.key === 'End' ? projects().length - 1 :
        projectIndex + (event.key === forward ? 1 : -1);
      chooseProject(i);
      list.children[projectIndex]?.focus({preventScroll: true});
    });
    list.addEventListener('scroll', updateScrollControls, {passive:true});
    window.addEventListener('resize', updateScrollControls);
    scrollPrev.addEventListener('click',()=>scrollProjects(-1));
    scrollNext.addEventListener('click',()=>scrollProjects(1));
    $('#pillar-prev').addEventListener('click',()=>chooseProject(projectIndex-1));
    $('#pillar-next').addEventListener('click',()=>{
      if (projectIndex < projects().length - 1) {
        chooseProject(projectIndex + 1);
      } else {
        const nextIndex = (pillarIndex + 1) % data.pillars.length;
        choosePillar(nextIndex, true, true);
        tabs[nextIndex].focus({preventScroll: true});
        $('#pillar-live').textContent = 'Now browsing ' + data.pillars[nextIndex].name + ' projects';
      }
    });
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
        box.id = 'figure-' + chart.src.split('/').pop().replace(/\.[^.]+$/, '').toLowerCase();
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
      // These figures are created after HTML parsing, so a direct #figure-...
      // link must scroll once the gallery has actually been rendered.
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (hash.startsWith('figure-')) {
        window.requestAnimationFrame(() => {
          document.getElementById(hash)?.scrollIntoView({block:'center',behavior:'instant'});
        });
      }
    } else {
      const empty = node('div', 'case-gallery-empty');
      empty.append(node('h3', '', project.id === 'capstone-three' ? 'Project 3 is in progress.' : 'Work samples will appear here.'),
        node('p', '', project.id === 'capstone-three' ? 'Data wrangling is in progress; no unverified findings are shown.' : 'Original charts, screenshots, or approved examples have not been added yet. No fabricated visuals are displayed.'));
      gallery.append(empty);
    }
  }
})();
