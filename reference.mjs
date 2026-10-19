import {translate,getLanguage,formatBidi} from './locale.mjs?v=11';
import {referenceTerms, referenceGroups, searchReference} from './reference-data.mjs?v=15';
import {opticIllustration} from './patching-visuals.mjs?v=1';
import {cassetteFront, mmcHead, loopIllustration} from './loop-visuals.mjs?v=4';

const text = (x,y,label) => `<text x="${x}" y="${y}" text-anchor="middle">${label}</text>`;
const line = (x,y,end,color='#277bc2') => `<path d="M${x} ${y} H${end}" fill="none" stroke="${color}" stroke-width="5"/><path d="M${end-8} ${y-6} l8 6 -8 6" fill="none" stroke="${color}" stroke-width="3"/>`;
const box = (x,y,label,width=88) => `<rect x="${x}" y="${y}" width="${width}" height="40" rx="6" fill="#edf4fa" stroke="#718b9e"/>${text(x+width/2,y+26,label)}`;

function illustration(term) {
  let height=170, drawing='', caption='Simplified teaching view';
  const art=term.art;
  if(art==='optic' || art==='lc') {
    height=354;
    drawing=opticIllustration({id:`reference-${term.id}`,selected:art==='lc'?0:null}).drawing;
    caption=art==='lc'?'Two LC connections make one duplex pair.':'Optic front view · purple tab above the ports';
  } else if(art==='cas') {
    height=206; drawing=cassetteFront({name:'CAS',port:12,patched:true});
    caption='Site layout · 1–16 above 17–32';
  } else if(art==='mmc' || art==='ferrule') {
    drawing=`<g class="hardware-art" transform="translate(38 30) scale(2.3)">${mmcHead(0,0,false)}</g>`;
    if(art==='ferrule') drawing+=`<path d="M220 61 L310 29" stroke="#a74e28" stroke-width="2"/>${text(299,20,'Ferrule')}`;
    caption=art==='ferrule'?'The mating face holds aligned fibers.':'MMC head · side view';
  } else if(art==='loop') {
    const loop=loopIllustration('direct'); drawing=loop.drawing;height=loop.height;
    caption='Direct LC loop · TX returns to RX';
  } else if(art==='fanout') {
    drawing=`<g class="hardware-art">${mmcHead(240,58,false)}</g>`;
    [35,80,125].forEach((y,i)=>{drawing+=`<path d="M73 ${y} C160 ${y} 170 82 220 82" stroke="#e5b821" stroke-width="6" fill="none"/>${box(14,y-17,`Leg ${i+1}`,58)}`;});
    caption='Three followers shown · separate paths into one head';
  } else if(['tx','rx','polarity','ends','ir'].includes(art)) {
    drawing=box(10,30,'A · TX')+box(262,30,'B · RX')+line(108,50,251)+box(10,106,'A · RX')+box(262,106,'B · TX')+
      '<path d="M251 126 H108 m8 -6 -8 6 8 6" fill="none" stroke="#178b76" stroke-width="5"/>';
    caption='Two directions · each TX connects to the other RX';
    if(art==='ir') caption='Blue / teal represents invisible infrared light.';
  } else if(art==='lldp') {
    drawing=box(10,20,'Device A')+box(262,20,'Device B')+'<path d="M251 40 H108 m8 -6 -8 6 8 6" fill="none" stroke="#277bc2" stroke-width="3"/>'+
      box(24,90,'At A: neighbor B · port 7/1',312);
    caption='Neighbor identity and port · not an optical power reading';
  } else if(art==='power' || art==='dark') {
    drawing=`<rect x="39" y="24" width="282" height="104" rx="10" fill="${art==='dark'?'#fff0f2':'#edf5fa'}" stroke="${art==='dark'?'#bd3450':'#718b9e'}"/>`+
      text(180,55,'RX · example report')+`<text x="180" y="99" text-anchor="middle" style="font-size:32px;font-weight:700;fill:${art==='dark'?'#b51f38':'#173b59'}">${art==='dark'?'−40':'+0.25'} dBm</text>`;
    caption=art==='dark'?'No-light indication in our site report example':'Compare the reading with the installed optic’s limits.';
  } else if(art==='vfl') {
    drawing=box(10,58,'VFL')+line(105,78,304,'#d52942')+'<circle cx="317" cy="78" r="12" fill="#e22a43"/>'+text(183,128,'Isolated fiber → expected strand');
    caption='Visible red light · continuity is not a loss measurement';
  } else if(art==='ticket' || art==='rack') {
    drawing=box(24,15,art==='rack'?'QNO5 · 5C · 16f · 17 · 30':'Device → Ethernet 25/1',312)+
      box(24,73,art==='rack'?'Building / room / row / rack / height':'Leg 3 → named head → CAS 2 / 28',312);
    caption='Site example · confirm the actual labels and record';
  } else if(art==='misport') {
    drawing=box(218,20,'Port 12')+box(218,102,'Port 13')+line(22,122,208,'#d52942')+text(117,37,'Expected: 12');
    caption='Observed at 13 · check the mapping';
  } else {
    drawing='<path d="M25 74 H335" stroke="#e5b821" stroke-width="11"/>'+line(25,74,172);
    if(art==='splice') drawing+='<rect x="155" y="53" width="51" height="42" rx="6" fill="#dde8ed" stroke="#647d90"/>';
    drawing+=line(210,74,333,art==='loss'?'#b7d3e8':'#277bc2');
    caption=art==='loss'?'Power can decrease along the fiber and connections.':art==='splice'?'A splice joins two fiber ends.':'Light travels inside the fiber.';
  }
  return `<figure class="reference-art lesson-figure light-paused"><svg viewBox="0 0 360 ${height}" role="img" aria-label="${caption}">${drawing}</svg><figcaption>${caption}</figcaption></figure>`;
}

