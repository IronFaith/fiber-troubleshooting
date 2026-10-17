// Public aggregate endpoint; deployment credentials never belong in browser code.
const PRODUCTION_ENDPOINT = 'https://fiber-fundamentals-counter.wolfhouse-studio.workers.dev';
const VISIT_KEY = 'fiber-visit-v1';
const TIME_KEY = 'fiber-learning-time-v1';
const DAY = 86400000;

// Keep reading time between interactions, but stop after two idle minutes.
export function createLearningClock({now = Date.now, active = true} = {}) {
  let last = now(), activity = last, milliseconds = 0;
  function sample() {
    const current = now();
    if (active) milliseconds += Math.max(0, Math.min(current, activity + 120000) - last);
    last = current;
  }
  return {
    interact() { sample(); if (active) activity = now(); },
    setActive(value) { sample(); if (value && !active) activity = now(); active = value; },
    takeSeconds() { sample(); const seconds = Math.min(120, Math.floor(milliseconds / 1000)); milliseconds -= seconds * 1000; return seconds; }
  };
}

export function createSiteCounter({endpoint, storage, fetchImpl = fetch, now = Date.now, newId = () => crypto.randomUUID(), onCounts = () => {}}) {
  let visitMemory, timeMemory = [], timeRequest;
  const pending = new Map(), completed = new Set();
  const newEvent = kind => ({id:newId(),kind,at:now()});
  async function request(event) {
    if (!endpoint) return null;
    try {
      const response = await fetchImpl(`${endpoint}/${event ? 'events' : 'stats'}`, {
        ...(event ? {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(event),keepalive:true} : {}),
        credentials:'omit',referrerPolicy:'no-referrer',cache:'no-store',signal:AbortSignal.timeout(6000)
      });
      if (!response.ok) throw new Error('Counter unavailable');
      const counts = await response.json();
      if (![counts.visits,counts.exams].every(value => Number.isSafeInteger(value) && value >= 0)) throw new Error('Invalid totals');
      if (counts.learningSeconds !== undefined && (!Number.isSafeInteger(counts.learningSeconds) || counts.learningSeconds < 0)) throw new Error('Invalid learning time');
      onCounts(counts); return counts;
    } catch { onCounts(null); return null; }
  }
  function complete(event, {practice = false} = {}) {
    if (!event || practice || completed.has(event.id)) return Promise.resolve(null);
    if (pending.has(event.id)) return pending.get(event.id);
    const sent = request(event).then(counts => { if (counts) completed.add(event.id); return counts; }).finally(() => pending.delete(event.id));
    pending.set(event.id, sent); return sent;
  }
  function timeQueue() {
    let queue = timeMemory;
    try { queue = JSON.parse(storage?.getItem(TIME_KEY) || 'null') || queue; } catch { /* Keep an in-memory queue when storage is unavailable. */ }
    return (Array.isArray(queue) ? queue : []).filter(event => event?.kind === 'time' && typeof event.id === 'string'
      && Number.isSafeInteger(event.at) && event.at >= now() - DAY && event.at <= now()
      && Number.isInteger(event.seconds) && event.seconds > 0 && event.seconds <= 120).slice(-240);
  }
  function saveTime(queue) {
    timeMemory = queue;
    try { storage?.setItem(TIME_KEY, JSON.stringify(queue)); } catch { /* Counting must never block learning. */ }
  }
  function recordTime(seconds = 0) {
    const queue = timeQueue();
    if (Number.isSafeInteger(seconds) && seconds > 0 && seconds <= 120)
      queue.push({...newEvent('time'),seconds});
    saveTime(queue);
    if (timeRequest) return timeRequest;
    timeRequest = (async () => {
      for (const event of queue) {
        if (!await request(event)) break;
        // Read again so a page finishing its request cannot erase the next page's time.
        saveTime(timeQueue().filter(value => value.id !== event.id));
      }
    })().finally(() => { timeRequest = null; });
    return timeRequest;
  }
  return {
    startExam:() => newEvent('exam'),
    completeExam:complete,
    recordTime,
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
  if (counts) lastCounts = {...counts,visits:Math.max(counts.visits,lastCounts?.visits || 0),exams:Math.max(counts.exams,lastCounts?.exams || 0),learningSeconds:Math.max(counts.learningSeconds || 0,lastCounts?.learningSeconds || 0)};
  if (!statsHost) return;
  statsHost.querySelector('[data-visits]').textContent = lastCounts ? lastCounts.visits.toLocaleString() : '—';
  statsHost.querySelector('[data-exams]').textContent = lastCounts ? lastCounts.exams.toLocaleString() : '—';
  statsHost.querySelector('[data-hours]').textContent = lastCounts ? (lastCounts.learningSeconds / 3600).toLocaleString(undefined,{minimumFractionDigits:1,maximumFractionDigits:1}) : '—';
  statsHost.querySelector('[data-hours]').title = lastCounts ? `${Math.floor(lastCounts.learningSeconds / 60).toLocaleString()} min ${lastCounts.learningSeconds % 60} sec combined` : '';
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
  statsHost.innerHTML = '<p><span><strong data-visits>—</strong> <span data-visit-label>visits</span></span><span><strong data-exams>—</strong> <span data-exam-label>exams completed</span></span><span><strong data-hours>—</strong> learning hours</span></p><small class="counter-note">Loading shared counts…</small><small class="counter-note">Learning hours are estimated across all learners. Pauses when the page is inactive or after 2 minutes idle.</small>';
  footer.append(statsHost);
  void sharedCounter().visit();
  const isActive = () => document.visibilityState === 'visible' && document.hasFocus();
  const clock = createLearningClock({active:isActive()});
  const flush = () => { void sharedCounter().recordTime(clock.takeSeconds()); };
  const updateActivity = () => { clock.setActive(isActive()); if (!isActive()) flush(); };
  for (const name of ['pointerdown','pointermove','keydown','scroll'])
    document.addEventListener(name, () => clock.interact(), {passive:true});
  document.addEventListener('visibilitychange', updateActivity);
  window.addEventListener('focus', updateActivity);
  window.addEventListener('blur', updateActivity);
  window.addEventListener('pagehide', () => { clock.setActive(false); flush(); });
  window.addEventListener('pageshow', updateActivity);
  setInterval(flush, 60000);
  flush();
}
