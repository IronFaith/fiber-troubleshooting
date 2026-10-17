const DAY = 86400000;
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const json = (body, status = 200, headers = {}) => Response.json(body, {status, headers: {'Cache-Control':'no-store', ...headers}});

export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    const origin = request.headers.get('Origin');
    const headers = {'Access-Control-Allow-Origin':env.ALLOWED_ORIGIN, 'Vary':'Origin'};
    if (origin && origin !== env.ALLOWED_ORIGIN) return json({error:'Origin not allowed'}, 403);
    if (path !== '/stats' && path !== '/events') return json({error:'Not found'}, 404, headers);
    if (request.method === 'OPTIONS') return new Response(null, {status:204, headers:{...headers,
      'Access-Control-Allow-Methods':'GET, POST, OPTIONS', 'Access-Control-Allow-Headers':'Content-Type', 'Access-Control-Max-Age':'86400'}});
    if (!((path === '/stats' && request.method === 'GET') || (path === '/events' && request.method === 'POST')))
      return json({error:'Method not allowed'}, 405, headers);
    if (path === '/events' && origin !== env.ALLOWED_ORIGIN) return json({error:'Origin required'}, 403, headers);
    if (env.REQUEST_LIMIT && !(await env.REQUEST_LIMIT.limit({key:request.headers.get('CF-Connecting-IP') || 'unknown'})).success)
      return json({error:'Please try again later'}, 429, {...headers, 'Retry-After':'60'});
    let event;
    if (path === '/events') {
      if (!request.headers.get('Content-Type')?.startsWith('application/json')) return json({error:'JSON required'}, 415, headers);
      // Bound the actual stream, not only the client-provided Content-Length.
      const reader = request.body?.getReader(); let size = 0, chunks = [];
      if (!reader) return json({error:'Event required'}, 400, headers);
      for (;;) {
        const {value, done} = await reader.read(); if (done) break;
        size += value.byteLength;
        if (size > 256) { await reader.cancel(); return json({error:'Event too large'}, 413, headers); }
        chunks.push(value);
      }
      try { event = JSON.parse(await new Blob(chunks).text()); } catch { return json({error:'Invalid JSON'}, 400, headers); }
      const now = Date.now();
      const timeEvent = event?.kind === 'time';
      if (!event || !['visit','exam','time'].includes(event.kind) || !uuid.test(event.id) || !Number.isSafeInteger(event.at)
        || event.at < now - DAY || event.at > now + 300000
        || (timeEvent && (!Number.isInteger(event.seconds) || event.seconds < 1 || event.seconds > 120))
        || Object.keys(event).some(key => !(timeEvent ? ['id','kind','at','seconds'] : ['id','kind','at']).includes(key)))
        return json({error:'Invalid or expired event'}, 400, headers);
    }
    const counter = env.COUNTER.getByName('fiber-fundamentals');
    const result = await counter.fetch(new Request('https://counter.internal/', event ? {method:'POST',body:JSON.stringify(event)} : {}));
    return new Response(result.body, {status:result.status, headers:{...headers,'Content-Type':'application/json','Cache-Control':'no-store'}});
  }
};

export class CourseCounter {
  constructor(ctx) {
    this.storage = ctx.storage;
    this.sql = ctx.storage.sql;
    this.sql.exec('CREATE TABLE IF NOT EXISTS totals (id INTEGER PRIMARY KEY CHECK(id=1), visits INTEGER NOT NULL, exams INTEGER NOT NULL, since TEXT)');
    if (!this.sql.exec('PRAGMA table_info(totals)').toArray().some(column => column.name === 'learningSeconds'))
      this.sql.exec('ALTER TABLE totals ADD COLUMN learningSeconds INTEGER NOT NULL DEFAULT 0');
    this.sql.exec('CREATE TABLE IF NOT EXISTS events (id TEXT PRIMARY KEY, kind TEXT NOT NULL, recorded INTEGER NOT NULL)');
    this.sql.exec('CREATE INDEX IF NOT EXISTS event_age ON events(recorded)');
  }
  totals() { return this.sql.exec('SELECT visits, exams, since, learningSeconds FROM totals WHERE id=1').toArray()[0] || {visits:0,exams:0,since:null,learningSeconds:0}; }
  async fetch(request) {
    if (request.method !== 'POST') return json(this.totals());
    const event = await request.json();
    return this.storage.transactionSync(() => {
      const previous = this.sql.exec('SELECT kind FROM events WHERE id=?', event.id).toArray()[0];
      if (previous) return json(previous.kind === event.kind ? this.totals() : {error:'Event ID already used'}, previous.kind === event.kind ? 200 : 409);
      const now = Date.now();
      this.sql.exec('DELETE FROM events WHERE id IN (SELECT id FROM events WHERE recorded < ? LIMIT 100)', now - 14 * DAY);
      this.sql.exec('INSERT INTO events (id,kind,recorded) VALUES (?,?,?)', event.id, event.kind, now);
      this.sql.exec('INSERT OR IGNORE INTO totals (id,visits,exams,since) VALUES (1,0,0,?)', new Date(now).toISOString());
      if (event.kind === 'time') this.sql.exec('UPDATE totals SET learningSeconds=learningSeconds+? WHERE id=1', event.seconds);
      else this.sql.exec(event.kind === 'visit' ? 'UPDATE totals SET visits=visits+1 WHERE id=1' : 'UPDATE totals SET exams=exams+1 WHERE id=1');
      return json(this.totals());
    });
  }
}
