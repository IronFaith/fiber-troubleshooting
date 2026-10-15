import { loopIllustration, mmcHead, patchRouteIllustration, mmcPatchingIllustration } from './loop-visuals.mjs?v=2';

function el(tag, className = '', text = '') {
  const item = document.createElement(tag);
  if (className) item.className = className;
  if (text) item.textContent = text;
  return item;
}
function link(text, href, className = '') {
  const item = el('a', className, text); item.href = href; return item;
}

const menu = el('nav', 'learn-nav');
menu.setAttribute('aria-label', 'Learning resources');
const menuButton = el('button', 'learn-toggle', 'Learn');
menuButton.type = 'button';
menuButton.setAttribute('aria-expanded', 'false');
menuButton.setAttribute('aria-controls', 'learn-links');
menuButton.setAttribute('aria-label', 'Learn');
const menuPanel = el('div', 'learn-menu');
menuPanel.id = 'learn-links'; menuPanel.hidden = true;
menuPanel.append(el('p', '', 'Learning resources'));
const chapterLink = link('Chapter 1 · Optics, fiber & light', './learn.html');
const devicesLink = link('Chapter 2 · Device locations & links', './devices.html');
const patchingLink = link('Chapter 3 · FIM, LC & MMC patching', './patching.html');
const quizLink = link('Beginner knowledge check', './quiz.html');
if (document.querySelector('#quiz')) quizLink.setAttribute('aria-current', 'page');
menuPanel.append(chapterLink, devicesLink, patchingLink, quizLink, link('Back to troubleshooting', './index.html', 'menu-return'));
menu.append(menuButton, menuPanel);
document.querySelector('header').append(menu);
function closeMenu(restoreFocus = false) {
  menuPanel.hidden = true; menuButton.setAttribute('aria-expanded', 'false');
  if (restoreFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  menuPanel.hidden = !menuPanel.hidden;
  menuButton.setAttribute('aria-expanded', String(!menuPanel.hidden));
});
menuPanel.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('click', event => { if (!menu.contains(event.target)) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !menuPanel.hidden) { event.preventDefault(); closeMenu(true); }
});

const lesson = document.querySelector('#lesson');

function renderLesson() {
  chapterLink.setAttribute('aria-current', 'page');
  lesson.innerHTML = `
    <div class="chapter-heading"><p class="chapter-count">Chapter 1</p><button type="button" class="lesson-motion"></button></div>
    <h2 id="lesson-title">Optics, fiber & light</h2>
    <p class="lesson-intro">Follow the light from the optic, through the fiber, to the test.</p>
    <nav class="lesson-jumps" aria-label="In this chapter">
      <a href="#optics">Light sources</a><a href="#path">Fiber path</a><a href="#loopbacks">Loopbacks</a><a href="#cleaning">Faults</a><a href="#vfl">VFL tracing</a>
    </nav>
    <section id="optics" class="lesson-section" aria-labelledby="light-title">
      <h3 id="light-title">Two light sources, different jobs</h3>
      <div class="light-comparison">
        <div class="light-example ir-example"><h4>Optic · infrared</h4><div id="ir-picture"></div><p>Converts device data into light. <b>TX sends. RX receives.</b></p><span class="light-key ir-key">Invisible to your eyes · blue is illustrative</span></div>
        <div class="light-example red-example"><h4>VFL · visible red</h4><div id="red-picture"></div><p>A separate tool sends red light into <b>isolated fiber</b> to trace it.</p><span class="light-key red-key">Visible red · does not carry network data</span></div>
      </div>
      <p class="picture-note">Moving light shows direction. Fiber does not normally glow along its whole jacket. Never look into a fiber end.</p>
    </section>
    <section id="path" class="lesson-section" aria-labelledby="path-title">
      <h3 id="path-title">The fiber carries the light</h3>
      <p class="section-intro">In your layout: LC followers join an MMC leader at the passive.</p>
      <div id="path-picture"></div>
      <p class="lesson-takeaway">A passive routes light; it does not make it. Follow the mapped port, strand and TX → RX pairing.</p>
    </section>
    <section id="loopbacks" class="lesson-section" aria-labelledby="loop-title">
      <h3 id="loop-title">Bring TX light back to RX</h3>
      <p class="section-intro">Move the loop to see what you are testing.</p>
      <div id="loop-picture"></div>
      <div id="readings" class="learning-readings"><span><b>RX +0.25</b> your good example</span><span><b>RX −40</b> your no-light indication</span></div>
      <p class="picture-note">dBm examples. Check every lane against the optic’s limits. Use the correct loop mapping and any required attenuation.</p>
    </section>
    <section id="cleaning" class="lesson-section" aria-labelledby="fault-title">
      <h3 id="fault-title">What can interrupt the light?</h3>
      <p class="section-intro">Change the connection to see a possible effect.</p>
      <div id="fault-picture"></div>
      <p class="lesson-takeaway">Isolate → inspect → clean if needed → inspect again → seat fully. Keep bends within the cable’s allowed radius.</p>
    </section>
    <section id="vfl" class="lesson-section" aria-labelledby="vfl-title">
      <h3 id="vfl-title">Follow red light to the next passive</h3>
      <p class="section-intro">Isolate both ends of the accessible section from active equipment. Connect the VFL with the correct adapter.</p>
      <div id="vfl-picture"></div>
      <p class="lesson-takeaway">VFL helps trace continuity and mapping. Measure optical loss separately with a source and power meter or loss test set.</p>
    </section>
    <p class="lesson-sources">References: <a href="https://www.flukenetworks.com/edocs/white-paper-troubleshooting-fiber" target="_blank" rel="noopener noreferrer">Fluke: light sources & tracing</a> · <a href="https://www.cisco.com/c/en/us/support/docs/optical/synchronous-digital-hierarchy-sdh/51834-cleanfiber2.html" target="_blank" rel="noopener noreferrer">Cisco: inspection & cleaning</a> · <a href="https://www.cisco.com/c/en/us/support/docs/switches/catalyst-9200-switch-stack/222738-troubleshoot-fiber-links-on-catalyst-900.html" target="_blank" rel="noopener noreferrer">Cisco: optic health</a> · <a href="https://www.usconec.com/featured-products/mmc-connector-solutions/speed-of-deployment" target="_blank" rel="noopener noreferrer">US Conec: MMC mapping</a></p>
    <a class="next-chapter" href="./quiz.html">Try the beginner knowledge check →</a>
    <a class="next-chapter" href="./devices.html">Next chapter: Device locations & links →</a>
    <a class="lesson-return" href="./index.html">Use the troubleshooting diagram →</a>`;
  setupLesson();
  example('ir-picture', 'Optic infrared light', [], opticPicture);
  example('red-picture', 'Visible red VFL light', [], redPicture);
  example('path-picture', 'Fiber route', [], pathPicture);
  example('loop-picture', 'Loop location', ['LC at optic', 'MMC at passive'], loopPicture);
  example('fault-picture', 'Connection condition', ['Clean', 'Dirty', 'Unseated', 'Tight bend'], faultPicture);
  example('vfl-picture', 'VFL observation', ['Light seen', 'No light', 'Wrong port'], vflPicture);
}

