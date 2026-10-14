import { nodes, destination, currentNode, answerQuestion, goBack, restoreHistory, fiberTrace } from './flow.mjs?v=8';

const storageKey = 'fiberline-loop-first-v5';
let mode = 'direct';
let history = [];
let lightPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
try {
  const saved = JSON.parse(sessionStorage.getItem(storageKey));
  mode = saved?.mode === 'passive' ? 'passive' : 'direct';
  history = restoreHistory(saved?.history, mode);
} catch { /* Storage is optional. */ }
const diagram = document.querySelector('#diagram');
const back = document.querySelector('#back');
const restart = document.querySelector('#restart');

function el(tag, className = '', text = '') {
  const item = document.createElement(tag);
  if (className) item.className = className;
  if (text) item.textContent = text;
  return item;
}
function change(next) {
  history = next;
  try { sessionStorage.setItem(storageKey, JSON.stringify({ mode, history })); } catch { /* Optional. */ }
  render(true);
}
function sketch(kind) {
  if (kind === 'fiber') return fiberSketch();
  const figure = el('figure', `test-sketch ${kind}`);
  const defs = '<defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="#245b91"/></marker><marker id="return-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="#226946"/></marker></defs>';
  let drawing, caption, label, lightPath;
  if (kind === 'direct') {
    label = 'LC loopback at the optic. Light leaves TX through one LC plug, loops around, and returns through the other LC plug to RX.';
    drawing = '<rect class="device" x="23" y="37" width="105" height="79" rx="6"/><text x="37" y="82">Optic</text><text class="port" x="103" y="57">TX</text><text class="port" x="103" y="104">RX</text><rect class="connector" x="129" y="43" width="37" height="18" rx="2"/><rect class="connector" x="129" y="91" width="37" height="18" rx="2"/><path class="clip" d="M138 40 H160 M138 88 H160"/><path class="light" d="M128 52 H224" marker-end="url(#arrow)"/><path class="light" d="M225 52 H267 Q296 52 296 76"/><path class="light return" d="M296 76 Q296 100 267 100 H128" marker-end="url(#return-arrow)"/><text x="189" y="27">LC loopback</text><text class="small" x="184" y="76">TX out / RX back</text>';
    caption = 'Light leaves TX and loops back to RX.';
    lightPath = 'M128 52 H267 Q296 52 296 76 Q296 100 267 100 H128';
  } else {
    label = 'MMC loopback at passive CAS 1 Port 12. Optic TX connects through an LC follower and the MMC leader to the passive loop; light returns through the mapped LC follower to optic RX. One test pair is illustrated, not the full lane map.';
    drawing = '<text x="8" y="33">Optic</text><rect class="device" x="6" y="49" width="62" height="69" rx="5"/><text class="port" x="39" y="74">TX</text><text class="port" x="39" y="108">RX</text><rect class="connector" x="70" y="62" width="23" height="16" rx="2"/><rect class="connector" x="70" y="96" width="23" height="16" rx="2"/><text class="small" x="85" y="45">LC legs</text><text class="small" x="85" y="132">Followers</text><rect class="connector" x="203" y="59" width="27" height="56" rx="3"/><text class="small" x="159" y="31">MMC leader</text><path class="callout" d="M204 36 L215 56"/><rect class="group" x="231" y="51" width="13" height="72" rx="2"/><text class="small" x="216" y="15">CAS 1 · Port 12</text><path class="callout" d="M240 20 V49"/><rect class="connector loop-plug" x="245" y="59" width="27" height="56" rx="3"/><path class="light" d="M68 70 H169" marker-end="url(#arrow)"/><path class="light" d="M170 70 H302 Q326 70 326 87"/><path class="light return" d="M326 87 Q326 104 302 104 H68" marker-end="url(#return-arrow)"/><text class="small" x="236" y="140">MMC loopback</text><path class="callout" d="M265 125 L259 117"/>';
    caption = 'Tests the optic + LC legs + MMC path to the loop.';
    lightPath = 'M68 70 H302 Q326 70 326 87 Q326 104 302 104 H68';
  }
  figure.innerHTML = `<svg viewBox="0 0 350 ${kind === 'direct' ? 125 : 150}" role="img" aria-label="${label}">${defs}${drawing}${lightArrow(lightPath)}</svg>`;
  sketchFooter(figure, caption);
  return figure;
}
function lightArrow(path) {
  return `<g class="moving-light" aria-hidden="true"><path d="M-7-5 L3 0 L-7 5 L-4 0 Z"/><animateMotion dur="3.5s" repeatCount="indefinite" path="${path}" rotate="auto"/></g>`;
}
function sketchFooter(figure, caption, animated = true) {
  const footer = el('figcaption');
  footer.append(el('span', '', caption));
  if (!animated) { figure.append(footer); return; }
  const toggle = el('button', 'motion-toggle', lightPaused ? 'Play light' : 'Pause light');
  toggle.type = 'button';
  toggle.addEventListener('click', () => {
    lightPaused = !lightPaused;
    const svg = figure.querySelector('svg');
    if (lightPaused) svg.pauseAnimations(); else svg.unpauseAnimations();
    toggle.textContent = lightPaused ? 'Play light' : 'Pause light';
  });
  footer.append(toggle);
  figure.append(footer);
}
function fiberSketch() {
  const { segment, traced, observation } = fiberTrace(history);
  const state = {
    setup: ['Not connected', 'Isolate both ends, then connect VFL to the fiber.'],
    unknown: ['Not checked', 'VFL is connected. Check the mapped port and strand.'],
    seen: ['Light seen ✓', 'Trace confirmed here; attenuation is still untested.'],
    missing: ['No light here ×', 'Check this span, its connections and nearby ports.'],
    misport: ['Wrong port', 'Light is at another port. Check the map and polarity.']
  }[observation];
  const figure = el('figure', `test-sketch fiber-trace ${observation}`);
  const heading = el('div', 'trace-heading');
  heading.append(el('strong', '', `Segment ${segment}`), el('span', 'trace-state', state[0]));
  const progress = el('div', 'trace-progress');
  progress.append(el('span', 'optic-verified', '✓ Optic loop passed'), el('span', '', `${traced} traced`));
  figure.append(heading, progress);
  const expectedPath = 'M84 112 H128 Q144 112 144 95 H246';
  const otherPath = 'M84 112 H128 Q144 112 144 137 H246';
  const seen = observation === 'seen', wrong = observation === 'misport';
  const active = observation !== 'setup';
  const suspect = observation === 'missing' || wrong;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 350 170');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', `Segment ${segment}. ${active ? 'Local optic disconnected from the VFL test.' : 'Disconnect active equipment before connecting VFL.'} ${state[0]}. ${traced} segments traced. ${state[1]}`);
  svg.innerHTML = `
    ${suspect ? '<rect class="suspect-span" x="82" y="65" width="261" height="98" rx="7"/>' : ''}
    <rect class="offline-optic" x="8" y="9" width="82" height="36" rx="5"/><text class="small" x="17" y="32">Local optic</text>
    <path class="disconnected" d="M90 27 H108 V63 M101 63 H115"/>
    <text class="small" x="119" y="30">${active ? 'Disconnected' : 'Disconnect first'}</text>
    <rect class="passive-panel" x="226" y="58" width="116" height="103" rx="5"/>
    <text class="small" x="231" y="48">Next passive</text>
    <path class="trace-line ${seen ? 'confirmed' : 'unconfirmed'}" d="${expectedPath}"/>
    ${wrong ? `<path class="trace-line misrouted" d="${otherPath}"/>` : ''}
    <rect class="vfl-source ${active ? 'on' : ''}" x="8" y="93" width="76" height="38" rx="5"/>
    <text x="23" y="117">VFL</text><circle class="source-led ${active ? 'lit' : ''}" cx="71" cy="105" r="3"/>
    ${active ? '<path class="source-light" d="M84 112 H111"/>' : ''}
    <text class="small" x="8" y="151">${segment === 1 ? 'First test point' : 'Last traced point'}</text>
    <rect class="trace-port" x="232" y="81" width="28" height="28" rx="3"/>
    <circle class="port-light ${seen ? 'lit' : ''}" cx="246" cy="95" r="7"/>
    <text class="small" x="266" y="99">Expected</text>
    <rect class="trace-port" x="232" y="123" width="28" height="28" rx="3"/>
    <circle class="port-light ${wrong ? 'lit' : ''}" cx="246" cy="137" r="7"/>
    <text class="small" x="266" y="141">Other</text>
    ${observation === 'missing' || wrong ? '<path class="dark-port" d="M242 91 L250 99 M250 91 L242 99"/>' : ''}
    ${seen || wrong ? lightArrow(wrong ? otherPath : expectedPath) : ''}`;
  figure.append(svg);
  sketchFooter(figure, state[1], seen || wrong);
  return figure;
}
function readingExamples() {
  const examples = el('div', 'reading-examples');
  examples.setAttribute('aria-label', 'Example optic health readings in dBm');
  for (const [state, label, value] of [['good', '✓ Good example', '+0.25'], ['dark', '× No light', '−40']]) {
    const example = el('div', `reading-example ${state}`);
    example.append(el('span', 'reading-label', label));
    const values = el('div', 'reading-values');
    for (const signal of ['RX', 'TX']) {
      const badge = el('span', 'reading-badge');
      badge.append(el('span', '', signal), el('strong', '', value));
      values.append(badge);
    }
    example.append(values);
    examples.append(example);
  }
  examples.append(el('p', 'reading-note', 'dBm examples · use site / optic limits'));
  return examples;
}
function render(moveFocus = false) {
  diagram.replaceChildren();
  const node = nodes[currentNode(history, mode)];
  back.disabled = restart.disabled = history.length === 0;
  document.querySelector('#step-label').textContent = node.terminal ? 'Result' : `Step ${history.length + 1} · ${node.phase}`;
  document.querySelectorAll('[data-mode]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === mode)));

  if (history.length) {
    const trail = el('ol', 'trail');
    trail.setAttribute('aria-label', 'Actions and answers you chose');
    history.forEach((entry, index) => {
      const past = nodes[entry.id];
      const row = el('li', `trail-step ${entry.answer}`);
      const edit = el('button', 'trail-choice');
      edit.type = 'button';
      edit.setAttribute('aria-label', `Change step ${index + 1}: ${past.action}. You chose ${entry.answer}.`);
      const copy = el('span', 'trail-copy');
      copy.append(el('strong', '', past.action), el('span', '', past.title));
      const answer = el('span', 'answer-badge', `Chose ${entry.answer === 'yes' ? 'Yes ✓' : 'No ×'}`);
      edit.append(el('span', 'step-number', String(index + 1)), copy, answer);
      edit.addEventListener('click', () => change(goBack(history, index)));
      row.append(edit, el('div', 'chosen-arrow', '↓'));
      trail.append(row);
    });
    diagram.append(trail);
  }

  const current = el('section', `current${node.terminal ? ' outcome' : ''}${node.success ? ' success' : ''}`);
  current.id = 'current-step';
  current.setAttribute('aria-labelledby', 'action-title');
  const card = el('div', 'action-card');
  card.append(el('div', 'now-label', node.terminal ? 'Your result' : history.length ? 'Next action' : 'Start here'));
  const title = el('h2', '', node.action);
  title.id = 'action-title';
  title.tabIndex = -1;
  card.append(title, el('p', 'instruction', node.instruction));
  if (node.visual) card.append(sketch(node.visual));
  if (node.note) card.append(el('p', 'test-note', node.note));
  current.append(card);
  if (!node.terminal) {
    const decision = el('div', 'decision');
    const question = el('div', 'decision-question');
    question.append(el('span', 'decision-icon', '?'), el('h3', '', node.title));
    decision.append(question);
    if (node.visual === 'direct' || node.visual === 'passive' || ['compare', 'reconnect', 'recheck'].includes(currentNode(history, mode))) decision.append(readingExamples());
    current.append(decision);
    const branches = el('div', 'branches');
    for (const answer of ['yes', 'no']) {
      const next = nodes[destination(currentNode(history, mode), answer, mode)];
      const nextAction = next.action;
      const label = answer === 'yes' ? 'Yes' : 'No';
      const branch = el('button', `branch ${answer}`);
      branch.type = 'button';
      branch.setAttribute('aria-label', `${label}: ${nextAction}`);
      branch.append(el('strong', '', label), el('span', 'next-label', `Next: ${nextAction}`));
      branch.addEventListener('click', () => change(answerQuestion(history, answer, mode)));
      branches.append(branch);
    }
    current.append(branches);
  } else {
    const fresh = el('button', 'new-check', 'Start a new check');
    fresh.type = 'button';
    fresh.addEventListener('click', () => change([]));
    current.append(fresh);
  }
  diagram.append(current);
  if (lightPaused) current.querySelector('svg')?.pauseAnimations();
  if (moveFocus) {
    title.focus({ preventScroll: true });
    const anchor = diagram.querySelector('.trail-step:last-child') || current;
    anchor.scrollIntoView({ block: 'start', behavior: 'instant' });
    document.querySelector('#status').textContent = `${history.length ? `You chose ${history.at(-1).answer}. ` : ''}${node.terminal ? 'Result' : 'Next action'}: ${node.action}`;
  }
}
back.addEventListener('click', () => change(goBack(history)));
restart.addEventListener('click', () => change([]));
document.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => {
  if (mode === button.dataset.mode) return;
  mode = button.dataset.mode;
  change([]);
}));
render();
