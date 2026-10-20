import {chapters,lessonSupport,takeaways,legacyCourseAnchors,lessonNavigation} from './course-data.mjs?v=1';
export {chapters,lessonNavigation};
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function resolvePosition(value) {
  const anchor=legacyCourseAnchors[value]??value;
  const index=chapters.findIndex((stage,i)=>anchor===`stage-${i+1}`||stage.sections.includes(anchor));
  if(index!==-1)return {index,anchor};
  const keyed=chapters.findIndex(stage=>stage.key===anchor);
  return keyed===-1?null:{index:keyed,anchor:`stage-${keyed+1}`};
}
export function coursePosition(hash='',saved='') {
  return resolvePosition(hash.replace(/^#/,''))??resolvePosition(saved)??{index:0,anchor:'stage-1'};
}
export function learningEntry(storage) {
  let saved='';
  try {saved=storage?.getItem('fiber-learn-chapter-v1')||'';} catch {/* Reading remains available. */}
  const position=coursePosition('',saved),stage=chapters[position.index];
  return {href:`./learn.html#${position.anchor}`,action:resolvePosition(saved)?'Continue learning':'Start learning',title:lessonSupport[position.anchor]?.[0]??stage.title};
}
export function courseDestination(pathname,hash='') {
  const page=pathname.split('/').at(-1);
  if(!['learn.html','devices.html','patching.html'].includes(page))return null;
  if(page==='patching.html'&&hash==='#patch-practice')return null;
  return hash||(page==='devices.html'?'#chapter-2':page==='patching.html'?'#chapter-3':'#stage-1');
}
export function mountCourse(host,renderStage,onChapter=()=>{}) {
  const storageKey='fiber-learn-chapter-v1';
  let saved='';
  try {saved=localStorage.getItem(storageKey)||'';} catch {/* Optional. */}
  host.classList.add('course');
  host.innerHTML=`<h2 id="course-title">Your learning path</h2>
    <p class="lesson-intro">All lessons are open. Jump to a topic below or scroll through the five stages.</p>
    <div id="contents" class="course-contents">
      <nav class="contents-panel" aria-labelledby="contents-title">
        <div class="contents-heading"><h3 id="contents-title">Table of contents</h3><button type="button" class="course-reference" data-reference="" aria-haspopup="dialog">Quick reference</button></div>
        <div class="contents-grid">${chapters.map((stage,i)=>`<section class="contents-chapter" aria-labelledby="contents-stage-${i+1}">
          <h4 id="contents-stage-${i+1}"><a href="#stage-${i+1}"><span class="contents-number" aria-hidden="true">${i+1}</span><span>${stage.title}</span></a></h4>
          <div class="contents-group"><ul>${stage.sections.map(id=>`<li><a href="#${id}">${lessonSupport[id][0]}</a></li>`).join('')}</ul></div></section>`).join('')}</div>
        <p class="contents-note">Dotted-underlined terms open a definition. Your place is saved on this device.</p>
      </nav>
    </div>
    <div class="course-chapters">${chapters.map((stage,i)=>`<section class="course-chapter" id="stage-${i+1}">
      <h2 class="course-chapter-heading" id="stage-heading-${i+1}">
        <span class="course-number" aria-hidden="true">${i+1}</span><span><strong>${stage.title}</strong><span class="course-summary">${stage.summary}</span></span>
      </h2>
      <div class="course-chapter-body" id="stage-body-${i+1}" data-chapter="${stage.key}" role="region" aria-labelledby="stage-heading-${i+1}"></div>
    </section>`).join('')}</div>`;
  const bodies=[...host.querySelectorAll('.course-chapter-body')];
  let current='';
  function remember(topic) {
    if(current===topic)return;
    current=saved=topic;
    try {localStorage.setItem(storageKey,topic);}catch {/* Optional. */}
    host.querySelectorAll('.course-contents a').forEach(link=>{
      if(link.getAttribute('href')===`#${topic}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
    });
    bodies.forEach(item=>item.dispatchEvent(new CustomEvent('coursevisibility',{detail:{topic}})));
  }
  bodies.forEach((body,index)=>{
    const stage=chapters[index];
    renderStage(body,stage);
    body.querySelector('.chapter-count').textContent=`Stage ${index+1} of ${chapters.length}`;
    const controls=document.createElement('div');controls.className='course-reading-tools';
    controls.innerHTML='<button type="button" class="course-outline">Contents ↑</button><button type="button" class="course-reference" data-reference="" aria-haspopup="dialog">Reference</button>';
    controls.querySelector('.course-outline').addEventListener('click',()=>navigate('#contents'));
    body.querySelector('.chapter-heading').insertBefore(controls,body.querySelector('.lesson-motion'));
    stage.sections.forEach((id,i)=>{
      const section=body.querySelector(`#${id}`),[,goal,question,answer]=lessonSupport[id];
      const label=document.createElement('p');label.className='topic-position';label.textContent=`Lesson ${i+1} of ${stage.sections.length}`;section.prepend(label);
      const objective=document.createElement('p');objective.className='lesson-objective';
      objective.innerHTML=`<b>What you’ll learn</b><span>${escape(goal)}</span>`;section.querySelector('h3').after(objective);
      if(takeaways[id]&&!section.querySelector('.lesson-takeaway')) {
        const takeaway=document.createElement('p');takeaway.className='lesson-takeaway';takeaway.textContent=takeaways[id];section.append(takeaway);
      }
      const check=document.createElement('div');check.className='lesson-check';
      check.innerHTML=`<h4>Check your understanding</h4><p>${escape(question)}</p><details><summary>Show explanation</summary><p>${escape(answer)}</p></details>`;section.append(check);
    });
    const footer=document.createElement('div');footer.className='course-stage-finish';
    footer.innerHTML=`<h3>Put this stage into practice</h3>
      <a class="course-practice-link" href="${stage.practice[1]}">${stage.practice[0]} →</a>
      ${stage.exam?`<a class="course-practice-link" href="${stage.exam[1]}"><span>Related exam</span>: <span>${stage.exam[0]}</span> →</a>`:''}`;
    body.append(footer);
    onChapter(body);
  });
  function show(position,{scroll=false,focus=false}={}) {
    const {index,anchor}=position,stage=chapters[index];
    const topic=stage.sections.includes(anchor)?anchor:stage.sections[0];
    remember(topic);
    if(scroll||focus)requestAnimationFrame(()=>{
      const section=host.querySelector(`#${anchor}`),heading=section.querySelector('h2,h3');
      if(scroll)section.scrollIntoView({block:'start'});
      if(focus){heading.tabIndex=-1;heading.focus({preventScroll:true});}
    });
  }
  function showContents() {
    const contents=host.querySelector('#contents'),heading=contents.querySelector('h3');
    contents.scrollIntoView({block:'start'});heading.tabIndex=-1;heading.focus({preventScroll:true});
  }
  function navigate(hash,focus=false) {
    if(hash==='#contents'){if(location.hash!==hash)history.pushState(null,'',hash);showContents();return;}
    const position=coursePosition(hash,saved);
    if(location.hash!==`#${position.anchor}`)history.pushState(null,'',`#${position.anchor}`);
    show(position,{scroll:true,focus});
  }
  host.addEventListener('click',event=>{
    const anchor=event.target.closest('a');
    if(!anchor||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||anchor.target||anchor.hasAttribute('download'))return;
    const url=new URL(anchor.href);
    if(url.origin!==location.origin)return;
    const destination=courseDestination(url.pathname,url.hash);
    if(destination===null)return;
    event.preventDefault();navigate(destination,true);
  });
  document.addEventListener('course:navigate',event=>navigate(event.detail,true));
  window.addEventListener('hashchange',()=>location.hash==='#contents'?showContents():show(coursePosition(location.hash,saved),{scroll:true}));
  // Scrolling is now a normal way to read; retain the topic reached without a click.
  const sections=[...host.querySelectorAll('.lesson-section')];
  let scrollPending=false;
  window.addEventListener('scroll',()=>{
    if(scrollPending)return;
    scrollPending=true;
    requestAnimationFrame(()=>{
      scrollPending=false;
      const line=Math.min(140,innerHeight/4);
      const section=sections.find(item=>{const rect=item.getBoundingClientRect();return rect.top<=line&&rect.bottom>line;});
      if(section&&section.id!==current){remember(section.id);history.replaceState(null,'',`#${section.id}`);}
    });
  },{passive:true});
  const initial=coursePosition(location.hash,saved),resume=Boolean(location.hash||resolvePosition(saved));
  if(location.hash!=='#contents')history.replaceState(null,'',`#${initial.anchor}`);
  show(initial,{scroll:resume&&location.hash!=='#contents'});
  if(location.hash==='#contents')requestAnimationFrame(showContents);
}
