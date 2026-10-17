// Public aggregate endpoint; deployment credentials never belong in browser code.
const PRODUCTION_ENDPOINT = 'https://fiber-fundamentals-counter.wolfhouse-studio.workers.dev';
const VISIT_KEY = 'fiber-visit-v1';
const DAY = 86400000;

export function createSiteCounter({endpoint, storage, fetchImpl = fetch, now = Date.now, newId = () => crypto.randomUUID(), onCounts = () => {}}) {
  let visitMemory;
  const pending = new Map(), completed = new Set();
  const newEvent = kind => ({id:newId(),kind,at:now()});
  async function request(event) {
    if (!endpoint) return null;
    try {
      const response = await fetchImpl(`${endpoint}/${event ? 'events' : 'stats'}`, {
        ...(event ? {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(event)} : {}),
        credentials:'omit',referrerPolicy:'no-referrer',cache:'no-store',signal:AbortSignal.timeout(6000)
      });
      if (!response.ok) throw new Error('Counter unavailable');
      const counts = await response.json();
      if (![counts.visits,counts.exams].every(value => Number.isSafeInteger(value) && value >= 0)) throw new Error('Invalid totals');
      onCounts(counts); return counts;
    } catch { onCounts(null); return null; }
  }
  function complete(event, {practice = false} = {}) {
    if (!event || practice || completed.has(event.id)) return Promise.resolve(null);
    if (pending.has(event.id)) return pending.get(event.id);
    const sent = request(event).then(counts => { if (counts) completed.add(event.id); return counts; }).finally(() => pending.delete(event.id));
    pending.set(event.id, sent); return sent;
  }
  return {
    startExam:() => newEvent('exam'),
    completeExam:complete,
    async visit() {
      let saved = visitMemory;
      try { saved = JSON.parse(storage?.getItem(VISIT_KEY) || 'null') || saved; } catch { /* Storage is optional. */ }
      if (!saved?.event || saved.event.kind !== 'visit' || typeof saved.event.id !== 'string'
        || !Number.isSafeInteger(saved.event.at) || saved.event.at < now() - DAY || saved.event.at > now())
        saved = {event:newEvent('visit'),sent:false};
      visitMemory = saved;
      try { storage?.setItem(VISIT_KEY,JSON.stringify(saved)); } catch { /* Retain it in memory. */ }
      const counts = await (saved.sent ? request() : complete(saved.event));
      if (counts) {
        saved.sent = true;
        try { storage?.setItem(VISIT_KEY,JSON.stringify(saved)); } catch { /* The course still works. */ }
      }
      return counts;
    }
  };
}

let counter, statsHost, lastCounts;
function sharedCounter() {
  if (!counter) {
    let storage; try { storage = window.sessionStorage; } catch { /* Private/restricted browser. */ }
    const local = ['localhost','127.0.0.1'].includes(location.hostname);
    const production = location.hostname === 'ironfaith.github.io' && location.pathname.startsWith('/fiber-troubleshooting/');
    counter = createSiteCounter({endpoint:local ? 'http://127.0.0.1:8787' : production ? PRODUCTION_ENDPOINT : '', storage, onCounts:paintCounts});
  }
  return counter;
}
function paintCounts(counts) {
  // Responses may finish out of order; aggregate totals never move backwards.
  if (counts) lastCounts = {...counts,visits:Math.max(counts.visits,lastCounts?.visits || 0),exams:Math.max(counts.exams,lastCounts?.exams || 0)};
  if (!statsHost) return;
  statsHost.querySelector('[data-visits]').textContent = lastCounts ? lastCounts.visits.toLocaleString() : '—';
  statsHost.querySelector('[data-exams]').textContent = lastCounts ? lastCounts.exams.toLocaleString() : '—';
  statsHost.querySelector('[data-visit-label]').textContent = lastCounts?.visits === 1 ? 'visit' : 'visits';
  statsHost.querySelector('[data-exam-label]').textContent = lastCounts?.exams === 1 ? 'exam completed' : 'exams completed';
  statsHost.querySelector('.counter-note').textContent = lastCounts
    ? 'Visits count browsing sessions. Completed exams include full retakes.' : 'Shared counts are temporarily unavailable.';
}
export function startExamCount() { return sharedCounter().startExam(); }
export function recordExamCompletion(event, options) { void sharedCounter().completeExam(event, options); }
export function mountSiteCounter() {
  const footer = document.querySelector('.site-credit');
  if (!footer || statsHost) return;
  const local = ['localhost','127.0.0.1'].includes(location.hostname);
  if (!local && !PRODUCTION_ENDPOINT) return;
  statsHost = document.createElement('div'); statsHost.className = 'site-stats';
  statsHost.setAttribute('aria-label','Course activity');
  statsHost.innerHTML = '<p><span><strong data-visits>—</strong> <span data-visit-label>visits</span></span><span><strong data-exams>—</strong> <span data-exam-label>exams completed</span></span></p><small class="counter-note">Loading shared counts…</small>';
  footer.append(statsHost);
  void sharedCounter().visit();
}