function setupLesson() {
  let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motion = lesson.querySelector('.lesson-motion');
  function updateMotion() {
    lesson.classList.toggle('light-paused', paused);
    const patching = lesson.dataset.chapter === 'patching';
    motion.textContent = paused ? (patching ? 'Play animation' : 'Play light') : (patching ? 'Pause animation' : 'Pause light');
    motion.setAttribute('aria-label', paused ? 'Play all animations' : 'Pause all animations');
  }
  motion.addEventListener('click', () => { paused = !paused; updateMotion(); });
  updateMotion();
  // Old chapter links now land on the matching part of this single chapter.
  function scrollToSection() {
    const target = document.getElementById(location.hash.slice(1));
    if (target && lesson.contains(target)) target.scrollIntoView({block:'start'});
  }
  window.addEventListener('hashchange', scrollToSection);
  requestAnimationFrame(scrollToSection);
}

function example(id, label, choices, draw) {
  const host = document.getElementById(id);
  const controls = el('div', 'lesson-options');
  controls.setAttribute('role', 'group'); controls.setAttribute('aria-label', label);
  const figure = el('figure', 'lesson-figure');
  const caption = el('figcaption'); caption.setAttribute('aria-live', 'polite');
  function show(selected) {
    const art = draw(selected);
    figure.innerHTML = `<svg class="${art.hardware ? 'hardware-diagram' : ''}" viewBox="0 0 360 ${art.height || 210}" role="img" aria-label="${art.caption}">${art.drawing}</svg>`;
    caption.textContent = art.caption; figure.append(caption);
    [...controls.children].forEach((button, index) => button.setAttribute('aria-pressed', String(index === selected)));
  }
  choices.forEach((choice, index) => {
    const button = el('button', '', choice); button.type = 'button';
    button.addEventListener('click', () => show(index)); controls.append(button);
  });
  if (choices.length) host.append(controls);
  host.append(figure); show(0);
  return show;
}

