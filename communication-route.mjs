import {communicationRack} from './rack-visuals.mjs?v=8';
import {cassetteFront,mmcHead} from './loop-visuals.mjs?v=4';
import {lightFlow} from './light-visuals.mjs?v=1';

const nodes=[
  {id:'A',kind:'device',name:'Device A',x:97,tx:612,rx:636},
  {id:'A1',kind:'rack',name:'Rack CAS',x:159,y:489},
  {id:'A2',kind:'distribution',name:'Distribution CAS',x:462,y:448},
  {id:'A3',kind:'passage',name:'Room passage',x:462,y:203},
  {id:'B3',kind:'passage',name:'Room passage',x:782,y:203},
  {id:'B2',kind:'distribution',name:'Distribution CAS',x:782,y:448},
  {id:'B1',kind:'rack',name:'Rack CAS',x:979,y:489},
  {id:'B',kind:'device',name:'Device B',x:917,tx:612,rx:636}
];

// One mapped strand at a time. Reversing uses the other optic's TX and
// the first optic's RX, never the same TX-to-TX path run backwards.
export function communicationRoute(reverse=false) {
  const route=nodes.map(node=>({...node}));
  if(reverse) route.reverse();
  const from=route[0], to=route.at(-1);
  const paths=[
    [[97,612],[62,612],[62,489],[159,489]],
    [[159,489],[159,526],[462,526],[462,448]],
    [[462,448],[543,448],[543,260],[462,260],[462,203]],
    [[462,203],[462,100],[782,100],[782,203]],
    [[782,203],[782,260],[602,260],[602,448],[782,448]],
    [[782,448],[782,526],[979,526],[979,489]],
    [[979,489],[1052,489],[1052,636],[917,636]]
  ];
  if(reverse) {
    paths.reverse().forEach(points=>points.reverse());
    paths[0][0]=[917,612]; paths[0][1]=[1052,612];
    paths.at(-1)[paths.at(-1).length-2]=[62,636];
    paths.at(-1)[paths.at(-1).length-1]=[97,636];
  }
  const steps=[{label:`${from.id} · TX`,title:`Device ${from.id} turns data into light`,
    copy:'The device supplies electrical data to its optic. TX produces infrared light carrying that data into one strand of the LC connection.',
    kind:'send',node:from,points:[[from.x+90,from.tx],[from.x,from.tx]]}];
  route.slice(1).forEach((node,i)=> {
    const previous=route[i];
    const receiving=node.kind==='device';
    let copy=receiving
      ? `From ${previous.id}, the MMC head fans out to LC legs. The mapped receiving strand reaches Device ${node.id}’s RX, which converts the light back into electrical data.`
      : previous.kind==='device'
        ? `Follow the LC leg up the rack to its female MMC head at the rear of ${node.id}. The mapped connection carries the light through to the male MMC on the front, then into the onward fiber.`
        : node.kind==='passage' && previous.kind==='passage'
          ? `The inter-room fiber joins ${previous.id} to ${node.id}. This passive is the entry point on the other side of this example route. It passes the same optical signal onward.`
          : node.kind==='rack'
            ? `From ${previous.id}, the fiber reaches ${node.id} at the device rack. In this site example, light enters through the front male MMC and leaves through the rear female MMC toward the LC fanout.`
            : `The onward fiber from ${previous.id} reaches ${node.id}, the ${node.name.toLowerCase()}. Its mapped connection passes the light into the next fiber section. It does not read the data or create new light.`;
    steps.push({label:receiving ? `${node.id} · RX` : node.id,
      title:receiving ? `Device ${node.id} receives the light` : `${node.id} · ${node.name}`,
      copy,kind:receiving ? 'receive' : node.kind,node,previous,points:paths[i]});
  });
  steps.push({label:`Data → ${to.id}`,title:`Device ${to.id} can use the data`,
    copy:`RX converts the received light into electrical signals for Device ${to.id}. To send data back, Device ${to.id} uses its own TX and a separate mapped strand to Device ${from.id}’s RX.`,
    kind:'data',node:to,points:[[to.x,to.rx],[to.x+90,to.rx]]});
  return {from,to,nodes:route,steps};
}