export function mountReference(menuPanel, closeMenu, menuButton) {
  const dialog=document.createElement('dialog');
  dialog.className='reference-dialog'; dialog.id='quick-reference';
  dialog.setAttribute('aria-labelledby','reference-title');
  dialog.innerHTML=`<div class="reference-top"><div><h2 id="reference-title">Quick reference</h2><p>Parts, terms &amp; acronyms</p></div><button type="button" class="reference-close" aria-label="Close quick reference">Close ×</button></div>
    <div class="reference-search"><label for="reference-query">Find a term</label><input id="reference-query" type="search" placeholder="Try optic, TX, polarity or CAS" autocomplete="off">
    <label class="reference-filter-label" for="reference-group">Show</label><select id="reference-group"><option value="">All topics</option>${referenceGroups.map(group=>`<option value="${group}">${group}</option>`).join('')}</select>
    <p id="reference-count" role="status" aria-live="polite"></p></div><div class="reference-results"></div>`;
  document.body.append(dialog);
  const input=dialog.querySelector('input'), select=dialog.querySelector('select'), results=dialog.querySelector('.reference-results');
  let returnFocus=null;
  const menuItem=document.createElement('button');
  menuItem.type='button'; menuItem.className='menu-reference'; menuItem.textContent='Quick reference';
  menuItem.setAttribute('aria-haspopup','dialog');
  menuPanel.insertBefore(menuItem,menuPanel.children[2]);

  function render(selected='') {
    const terms=searchReference(input.value,select.value);
    dialog.querySelector('#reference-count').textContent=`${terms.length} ${terms.length===1?'term':'terms'}`;
    results.innerHTML=terms.length?referenceGroups.map(group=>{
      const items=terms.filter(term=>term.group===group);
      return items.length?`<section class="reference-group"><h3>${group}</h3>${items.map(term=>`<details class="reference-entry" id="reference-${term.id}" ${selected===term.id?'open':''}>
        <summary><strong>${term.label}</strong><span>${term.also}</span></summary><div class="reference-definition">${illustration(term)}<p>${term.definition}</p><p><strong>Why it matters:</strong> ${term.purpose}</p>
        <a class="reference-lesson" href="./learn.html#${term.anchor}">See it in the lesson →</a>${term.source?`<a class="reference-source" href="${term.source[1]}" target="_blank" rel="noopener noreferrer">${term.source[0]} ↗</a>`:''}</div></details>`).join('')}</section>`:'';
    }).join(''):'<p class="reference-empty">No matching terms. Try “optic”, “polarity” or “VFL”, or choose All topics.</p>';
  }
  function open(id='', trigger=document.activeElement) {
    returnFocus=trigger===menuItem?menuButton:trigger;
    closeMenu(); input.value=''; select.value=''; render(id);
    dialog.showModal();
    if(id) {
      const selected=dialog.querySelector(`#reference-${id}`);
      selected?.querySelector('summary').focus({preventScroll:true});
      selected?.scrollIntoView({block:'nearest'});
    } else { results.scrollTop=0; input.focus({preventScroll:true}); }
  }
  menuItem.addEventListener('click',()=>open());
  dialog.querySelector('.reference-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{if(returnFocus?.isConnected) returnFocus.focus({preventScroll:true});});
  input.addEventListener('input',()=>render()); select.addEventListener('change',()=>render());
  results.addEventListener('click',event=>{
    const link=event.target.closest('.reference-lesson');
    if(!link || event.button!==0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if(document.querySelector('#lesson.course')) {
      event.preventDefault(); returnFocus=null; dialog.close();
      document.dispatchEvent(new CustomEvent('course:navigate',{detail:new URL(link.href).hash}));
    }
  });
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-reference]');
    if(button) open(button.dataset.reference,button);
  });
  document.addEventListener('fiber:language',()=>{if(dialog.open) render(dialog.querySelector('.reference-entry[open]')?.id.replace('reference-','')??'');});
  return {open};
}