const text = (x,y,value,extra='') => `<text x="${x}" y="${y}" ${extra}>${value}</text>`;
const box = (x,y,w,h,label,extra='') => `<rect class="learn-device ${extra}" x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/>${text(x+w/2,y+h/2+5,label,'text-anchor="middle"')}`;
function light(path, color='ir', strength='') {
  return `<path class="learn-cable" d="${path}"/><path class="learn-signal ${color} ${strength}" d="${path}"/>`;
}
function optic(x,y) {
  return `<g transform="translate(${x} ${y})"><rect class="optic-metal" x="0" y="0" width="105" height="70" rx="5"/><path class="optic-detail" d="M10 8 H72 M10 16 H72 M10 54 H72 M10 62 H72"/><rect class="optic-port" x="84" y="8" width="29" height="20" rx="2"/><rect class="optic-port" x="84" y="42" width="29" height="20" rx="2"/>${text(12,40,'Optic')}${text(88,23,'TX','class="small"')}${text(88,57,'RX','class="small"')}</g>`;
}
function vfl(x,y) {
  return `<g transform="translate(${x} ${y})"><rect class="vfl-body" x="0" y="0" width="102" height="43" rx="19"/><path class="vfl-grip" d="M13 8 V35 M20 8 V35 M27 8 V35"/><rect class="vfl-tip" x="94" y="11" width="23" height="21" rx="2"/><circle class="red-dot" cx="77" cy="21" r="5"/>${text(36,27,'VFL')}</g>`;
}
function opticPicture() {
  return {height:200, caption:'IR carries data. The receiver turns arriving light back into electrical data.', drawing:
    text(16,27,'Electrical data → light')+optic(12,52)+box(277,52,73,70,'Optic')+
    light('M125 70 H277')+light('M277 104 H125')+
    text(190,57,'TX → RX','class="small" text-anchor="middle"')+text(190,129,'RX ← TX','class="small" text-anchor="middle"')+
    '<path class="ir-arrow" d="M210 65 l8 5 -8 5 M186 99 l-8 5 8 5"/>'+text(180,172,'No visible glow does not mean no light.','class="small" text-anchor="middle"')};
}
function redPicture() {
  return {height:200, caption:'Red light can be detected at the test end using the site’s safe viewing method.', drawing:
    text(16,27,'Visible red test light')+vfl(12,69)+light('M129 90 H279','red')+
    '<rect class="lc-plug" x="268" y="75" width="43" height="30" rx="3"/><circle class="red-halo" cx="318" cy="90" r="19"/><circle class="red-dot" cx="318" cy="90" r="8"/>'+
    '<path class="red-arrow" d="M210 85 l8 5 -8 5"/>'+text(207,57,'Isolated fiber','class="small" text-anchor="middle"')+text(180,145,'Active equipment disconnected','class="small" text-anchor="middle"')};
}
function pathPicture() {
  return {height:238, caption:'One example pair inside the group. Follow your site’s full lane map.', drawing:
    optic(5,34)+'<rect class="lc-plug" x="120" y="42" width="27" height="19" rx="2"/><rect class="lc-plug" x="120" y="76" width="27" height="19" rx="2"/>'+
    '<rect class="mmc-plug" x="233" y="36" width="35" height="70" rx="4"/><rect class="learn-device" x="271" y="27" width="78" height="90" rx="5"/>'+
    light('M113 52 H310 V173 H89')+light('M89 191 H330 V86 H113')+
    text(120,22,'LC legs','class="small"')+text(125,124,'Followers','class="small"')+text(205,22,'MMC leader','class="small"')+
    text(290,138,'CAS 1 · Port 12','class="small" text-anchor="end"')+
    box(8,159,80,47,'Next')+text(12,224,'Next passive → remote optic','class="small"')+
    '<path class="ir-arrow" d="M203 47 l8 5 -8 5 M207 168 l-8 5 8 5 M211 186 l8 5 -8 5"/>'};
}
function loopPicture(selected) {
  const art = loopIllustration(selected ? 'passive' : 'direct');
  return {...art, hardware:true, drawing:art.drawing + `<path class="learn-signal ir" d="${art.lightPath}"/>`,
    caption:selected ? 'MMC loop at CAS 1 Port 12: tests the optic + fiber to this port. Beyond the loop is untested. One pair illustrated.' : 'LC loop inserted: TX returns to RX at the optic. The longer fiber route is outside this test.'};
}
function faultPicture(selected) {
  const captions = [
    'Clean and seated: light can couple across the connection.',
    'Dirt at the core can block or scatter light. Clean, then inspect again.',
    'A connector that is not fully seated can cause loss or no light. Check the latch.',
    'An overly tight bend can let light escape from the core, reducing received power.'
  ];
  let drawing = text(12,24,selected === 3 ? 'Fiber side view · exaggerated' : 'Connection close-up · enlarged','class="small"');
  if (selected === 3) {
    drawing += light('M15 100 H150 Q195 100 195 130 Q195 155 177 155 Q160 155 160 135 V70 Q160 45 197 45 H345','ir','dim-light');
    drawing += light('M15 100 H149 Q174 100 188 115')+'<path class="escape-rays" d="M194 132 l33 12 M191 147 l23 25 M173 156 l3 27"/>'+text(237,102,'Light lost','class="small"')+text(237,125,'at the bend','class="small"');
  } else {
    const gap = selected === 2 ? 34 : 6;
    drawing += '<rect class="connector-cutaway" x="16" y="64" width="148" height="65" rx="5"/>'+`<rect class="connector-cutaway" x="${164+gap}" y="64" width="${180-gap}" height="65" rx="5"/>`;
    drawing += light('M16 96 H164')+light(`M${164+gap} 96 H344`,'ir',selected ? 'dim-light' : '');
    drawing += `<path class="mating-face" d="M164 61 V133 M${164+gap} 61 V133"/>`;
    if (selected === 1) drawing += '<g class="dirt"><circle cx="167" cy="94" r="7"/><circle cx="163" cy="74" r="4"/><circle cx="168" cy="117" r="4"/></g><path class="escape-rays" d="M168 92 l20 -27 M168 97 l22 24"/>';
    if (selected === 2) drawing += text(181,154,'Gap','class="small" text-anchor="middle"');
    if (selected === 0 || selected === 1) drawing += '<circle class="scope-face" cx="66" cy="177" r="27"/><circle class="scope-core" cx="66" cy="177" r="6"/>'+(selected ? '<circle class="dirt" cx="68" cy="175" r="6"/><circle class="dirt" cx="53" cy="165" r="3"/>' : '')+text(108,174,'End face under a scope','class="small"')+text(108,193,selected ? 'Debris covers the core' : 'Core is clear','class="small"');
  }
  return {height:220, caption:captions[selected], drawing};
}
function vflPicture(selected) {
  const seen = selected === 0, wrong = selected === 2;
  const captions = ['Red at the expected port: this section has continuity. Continue to the next accessible section.', 'Expected port is dark: check the VFL setup, both connections and this span. The fault location is not yet known.', 'Red at another port: check the mapped route, strand and polarity before continuing.'];
  return {height:250, caption:captions[selected], drawing:
    box(10,9,79,31,'Optic','offline')+text(103,30,'Disconnected from test section','class="small"')+
    (!seen ? '<rect class="suspect-section" x="135" y="64" width="215" height="145" rx="7"/>' : '')+
    vfl(10,110)+'<rect class="learn-device" x="254" y="78" width="92" height="117" rx="5"/>'+text(300,64,'Next passive','class="small" text-anchor="middle"')+
    (seen ? light('M127 131 H178 Q192 131 192 107 H270','red') : '<path class="untraced-fiber" d="M127 131 H178 Q192 131 192 107 H270"/>')+
    (wrong ? light('M127 131 H178 Q192 131 192 165 H270','red') : '')+
    `<circle class="${seen ? 'red-halo' : 'dark-port'}" cx="270" cy="107" r="14"/><circle class="${seen ? 'red-dot' : 'dark-port'}" cx="270" cy="107" r="6"/><circle class="${wrong ? 'red-halo' : 'dark-port'}" cx="270" cy="165" r="14"/><circle class="${wrong ? 'red-dot' : 'dark-port'}" cx="270" cy="165" r="6"/>`+
    text(290,111,'Right','class="small"')+text(290,169,'Other','class="small"')+
    text(180,231,seen ? 'Trace confirmed here ✓' : wrong ? 'Light found on a different route' : 'Check this section — location unknown','class="small" text-anchor="middle"')};
}

