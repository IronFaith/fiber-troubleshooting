export const chapters = [
  {key:'optics', title:'Optics, fiber & light', summary:'Know the parts → read the light → check the path', groups:[
    {title:'Know the parts', topics:[['optics','Optics, TX / RX & VFL'],['path','Fiber, LC & the passive path'],['trace-loops','From device data to light']]},
    {title:'Read the light', topics:[['readings','Power readings & allowed limits'],['polarity-checks','Polarity: connect TX to RX']]},
    {title:'Check the path', topics:[['loopbacks','LC & MMC loopbacks'],['compare-loops','Use loops to narrow the problem'],['cleaning','Dirt, seating & tight bends'],['fault-evidence','Ferrules, fiber & splice faults'],['change-evidence','Make one change, then retest'],['vfl','Trace with red VFL light'],['test-evidence','Continuity versus optical loss']]}
  ]},
  {key:'devices', title:'How devices communicate', summary:'Find the device → follow the route → confirm the endpoints', groups:[
    {title:'Locate & connect', topics:[['position','Read a rack position'],['ends','Local, remote & the chain of passives'],['viewpoint','See the same path from either end'],['ports','Confirm the device and ports']]}
  ]},
  {key:'patching', title:'FIM & patching', summary:'Read the assignment → choose the position → match the connections', groups:[
    {title:'Map & patch', topics:[['fim-path','Read the FIM connection assignment'],['lc-position','Choose the LC optic position'],['rack-path','Follow the fiber inside the rack'],['mmc-fanout','Match the MMC head & followers'],['worked-ticket','Work through a complete ticket']]}
  ]}
].map(chapter=>({...chapter,sections:chapter.groups.flatMap(group=>group.topics.map(([id])=>id))}));

const takeaways = {
  optics:'The optic carries device data as infrared light. A VFL supplies separate red light for tracing.',
  'trace-loops':'Devices exchange data; their optics convert it. The fiber and passives carry the light between them.',
  loopbacks:'A loopback checks the return path up to its location. Anything beyond that point is still untested.',
  'change-evidence':'Record the reading, change one thing, then retest. An improvement is not the same as a verified repair.',
  position:'Read the whole location: building, room, row, rack and elevation each narrow the search.',
  ends:'Follow every mapped passive between the devices. Local and remote each have a sending and a receiving path.',
  viewpoint:'Changing your viewpoint swaps the names local and remote, not the job of TX or RX.',
  'rack-path':'Follow the assigned LC leg from the optic to its MMC head and CAS port.',
  'worked-ticket':'Match location, optic orientation, follower, head and CAS port together, then verify health.'
};

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

export function mountCourse(host, renderers, onChapter = () => {}) {
  const storageKey = 'fiber-learn-chapter-v1';
  let saved = '';
  try { saved = localStorage.getItem(storageKey) || ''; } catch { /* Reading remains available without storage. */ }
  host.classList.add('course');
  host.innerHTML = `<h2 id="course-title">Your learning path</h2>
    <p class="lesson-intro">Start with the parts, follow the connections, then practice patching. Choose a chapter or continue where you left off.</p>
    <div id="contents" class="course-contents" hidden>
      <button type="button" class="contents-toggle">Close contents <span aria-hidden="true">×</span></button>
      <nav class="contents-panel" aria-labelledby="contents-title">
      <div class="contents-heading"><h3 id="contents-title">Table of contents</h3><button type="button" class="course-reference" data-reference="" aria-haspopup="dialog">Quick reference</button></div>
      ${chapters.map((chapter,i)=>`<details class="contents-chapter"><summary><span class="contents-number">${i+1}</span><span>${chapter.title}<small>${chapter.summary}</small></span></summary>
        <a class="contents-start" href="#chapter-${i+1}">Start chapter ${i+1}</a>
        ${chapter.groups.map(group=>`<div class="contents-group"><h4>${group.title}</h4><ul>${group.topics.map(([id,label])=>`<li><a href="#${id}">${label}</a></li>`).join('')}</ul></div>`).join('')}
      </details>`).join('')}
      <p class="contents-note">Dotted-underlined terms open a definition. Your chapter is saved on this device.</p>
      </nav>
    </div>
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
    host.querySelector('#contents').hidden = true;
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
      backToChapters.type = 'button'; backToChapters.className = 'course-outline'; backToChapters.textContent = 'Contents ↑';
      backToChapters.addEventListener('click', () => navigate('#contents'));
      body.querySelector('.chapter-heading').insertBefore(backToChapters, body.querySelector('.lesson-motion'));
      const reference = document.createElement('button');
      reference.type='button';reference.className='course-reference';reference.textContent='Reference';reference.dataset.reference='';reference.setAttribute('aria-haspopup','dialog');
      body.querySelector('.chapter-heading').insertBefore(reference,body.querySelector('.lesson-motion'));
      body.querySelector('.lesson-jumps')?.remove();
      const topicFragment=document.createDocumentFragment();
      let topicNumber=0;
      chapters[index].groups.forEach(group=>group.topics.forEach(([id])=>{
        const section=body.querySelector(`#${id}`);
        if(!section) return;
        const label=document.createElement('p');label.className='topic-position';
        label.textContent=`${index+1}.${++topicNumber} · ${group.title}`;section.prepend(label);
        if(takeaways[id] && !section.querySelector('.lesson-takeaway')) {
          const takeaway=document.createElement('p');takeaway.className='lesson-takeaway';takeaway.textContent=takeaways[id];section.append(takeaway);
        }
        topicFragment.append(section);
      }));
      body.querySelector('.lesson-intro').after(topicFragment);
      onChapter(body);
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
    host.querySelectorAll('.course-contents a').forEach(link=>{
      if(link.getAttribute('href')===`#${anchor}`) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
    if (focus) (body.querySelector(`#${anchor} h3`) || toggles[index]).focus({preventScroll:true});
    if (scroll) requestAnimationFrame(() => {
      const target = document.getElementById(anchor);
      if (target && host.contains(target)) {
        target.scrollIntoView({block:'start'});
        if(focus && target.classList.contains('lesson-section')) {
          const heading=target.querySelector('h3');heading.tabIndex=-1;heading.focus({preventScroll:true});
        }
      }
    });
  }
  function collapse(index) {
    bodies[index].hidden = true;
    toggles[index].setAttribute('aria-expanded', 'false');
    bodies[index].dispatchEvent(new Event('coursevisibility'));
  }
  function navigate(hash, focus=false) {
    if(hash==='#contents') {
      if(location.hash!==hash) history.pushState(null,'',hash);
      showContents(); return;
    }
    const position = coursePosition(hash, saved);
    if (location.hash !== `#${position.anchor}`) history.pushState(null, '', `#${position.anchor}`);
    show(position, {scroll:true, focus});
  }
  function showContents() {
    const contents=host.querySelector('#contents');
    contents.hidden = false;
    contents.scrollIntoView({block:'start'});contents.querySelector('.contents-toggle').focus({preventScroll:true});
  }
  host.querySelector('.contents-toggle').addEventListener('click', () => navigate(`#${coursePosition('', saved).anchor}`, true));
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
  document.addEventListener('course:navigate',event=>navigate(event.detail,true));
  window.addEventListener('hashchange', () => location.hash==='#contents'?showContents():show(coursePosition(location.hash, saved), {scroll:true}));
  const hadHash = Boolean(location.hash);
  const initial = coursePosition(location.hash, saved);
  if (!hadHash) history.replaceState(null, '', `#${initial.anchor}`);
  show(initial, {scroll:hadHash && location.hash!=='#contents'});
  if(location.hash==='#contents') requestAnimationFrame(showContents);
}
