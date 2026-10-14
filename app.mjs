import { nodes, destination, currentNode, answerQuestion, goBack, restoreHistory } from './flow.mjs?v=5';

const storageKey = 'fiberline-loop-first-v5';
let mode = 'direct';
let history = [];
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
  const figure = el('figure', `test-sketch ${kind}`);
  const defs = '<defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="currentColor"/></marker></defs>';
  let drawing, caption, label;
  if (kind === 'direct') {
    label = 'Light leaves optic TX, passes through the direct loopback, and returns to optic RX.';
    drawing = '<rect class="device" x="15" y="12" width="104" height="74" rx="6"/><text x="35" y="53">Optic</text><text class="port" x="91" y="34">TX</text><text class="port" x="91" y="72">RX</text><path class="light" d="M120 30 H239 Q263 30 263 50 Q263 70 239 70 H120" marker-end="url(#arrow)"/><text x="158" y="53">Loopback</text>';
    caption = 'Tests the optic through the direct loop.';
  } else if (kind === 'passive') {
    label = 'Loop path: optic, MMC leader and mapped LC follower group, passive loop, back to the optic. Group illustration, not a pin map.';
    drawing = '<rect class="device" x="5" y="20" width="64" height="60" rx="6"/><text x="15" y="55">Optic</text><rect class="group" x="91" y="12" width="147" height="77" rx="6"/><text x="106" y="38">MMC leader</text><text class="small" x="107" y="61">LC legs / followers</text><path class="light" d="M69 33 H91 M238 33 H286 Q310 33 310 51 Q310 71 286 71 H238 M91 71 H69" marker-end="url(#arrow)"/><text class="small" x="263" y="17">CAS loop</text>';
    caption = 'Tests the optic + fiber to the loop point.';
  } else {
    label = 'VFL connected to isolated fiber, traced to the expected passive port.';
    drawing = '<rect class="device" x="7" y="28" width="69" height="43" rx="6"/><text x="28" y="54">VFL</text><path class="light" d="M76 50 H228" marker-end="url(#arrow)"/><text class="small" x="110" y="36">Isolated fiber</text><rect class="group" x="236" y="21" width="100" height="58" rx="6"/><text x="255" y="46">Expected</text><text x="271" y="66">port</text>';
    caption = 'Check the exact port and strand.';
  }
  figure.innerHTML = `<svg viewBox="0 0 350 100" role="img" aria-label="${label}">${defs}${drawing}</svg>`;
  figure.append(el('figcaption', '', caption));
  return figure;
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
    decision.append(el('span', 'decision-icon', '?'), el('h3', '', node.title));
    current.append(decision);
    const branches = el('div', 'branches');
    for (const answer of ['yes', 'no']) {
      const next = nodes[destination(currentNode(history, mode), answer, mode)];
      const nextAction = currentNode(history, mode) === 'bothEnds' && answer === 'no' ? 'Loop the other optic' : next.action;
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