function renderDevicesLesson() {
  devicesLink.setAttribute('aria-current', 'page');
  lesson.innerHTML = `
    <div class="chapter-heading"><p class="chapter-count">Chapter 2</p><button type="button" class="lesson-motion"></button></div>
    <h2 id="lesson-title">Device locations & links</h2>
    <p class="lesson-intro">Find the device. Confirm the port. Follow its connection.</p>
    <nav class="lesson-jumps" aria-label="In this chapter"><a href="#position">Read the position</a><a href="#ends">Local & remote</a><a href="#ports">Confirm the ports</a></nav>
    <section id="position" class="lesson-section" aria-labelledby="position-title">
      <h3 id="position-title">Every part narrows the location</h3>
      <p class="position-code">QNO5.5C.16f.17.30</p>
      <p class="section-intro">Tap a part to see where it takes you.</p>
      <div class="position-parts" role="group" aria-label="Parts of the rack position">
        <button type="button" data-position="0"><strong>QNO5</strong><span>Building</span></button>
        <button type="button" data-position="1"><strong>5C</strong><span>Room</span></button>
        <button type="button" data-position="2"><strong>16f</strong><span>Row / front</span></button>
        <button type="button" data-position="3"><strong>17</strong><span>Rack</span></button>
        <button type="button" data-position="4"><strong>30</strong><span>Elevation</span></button>
      </div>
      <figure id="position-picture" class="lesson-figure"></figure>
      <p class="picture-note">Your naming format. Drawings are illustrative; use the site labels and layout to locate the actual device.</p>
    </section>
    <section id="ends" class="lesson-section" aria-labelledby="ends-title">
      <h3 id="ends-title">Local and remote are the two ends</h3>
      <p class="section-intro">Local is the device you are checking. Remote is the connected device at the other end, possibly in another room or building.</p>
      <div id="ends-picture"></div>
      <div class="endpoint-locations"><p><strong>Device A · your example</strong><span>QNO5.5C.16f.17.30</span></p><p><strong>Device B · the other end</strong><span>Find its own position in the connection record.</span></p></div>
      <p class="picture-note">One duplex pair shown. Blue and teal illustrate two directions of invisible IR. Use the full lane map for multi-fiber links.</p>
    </section>
    <section id="ports" class="lesson-section" aria-labelledby="ports-title">
      <h3 id="ports-title">Match the device and its port</h3>
      <div class="port-route" aria-label="Connection checks"><span>Rack position</span><b aria-hidden="true">↓</b><span>Device + exact port</span><b aria-hidden="true">↓</b><span>Optic + mapped passive ports</span><b aria-hidden="true">↓</b><span>Remote device + exact port</span></div>
      <p class="lesson-takeaway">The position tells you where to go. The connection record tells you which ports and passives join the two devices.</p>
      <p class="lesson-takeaway">Check what you can reach: loop the local optic, then extend through accessible passives. A passing local loop leaves the path beyond it unverified.</p>
    </section>
    <p class="lesson-sources">Position format: your site example. Optical link reference: <a href="https://www.cisco.com/c/en/us/support/docs/switches/catalyst-9200-switch-stack/222738-troubleshoot-fiber-links-on-catalyst-900.html" target="_blank" rel="noopener noreferrer">Cisco: TX/RX pairing and fiber links</a>.</p>
    <a class="next-chapter" href="./patching.html">Next chapter: FIM, LC & MMC patching →</a>
    <a class="next-chapter" href="./learn.html">← Chapter 1: Optics, fiber & light</a>
    <a class="lesson-return" href="./index.html">Use the troubleshooting diagram →</a>`;
  setupLesson();
  const positionFigure = document.querySelector('#position-picture');
  const positionCaption = el('figcaption'); positionCaption.setAttribute('aria-live', 'polite');
  const parts = [...lesson.querySelectorAll('[data-position]')];
  function selectPosition(selected) {
    const art = positionPicture(selected);
    positionFigure.innerHTML = `<svg viewBox="0 0 360 260" role="img" aria-label="${art.caption}">${art.drawing}</svg>`;
    positionCaption.textContent = art.caption; positionFigure.append(positionCaption);
    parts.forEach((button, index) => button.setAttribute('aria-pressed', String(index === selected)));
  }
  parts.forEach((button, index) => button.addEventListener('click', () => selectPosition(index)));
  selectPosition(0);
  example('ends-picture', 'Choose the device you are checking', ['At device A', 'At device B'], endsPicture);
}

