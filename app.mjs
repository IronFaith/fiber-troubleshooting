import { loopIllustration } from './loop-visuals.mjs?v=4';
import { lightFlow, lightSource } from './light-visuals.mjs?v=1';
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
  const art = loopIllustration(kind);
  const figure = el('figure', 'test-sketch hardware-sketch');
  figure.innerHTML = `<svg viewBox="0 0 360 ${art.height}" role="img" aria-label="${art.label}">${art.drawing}${lightFlow(art.lightPath)}</svg>`;
  sketchFooter(figure, art.caption);
  return figure;
}
function sketchFooter(figure, caption, animated = true) {
  figure.classList.toggle('light-paused',lightPaused);
  const footer = el('figcaption');
  footer.append(el('span', '', caption));
  if (!animated) { figure.append(footer); return; }
  const toggle = el('button', 'motion-toggle', lightPaused ? 'Play light' : 'Pause light');
  toggle.type = 'button';
  toggle.addEventListener('click', () => {
    lightPaused = !lightPaused;
    figure.classList.toggle('light-paused',lightPaused);
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
    ${active ? lightSource(84,112,'red') : ''}
    ${seen || wrong ? lightFlow(wrong ? otherPath : expectedPath,'red')+'<path class="red-arrow" d="M172 90 l7 5 -7 5" transform="translate(0 '+(wrong ? 42 : 0)+')"/>' : ''}`;
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
