# Shared course counter

Deployed on 2026-10-17 UTC at `https://fiber-fundamentals-counter.wolfhouse-studio.workers.dev`. `GET /stats` returns the shared totals, including `uniqueVisitors` and `uniqueVisitorsSince`. Deployment details are recorded in `deployment.json`.

This is a separate Worker and SQLite Durable Object, in the existing Cloudflare account. It does not use or change the Your Studios relay or its storage. The course stays on GitHub Pages. No paid plan is required within the account's shared free allowances.

The footer shows one shared total for unique visitors, completed exams and combined learning hours. Visible pages fetch current totals every 30 seconds and on focus, tab return or page restoration. These read-only refreshes do not register another visitor or add learning time. Hidden tabs skip periodic refreshes. A random UUID in persistent browser storage (`fiber-visitor-v1`) identifies one browser profile. Reloads, new tabs and later visits reuse it without a 24-hour expiry. Web Locks serialize first-time ID creation across tabs where supported; the server permanently deduplicates visitor IDs in a separate `visitors` table, including retries after a lost response. If an ID cannot be saved, the client reads totals without adding a temporary visitor. Different browsers/profiles, private sessions and cleared site data can still represent the same person more than once. This is an approximate audience count, not proof of unique people or physical devices.

Unique visitors start at zero when this feature is enabled. Existing `visits`, `exams`, `since` and `learningSeconds` totals remain intact. The old session-based visits are retained in the API; cached old clients can still submit `visit` events. They are never relabeled or backfilled as unique visitors. `uniqueVisitorsSince` records the first unique registration.

A finished five-question knowledge exam, intermediate exam, or patching exam counts once regardless of score. A complete retake counts again; missed-question practice, unfinished attempts, and opening results do not count. These events remain separate from visitor IDs.

The counter stores aggregate totals, random visitor IDs and temporary event IDs. No learner names, scores, answers, or IP addresses are saved in its database. Cloudflare receives network requests and uses IP addresses transiently for rate limiting. Exam/time/legacy-visit event IDs expire after 14 days; visitor IDs do not. The public API accepts events up to 24 hours old. This is an approximate activity counter: public requests can be fabricated, and blocked/offline requests can be missed. Local exam scores and earned badges are never sent with the visitor ID.

The footer also shows combined learning hours, rounded to one decimal place. Time is estimated while the page is visible and focused. Quiet reading remains unconfirmed until the next pointer, keyboard or scroll interaction, or until leaving the page within 3 minutes. If an uninterrupted idle gap reaches 3 minutes, the entire unconfirmed gap since the last interaction is discarded, not just the portion after the cutoff. Hidden or unfocused pages pause immediately. Returning resumes a fresh interval. Previously confirmed time stays counted. It cannot prove attention or identify individual learners. Time is sent about once a minute and on leaving the page using keepalive requests. Unacknowledged events retain their IDs in session storage for duplicate-safe retries after navigation (up to 240 events, expiring after 24 hours). Abrupt closure or blocked requests can miss time. No activity details or per-person times are sent. Learning time begins with this feature, not with the older visits total.

Existing totals are preserved: the object adds missing `learningSeconds` and `uniqueVisitors` columns with zero defaults, plus a nullable `uniqueVisitorsSince`, when upgrading an old database. The same Worker, binding and object name are retained.

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

The endpoint exposes `GET /stats` and `POST /events` with `{id,kind,at}`, where `id` is UUID v4, `kind` is `visitor`, legacy `visit`, `exam` or `time`, and `at` is a millisecond timestamp. A `visitor` event uses the persistent browser ID and increments `uniqueVisitors` only on its first registration. Legacy visits and exams increment by one; time events additionally require integer `seconds` between 1 and 900. Stats include `learningSeconds`, `uniqueVisitors` and `uniqueVisitorsSince`. All writes and deduplication happen in one SQLite transaction. CORS restricts browser writes to the course origin; it is not authentication. The 600 requests/minute IP limit allows shared classroom networks while limiting casual flooding. Request logs are disabled for this Worker.

The deployed object is named `fiber-fundamentals`. Preserve that name and the class/migration when updating the Worker to keep its existing totals. The tests in `tests/site-counter.test.mjs` cover persistent visitor identity, simultaneous tabs, blocked storage, completion semantics, time pausing and resuming, legacy migrations, durable deduplication, retries, and API validation/rate limiting. Tests use Node 24's built-in SQLite and require no additional dependencies.

References: [Cloudflare counter example](https://developers.cloudflare.com/durable-objects/examples/build-a-counter/), [free Durable Objects allowances](https://developers.cloudflare.com/durable-objects/platform/pricing/), [rate-limit bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/).