function positionPicture(selected) {
  const captions = [
    'QNO5 = building. Start at this building.',
    '5C = data hall / room. Find room 5C inside QNO5.',
    '16f = row 16, front. The f identifies front in your naming format.',
    '17 = rack. Find rack 17 in row 16, at the front.',
    '30 = elevation. Find the device at elevation 30 in rack 17.'
  ];
  let drawing;
  if (selected === 0) {
    drawing = '<path class="site-building" d="M28 224 V64 L180 27 L332 64 V224 Z"/>'+text(180,87,'QNO5','class="position-large" text-anchor="middle"');
    for (let row=0; row<2; row++) for(let column=0; column<5; column++) drawing += `<rect class="site-window" x="${55+column*53}" y="${108+row*38}" width="35" height="22" rx="2"/>`;
    drawing += '<rect class="site-door" x="155" y="183" width="50" height="41" rx="2"/>'+text(180,250,'Building','text-anchor="middle"');
  } else if (selected === 1) {
    drawing = text(15,25,'Inside building QNO5')+'<rect class="site-building" x="15" y="42" width="330" height="194" rx="6"/>';
    drawing += '<rect class="site-room" x="30" y="60" width="133" height="72" rx="4"/><rect class="site-room" x="30" y="149" width="133" height="68" rx="4"/><rect class="position-active" x="182" y="60" width="145" height="157" rx="4"/>'+text(254,134,'5C','class="position-large" text-anchor="middle"')+text(254,160,'Data hall / room','class="small" text-anchor="middle"');
  } else if (selected === 2) {
    drawing = text(15,26,'Inside room 5C');
    for (let row=0; row<3; row++) {
      const y=48+row*66;
      drawing += `<rect class="${row===1 ? 'position-active' : 'site-room'}" x="77" y="${y}" width="266" height="44" rx="4"/>`;
      for (let rack=0; rack<7; rack++) drawing += `<path class="site-divider" d="M${86+rack*37} ${y+5} V${y+39}"/>`;
      if (row===1) drawing += text(12,y+27,'Row 16','class="small"')+`<path class="front-edge" d="M82 ${y+44} H338"/>`+text(210,y+60,'f = front','class="small" text-anchor="middle"');
    }
  } else if (selected === 3) {
    drawing = text(15,26,'Room 5C · row 16 · front');
    for (let rack=0; rack<5; rack++) {
      const x=11+rack*69;
      drawing += `<rect class="${rack===2 ? 'position-active' : 'site-room'}" x="${x}" y="51" width="61" height="155" rx="5"/>`;
      for(let shelf=0; shelf<8; shelf++) drawing += `<path class="site-divider" d="M${x+7} ${68+shelf*16} H${x+54}"/>`;
      drawing += text(x+30,230,rack===2?'Rack 17':'…','text-anchor="middle"');
    }
  } else {
    drawing = text(15,24,'Rack 17 · front view')+'<rect class="rack-frame" x="59" y="39" width="150" height="202" rx="5"/>';
    for(let elevation=34; elevation>=25; elevation--) {
      const y=49+(34-elevation)*18;
      drawing += `<rect class="${elevation===30 ? 'elevation-active' : 'rack-slot'}" x="72" y="${y}" width="122" height="15" rx="2"/>`+text(47,y+12,String(elevation),'class="small" text-anchor="end"');
      if(elevation===30) {
        for(let port=0; port<6; port++) drawing += `<rect class="rack-port" x="${82+port*17}" y="${y+4}" width="10" height="6" rx="1"/>`;
        drawing += `<path class="elevation-callout" d="M197 ${y+7} H229"/>`+text(235,y+2,'Elevation 30','class="small"')+text(235,y+22,'Device here','class="small"');
      }
    }
    drawing += text(250,222,'Rack excerpt','class="small"');
  }
  return {caption:captions[selected],drawing};
}

