import {rackJourneyIllustration} from './rack-visuals.mjs?v=7';
import {mmcHead, cassetteFront} from './loop-visuals.mjs?v=3';
import {opticIllustration} from './patching-visuals.mjs?v=1';
import {lightFlow,lightSource} from './light-visuals.mjs?v=1';

const text=(x,y,value)=>`<text x="${x}" y="${y}">${value}</text>`;
const cable=path=>`<path class="loop-jacket" d="${path}"/><path class="loop-cord" d="${path}"/>`;
const journeySteps=reverse=> {
  const from=reverse ? 'B' : 'A', to=reverse ? 'A' : 'B';
  const first=reverse ? 2 : 1, next=reverse ? 1 : 2;
  return [
  {label:`${from} → TX`,title:`1. Device ${from} sends data through its optic`,copy:`Device ${from} supplies electrical signals to its installed optic. TX converts those signals into infrared light carrying the data.`},
  {label:'LC → MMC',title:'2. Follow the leg up the rack',copy:'The LC follower runs up the cable manager to its MMC head. The head groups the fanout’s fibers; each keeps its own mapped path.'},
  {label:`Through CAS ${first}`,title:'3. The cassette passes the light onward',copy:'At the mapped CAS connection, the incoming fiber joins the onward fiber. The passive carries the light without reading the data or producing new light.'},
  {label:`CAS ${first} → ${next}`,title:'4. Light carries the data between cassettes',copy:`The onward fiber carries Device ${from}’s data as light from CAS ${first} to CAS ${next}. Follow that mapped route in FIM.`},
  {label:`RX → ${to}`,title:`5. Device ${to} receives the data`,copy:`The light reaches the installed optic’s RX. It converts that light back into electrical signals that Device ${to} can use.`}
  ];
};

