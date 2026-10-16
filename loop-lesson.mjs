import {rackJourneyIllustration} from './rack-visuals.mjs?v=5';
import {mmcHead, cassetteFront} from './loop-visuals.mjs?v=3';
import {opticIllustration} from './patching-visuals.mjs?v=1';
import {lightFlow,lightSource} from './light-visuals.mjs?v=1';

const text=(x,y,value)=>`<text x="${x}" y="${y}">${value}</text>`;
const cable=path=>`<path class="loop-jacket" d="${path}"/><path class="loop-cord" d="${path}"/>`;
const steps=[
  {label:'Optic',title:'1. The optic makes the light',copy:'TX turns device data into infrared light and sends it into the connected LC fiber.'},
  {label:'LC → MMC',title:'2. Follow the leg up the rack',copy:'The LC follower runs up the cable manager to its MMC head. The head groups the fanout’s fibers; each keeps its own mapped path.'},
  {label:'Through CAS 1',title:'3. The cassette passes the light onward',copy:'At the mapped CAS connection, the incoming fiber joins the onward fiber. The cassette does not produce or boost light.'},
  {label:'CAS 1 → CAS 2',title:'4. Light travels between cassettes',copy:'The onward fiber carries the same light from CAS 1 to the mapped connection at CAS 2. Follow that route in FIM.'},
  {label:'To RX',title:'5. The receiving optic reads the light',copy:'From CAS 2, the mapped LC follower reaches the other optic’s RX. That optic converts the arriving light back into device data.'}
];

function closeup(index) {
  if(index===0 || index===4) {
    const receiving=index===4;
    const face=opticIllustration({labels:false,optic:5,id:'journey-detail'}).drawing.replace(/<text\b[^>]*>[\s\S]*?<\/text>/g,'');
    const path=receiving ? 'M342 132 H105 Q64 132 64 116' : 'M64 87 Q64 109 105 109 H342';
    return `<svg x="0" y="-12" width="180" height="177" viewBox="0 0 360 354">${face}</svg>
      ${cable(path)}${lightFlow(path)}${receiving ? '' : lightSource(64,87)}
      ${text(194,76,receiving ? 'Light → device data' : 'Device data → light')}
      ${text(194,97,receiving ? 'RX receives' : 'TX sends')}${text(194,155,'LC follower')}`;
  }
  if(index===1) {
    const selected=5;
    let drawing='';
    for(let i=0;i<12;i++) {
      const end=79+i*1.4;
      const path=`M18 ${18+i*12} C130 ${18+i*12} 130 ${end} 249 ${end}`;
      drawing+=`<path class="journey-fanout-leg${i===selected ? ' journey-chosen-leg' : ''}" d="${path}"/>`;
      if(i===selected) drawing+=lightFlow(path);
    }
    return drawing+mmcHead(249,63,false)+text(16,172,'LC followers')+text(249,142,'MMC head');
  }
  if(index===2) {
    const path='M12 91 H348';
    return `<rect class="hardware-detail" x="149" y="42" width="61" height="100" rx="5"/>
      <rect class="cassette-adapter" x="161" y="60" width="38" height="63" rx="3"/>
      ${mmcHead(78,67,false)}<g transform="translate(360 0) scale(-1 1)">${mmcHead(78,67,false)}</g>
      ${cable(path)}${lightFlow(path)}${text(12,27,'From LC / MMC')}${text(234,27,'To onward fiber')}
      ${text(88,168,'CAS 1 · enlarged side view')}`;
  }
  const path='M120 37 V117 Q120 145 148 145 H280 Q306 145 306 117 V37';
  return `<svg x="0" y="0" width="174" height="99" viewBox="0 0 360 206">${cassetteFront({name:'CAS 1',port:12})}</svg>
    <svg x="186" y="0" width="174" height="99" viewBox="0 0 360 206">${cassetteFront({name:'CAS 2',port:12})}</svg>
    ${cable(path)}<rect class="hardware-plug" x="116" y="34" width="8" height="16" rx="1"/><rect class="hardware-plug" x="302" y="34" width="8" height="16" rx="1"/>
    ${lightFlow(path)}${text(110,178,'Fiber between passives')}`;
}