function endsPicture(selected) {
  const atB = selected === 1;
  return {height:270, caption:atB ? 'From B: B is local and A is remote. B TX sends to A RX; A TX sends to B RX.' : 'From A: A is local and B is remote. A TX sends to B RX; B TX sends to A RX.', drawing:
    text(49,25,atB?'Remote':'Local','class="endpoint-name" text-anchor="middle"')+text(311,25,atB?'Local':'Remote','class="endpoint-name" text-anchor="middle"')+
    '<rect class="learn-device" x="5" y="40" width="88" height="165" rx="6"/><rect class="learn-device" x="267" y="40" width="88" height="165" rx="6"/>'+
    text(49,69,'Device A','text-anchor="middle"')+text(311,69,'Device B','text-anchor="middle"')+
    '<rect class="mmc-plug" x="140" y="94" width="26" height="90" rx="4"/><rect class="mmc-plug" x="194" y="94" width="26" height="90" rx="4"/>'+
    light('M93 110 H267')+light('M267 168 H93','return-ir')+
    text(69,115,'TX','class="small"')+text(274,115,'RX','class="small"')+text(69,173,'RX','class="small"')+text(274,173,'TX','class="small"')+
    text(180,84,'A TX → B RX','class="small" text-anchor="middle"')+text(180,205,'A RX ← B TX','class="small" text-anchor="middle"')+
    '<path class="ir-arrow" d="M176 105 l8 5 -8 5"/><path class="return-ir-arrow" d="M184 163 l-8 5 8 5"/>'+
    text(180,242,'Mapped fiber + passive ports','class="small" text-anchor="middle"')};
}

