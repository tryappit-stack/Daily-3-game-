# The Odds Lab — CA Daily 3 (personal)

A personal probability sandbox for California Daily 3 (evening). It suggests numbers
from patterns in past draws — and is built to show, honestly, that patterns don't beat
the 1-in-1,000 odds. For personal insight and entertainment only. Not gambling advice.

## Run locally
```bash
npm install
npm run dev
```

## Deploy to Vercel (two minutes)
1. Create a new repo on GitHub and upload every file in this folder.
2. Go to vercel.com → **Add New… → Project** → import that repo.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`,
   output dir `dist`. Click **Deploy**.
4. Done — Vercel gives you a live URL.

## Data
Seed data is 50 real evening draws (Jun 21–Aug 9 2026) from an unofficial mirror.
Verify against calottery.com. Paste your own via the "Edit / paste draw data" box —
one line per draw: `YYYY-MM-DD,169`.