// Round cable corners without changing the connection endpoints.
export function cablePath(points) {
  const number=n=>Number(n.toFixed(2));
  let d=`M${points[0].join(' ')}`;
  for(let i=1;i<points.length-1;i++) {
    const [x,y]=points[i], previous=points[i-1], next=points[i+1];
    const before=Math.hypot(x-previous[0],y-previous[1]);
    const after=Math.hypot(next[0]-x,next[1]-y);
    const r=Math.min(14,before/2,after/2);
    d+=` L${number(x+(previous[0]-x)*r/before)} ${number(y+(previous[1]-y)*r/before)} Q${x} ${y} ${number(x+(next[0]-x)*r/after)} ${number(y+(next[1]-y)*r/after)}`;
  }
  return d+` L${points.at(-1).join(' ')}`;
}
const text=(x,y,value,cls='')=>`<text x="${x}" y="${y}" class="${cls}">${value}</text>`;
const cable=path=>`<path class="rack-route-outline" d="${path}"/><path class="rack-route" d="${path}"/>`;

function scene(route,atB) {
  const reverse=route.from.id==='B';
  let drawing=`<g class="rack-art link-racks hardware-art">
    <rect class="comm-room" x="12" y="28" width="548" height="730" rx="12"/>
    <rect class="comm-room" x="580" y="28" width="548" height="730" rx="12"/>
    ${text(32,58,'ROOM A','comm-room-title')}${text(600,58,'ROOM B','comm-room-title')}
    ${text(620,79,'Fiber between rooms','comm-center')}`;
  for(const [name,x] of [['A',20],['B',840]]) {
    drawing+=`<g transform="translate(${x} 200) scale(1.2)">${communicationRack(name,name==='B' ? atB : !atB)}</g>`;
  }
  for(const node of nodes.filter(node=>['distribution','passage'].includes(node.kind))) {
    const x=node.id[0]==='A' ? 310 : 630, y=node.kind==='passage' ? 160 : 405;
    drawing+=`<g data-cas="${node.id}">${text(x+110,y+5,`${node.id} · ${node.name}`,'comm-center')}<svg class="comm-cassette" x="${x}" y="${y}" width="220" height="127.1" viewBox="0 0 360 208">${cassetteFront({name:node.id,port:12})}</svg>
      <rect class="hardware-plug" x="${node.x-6}" y="${node.y-3}" width="12" height="22" rx="2"/>
      <rect class="hardware-boot" x="${node.x-4}" y="${node.y+19}" width="8" height="7" rx="1"/>
      ${text(x+110,y+142,'Port 12 · mapped pair','comm-center comm-small')}</g>`;
  }
  route.steps.forEach((step,i)=> {
    const d=cablePath(step.points), electrical=i===0 || i===8;
    drawing+=`<g data-route-segment="${i}" class="${electrical ? 'comm-electrical' : ''}">
      ${electrical ? '' : cable(d)}<path class="comm-lit" d="${d}"/><path class="comm-measure" d="${d}"/></g>`;
  });
  for(const [name,x] of [['A',20],['B',840]]) {
    drawing+=`<g transform="translate(${x} 200) scale(1.2)">
      <rect class="hardware-plug" x="108" y="226" width="16" height="31" rx="2"/>
      <path class="hardware-grip" d="M111 236 h10 M111 242 h10 M111 248 h10"/>
      <rect class="hardware-boot" x="110" y="257" width="12" height="7" rx="1"/>
      ${text(83,281,'MMC head','rack-label rack-on-dark rack-small')}
      <rect class="hardware-plug" x="60" y="339" width="8" height="8" rx="1"/>
      <rect class="hardware-plug" x="60" y="359" width="8" height="8" rx="1"/>
      </g>`;
  }
  drawing+=`${text(295,358,reverse ? 'Passage → distribution → rack' : 'Rack → distribution → passage','comm-center comm-small')}
    ${text(829,358,reverse ? 'Rack → distribution → passage' : 'Passage → distribution → rack','comm-center comm-small')}
    <g class="comm-focus"><circle r="23"/><circle r="17"/></g>
    <g class="comm-pulse" aria-hidden="true"><circle r="12"/><path d="M-8 -6 L5 0 L-8 6 L-4 0 Z"/></g>
    ${text(570,742,'Same optical signal · six passive connection points','comm-center')}</g>`;
  return drawing;
}