function renderPatchingLesson() {
  patchingLink.setAttribute('aria-current', 'page');
  lesson.innerHTML = `
    <div class="chapter-heading"><p class="chapter-count">Chapter 3</p><button type="button" class="lesson-motion"></button></div>
    <h2 id="lesson-title">FIM, LC & MMC patching</h2>
    <p class="lesson-intro">Match the optic position, the follower and its MMC head.</p>
    <nav class="lesson-jumps" aria-label="In this chapter"><a href="#lc-position">LC position</a><a href="#fim-path">FIM path</a><a href="#mmc-fanout">MMC head & followers</a></nav>
    <section id="lc-position" class="lesson-section" aria-labelledby="lc-position-title">
      <h3 id="lc-position-title">Same optic. Two LC positions.</h3>
      <p class="section-intro">Choose the Ethernet port shown in FIM.</p>
      <div id="patch-picture"></div>
      <div id="patch-mapping" class="patch-mapping"></div>
      <p class="lesson-takeaway">Tab above = upright. Flip the optic and the ports swap sides; their Ethernet numbers stay with them.</p>
      <p class="picture-note">Your confirmed site example, facing the optic. Check the installed orientation and labels; other hardware may use a different mapping.</p>
    </section>
    <section id="fim-path" class="lesson-section" aria-labelledby="fim-path-title">
      <h3 id="fim-path-title">Follow the LC leg to its passive</h3>
      <p class="section-intro">Use FIM to match the device, Ethernet port, leg ID and passive port.</p>
      <div id="patch-route-picture"></div>
      <p class="lesson-takeaway">The Ethernet number chooses the optic position. FIM tells you which LC follower and MMC passive port belong to that connection.</p>
      <ol class="patch-steps">
        <li><b>Match.</b> Confirm the device, port and fiber labels against FIM.</li>
        <li><b>Inspect.</b> Isolate as required, inspect, clean if needed, then inspect again.</li>
        <li><b>Seat & check.</b> Seat the mapped connectors fully. Check optic health in Cable Guy.</li>
      </ol>
      <p class="picture-note">Moving blue lines illustrate the intended IR path, not a measured result. Use the health check if light is missing.</p>
    </section>
    <section id="mmc-fanout" class="lesson-section" aria-labelledby="mmc-fanout-title">
      <h3 id="mmc-fanout-title">One MMC head. 12 followers.</h3>
      <p class="section-intro">The leader/head identifies this fanout. Its 12 legs belong to the same assembly.</p>
      <p class="fanout-serial"><span>Example head serial</span><strong>S747885346FWL</strong></p>
      <p class="section-intro">Choose a leg to trace it back to the head.</p>
      <div id="fanout-picture"></div>
      <p class="picture-note">One line per leg; individual strands are not shown. Leg numbers are illustration labels—use the actual labels and mapping in FIM.</p>
      <p class="lesson-takeaway">A fanout groups separate fiber paths. It does not split one optic’s light among all 12 legs.</p>
      <h4 class="mmc-patch-title">Patch the head into the passive</h4>
      <div id="mmc-patch-picture"></div>
      <p class="lesson-takeaway">The serial identifies the fanout. FIM identifies its destination passive and port. Then match each follower to its assigned optic port.</p>
    </section>
    <p class="lesson-sources">Port mapping and fanout: your site examples. <a href="https://www.cisco.com/c/en/us/support/docs/optical/synchronous-digital-hierarchy-sdh/51834-cleanfiber2.html" target="_blank" rel="noopener noreferrer">Cisco: inspection & cleaning</a> · <a href="https://www.usconec.com/featured-products/mmc-connector-solutions/speed-of-deployment" target="_blank" rel="noopener noreferrer">US Conec: MMC alignment & polarity</a>.</p>
    <a class="next-chapter" href="./quiz.html">Try the beginner knowledge check →</a>
    <a class="next-chapter" href="./devices.html">← Chapter 2: Device locations & links</a>
    <a class="lesson-return" href="./index.html">Check optic / fiber health →</a>`;
  setupLesson();
  setupPatchExample();
  example('patch-route-picture', 'Selected LC path to the passive', [], patchRoutePicture);
  example('fanout-picture', 'Choose a fanout follower', Array.from({length:12}, (_, index) => `Leg ${index+1}`), fanoutPicture);
  example('mmc-patch-picture', 'MMC patching steps', ['1 · Match', '2 · Prepare', '3 · Seat'], mmcPatchPicture);
}

function setupPatchExample() {
  let flipped = false;
  let selectedPort = 0;
  const show = example('patch-picture', 'Ethernet port in FIM', ['Ethernet 5/1', 'Ethernet 5/5'], selected => {
    selectedPort = selected;
    return patchPicture(selected, flipped);
  });
  const host = document.getElementById('patch-picture');
  const controls = el('div', 'patch-orientation-controls');
  const status = el('span', 'patch-orientation-status');
  const flip = el('button', '', '↻ Flip optic 180°');
  flip.type = 'button';
  flip.setAttribute('aria-controls', 'patch-picture patch-mapping');
  controls.append(status, flip);
  host.insertBefore(controls, host.querySelector('figure'));
  function updateOrientation() {
    status.textContent = flipped ? 'Upside down · tab below' : 'Upright · tab above';
    flip.setAttribute('aria-pressed', String(flipped));
    document.getElementById('patch-mapping').innerHTML = (flipped ? [1,0] : [0,1]).map((port,index) =>
      `<p><strong>5/${port ? 5 : 1}</strong><span>Position ${port+1} · ${index ? 'right' : 'left'}</span></p>`).join('');
  }
  flip.addEventListener('click', () => { flipped = !flipped; show(selectedPort); updateOrientation(); });
  updateOrientation();
}

