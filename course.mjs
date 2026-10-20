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
    <p class="lesson-intro">Five stages, one lesson at a time. Learn the purpose, explore the example, then check your understanding.</p>
    <div id="contents" class="course-contents" hidden>
      <button type="button" class="contents-toggle">Close contents <span aria-hidden="true">×</span></button>
      <nav class="contents-panel" aria-labelledby="contents-title">
        <div class="contents-heading"><h3 id="contents-title">Table of contents</h3><button type="button" class="course-reference" data-reference="" aria-haspopup="dialog">Quick reference</button></div>
        ${chapters.map((stage,i)=>`<details class="contents-chapter"><summary><span class="contents-number">${i+1}</span><span>${stage.title}<small>${stage.summary}</small></span></summary>
          <a class="contents-start" href="#stage-${i+1}">Start stage ${i+1}</a>
          <div class="contents-group"><ul>${stage.sections.map(id=>`<li><a href="#${id}">${lessonSupport[id][0]}</a></li>`).join('')}</ul></div></details>`).join('')}
        <p class="contents-note">Dotted-underlined terms open a definition. Your place is saved on this device.</p>
      </nav>
    </div>
    <div class="course-chapters">${chapters.map((stage,i)=>`<section class="course-chapter" id="stage-${i+1}">
      <h2 class="course-chapter-heading"><button type="button" class="course-toggle" id="stage-toggle-${i+1}" aria-expanded="false" aria-controls="stage-body-${i+1}">
        <span class="course-number" aria-hidden="true">${i+1}</span><span><strong>${stage.title}</strong><span class="course-summary">${stage.summary}</span></span><span class="course-chevron" aria-hidden="true">⌄</span>
      </button></h2>
      <div class="course-chapter-body" id="stage-body-${i+1}" data-chapter="${stage.key}" role="region" aria-labelledby="stage-toggle-${i+1}" hidden></div>
    </section>`).join('')}</div>`;
  const bodies=[...host.querySelectorAll('.course-chapter-body')],toggles=[...host.querySelectorAll('.course-toggle')],mounted=new Set();
  const remember=id=>{saved=id;try {localStorage.setItem(storageKey,id);}catch {/* Optional. */}};
  function show(position,{scroll=false,focus=false}={}) {
    host.querySelector('#contents').hidden=true;
    const {index,anchor}=position,stage=chapters[index],body=bodies[index];
    const topic=stage.sections.includes(anchor)?anchor:stage.sections[0],number=stage.sections.indexOf(topic);
    bodies.forEach((item,i)=>{item.hidden=i!==index;toggles[i].setAttribute('aria-expanded',String(i===index));});
    if(!mounted.has(index)) {
      renderStage(body,stage);
      body.querySelector('.chapter-count').textContent=`Stage ${index+1} of ${chapters.length}`;
      const controls=document.createElement('div');controls.className='course-reading-tools';
      controls.innerHTML='<button type="button" class="course-outline">Contents ↑</button><button type="button" class="course-reference" data-reference="" aria-haspopup="dialog">Reference</button>';
      controls.querySelector('.course-outline').addEventListener('click',()=>navigate('#contents'));
      body.querySelector('.chapter-heading').insertBefore(controls,body.querySelector('.lesson-motion'));
      const select=document.createElement('label');select.className='course-lesson-picker';
      select.innerHTML=`<span>Lesson in this stage</span><select aria-label="Lesson in this stage">${stage.sections.map(id=>`<option value="${id}">${lessonSupport[id][0]}</option>`).join('')}</select>`;
      select.querySelector('select').addEventListener('change',event=>navigate(`#${event.target.value}`,true));
      body.querySelector('.chapter-heading').after(select);
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
      const footer=document.createElement('div');footer.className='course-lesson-footer';body.append(footer);
      onChapter(body);mounted.add(index);
    }
    stage.sections.forEach(id=>{body.querySelector(`#${id}`).hidden=id!==topic;});
    bodies.forEach(item=>item.dispatchEvent(new Event('coursevisibility')));
    body.querySelector('.course-lesson-picker select').value=topic;
    const {previous,next}=lessonNavigation(topic),last=number===stage.sections.length-1;
    body.querySelector('.course-lesson-footer').innerHTML=`
      ${last?`<div class="course-stage-finish"><h3>Put this stage into practice</h3>
        <a class="course-practice-link" href="${stage.practice[1]}">${stage.practice[0]} →</a>
        ${stage.exam?`<a class="course-practice-link" href="${stage.exam[1]}"><span>Related exam</span>: <span>${stage.exam[0]}</span> →</a>`:''}</div>`:''}
      <nav class="course-topic-nav" aria-label="Lesson navigation">
        ${previous?`<a href="#${previous}"><small>Previous lesson</small><span>${lessonSupport[previous][0]}</span></a>`:'<span></span>'}
        ${next?`<a href="#${next}" class="course-next"><small>Next lesson</small><span>${lessonSupport[next][0]} →</span></a>`:'<a href="./quiz.html#intermediate" class="course-next">Choose an Intermediate exam →</a>'}
      </nav>`;
    remember(topic);
    host.querySelectorAll('.course-contents a').forEach(link=>{
      if(link.getAttribute('href')===`#${topic}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
    });
    if(scroll||focus)requestAnimationFrame(()=>{
      const section=body.querySelector(`#${topic}`),heading=section.querySelector('h3');
      if(scroll)section.scrollIntoView({block:'start'});
      if(focus){heading.tabIndex=-1;heading.focus({preventScroll:true});}
    });
  }
  function showContents() {
    const contents=host.querySelector('#contents');contents.hidden=false;
    contents.scrollIntoView({block:'start'});contents.querySelector('.contents-toggle').focus({preventScroll:true});
  }
  function navigate(hash,focus=false) {
    if(hash==='#contents'){if(location.hash!==hash)history.pushState(null,'',hash);showContents();return;}
    const position=coursePosition(hash,saved);
    if(location.hash!==`#${position.anchor}`)history.pushState(null,'',`#${position.anchor}`);
    show(position,{scroll:true,focus});
  }
  host.querySelector('.contents-toggle').addEventListener('click',()=>navigate(`#${saved}`,true));
  toggles.forEach((button,i)=>button.addEventListener('click',()=>{
    if(!bodies[i].hidden){bodies[i].hidden=true;button.setAttribute('aria-expanded','false');bodies[i].dispatchEvent(new Event('coursevisibility'));}
    else navigate(`#stage-${i+1}`,true);
  }));
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
  const initial=coursePosition(location.hash,saved),hadHash=Boolean(location.hash);
  if(location.hash!=='#contents')history.replaceState(null,'',`#${initial.anchor}`);
  show(initial,{scroll:hadHash&&location.hash!=='#contents'});
  if(location.hash==='#contents')requestAnimationFrame(showContents);
}