function closeup(index,reverse) {
  const first=reverse ? 2 : 1;
  if(index===0 || index===4) {
    const receiving=index===4;
    const device=receiving ? reverse ? 'A' : 'B' : reverse ? 'B' : 'A';
    const face=opticIllustration({labels:false,optic:5,id:'journey-detail'}).drawing.replace(/<text\b[^>]*>[\s\S]*?<\/text>/g,'');
    const path=receiving ? 'M350 136 H196 Q149.5 136 149.5 101' : 'M149.5 85 Q149.5 136 196 136 H350';
    return `<rect class="journey-device-case" x="4" y="18" width="216" height="159" rx="6"/>
      ${text(16,41,`Device ${device}`)}<rect class="journey-data-chip" x="16" y="84" width="73" height="47" rx="4"/>
      ${text(37,112,'Data')}<svg x="114" y="30" width="100" height="98.33" viewBox="0 0 360 354">${face}</svg>
      <path class="journey-electrical" d="M90 110 H132"/>
      <path class="journey-data-cue" d="${receiving ? 'M101 105 l-7 5 7 5' : 'M121 105 l7 5 -7 5'}"/>
      ${cable(path)}${lightFlow(path)}${receiving ? '' : lightSource(149.5,85)}
      ${text(238,87,receiving ? 'RX: light → data' : 'TX: data → light')}
      ${text(16,163,'Electrical signals')}${text(248,163,'Light in fiber')}`;
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
      ${text(88,168,`CAS ${first} · enlarged side view`)}`;
  }
  const path=reverse ? 'M306 37 V117 Q306 145 280 145 H148 Q120 145 120 117 V37' : 'M120 37 V117 Q120 145 148 145 H280 Q306 145 306 117 V37';
  return `<svg x="0" y="0" width="174" height="99" viewBox="0 0 360 206">${cassetteFront({name:'CAS 1',port:12})}</svg>
    <svg x="186" y="0" width="174" height="99" viewBox="0 0 360 206">${cassetteFront({name:'CAS 2',port:12})}</svg>
    ${cable(path)}<rect class="hardware-plug" x="116" y="34" width="8" height="16" rx="1"/><rect class="hardware-plug" x="302" y="34" width="8" height="16" rx="1"/>
    ${lightFlow(path)}${text(110,178,'Fiber between passives')}`;
}

export function journeyFrame(elapsed,delta) {
  // A queued animation frame can be timestamped just before the Play event.
  const next=Math.min(18000,elapsed+Math.max(0,Math.min(delta,80)));
  return {elapsed:next,index:Math.min(4,Math.floor(next/3600))};
}

export function mountLightJourney(host) {
  let reverse=false, steps=journeySteps(false);
  host.innerHTML=`<div class="journey-direction" role="group" aria-label="Choose which device sends data"><button type="button" data-journey-direction="forward" aria-pressed="true">Device A → Device B</button><button type="button" data-journey-direction="return" aria-pressed="false">Device B → Device A</button></div>
    <p class="journey-purpose">The devices exchange data. Their optics convert it between electrical signals and light.</p>
    <div class="journey-toolbar"><button type="button" class="journey-play">Play journey</button><button type="button" class="journey-zoom" aria-pressed="false">Enlarge rack view</button></div>
    <div class="journey-map" tabindex="0" role="group" aria-label="Data between two devices. Scroll horizontally when enlarged."></div>
    <p class="journey-legend"><span>Electrical data inside the device</span><span>Data carried as light in fiber</span></p>
    <div class="journey-steps" role="group" aria-label="Explore the light path">${steps.map((step,i)=>`<button type="button" data-journey-step="${i}" aria-pressed="${i===0}" aria-controls="journey-detail"><span>${i+1}</span>${step.label}</button>`).join('')}</div>
    <div id="journey-detail" class="journey-detail"><div class="journey-description"><h4></h4><p></p></div><svg class="journey-closeup" viewBox="0 0 360 192" role="img"></svg></div>
    <p class="journey-status" role="status" aria-live="polite"></p>
    <p class="picture-note">Both devices can send and receive at once. Explore one direction at a time; this example uses a separate fiber path for each. Port 12 and elevation 30 are teaching examples. Blue represents invisible IR; fiber jackets do not glow.</p>`;
  const panel=host.closest('#lesson');
  const play=host.querySelector('.journey-play');
  let path, pulse, segments, lengths, starts, total, dataStart, dataEnd;
  let selected=-1, elapsed=0, running=false, frame=0, lastTime=0;
  const paused=()=>panel.classList.contains('light-paused');
  function drawScene() {
    const scene=rackJourneyIllustration(reverse), from=reverse ? 'B' : 'A', to=reverse ? 'A' : 'B';
    host.querySelector('.journey-map').innerHTML=`<svg viewBox="0 0 ${scene.width} ${scene.height}" role="img" aria-label="Device ${from} sends electrical data to its optic. Light carries that data through the fiber and cassettes to the other optic, which converts it back to electrical data for Device ${to}.">${scene.drawing}</svg>`;
    path=host.querySelector('.journey-measure'); pulse=host.querySelector('.journey-pulse');
    segments=[...host.querySelectorAll('[data-journey-segment]')];
    lengths=segments.map(segment=>segment.querySelector('.journey-stage-measure').getTotalLength());
    starts=lengths.map((_,i)=>lengths.slice(0,i).reduce((a,b)=>a+b,0));
    total=lengths.reduce((a,b)=>a+b,0);
    dataStart=host.querySelector('.journey-electrical-send').getTotalLength();
    dataEnd=total-host.querySelector('.journey-electrical-receive').getTotalLength();
    host.querySelectorAll('[data-journey-step]').forEach((button,i)=>button.innerHTML=`<span>${i+1}</span>${steps[i].label}`);
  }
  function marker(at) {
    const point=path.getPointAtLength(at), next=path.getPointAtLength(Math.min(total,at+.5)), previous=path.getPointAtLength(Math.max(0,at-.5));
    const angle=Math.atan2(next.y-previous.y,next.x-previous.x)*180/Math.PI;
    pulse.setAttribute('transform',`translate(${point.x} ${point.y}) rotate(${angle})`);
    pulse.classList.toggle('journey-data',at<dataStart || at>dataEnd);
  }
  function show(index) {
    selected=index;
    const step=steps[index];
    host.querySelector('.journey-description h4').textContent=step.title;
    host.querySelector('.journey-description p').textContent=step.copy;
    const detail=host.querySelector('.journey-closeup');
    detail.innerHTML=closeup(index,reverse); detail.setAttribute('aria-label',step.title+'. '+step.copy);
    host.querySelectorAll('[data-journey-step]').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
    segments.forEach((segment,i)=>segment.classList.toggle('journey-reached',i<=index));
    host.querySelectorAll('[data-journey-focus]').forEach((focus,i)=>focus.classList.toggle('journey-current',i===index));
  }
  function stop(label='Play journey') { running=false; cancelAnimationFrame(frame); play.textContent=label; }
  function tick(time) {
    if(!running) return;
    const next=journeyFrame(elapsed,time-lastTime); elapsed=next.elapsed; lastTime=time;
    const index=next.index;
    if(index!==selected) show(index);
    marker(starts[index]+lengths[index]*(elapsed/3600-index));
    if(elapsed===18000) { stop('Replay journey'); host.querySelector('.journey-status').textContent=`Device ${reverse ? 'A' : 'B'} has received the data through its optic. Switch direction to see the other device send.`; return; }
    frame=requestAnimationFrame(tick);
  }
  play.addEventListener('click',()=> {
    if(running) { stop('Resume journey'); host.querySelector('.journey-status').textContent='Journey paused. Explore a connection or resume.'; return; }
    // Explicit play also enables the chapter's existing motion control.
    if(paused()) panel.querySelector('.lesson-motion').click();
    if(elapsed===18000) elapsed=0;
    if(elapsed===0) { show(0); marker(0); }
    running=true; lastTime=performance.now(); play.textContent='Pause journey';
    host.querySelector('.journey-status').textContent=`Following Device ${reverse ? 'B' : 'A'}’s data: electrical signals → light → electrical signals for Device ${reverse ? 'A' : 'B'}.`;
    frame=requestAnimationFrame(tick);
  });
  host.querySelectorAll('[data-journey-step]').forEach(button=>button.addEventListener('click',()=> {
    stop(); elapsed=0; const index=Number(button.dataset.journeyStep); show(index); marker(starts[index]+lengths[index]*.5);
    host.querySelector('.journey-status').textContent=steps[index].title;
  }));
  host.querySelectorAll('[data-journey-direction]').forEach(button=>button.addEventListener('click',()=> {
    stop(); elapsed=0; reverse=button.dataset.journeyDirection==='return'; steps=journeySteps(reverse);
    host.querySelectorAll('[data-journey-direction]').forEach(option=>option.setAttribute('aria-pressed',String(option===button)));
    drawScene(); show(0); marker(0);
    host.querySelector('.journey-status').textContent=`Device ${reverse ? 'B' : 'A'} is ready to send. Press Play journey to follow its data.`;
  }));
  host.querySelector('.journey-zoom').addEventListener('click',event=> {
    const zoomed=host.querySelector('.journey-map').classList.toggle('journey-enlarged');
    event.currentTarget.setAttribute('aria-pressed',String(zoomed)); event.currentTarget.textContent=zoomed ? 'Fit both racks' : 'Enlarge rack view';
  });
  new MutationObserver(()=> { if(paused() && running) { stop('Resume journey'); host.querySelector('.journey-status').textContent='Light motion paused. You can still select each connection.'; } }).observe(panel,{attributes:true,attributeFilter:['class']});
  document.addEventListener('visibilitychange',()=> { if(document.hidden && running) stop('Resume journey'); });
  drawScene(); show(0); marker(0);
  host.querySelector('.journey-status').textContent='Play the journey, or select a connection to see its close-up.';
}
