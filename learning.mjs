const references = {
  optics: ['Cisco optics', 'https://www.cisco.com/site/us/en/products/networking/optics-transceiver-modules/index.html'],
  health: ['Cisco fiber troubleshooting', 'https://www.cisco.com/c/en/us/support/docs/switches/catalyst-9200-switch-stack/222738-troubleshoot-fiber-links-on-catalyst-900.html'],
  clean: ['Cisco inspection and cleaning', 'https://www.cisco.com/c/en/us/support/docs/optical/synchronous-digital-hierarchy-sdh/51834-cleanfiber2.html'],
  fiber: ['Fluke fiber troubleshooting', 'https://www.flukenetworks.com/edocs/white-paper-troubleshooting-fiber'],
  mmc: ['US Conec MMC mapping', 'https://www.usconec.com/featured-products/mmc-connector-solutions/speed-of-deployment'],
  loop: ['SENKO LC loopbacks', 'https://www.senko.com/lc-series/']
};

const chapters = [
  { id:'optics', menu:'What is an optic?', title:'What is an optic?',
    intro:'An optic is the transceiver plugged into a device’s network port. It turns electrical data into light for the fiber, and incoming light back into electrical data.',
    points:[['TX sends', 'The transmitter produces the outgoing light.'], ['RX receives', 'The receiver reads light arriving from the other end.'], ['They must match', 'Use an optic supported by the port, speed, wavelength and fiber type.']],
    apply:'Start by checking the local optic. A loopback lets you test its outgoing light returning to its own RX.',
    sources:['optics','health'] },
  { id:'path', menu:'Follow the fiber path', title:'Where does the light go?',
    intro:'The optic provides the light. Fiber carries it through the mapped connectors and passive ports to the receiving optic.',
    points:[['LC legs / followers', 'In this site’s layout, individual legs belong to an MMC leader group.'], ['MMC leader + passive', 'The leader groups fibers at the passive. A passive connects fibers; it does not create light.'], ['Follow the map', 'Check the exact port, strand and TX-to-RX pairing. Check seating and avoid bends tighter than the cable allows.']],
    apply:'Use your connection layout at each passive. A matching connector alone does not confirm the correct route.',
    sources:['mmc','fiber'] },
  { id:'readings', menu:'Read optic health', title:'What do RX and TX tell you?',
    intro:'TX reports outgoing power; RX reports incoming power. These readings are usually shown in dBm. Check every affected lane.',
    options:['Good example','No RX light'],
    points:[['−40 in your report', 'Treat this site’s no-light indication as a symptom. It does not identify the failed part.'], ['+0.25 example', 'This is a good reading you commonly see, not a universal target.'], ['Use the limits', 'Compare RX and TX with their own minimum and maximum limits for the optic and site.']],
    apply:'If TX is present but RX is missing, check the incoming path, mapping and far-end source. The local optic may still be good.',
    sources:['health'] },
  { id:'cleaning', menu:'Dirty connections', title:'How can a connector get dirty?',
    intro:'Dust, fingerprints and residue can contaminate the tiny fiber end face. Dirt near the core can block light, add loss or cause reflections.',
    options:['Clean example','Dirty example'],
    points:[['Inspect first', 'Isolate the connection and use an approved inspection scope. Check the mating surfaces.'], ['Clean correctly', 'If dirty, use the approved cleaner for that connector. Avoid touching the end face.'], ['Inspect again', 'Confirm the result before reconnecting. Caps protect connectors, but do not prove they are clean.']],
    apply:'Before blaming the optic, check for contamination and poor seating at the test connections.',
    sources:['clean'] },
  { id:'loopbacks', menu:'LC and MMC loopbacks', title:'What does a loopback prove?',
    intro:'A loopback returns the optic’s TX light to its RX. The loop location decides how much of the path you are testing.',
    options:['LC at optic','MMC at passive'],
    points:[['Direct LC loop', 'In this site’s workflow, this tests the optic through a short local return path.'], ['MMC at a passive', 'This includes the optic, mapped fibers and connections up to that loop point.'], ['Check the return', 'Use the supported lane mapping and any required attenuation. RX must stay within its safe limits.']],
    apply:'A passing loop supports the tested section. Keep moving to reachable passives; leave everything beyond the loop unverified.',
    sources:['loop','health'] },
  { id:'vfl', menu:'What is a VFL?', title:'Trace the fiber with a VFL',
    intro:'A visual fault locator sends visible red light into an isolated fiber. It helps identify the route, continuity and possible faults.',
    options:['Light seen','No light','Wrong port'],
    points:[['Connect to isolated fiber', 'Isolate both ends of the test section from active equipment. Use the correct adapter and mapped strand.'], ['Trace the expected port', 'Use your site’s safe viewing method. Never look into the connector or beam.'], ['Know its limit', 'A visible trace does not establish acceptable loss. A source and power meter or loss test set measures that.']],
    apply:'Check one accessible section at a time. If light is missing, investigate that span and its connections before moving farther.',
    sources:['fiber','clean'] }
];