// Only short teaching paragraphs are annotated; drawings, controls and exam answers stay intact.
const inlineTerms={optic:'optic',LC:'lc',MMC:'mmc',CAS:'cas',fanout:'fanout',follower:'follower',ferrule:'ferrule',TX:'tx',RX:'rx',IR:'ir',dBm:'dbm',attenuation:'attenuation',polarity:'polarity',loopback:'loopback',VFL:'vfl',continuity:'continuity',misport:'misport',splice:'splice',local:'local-remote',remote:'local-remote',FIM:'fim',LLDP:'lldp'};
Object.assign(inlineTerms,{'óptico':'optic',ramal:'follower','férula':'ferrule','atenuación':'attenuation',polaridad:'polarity',continuidad:'continuity',empalme:'splice',remoto:'local-remote'});
Object.assign(inlineTerms,{optique:'optic',branche:'follower','férule':'ferrule','atténuation':'attenuation','polarité':'polarity','continuité':'continuity','épissure':'splice',distant:'local-remote'});
Object.assign(inlineTerms,{'الوحدة الضوئية':'optic','وحدة ضوئية':'optic','الفرع':'follower','الفيرول':'ferrule','فيرول':'ferrule','التوهين':'attenuation','القطبية':'polarity','الاستمرارية':'continuity','حلقة العودة':'loopback','اللحام':'splice','الفان آوت':'fanout'});
const termPattern=new RegExp(`(?<![\\p{L}\\p{N}_])(${Object.keys(inlineTerms).join('|')})(?![\\p{L}\\p{N}_])`,'giu');
const paragraphSources=new WeakMap();
const termIds=Object.fromEntries(Object.entries(inlineTerms).map(([word,id])=>[word.toLowerCase(),id]));
export function linkLessonTerms(root) {
  root.querySelectorAll('.lesson-section').forEach(section=>{
    const seen=new Set(); let count=0;
    const paragraphs=[...section.children].filter(node=>node.matches('p:not(.picture-note):not(.topic-position)'));
    paragraphs.forEach(paragraph=>{
      if(!paragraphSources.has(paragraph)) paragraphSources.set(paragraph,paragraph.innerHTML);
      paragraph.dataset.i18nManaged='';
      paragraph.innerHTML=paragraphSources.get(paragraph);
      const sourceWalker=document.createTreeWalker(paragraph,NodeFilter.SHOW_TEXT);
      while(sourceWalker.nextNode()) sourceWalker.currentNode.nodeValue=formatBidi(translate(sourceWalker.currentNode.nodeValue));
      const walker=document.createTreeWalker(paragraph,NodeFilter.SHOW_TEXT,{acceptNode:node=>node.parentElement.closest('a,button')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
      const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node=>{
        const fragment=document.createDocumentFragment(); let start=0;
        for(const match of node.textContent.matchAll(termPattern)) {
          const id=termIds[match[0].toLowerCase()];
          if(count>=3 || seen.has(id) || (id==='ir'&&match[0]!=='IR')) continue;
          fragment.append(node.textContent.slice(start,match.index));
          const button=document.createElement('button'); button.type='button';button.className='reference-term';
          button.dataset.reference=id; button.textContent=match[0];button.setAttribute('aria-label',translate(`${match[0]}: definition`));button.setAttribute('aria-haspopup','dialog');
          fragment.append(button);start=match.index+match[0].length;seen.add(id);count++;
        }
        if(start) {fragment.append(node.textContent.slice(start));node.replaceWith(fragment);}
      });
    });
  });
}

document.addEventListener('fiber:language',()=>linkLessonTerms(document));
