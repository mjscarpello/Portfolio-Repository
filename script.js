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

  if (data?.projects && $('#project-options')) {
    let projectIndex = 0;
    let figureIndex = 0;
    const projects = data.projects.filter(project => project.category === 'school');
    const optionsRoot = $('#project-options');
    const stage = $('#feature-figure-stage');
    const optionButtons = projects.map((project, index) => {
      const button = node('button', 'project-option');
      button.type = 'button';
      button.setAttribute('aria-controls', 'project-detail');
      button.append(node('span', 'project-option-number', project.number), node('span', 'project-option-text', project.shortTitle));
      button.addEventListener('click', () => selectProject(index));
      optionsRoot.append(button);
      return button;
    });
    function renderFigure() {
      const project = projects[projectIndex];
      stage.replaceChildren();
      const hasFigures = project.figures.length > 0;
      $('#figure-prev').hidden = !hasFigures || project.figures.length <= 1;
      $('#figure-next').hidden = !hasFigures || project.figures.length <= 1;
      $('#figure-progress').textContent = hasFigures ? `${figureIndex + 1} / ${project.figures.length}` : 'Original plots pending';
      if (!hasFigures) {
        const empty = node('div', 'figure-empty');
        empty.append(node('span', 'small-label', 'FIGURE LIBRARY'),
          node('h4', '', 'Original research visuals are being prepared.'),
          node('p', '', project.id === 'capstone-three' ? 'This is a course placeholder. No research topic or figures have been assigned yet.' : 'Original project figures and approved work samples will be added when available.'),
          node('a', 'underlined-link', 'Read the case study →'));
        empty.querySelector('a').href = asset(project.page);
        stage.append(empty);
        return;
      }
      const item = project.figures[figureIndex];
      const open = node('button', 'feature-chart-button');
      open.type = 'button';
      open.setAttribute('aria-label', `Enlarge original figure: ${item.title}`);
      const image = node('img');
      image.src = asset(item.src);
      image.alt = item.alt;
      image.loading = 'lazy';
      open.append(image, node('span', 'chart-zoom-hint', 'Enlarge figure ↗'));
      open.addEventListener('click', () => enlargeChart(item));
      const caption = node('div', 'figure-caption');
      caption.append(node('strong', '', item.title), node('p', '', item.caption));
      stage.append(open, caption);
    }
    function selectProject(index, announce = true) {
      projectIndex = Math.max(0, Math.min(projects.length - 1, index));
      figureIndex = 0;
      const p = projects[projectIndex];
      $('#project-count').textContent = `${p.number} / ${String(projects.length).padStart(2, '0')}`;
      $('#project-kicker').textContent = p.label;
      $('#project-status').textContent = p.status;
      $('#project-title').textContent = p.title;
      $('#project-summary').textContent = p.summary;
      $('#project-role').textContent = p.role;
      $('#project-date').textContent = p.period;
      $('#project-takeaway').textContent = p.takeaway;
      $('#project-link').href = asset(p.page);
      const tags = $('#project-tags');
      tags.replaceChildren(...p.skills.map(skill => node('span', 'tag', skill)));
      optionButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === projectIndex)));
      $('#project-prev').disabled = projectIndex === 0;
      $('#project-next').disabled = projectIndex === projects.length - 1;
      renderFigure();
      if (announce) $('#project-live').textContent = `Selected project ${p.number}: ${p.title}`;
    }
    $('#project-prev').addEventListener('click', () => selectProject(projectIndex - 1));
    $('#project-next').addEventListener('click', () => selectProject(projectIndex + 1));
    $('#figure-prev').addEventListener('click', () => { figureIndex = (figureIndex - 1 + projects[projectIndex].figures.length) % projects[projectIndex].figures.length; renderFigure(); });
    $('#figure-next').addEventListener('click', () => { figureIndex = (figureIndex + 1) % projects[projectIndex].figures.length; renderFigure(); });
    $('#project-selector').addEventListener('keydown', event => {
      if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? projects.length - 1 : projectIndex + (event.key === 'ArrowDown' ? 1 : -1);
      selectProject(next);
      optionButtons[projectIndex].focus({ preventScroll: true });
    });
    let lastScroll = 0;
    $('#project-selector').addEventListener('wheel', event => {
      if (event.ctrlKey || event.metaKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const move = Math.sign(event.deltaY);
      const next = projectIndex + move;
      if (!move || next < 0 || next >= projects.length) return; // Allow normal page scroll at ends.
      event.preventDefault();
      const current = performance.now();
      if (current - lastScroll < 550) return;
      lastScroll = current;
      selectProject(next);
    }, { passive: false });
    selectProject(0, false);
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
      empty.append(node('h3', '', project.id === 'capstone-three' ? 'Project 3 is reserved.' : 'Work samples will appear here.'),
        node('p', '', project.id === 'capstone-three' ? 'This is a placeholder for the third DSC 450 Fall Capstone project at Bellevue University.' : 'Original charts, screenshots, or approved examples have not been added yet. No fabricated visuals are displayed.'));
      gallery.append(empty);
    }
  }
})();
