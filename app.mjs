import { nodes, destination, currentNode, answerQuestion, goBack, restoreHistory } from './flow.mjs?v=6';

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
  const defs = '<defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="#245b91"/></marker><marker id="return-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="#226946"/></marker></defs>';
  let drawing, caption, label;
  if (kind === 'direct') {
    label = 'LC loopback at the optic. Light leaves TX through one LC plug, loops around, and returns through the other LC plug to RX.';
    drawing = '<rect class="device" x="23" y="37" width="105" height="79" rx="6"/><text x="37" y="82">Optic</text><text class="port" x="103" y="57">TX</text><text class="port" x="103" y="104">RX</text><rect class="connector" x="129" y="43" width="37" height="18" rx="2"/><rect class="connector" x="129" y="91" width="37" height="18" rx="2"/><path class="clip" d="M138 40 H160 M138 88 H160"/><path class="light" d="M128 52 H224" marker-end="url(#arrow)"/><path class="light" d="M225 52 H267 Q296 52 296 76"/><path class="light return" d="M296 76 Q296 100 267 100 H128" marker-end="url(#return-arrow)"/><text x="189" y="27">LC loopback</text><text class="small" x="184" y="76">TX out / RX back</text>';
    caption = 'Light leaves TX and loops back to RX.';
  } else if (kind === 'passive') {
    label = 'MMC loopback at passive CAS 1 Port 12. Optic TX connects through an LC follower and the MMC leader to the passive loop; light returns through the mapped LC follower to optic RX. One test pair is illustrated, not the full lane map.';
    drawing = '<text x="8" y="33">Optic</text><rect class="device" x="6" y="49" width="62" height="69" rx="5"/><text class="port" x="39" y="74">TX</text><text class="port" x="39" y="108">RX</text><rect class="connector" x="70" y="62" width="23" height="16" rx="2"/><rect class="connector" x="70" y="96" width="23" height="16" rx="2"/><text class="small" x="85" y="45">LC legs</text><text class="small" x="85" y="132">Followers</text><rect class="connector" x="203" y="59" width="27" height="56" rx="3"/><text class="small" x="159" y="31">MMC leader</text><path class="callout" d="M204 36 L215 56"/><rect class="group" x="231" y="51" width="13" height="72" rx="2"/><text class="small" x="216" y="15">CAS 1 · Port 12</text><path class="callout" d="M240 20 V49"/><rect class="connector loop-plug" x="245" y="59" width="27" height="56" rx="3"/><path class="light" d="M68 70 H169" marker-end="url(#arrow)"/><path class="light" d="M170 70 H302 Q326 70 326 87"/><path class="light return" d="M326 87 Q326 104 302 104 H68" marker-end="url(#return-arrow)"/><text class="small" x="236" y="140">MMC loopback</text><path class="callout" d="M265 125 L259 117"/>';
    caption = 'Tests the optic + LC legs + MMC path to the loop.';
  } else {
    label = 'VFL connected to isolated fiber, traced to the expected passive port.';
    drawing = '<rect class="device" x="7" y="28" width="69" height="43" rx="6"/><text x="28" y="54">VFL</text><path class="light" d="M76 50 H228" marker-end="url(#arrow)"/><text class="small" x="110" y="36">Isolated fiber</text><rect class="group" x="236" y="21" width="100" height="58" rx="6"/><text x="255" y="46">Expected</text><text x="271" y="66">port</text>';
    caption = 'Check the exact port and strand.';
  }
  figure.innerHTML = `<svg viewBox="0 0 350 ${kind === 'fiber' ? 100 : kind === 'direct' ? 125 : 150}" role="img" aria-label="${label}">${defs}${drawing}</svg>`;
  figure.append(el('figcaption', '', caption));
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
    if (node.visual === 'direct' || node.visual === 'passive' || ['compare', 'reconnect'].includes(currentNode(history, mode))) decision.append(readingExamples());
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