export function mountLightJourney(host) {
  const scene=rackJourneyIllustration();
  host.innerHTML=`<div class="journey-toolbar"><button type="button" class="journey-play">Play journey</button><button type="button" class="journey-zoom" aria-pressed="false">Enlarge rack view</button></div>
    <div class="journey-map" tabindex="0" role="group" aria-label="Rack-to-rack fiber path. Scroll horizontally when enlarged."><svg viewBox="0 0 ${scene.width} ${scene.height}" role="img" aria-label="A continuous fiber path from the local optic, up its LC leg to the MMC head at CAS 1, across to CAS 2, and down to the receiving optic.">${scene.drawing}</svg></div>
    <div class="journey-steps" role="group" aria-label="Explore the light path">${steps.map((step,i)=>`<button type="button" data-journey-step="${i}" aria-pressed="${i===0}" aria-controls="journey-detail"><span>${i+1}</span>${step.label}</button>`).join('')}</div>
    <div id="journey-detail" class="journey-detail"><div class="journey-description"><h4></h4><p></p></div><svg class="journey-closeup" viewBox="0 0 360 192" role="img"></svg></div>
    <p class="journey-status" role="status" aria-live="polite"></p>
    <p class="picture-note">One mapped path shown. Port 12 and elevation 30 are teaching examples. Blue represents invisible IR; fiber jackets do not glow. The opposite direction uses the other optic’s TX and a separate mapped path.</p>`;
  const panel=host.closest('#lesson');
  const play=host.querySelector('.journey-play');
  const path=host.querySelector('.journey-measure');
  const pulse=host.querySelector('.journey-pulse');
  const segments=[...host.querySelectorAll('[data-journey-segment]')];
  const lengths=segments.map(segment=>segment.querySelector('.journey-lit-path').getTotalLength());
  const starts=lengths.map((_,i)=>lengths.slice(0,i).reduce((a,b)=>a+b,0));
  const total=lengths.reduce((a,b)=>a+b,0);
  let selected=-1, elapsed=0, running=false, frame=0, lastTime=0;
  const paused=()=>panel.classList.contains('light-paused');
  function marker(at) {
    const point=path.getPointAtLength(at), next=path.getPointAtLength(Math.min(total,at+.5)), previous=path.getPointAtLength(Math.max(0,at-.5));
    const angle=Math.atan2(next.y-previous.y,next.x-previous.x)*180/Math.PI;
    pulse.setAttribute('transform',`translate(${point.x} ${point.y}) rotate(${angle})`);
  }
  function show(index) {
    selected=index;
    const step=steps[index];
    host.querySelector('.journey-description h4').textContent=step.title;
    host.querySelector('.journey-description p').textContent=step.copy;
    const detail=host.querySelector('.journey-closeup');
    detail.innerHTML=closeup(index); detail.setAttribute('aria-label',step.title+'. '+step.copy);
    host.querySelectorAll('[data-journey-step]').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
    segments.forEach((segment,i)=>segment.classList.toggle('journey-reached',i<=index));
    host.querySelectorAll('[data-journey-focus]').forEach((focus,i)=>focus.classList.toggle('journey-current',i===index));
  }
  function stop(label='Play journey') { running=false; cancelAnimationFrame(frame); play.textContent=label; }
  function tick(time) {
    if(!running) return;
    elapsed=Math.min(18000,elapsed+Math.min(time-lastTime,80)); lastTime=time;
    const index=Math.min(4,Math.floor(elapsed/3600));
    if(index!==selected) show(index);
    marker(starts[index]+lengths[index]*(elapsed/3600-index));
    if(elapsed===18000) { stop('Replay journey'); host.querySelector('.journey-status').textContent='Light has reached the other optic’s RX. Select any step to explore it again.'; return; }
    frame=requestAnimationFrame(tick);
  }
  play.addEventListener('click',()=> {
    if(running) { stop('Resume journey'); host.querySelector('.journey-status').textContent='Journey paused. Explore a connection or resume.'; return; }
    // Explicit play also enables the chapter's existing motion control.
    if(paused()) panel.querySelector('.lesson-motion').click();
    if(elapsed===18000) elapsed=0;
    if(elapsed===0) { show(0); marker(0); }
    running=true; lastTime=performance.now(); play.textContent='Pause journey';
    host.querySelector('.journey-status').textContent='Following one TX light path to the receiving optic.';
    frame=requestAnimationFrame(tick);
  });
  host.querySelectorAll('[data-journey-step]').forEach(button=>button.addEventListener('click',()=> {
    stop(); elapsed=0; const index=Number(button.dataset.journeyStep); show(index); marker(starts[index]+lengths[index]*.5);
    host.querySelector('.journey-status').textContent=steps[index].title;
  }));
  host.querySelector('.journey-zoom').addEventListener('click',event=> {
    const zoomed=host.querySelector('.journey-map').classList.toggle('journey-enlarged');
    event.currentTarget.setAttribute('aria-pressed',String(zoomed)); event.currentTarget.textContent=zoomed ? 'Fit both racks' : 'Enlarge rack view';
  });
  new MutationObserver(()=> { if(paused() && running) { stop('Resume journey'); host.querySelector('.journey-status').textContent='Light motion paused. You can still select each connection.'; } }).observe(panel,{attributes:true,attributeFilter:['class']});
  document.addEventListener('visibilitychange',()=> { if(document.hidden && running) stop('Resume journey'); });
  show(0); marker(0);
  host.querySelector('.journey-status').textContent='Play the journey, or select a connection to see its close-up.';
}
