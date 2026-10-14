import { nodes, currentNode, answerQuestion, goBack, restoreHistory } from './flow.mjs';

const storageKey = 'fiberline-low-rx-path-v2';
let history = [];
try { history = restoreHistory(JSON.parse(sessionStorage.getItem(storageKey))); } catch { /* A fresh path also works without storage. */ }

const diagram = document.querySelector('#diagram');
const back = document.querySelector('#back');
const restart = document.querySelector('#restart');

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function save() {
  try { sessionStorage.setItem(storageKey, JSON.stringify(history)); } catch { /* Storage is optional. */ }
}

function change(nextHistory) {
  history = nextHistory;
  save();
  render(true);
}

function branchesFor(id, index, selected) {
  const branches = element('div', `branches${selected ? ' answered' : ''}`);
  for (const answer of ['yes', 'no']) {
    const destination = nodes[nodes[id][answer]];
    const branch = element('button', `branch ${answer}${selected === answer ? ' selected' : ''}`);
    branch.type = 'button';
    branch.dataset.answer = answer;
    const name = answer === 'yes' ? 'Yes' : 'No';
    branch.setAttribute('aria-label', `${selected ? `Change question ${index + 1} to ` : ''}${name}: ${destination.title}`);
    if (selected) branch.setAttribute('aria-pressed', String(selected === answer));
    const label = element('span', 'branch-label');
    label.append(element('span', 'branch-symbol', answer === 'yes' ? '✓' : '×'), document.createTextNode(name));
    branch.append(label, element('span', 'branch-next', destination.title));
    if (selected === answer) branch.append(element('span', 'followed-label', 'Your path ↓'));
    branch.addEventListener('click', () => change(answerQuestion(goBack(history, index), answer)));
    branches.append(branch);
  }
  return branches;
}

function render(moveFocus = false) {
  diagram.replaceChildren();
  const id = currentNode(history);
  const node = nodes[id];
  document.querySelector('#step-label').textContent = node.terminal ? 'Your next action' : `Question ${history.length + 1}`;
  back.disabled = restart.disabled = history.length === 0;

  history.forEach((entry, index) => {
    const item = element('div', 'past-step');
    const question = element('button', 'past-question');
    question.type = 'button';
    question.append(element('span', 'past-number', String(index + 1)), element('span', '', nodes[entry.id].title), element('span', 'edit-label', 'Change'));
    question.setAttribute('aria-label', `Change answer to question ${index + 1}: ${nodes[entry.id].title}`);
    question.addEventListener('click', () => change(goBack(history, index)));
    const connector = element('div', `continuation ${entry.answer}`);
    connector.setAttribute('aria-hidden', 'true');
    connector.append(element('span', 'connector-arrow'));
    item.append(question, branchesFor(entry.id, index, entry.answer), connector);
    diagram.append(item);
  });

  const current = element('section', `current-step${node.terminal ? ' outcome' : ''}${node.success ? ' success' : ''}`);
  current.id = 'current-step';
  current.setAttribute('aria-labelledby', 'question-title');
  const card = element('div', 'question-card');
  const meta = element('div', 'question-meta');
  meta.append(element('span', node.terminal ? 'outcome-symbol' : 'decision-symbol', node.terminal ? (node.success ? '✓' : '→') : '?'), element('span', '', node.phase));
  const heading = element('h2', '', node.title);
  heading.id = 'question-title';
  heading.tabIndex = -1;
  card.append(meta, heading, element('p', 'instruction', node.instruction));
  if (node.note) {
    const meaning = element('p', 'meaning');
    meaning.append(element('strong', '', 'Why this check: '), document.createTextNode(node.note));
    card.append(meaning);
  }

  if (node.details.length) {
    const help = element(node.terminal ? 'div' : 'details', 'help');
    if (!node.terminal) help.append(element('summary', '', 'How to check'));
    if (node.details.length) {
      const list = element('ul');
      for (const detail of node.details) list.append(element('li', '', detail));
      help.append(list);
    }
    card.append(help);
  }
  if (node.terminal) {
    const findings = history.map(entry => nodes[entry.id].findings?.[entry.answer]).filter(Boolean);
    if (findings.length) {
      const evidence = element('div', 'evidence');
      evidence.append(element('h3', '', 'What your checks showed'));
      const list = element('ul');
      for (const finding of findings) list.append(element('li', '', finding));
      evidence.append(list);
      card.append(evidence);
    }
  }
  current.append(card);

  if (!node.terminal) {
    current.append(branchesFor(id, history.length));
    current.append(element('p', 'branch-hint', 'Tap a branch to continue.'));
  } else {
    const reset = element('button', 'primary-button', 'Start a new check');
    reset.type = 'button';
    reset.addEventListener('click', () => change([]));
    current.append(reset);
  }
  diagram.append(current);
  if (moveFocus) {
    heading.focus({ preventScroll: true });
    const anchor = diagram.querySelector('.past-step:last-of-type .branches') || current;
    anchor.scrollIntoView({ block: 'start', behavior: 'instant' });
    document.querySelector('#status').textContent = `${node.terminal ? 'Next action' : `Question ${history.length + 1}`}: ${node.title}`;
  }
}

back.addEventListener('click', () => change(goBack(history)));
restart.addEventListener('click', () => change([]));
render();