function patchPicture(selected, flipped = false) {
  const right = (selected === 1) !== flipped;
  const suffix = selected ? 5 : 1;
  const position = selected+1;
  const side = right ? 'right' : 'left';
  const center = selected ? 232 : 128;
  const outerEdgeX = selected ? center+23 : center-31;
  const screenCenter = flipped ? 360-center : center;
  let drawing = `<defs>
      <linearGradient id="patch-metal-face" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#97989c"/><stop offset=".2" stop-color="#dedfe1"/><stop offset=".48" stop-color="#b6b7bb"/><stop offset=".75" stop-color="#e6e7e9"/><stop offset="1" stop-color="#999a9f"/></linearGradient>
      <linearGradient id="patch-pull-purple" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#51417d"/><stop offset="1" stop-color="#8063bb"/></linearGradient>
    </defs>`+
    text(180,24,'Optic 5 · front view','class="patch-title" text-anchor="middle"')+
    `<g class="patch-assembly" transform="rotate(${flipped ? 180 : 0} 180 197)"><g transform="translate(0 394) scale(1 -1)">`+
    '<path class="patch-pull-tab" d="M49 102 H70 V270 Q70 279 80 279 H280 Q290 279 290 270 V102 H311 V292 Q311 312 291 312 H69 Q49 312 49 292 Z"/>'+
    '<rect class="patch-module-face" x="62" y="82" width="236" height="153" rx="5"/>'+
    '<path class="patch-face-lip" d="M66 86 H294 V105 H66 Z"/>'+
    '<path class="patch-module-seam" d="M69 112 V226 H291 V112 M180 111 V227"/>';
  [128,232].forEach((x,index) => {
    const active = index === selected;
    const keyX = index ? x+23 : x-31;
    drawing += `<rect class="${active ? 'patch-socket-active' : 'patch-socket'}" x="${x-37}" y="111" width="74" height="112" rx="3"/>`+
      `<rect class="patch-opening" x="${x-23}" y="118" width="46" height="40" rx="2"/><rect class="patch-opening" x="${x-23}" y="176" width="46" height="40" rx="2"/>`+
      `<rect class="patch-keyway" x="${keyX}" y="138" width="8" height="58" rx="1"/>`+
      `<circle class="patch-ferrule" cx="${x}" cy="138" r="11"/><circle class="patch-ferrule" cx="${x}" cy="196" r="11"/>`+
      `<circle class="patch-ferrule-core" cx="${x}" cy="138" r="5"/><circle class="patch-ferrule-core" cx="${x}" cy="196" r="5"/>`;
  });
  drawing += `<g class="patch-lc"><rect x="${center-23}" y="118" width="46" height="40" rx="2"/><rect x="${center-23}" y="176" width="46" height="40" rx="2"/><rect class="patch-outer-edge" x="${outerEdgeX}" y="138" width="8" height="58" rx="1"/></g></g></g>`;
  [128,232].forEach((x,index) => {
    const visibleX = flipped ? 360-x : x;
    drawing += text(visibleX,flipped ? 59 : 140,`5/${index ? 5 : 1}`,'class="patch-port-label" text-anchor="middle"')+
      text(visibleX,flipped ? 258 : 338,`Position ${index+1}`,'class="small" text-anchor="middle"');
  });
  drawing += `<path class="patch-insert" d="M${screenCenter} ${flipped ? 65 : 146} V${flipped ? 78 : 156} m-5 -5 5 5 5 -5"/>`;
  return {height:354, caption:`${flipped ? 'Upside down · tab below' : 'Upright · tab above'}. Ethernet 5/${suffix} → position ${position}, now on the ${side}. The outside connector edge faces ${side}.`, drawing};
}

function patchRoutePicture() {
  return patchRouteIllustration();
}

function fanoutPicture(selected) {
  let drawing = text(58,177,'Leader / head','class="small" text-anchor="middle"')+
    text(298,38,'Followers','text-anchor="middle"');
  for (let index=0; index<12; index++) {
    const endY = 62+index*29;
    const startY = 221+index*1.5;
    drawing += `<path class="fanout-branch${index===selected ? ' fanout-selected' : ''}" d="M123 ${startY} C157 ${startY} 173 ${endY} 275 ${endY}"/>`;
  }
  drawing += '<g class="hardware-art"><g transform="translate(103 253) rotate(180)">'+mmcHead(0,0,false)+'</g></g>'+text(57,233,'MMC','class="small" text-anchor="middle"');
  for (let index=0; index<12; index++) {
    const y = 62+index*29;
    drawing += `<rect class="fanout-tag${index===selected ? ' fanout-tag-selected' : ''}" x="275" y="${y-11}" width="48" height="22" rx="4"/>`+
      text(299,y+4,String(index+1),'class="small" text-anchor="middle"');
  }
  return {height:407, hardware:true, caption:`Leg ${selected+1} belongs to MMC head S747885346FWL. Match this follower’s actual label in FIM.`, drawing};
}

function mmcPatchPicture(selected) {
  return mmcPatchingIllustration(selected);
}

if (lesson) {
  if (lesson.dataset.chapter === 'patching') renderPatchingLesson();
  else if (lesson.dataset.chapter === 'devices') renderDevicesLesson();
  else renderLesson();
}
