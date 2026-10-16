export const chapters = [
  {key:'optics', title:'Optics, fiber & light', summary:'Light sources, loopbacks and health checks', sections:['optics','path','trace-loops','loopbacks','readings','compare-loops','polarity-checks','cleaning','fault-evidence','change-evidence','vfl','test-evidence']},
  {key:'devices', title:'How devices communicate', summary:'Rack locations, local / remote and the passive path', sections:['position','ends','viewpoint','ports']},
  {key:'patching', title:'FIM & patching', summary:'Optic positions, LC followers and MMC heads', sections:['lc-position','rack-path','fim-path','mmc-fanout','worked-ticket']}
];

export function coursePosition(hash = '', saved = '') {
  const anchor = hash.replace(/^#/, '');
  const index = chapters.findIndex((chapter, i) => anchor === `chapter-${i+1}` || chapter.sections.includes(anchor));
  if (index !== -1) return {index, anchor};
  const remembered = chapters.findIndex(chapter => chapter.key === saved);
  const fallback = remembered === -1 ? 0 : remembered;
  return {index:fallback, anchor:`chapter-${fallback+1}`};
}

export function courseDestination(pathname, hash = '') {
  const page = pathname.split('/').at(-1);
  if (!['learn.html','devices.html','patching.html'].includes(page)) return null;
  if (page === 'patching.html' && hash === '#patch-practice') return null;
  return hash || (page === 'devices.html' ? '#chapter-2' : page === 'patching.html' ? '#chapter-3' : '#chapter-1');
}

export function mountCourse(host, renderers) {
  const storageKey = 'fiber-learn-chapter-v1';
  let saved = '';
  try { saved = localStorage.getItem(storageKey) || ''; } catch { /* Reading remains available without storage. */ }
  host.classList.add('course');
  host.innerHTML = `<h2 id="course-title">Learn · Fiber basics</h2>
    <p class="lesson-intro">One course, three chapters. Open any chapter or follow Continue. Your place is saved on this device.</p>
    <div class="course-chapters">${chapters.map((chapter,i) => `
      <section class="course-chapter" id="chapter-${i+1}">
        <h2 class="course-chapter-heading"><button type="button" class="course-toggle" id="chapter-toggle-${i+1}" aria-expanded="false" aria-controls="chapter-body-${i+1}">
          <span class="course-number" aria-hidden="true">${i+1}</span><span><strong>${chapter.title}</strong><span class="course-summary">${chapter.summary}</span></span><span class="course-chevron" aria-hidden="true">⌄</span>
        </button></h2>
        <div class="course-chapter-body" id="chapter-body-${i+1}" data-chapter="${chapter.key}" role="region" aria-labelledby="chapter-toggle-${i+1}" hidden></div>
      </section>`).join('')}</div>`;
  const bodies = [...host.querySelectorAll('.course-chapter-body')];
  const toggles = [...host.querySelectorAll('.course-toggle')];
  const mounted = new Set();

  function show(position, {scroll=false, focus=false} = {}) {
    const {index, anchor} = position;
    bodies.forEach((body,i) => {
      body.hidden = i !== index;
      toggles[i].setAttribute('aria-expanded', String(i === index));
      body.dispatchEvent(new Event('coursevisibility'));
    });
    const body = bodies[index];
    if (!mounted.has(index)) {
      renderers[index](body);
      body.querySelector('.chapter-count').textContent = `Chapter ${index+1} of ${chapters.length}`;
      const backToChapters = document.createElement('button');
      backToChapters.type = 'button'; backToChapters.className = 'course-outline'; backToChapters.textContent = 'Chapters ↑';
      backToChapters.addEventListener('click', () => {
        collapse(index);
        host.scrollIntoView({block:'start'}); toggles[index].focus({preventScroll:true});
      });
      body.querySelector('.chapter-heading').insertBefore(backToChapters, body.querySelector('.lesson-motion'));
      if (index < chapters.length-1) {
        const next = document.createElement('button');
        next.type = 'button'; next.className = 'course-continue';
        next.textContent = `Continue → ${chapters[index+1].title}`;
        next.addEventListener('click', () => navigate(`#chapter-${index+2}`, true));
        body.append(next);
      }
      mounted.add(index);
    }
    saved = chapters[index].key;
    try { localStorage.setItem(storageKey, saved); } catch { /* Storage is optional. */ }
    if (focus) toggles[index].focus({preventScroll:true});
    if (scroll) requestAnimationFrame(() => {
      const target = document.getElementById(anchor);
      if (target && host.contains(target)) target.scrollIntoView({block:'start'});
    });
  }
  function collapse(index) {
    bodies[index].hidden = true;
    toggles[index].setAttribute('aria-expanded', 'false');
    bodies[index].dispatchEvent(new Event('coursevisibility'));
  }
  function navigate(hash, focus=false) {
    const position = coursePosition(hash, saved);
    if (location.hash !== `#${position.anchor}`) history.pushState(null, '', `#${position.anchor}`);
    show(position, {scroll:true, focus});
  }
  toggles.forEach((button,i) => button.addEventListener('click', () => {
    if (!bodies[i].hidden) collapse(i);
    else navigate(`#chapter-${i+1}`, true);
  }));
  host.addEventListener('click', event => {
    const anchor = event.target.closest('a');
    if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || anchor.target || anchor.hasAttribute('download')) return;
    const url = new URL(anchor.href);
    if (url.origin !== location.origin) return;
    const destination = courseDestination(url.pathname, url.hash);
    if (destination === null) return;
    event.preventDefault(); navigate(destination, true);
  });
  window.addEventListener('hashchange', () => show(coursePosition(location.hash, saved), {scroll:true}));
  const hadHash = Boolean(location.hash);
  const initial = coursePosition(location.hash, saved);
  if (!hadHash) history.replaceState(null, '', `#${initial.anchor}`);
  show(initial, {scroll:hadHash});
}
