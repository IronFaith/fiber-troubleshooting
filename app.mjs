import { nodes, currentNode, answerQuestion, goBack, restoreHistory } from './flow.mjs';

const storageKey = 'fiberline-decision-path-v1';
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

function render(moveFocus = false) {
  diagram.replaceChildren();
  const id = currentNode(history);
  const node = nodes[id];
  document.querySelector('#step-label').textContent = node.terminal ? 'Your next action' : `Question ${history.length + 1}`;
  back.disabled = restart.disabled = history.length === 0;

  if (history.some(entry => entry.id === 'loopbackAllowed' && entry.answer === 'no')) {
    diagram.append(element('p', 'unverified', 'Optical loopback was skipped. A standalone local optic test has not been verified.'));
  }

  history.forEach((entry, index) => {
    const item = element('div', 'past-step');
    const question = element('button', 'past-question');
    question.type = 'button';
    question.append(element('span', 'past-number', String(index + 1)), element('span', '', nodes[entry.id].title), element('span', 'edit-label', 'Change'));
    question.setAttribute('aria-label', `Change answer to question ${index + 1}: ${nodes[entry.id].title}`);
    question.addEventListener('click', () => change(goBack(history, index)));
    const connector = element('div', `path-connector ${entry.answer}`);
    connector.append(element('span', '', entry.answer === 'yes' ? 'Yes' : 'No'));
    item.append(question, connector);
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

  if (node.details.length || node.note) {
    const help = element(node.terminal ? 'div' : 'details', 'help');
    if (!node.terminal) help.append(element('summary', '', 'How to check'));
    if (node.details.length) {
      const list = element('ul');
      for (const detail of node.details) list.append(element('li', '', detail));
      help.append(list);
    }
    if (node.note) help.append(element('p', 'check-note', node.note));
    card.append(help);
  }
  current.append(card);

  if (!node.terminal) {
    const branches = element('div', 'branches');
    for (const answer of ['yes', 'no']) {
      const destination = nodes[node[answer]];
      const branch = element('button', `branch ${answer}`);
      branch.type = 'button';
      branch.dataset.answer = answer;
      const name = answer === 'yes' ? 'Yes' : 'No';
      branch.setAttribute('aria-label', `${name}: ${destination.title}`);
      const label = element('span', 'branch-label');
      label.append(element('span', 'branch-symbol', answer === 'yes' ? '✓' : '×'), document.createTextNode(name));
      branch.append(label, element('span', 'branch-next', destination.title));
      branch.addEventListener('click', () => change(answerQuestion(history, answer)));
      branches.append(branch);
    }
    current.append(branches);
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
    current.scrollIntoView({ block: 'start', behavior: 'instant' });
    document.querySelector('#status').textContent = `${node.terminal ? 'Next action' : `Question ${history.length + 1}`}: ${node.title}`;
  }
}

back.addEventListener('click', () => change(goBack(history)));
restart.addEventListener('click', () => change([]));
render();