function detail(step,reverse) {
  const color=reverse ? 'return-ir' : 'ir';
  if(['send','receive','data'].includes(step.kind)) {
    const receiving=step.kind!=='send';
    const path=receiving ? 'M405 103 H230' : 'M230 103 H405';
    return `<rect class="journey-device-case" x="12" y="40" width="238" height="115" rx="8"/>
      ${text(28,64,step.node.name)}<rect class="journey-data-chip" x="28" y="88" width="65" height="41" rx="4"/>
      ${text(40,114,'Data')}<path class="journey-electrical" d="M94 103 H151"/>
      <rect class="hardware-metal" x="152" y="78" width="78" height="61" rx="3"/>
      <path class="optic-pull" d="M148 89 V70 H234 V89 H227 V77 H155 V89Z"/>
      ${text(174,114,receiving ? 'RX' : 'TX')}${cable(path)}${lightFlow(path,color)}
      ${text(276,78,'LC strand')}${text(28,183,receiving ? 'Light → electrical data' : 'Electrical data → light')}`;
  }
  const rack=step.kind==='rack', incoming=rack && step.previous.kind==='device';
  const left=rack ? 'Rear · female MMC' : 'Incoming MMC';
  const right=rack ? 'Front · male MMC' : 'Onward MMC';
  const path=rack && !incoming ? 'M408 103 H12' : 'M12 103 H408';
  return `<rect class="rack-cutaway-body" x="173" y="48" width="74" height="104" rx="5"/>
    <rect class="cassette-adapter" x="166" y="79" width="13" height="48" rx="2"/>
    <rect class="cassette-adapter" x="241" y="79" width="13" height="48" rx="2"/>
    ${mmcHead(83,79,false)}<g transform="translate(420 0) scale(-1 1)">${mmcHead(83,79,false)}</g>
    ${cable(path)}${lightFlow(path,color)}${text(210,70,step.node.id,'comm-center comm-on-dark')}
    ${text(10,28,left)}${text(410,28,right,'comm-end')}
    ${text(10,159,rack ? 'LC fanout side' : `From ${step.previous.id}`)}${text(410,159,rack ? 'Onward fiber' : 'Next fiber section','comm-end')}
    ${text(210,189,'Enlarged connection · light passes through','comm-center')}`;
}

