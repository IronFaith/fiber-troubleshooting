import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const files = { '/': ['index.html', 'text/html'], '/index.html': ['index.html', 'text/html'], '/styles.css': ['styles.css', 'text/css'], '/app.mjs': ['app.mjs', 'text/javascript'], '/flow.mjs': ['flow.mjs', 'text/javascript'], '/icon.svg': ['icon.svg', 'image/svg+xml'] };
files['/assets/fiber-preview-v1.png'] = ['assets/fiber-preview-v1.png', 'image/png'];
files['/learn.html'] = ['learn.html', 'text/html'];
files['/devices.html'] = ['devices.html', 'text/html'];
files['/patching.html'] = ['patching.html', 'text/html'];
files['/simulations.html'] = ['simulations.html', 'text/html'];
files['/course.mjs'] = ['course.mjs', 'text/javascript'];
files['/site-counter.mjs'] = ['site-counter.mjs', 'text/javascript'];
files['/reference.mjs'] = ['reference.mjs', 'text/javascript'];
files['/reference-data.mjs'] = ['reference-data.mjs', 'text/javascript'];
files['/learning.mjs'] = ['learning.mjs', 'text/javascript'];
files['/communication-route.mjs'] = ['communication-route.mjs', 'text/javascript'];
files['/quiz.html'] = ['quiz.html', 'text/html'];
files['/quiz.mjs'] = ['quiz.mjs', 'text/javascript'];
files['/quiz-data.mjs'] = ['quiz-data.mjs', 'text/javascript'];
files['/loop-exam.mjs'] = ['loop-exam.mjs', 'text/javascript'];
files['/case-guidance.mjs'] = ['case-guidance.mjs', 'text/javascript'];
files['/loop-visuals.mjs'] = ['loop-visuals.mjs', 'text/javascript'];
files['/rack-visuals.mjs'] = ['rack-visuals.mjs', 'text/javascript'];
files['/light-visuals.mjs'] = ['light-visuals.mjs', 'text/javascript'];
files['/test-tool-visuals.mjs'] = ['test-tool-visuals.mjs', 'text/javascript'];
files['/loop-lesson.mjs'] = ['loop-lesson.mjs', 'text/javascript'];
for(const name of ['patching-visuals.mjs','patch-practice.mjs','patch-practice-data.mjs','patch-cable-visuals.mjs','quiz-visuals.mjs']) files[`/${name}`]=[name,'text/javascript'];
for(const name of ['troubleshoot.mjs','troubleshoot-state.mjs','troubleshoot-visuals.mjs','troubleshoot-tools.mjs','troubleshoot-patching.mjs','vfl-simple.mjs']) files[`/${name}`]=[name,'text/javascript'];
for(const name of ['quiz-session.mjs','quiz-variants.mjs','applied-exams.mjs','exam-evidence.mjs','reasoning-lessons.mjs','polarity-lesson.mjs','connected-case.mjs']) files[`/${name}`]=[name,'text/javascript'];
for(const name of ['i18n.mjs','locale.mjs','spanish.mjs','french.mjs','arabic.mjs']) files[`/${name}`]=[name,'text/javascript'];
createServer(async (request, response) => {
  const file = files[new URL(request.url, 'http://localhost').pathname];
  if (!file) { response.writeHead(404); response.end('Not found'); return; }
  try {
    const body = await readFile(new URL(file[0], import.meta.url));
    response.writeHead(200, { 'Content-Type': `${file[1]}; charset=utf-8`, 'Cache-Control': 'no-store' });
    response.end(body);
  } catch { response.writeHead(500); response.end('Unable to read asset'); }
}).listen(4182, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4182'));
