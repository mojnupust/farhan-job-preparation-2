## Why you have background workflow + cron jobs

Based on what's built (BullMQ + Redis + the broadcast automation system): they exist for two things —

1. **Scheduled/repeatable jobs** (BullMQ `repeat` jobs) — auto-post MCQ content to Telegram/Facebook on a schedule, so an admin doesn't manually trigger every post.
2. **A persistent worker process** — consumes the queue (broadcast sends, AI question generation batches, DB logging per send).

The worker is the actual cost problem: it polls Redis continuously, so the Node process **never goes idle** — which matters a lot on Render's free tier.

## What breaks if you stop them

| You disable | You lose |
|---|---|
| Worker process | Broadcasts stop sending automatically; queued AI generation jobs never get picked up |
| Repeatable/scheduled jobs | Auto-scheduled Telegram/FB posts — you'd have to trigger each post manually via an endpoint |
| Slide image generation | Nothing — you said you don't need this, drop it entirely, it's pure CPU cost for no benefit |

## How to stop them (code-level)

Gate worker/scheduler startup behind an env flag instead of ripping code out:

```diff
// server.ts / index.ts
+ if (process.env.ENABLE_WORKERS === 'true') {
    const worker = new Worker('broadcast-queue', processor, connection);
+ }
```

And clear any **already-registered** repeatable jobs sitting in Redis (removing the code that schedules them doesn't remove ones already stored):

```js
const repeatable = await queue.getRepeatableJobs();
for (const job of repeatable) {
  await queue.removeRepeatableByKey(job.key);
}
```

Delete the slide-generation module from the broadcast pipeline outright — it's the heaviest CPU step (`@napi-rs/canvas` rendering) and you've said you don't need it.

## Why Render dies in 3–4 days, and how to actually stay free all month

Render's free compute (web service + Key Value) draws from one shared monthly hour pool. A worker that polls Redis 24/7 means your "web service" never spins down between requests — so it burns the full month's hours in a handful of days instead of stretching across the month like a normal idle-when-unused API.

Two ways to fix this without changing host:
- **Best fix:** drop the persistent worker entirely. Replace it with an external free cron pinger (cron-job.org, or a GitHub Actions scheduled workflow) hitting a protected `/api/broadcast/run` endpoint on your schedule. Your Render service then only wakes on that request and idles the rest of the time — hours stretch across the whole month again.
- If you still want an in-process worker, at minimum turn it off outside your actual broadcast windows (env-flag it, only enable during a cron-triggered run).

## Alternative hosting, if you want a real always-on worker

If you'd rather keep a persistent worker + cron process (no manual triggering), here's how the realistic options compare:**My take:** if you're OK with self-managing a VM, Oracle's free ARM instance is genuinely $0 forever and has plenty of headroom (2 OCPU/12GB) for Node + Redis + Postgres + a worker — but capacity in some regions is flaky right now, so if signup fails, Hetzner at ~€4/mo is the reliable fallback with zero suspension risk.

If you'd rather not migrate at all: killing the persistent worker (external-cron pattern above) alone probably solves the "suspended in 3-4 days" problem and keeps you on Render for free the whole month.