export function mountCommunicationRoute(host) {
  let reverse=false, atB=false, index=0, running=false, frame=0, lastTime=0, elapsed=0;
  let route=communicationRoute(), paths=[], lengths=[];
  host.className='communication-route';
  host.innerHTML=`<div class="comm-controls">
    <div><span>Your viewpoint</span><div role="group" aria-label="Choose the local device"><button type="button" data-local="A" aria-pressed="true">At device A</button><button type="button" data-local="B" aria-pressed="false">At device B</button></div></div>
    <div><span>Follow the data</span><div role="group" aria-label="Light direction"><button type="button" data-direction="A" aria-pressed="true">A → B</button><button type="button" data-direction="B" aria-pressed="false">B → A</button></div></div></div>
    <div class="journey-toolbar"><button type="button" class="comm-play">Follow light</button><button type="button" class="comm-back">← Back</button><button type="button" class="comm-next">Next →</button><button type="button" class="comm-zoom" aria-pressed="false">Enlarge map</button></div>
    <div class="comm-map" tabindex="0" role="group" aria-label="Example route across two rooms. Scroll horizontally when enlarged."></div>
    <p class="comm-key">Yellow: fiber · Blue / teal: invisible IR · Purple: electrical data</p>
    <div class="comm-steps" role="group" aria-label="Explore each connection"></div>
    <div class="comm-detail"><div><p class="comm-counter"></p><h4></h4><p class="comm-copy"></p></div><svg viewBox="0 0 420 205" role="img" class="hardware-art"></svg></div>
    <p class="comm-status" role="status"></p>
    <p class="picture-note">One mapped strand is highlighted at a time. Both devices can transmit at once on separate strands. The other fanout legs are omitted for clarity. Rear/front geometry is opened out in the close-up; the overview shows connection order.</p>`;
  const panel=host.closest('.course-chapter-body, #lesson'), map=host.querySelector('.comm-map'), play=host.querySelector('.comm-play');
  function stop() { running=false; cancelAnimationFrame(frame); play.textContent='Follow light'; }
  function draw() {
    route=communicationRoute(reverse);
    host.classList.toggle('comm-reverse',reverse);
    map.innerHTML=`<svg viewBox="0 0 1140 780" role="img" aria-label="${route.from.name} TX through rack CAS, distribution CAS and room passage, across rooms, through three more passives to ${route.to.name} RX.">${scene(route,atB)}</svg>`;
    paths=[...host.querySelectorAll('.comm-measure')]; lengths=paths.map(path=>path.getTotalLength());
    host.querySelector('.comm-steps').innerHTML=route.steps.map((step,i)=>`<button type="button" data-route-step="${i}" aria-pressed="false"><span>${i+1}</span>${step.label}</button>`).join('');
    show(index);
  }
  function marker(progress) {
    const path=paths[index], at=lengths[index]*progress, p=path.getPointAtLength(at);
    const before=path.getPointAtLength(Math.max(0,at-.5)), after=path.getPointAtLength(Math.min(lengths[index],at+.5));
    const pulse=host.querySelector('.comm-pulse');
    pulse.setAttribute('transform',`translate(${p.x} ${p.y}) rotate(${Math.atan2(after.y-before.y,after.x-before.x)*180/Math.PI})`);
    pulse.classList.toggle('comm-data',index===0 || index===8);
  }
  function focusMap() {
    if(!map.classList.contains('comm-enlarged')) return;
    map.scrollLeft=route.steps[index].node.x*map.scrollWidth/1140-map.clientWidth/2;
  }
  function show(next) {
    index=next; elapsed=0;
    const step=route.steps[index];
    host.querySelectorAll('[data-route-step]').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
    host.querySelectorAll('[data-route-segment]').forEach((segment,i)=>segment.classList.toggle('comm-reached',i<=index));
    host.querySelector('.comm-counter').textContent=`Step ${index+1} of ${route.steps.length}`;
    host.querySelector('.comm-detail h4').textContent=step.title;
    host.querySelector('.comm-copy').textContent=step.copy;
    const closeup=host.querySelector('.comm-detail svg'); closeup.innerHTML=detail(step,reverse); closeup.setAttribute('aria-label',step.title+'. '+step.copy);
    host.querySelector('.comm-focus').setAttribute('transform',`translate(${step.node.x} ${step.node.y ?? (index===0 ? step.node.tx : step.node.rx)})`);
    host.querySelector('.comm-back').disabled=index===0; host.querySelector('.comm-next').disabled=index===8;
    host.querySelector('.comm-status').textContent=`${atB ? 'B' : 'A'} is local; ${atB ? 'A' : 'B'} is remote. Following ${route.from.id} TX → ${route.to.id} RX. ${step.title}.`;
    marker(running ? 0 : .5); focusMap();
  }
  function tick(time) {
    if(!running) return;
    elapsed+=Math.max(0,Math.min(time-lastTime,80)); lastTime=time;
    marker(Math.min(1,elapsed/2800));
    if(elapsed>=2800) { if(index===8) { stop(); return; } show(index+1); }
    frame=requestAnimationFrame(tick);
  }
  host.addEventListener('click',event=> {
    const button=event.target.closest('button'); if(!button) return;
    if(button.hasAttribute('data-local')) {
      atB=button.dataset.local==='B'; stop();
      host.querySelectorAll('[data-local]').forEach(item=>item.setAttribute('aria-pressed',String(item===button))); draw();
    } else if(button.hasAttribute('data-direction')) {
      reverse=button.dataset.direction==='B'; index=0; stop();
      host.querySelectorAll('[data-direction]').forEach(item=>item.setAttribute('aria-pressed',String(item===button))); draw();
    } else if(button.hasAttribute('data-route-step')) { stop(); show(Number(button.dataset.routeStep)); }
    else if(button.classList.contains('comm-back')) { stop(); show(index-1); }
    else if(button.classList.contains('comm-next')) { stop(); show(index+1); }
    else if(button===play) {
      if(running) { stop(); return; }
      if(panel.classList.contains('light-paused')) panel.querySelector('.lesson-motion').click();
      if(index===8) show(0);
      elapsed=0; lastTime=performance.now(); running=true; play.textContent='Pause journey'; frame=requestAnimationFrame(tick);
    } else if(button.classList.contains('comm-zoom')) {
      const enlarged=map.classList.toggle('comm-enlarged'); button.setAttribute('aria-pressed',String(enlarged)); button.textContent=enlarged ? 'Fit full route' : 'Enlarge map';
      focusMap();
    }
  });
  new MutationObserver(()=>{ if(panel.classList.contains('light-paused')) stop(); }).observe(panel,{attributes:true,attributeFilter:['class']});
  document.addEventListener('visibilitychange',()=> { if(document.hidden) stop(); });
  draw();
}
