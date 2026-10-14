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
menuPanel.append(chapterLink, link('Back to troubleshooting', './index.html', 'menu-return'));
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
    <a class="lesson-return" href="./index.html">Use the troubleshooting diagram →</a>`;
  let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motion = lesson.querySelector('.lesson-motion');
  function updateMotion() {
    lesson.classList.toggle('light-paused', paused);
    motion.textContent = paused ? 'Play light' : 'Pause light';
    motion.setAttribute('aria-label', paused ? 'Play all light animations' : 'Pause all light animations');
  }
  motion.addEventListener('click', () => { paused = !paused; updateMotion(); });
  updateMotion();
  example('ir-picture', 'Optic infrared light', [], opticPicture);
  example('red-picture', 'Visible red VFL light', [], redPicture);
  example('path-picture', 'Fiber route', [], pathPicture);
  example('loop-picture', 'Loop location', ['LC at optic', 'MMC at passive'], loopPicture);
  example('fault-picture', 'Connection condition', ['Clean', 'Dirty', 'Unseated', 'Tight bend'], faultPicture);
  example('vfl-picture', 'VFL observation', ['Light seen', 'No light', 'Wrong port'], vflPicture);
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
    figure.innerHTML = `<svg viewBox="0 0 360 ${art.height || 210}" role="img" aria-label="${art.caption}">${art.drawing}</svg>`;
    caption.textContent = art.caption; figure.append(caption);
    [...controls.children].forEach((button, index) => button.setAttribute('aria-pressed', String(index === selected)));
  }
  choices.forEach((choice, index) => {
    const button = el('button', '', choice); button.type = 'button';
    button.addEventListener('click', () => show(index)); controls.append(button);
  });
  if (choices.length) host.append(controls);
  host.append(figure); show(0);
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
  return {height:215, caption:selected ? 'MMC loop: optic + LC legs + fiber to this passive. Beyond the loop remains untested.' : 'LC loop: a short return tests the local optic. The longer fiber route is not included.', drawing:
    optic(8,67)+light('M121 85 H284 Q334 85 334 102 Q334 119 284 119 H121')+
    (selected ? '<rect class="mmc-plug" x="237" y="72" width="26" height="60" rx="3"/>'+text(155,59,'LC + fiber','class="small"')+text(250,157,'MMC at passive','class="small" text-anchor="middle"')+text(250,179,'CAS 1 · Port 12','class="small" text-anchor="middle"') : '<rect class="lc-plug" x="123" y="76" width="32" height="18" rx="2"/><rect class="lc-plug" x="123" y="110" width="32" height="18" rx="2"/>'+text(241,59,'LC loopback','text-anchor="middle"'))+
    '<path class="ir-arrow" d="M199 80 l8 5 -8 5 M207 114 l-8 5 8 5"/>'+text(180,27,'TX out → loop → RX back','text-anchor="middle"')};
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

if (lesson) renderLesson();