function el(tag, className = '', text = '') {
  const item = document.createElement(tag);
  if (className) item.className = className;
  if (text) item.textContent = text;
  return item;
}
function link(text, href, className = '') {
  const item = el('a', className, text);
  item.href = href;
  return item;
}

// Ordinary navigation links retain native keyboard and browser-history behavior.
const menu = el('nav', 'learn-nav');
menu.setAttribute('aria-label', 'Learning resources');
const menuButton = el('button', 'learn-toggle', 'Learn');
menuButton.type = 'button';
menuButton.setAttribute('aria-expanded', 'false');
menuButton.setAttribute('aria-controls', 'learn-links');
const menuPanel = el('div', 'learn-menu');
menuPanel.id = 'learn-links';
menuPanel.hidden = true;
menuPanel.append(el('p', '', 'Learning chapters'));
chapters.forEach((chapter, index) => menuPanel.append(link(`${index + 1}. ${chapter.menu}`, `./learn.html#${chapter.id}`)));
menuPanel.append(link('Back to troubleshooting', './index.html', 'menu-return'));
menu.append(menuButton, menuPanel);
document.querySelector('header').append(menu);
function closeMenu(restoreFocus = false) {
  menuPanel.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
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
if (lesson) {
  window.addEventListener('hashchange', () => renderChapter(true));
  renderChapter();
}
function renderChapter(moveFocus = false) {
  const index = Math.max(0, chapters.findIndex(chapter => `#${chapter.id}` === location.hash));
  const chapter = chapters[index];
  document.title = `${chapter.title} | Fiber basics`;
  lesson.replaceChildren();
  lesson.append(el('p', 'chapter-count', `Chapter ${index + 1} of ${chapters.length}`));
  const title = el('h2', '', chapter.title);
  title.id = 'lesson-title'; title.tabIndex = -1;
  lesson.append(title, el('p', 'lesson-intro', chapter.intro));
  const example = el('div', 'lesson-example');
  const figure = el('figure', 'lesson-figure');
  const options = el('div', 'lesson-options');
  options.setAttribute('role', 'group'); options.setAttribute('aria-label', 'Choose an illustration');
  function showExample(selected) {
    const art = illustration(chapter.id, selected);
    figure.innerHTML = `<svg viewBox="0 0 360 180" role="img" aria-label="${art.caption}"><defs><marker id="lesson-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="#245b91"/></marker></defs>${art.drawing}</svg>`;
    figure.append(el('figcaption', '', art.caption));
    [...options.children].forEach((button, number) => button.setAttribute('aria-pressed', String(number === selected)));
  }
  if (chapter.options) {
    chapter.options.forEach((name, number) => {
      const button = el('button', '', name); button.type = 'button';
      button.addEventListener('click', () => showExample(number)); options.append(button);
    });
    example.append(options);
  }
  showExample(0);
  example.append(figure); lesson.append(example);
  const points = el('dl', 'lesson-points');
  chapter.points.forEach(([term, description]) => {
    const row = el('div'); row.append(el('dt', '', term), el('dd', '', description)); points.append(row);
  });
  lesson.append(points);
  const apply = el('aside', 'lesson-apply');
  apply.append(el('strong', '', 'Use it in your check'), el('p', '', chapter.apply)); lesson.append(apply);
  const sources = el('p', 'lesson-sources', 'References: ');
  chapter.sources.forEach((key, number) => {
    if (number) sources.append(document.createTextNode(' · '));
    const [name, url] = references[key];
    const source = link(name, url); source.target = '_blank'; source.rel = 'noopener noreferrer'; sources.append(source);
  });
  lesson.append(sources);
  const navigation = document.querySelector('#chapter-navigation'); navigation.replaceChildren();
  navigation.append(index ? link('← Previous chapter', `#${chapters[index - 1].id}`) : link('← Your check', './index.html'));
  navigation.append(index < chapters.length - 1 ? link(`Next: ${chapters[index + 1].menu} →`, `#${chapters[index + 1].id}`) : link('Use the troubleshooting diagram →', './index.html'));
  menuPanel.querySelectorAll('a').forEach(item => {
    if (item.hash === `#${chapter.id}`) item.setAttribute('aria-current', 'page'); else item.removeAttribute('aria-current');
  });
  if (moveFocus) { title.focus({preventScroll:true}); window.scrollTo({top:0,behavior:'instant'}); }
}

function illustration(id, selected) {
  const box = (x,y,w,h,label,extra='') => `<rect class="lesson-device ${extra}" x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/><text text-anchor="middle" x="${x+w/2}" y="${y+h/2+5}">${label}</text>`;
  const wire = (path,extra='') => `<path class="lesson-wire ${extra}" d="${path}" marker-end="url(#lesson-arrow)"/>`;
  if (id === 'optics') return {
    caption:'TX sends light through the fiber. RX receives light from the other optic.',
    drawing:box(8,43,70,92,'Device')+box(89,43,73,92,'Optic')+box(278,43,73,92,'Optic')+wire('M78 89 H89')+wire('M162 66 H278')+wire('M278 111 H162','return-wire')+'<text class="small" x="131" y="62">TX</text><text class="small" x="131" y="126">RX</text><text class="small" x="283" y="62">RX</text><text class="small" x="283" y="126">TX</text><text text-anchor="middle" x="219" y="48">Fiber</text><text class="small" text-anchor="middle" x="180" y="161">Electrical data ↔ light ↔ electrical data</text>'
  };
  if (id === 'path') return {
    caption:'Example route: LC followers → MMC leader → passive ports → remote end. Use your site’s map.',
    drawing:box(6,12,72,43,'Optic')+box(112,12,96,43,'LC legs')+box(242,12,112,43,'MMC leader')+box(242,112,112,43,'CAS passive')+box(112,112,96,43,'Next passive')+box(6,112,72,43,'Remote')+wire('M78 33 H112')+wire('M208 33 H242')+wire('M298 55 V112')+wire('M242 134 H208')+wire('M112 134 H78')+'<text class="small" x="115" y="76">Followers</text><text class="small" x="247" y="174">Mapped port / strand</text>'
  };
  if (id === 'readings') return {
    caption:selected ? 'Example: TX is present, but RX shows no received light. The fault location is still unknown.' : 'Site example: +0.25 dBm. Actual acceptable readings depend on the optic’s RX and TX limits.',
    drawing:`<text text-anchor="middle" x="180" y="30">Example health report · dBm</text><rect x="22" y="53" width="145" height="70" rx="5" fill="#1d703f"/><rect x="193" y="53" width="145" height="70" rx="5" fill="${selected ? '#be2532' : '#1d703f'}"/><text class="health-label" x="40" y="78">TX</text><text class="health-value" x="40" y="109">+0.25</text><text class="health-label" x="211" y="78">RX</text><text class="health-value" x="211" y="109">${selected ? '−40' : '+0.25'}</text><text text-anchor="middle" x="180" y="155">${selected ? 'Sending light ≠ receiving light' : 'Check every affected lane'}</text>`
  };
  if (id === 'cleaning') return {
    caption:selected ? 'Dirty example: particles cover part of the core. Cleaning may help; inspect again to verify.' : 'Enlarged drawing of a clean end face. Use approved inspection equipment to check the actual connector.',
    drawing:`<circle class="end-face" cx="99" cy="89" r="63"/><circle class="fiber-core" cx="99" cy="89" r="10"/><path class="lesson-callout" d="M109 85 L182 42 H199 M159 105 H199"/><text x="205" y="46">Core</text><text x="205" y="109">End face</text>${selected ? '<g class="contamination"><circle cx="103" cy="86" r="7"/><circle cx="75" cy="55" r="5"/><circle cx="132" cy="119" r="6"/><path d="M91 94 Q106 99 113 91"/></g><path class="lesson-callout" d="M114 94 L182 149 H199"/><text x="205" y="153">Dust / oil</text>' : '<text class="small" x="205" y="153">No visible debris</text>'}`
  };
  if (id === 'loopbacks') return {
    caption:selected ? 'MMC loop at the passive: the return includes the optic and the fiber path to this loop point.' : 'LC loop at the optic: TX returns directly to RX through the short loopback.',
    drawing:box(10,48,91,82,'Optic')+'<text class="small" x="75" y="65">TX</text><text class="small" x="75" y="121">RX</text>'+wire('M101 73 H270 Q316 73 316 91 Q316 109 270 109 H101')+(selected ? '<rect class="lesson-connector" x="209" y="60" width="32" height="62" rx="3"/><text class="small" x="122" y="47">LC legs + fiber</text><text class="small" x="199" y="144">MMC / passive</text><text class="small" x="264" y="47">MMC loop</text>' : '<rect class="lesson-connector" x="104" y="64" width="35" height="18" rx="2"/><rect class="lesson-connector" x="104" y="100" width="35" height="18" rx="2"/><text x="187" y="47">LC loopback</text>')
  };
  const seen = selected === 0, wrong = selected === 2;
  return {
    caption:seen ? 'Light at the expected port supports continuity. Measure loss separately.' : wrong ? 'Light at a different port suggests a mapping or polarity problem. Check the route.' : 'No light at the expected port: verify the VFL setup, connections and the fiber span.',
    drawing:box(12,10,80,32,'Optic','offline')+'<text class="small" x="106" y="31">Disconnected</text>'+box(12,85,80,42,'VFL')+'<circle class="vfl-red" cx="80" cy="97" r="3"/>'+box(248,53,104,106,'')+`<path class="lesson-wire ${seen ? 'return-wire' : 'uncertain-wire'}" d="M92 106 H159 Q180 106 180 82 H269"/>${wrong ? '<path class="lesson-wire wrong-wire" d="M92 106 H159 Q180 106 180 132 H269"/>' : ''}<text class="small" x="252" y="44">Next passive</text><circle class="${seen ? 'vfl-red' : 'vfl-dark'}" cx="269" cy="82" r="8"/><text class="small" x="283" y="87">Expected</text><circle class="${wrong ? 'vfl-red' : 'vfl-dark'}" cx="269" cy="132" r="8"/><text class="small" x="283" y="137">Other</text>`
  };
}
