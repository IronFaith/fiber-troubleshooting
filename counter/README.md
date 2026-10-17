# Shared course counter

Deployed on 2026-10-17 UTC at `https://fiber-fundamentals-counter.wolfhouse-studio.workers.dev`. `GET /stats` returns the shared totals. Deployment details are recorded in `deployment.json`.

This is a separate Worker and SQLite Durable Object, in the existing Cloudflare account. It does not use or change the Your Studios relay or its storage. The course stays on GitHub Pages. No paid plan is required within the account's shared free allowances.

The footer counts browsing sessions (per tab, at most 24 hours) and completed exams. Reloading or navigating in the same tab does not add a visit when session storage is available. Closing/reopening a tab or blocked browser storage can add another visit; this is not a count of unique people. A finished five-question knowledge exam, intermediate exam, or patching exam counts once regardless of score. A complete retake counts again; missed-question practice, unfinished attempts, and opening results do not count.

Only aggregate totals and temporary random event IDs are stored. No learner names, scores, answers, or IP addresses are saved in the counter database. Cloudflare receives network requests and uses IP addresses transiently for rate limiting. Duplicate IDs expire after 14 days; aggregate totals remain. The public API accepts events up to 24 hours old, so expired IDs cannot be replayed with their original event timestamp. This is an approximate activity counter, not audited analytics: public requests can be fabricated, and blocked/offline requests can be missed.

The footer also shows combined learning hours, rounded to one decimal place. Time is estimated while the page is visible and focused, with a two-minute allowance for reading between pointer, keyboard or scroll interactions. It pauses in the background, on leaving the window, or after that idle allowance; it resumes on return or interaction. It cannot prove attention or identify individual learners. Time is sent about once a minute and on leaving the page using keepalive requests. Unacknowledged events retain their IDs in session storage for duplicate-safe retries after navigation (up to 240 events, expiring after 24 hours). Abrupt closure or blocked requests can miss time. No activity details or per-person times are sent. Learning time begins with this feature, not with the older visits total.

Existing totals are preserved: the object adds a `learningSeconds` column with a zero default when upgrading an old database. The same Worker, binding and object name are retained.

## Run and publish

Use Wrangler 4 (the existing Your Studios installation works) from this repository:

```powershell
wrangler dev --config counter/wrangler.jsonc --port 8787 --var ALLOWED_ORIGIN:http://127.0.0.1:4182
npm run dev
```

Local previews use the local Worker, never production totals. SQLite persists in `counter/.wrangler/`. Test traffic stays there. The course remains usable if the counter is unavailable.

```powershell
npm run check
wrangler deploy --config counter/wrangler.jsonc --dry-run --outdir counter/.wrangler/release
wrangler deploy --config counter/wrangler.jsonc
```

The initial deployment used Cloudflare's standard Worker upload API with the existing `workers:write` authorization. Wrangler's deployment-history API also requires `workers_scripts:write`; if Wrangler reports insufficient access, finish that OAuth authorization before using its deploy command. The script upload uses the same bindings and SQLite migration as `wrangler.jsonc`.

Verify the deployed `/stats` endpoint without sending a test event. `PRODUCTION_ENDPOINT` in `site-counter.mjs` points to the verified Worker URL. Counts begin with real visits after installation; there is no historic backfill. Never put a Cloudflare deployment token in browser code.

The endpoint exposes `GET /stats` and `POST /events` with `{id,kind,at}`, where `id` is UUID v4, `kind` is `visit`, `exam` or `time`, and `at` is a millisecond timestamp. Visits and exams increment by one; time events additionally require integer `seconds` between 1 and 120. Stats include `learningSeconds`. All writes and deduplication happen in one SQLite transaction. CORS restricts browser writes to the course origin; it is not authentication. The 600 requests/minute IP limit allows shared classroom networks while limiting casual flooding. Request logs are disabled for this Worker.

The deployed object is named `fiber-fundamentals`. Preserve that name and the class/migration when updating the Worker to keep its existing totals. The tests in `tests/site-counter.test.mjs` cover session/completion semantics, time pausing and resuming, migration, duplicate-safe retries, and API validation/rate limiting. Tests use Node 24's built-in SQLite and require no additional dependencies.

References: [Cloudflare counter example](https://developers.cloudflare.com/durable-objects/examples/build-a-counter/), [free Durable Objects allowances](https://developers.cloudflare.com/durable-objects/platform/pricing/), [rate-limit bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/).
