# The Odds Lab — CA Daily 3 (personal)

A personal, mobile-friendly probability sandbox for California Daily 3. It suggests
numbers from patterns in past draws, explains Straight vs Box (3-way / 6-way) play,
and lets you check whether a number would have won the latest draw. Built to be honest:
every combo 000–999 is 1 in 1,000, and nothing here beats those odds.
For personal insight and entertainment only. Not gambling or financial advice.

## What's inside
- Hot / least-seen / longest-unseen digit moods (with a "doesn't mean it's due" reminder)
- One-tap "Pick my number" with a plain-English why-story
- Straight vs Box vs Straight/Box odds for each pick, with winning combos listed
- "Play your own number" checker: type 3 digits, see the box type and whether it won
- One-tap "Add today's draw" + a staleness warning so the checker never silently uses old data
- Evening / Midday / Both toggle (kept separate, combinable)

## Run locally
```bash
npm install
npm run dev
```

## Deploy to Vercel (all in the browser, ~2 min)
1. Create a new GitHub repo and upload every file in this folder.
2. Go to vercel.com → Add New… → Project → import that repo.
3. Framework preset auto-detects as Vite. Click Deploy. You get a live URL.

## Updating after the first deploy
- To change the app: edit `App.jsx` in your GitHub repo (pencil icon → paste → commit).
  Vercel auto-redeploys in about a minute.
- To make added draws permanent: in the app, use "View all draws," copy the contents,
  and paste them into `App.jsx` where the `SEED` block is. Otherwise added draws only
  last for that browser session.

## Data & honesty notes
- Seed data (730 draws, midday + evening) came from LotteryUSA, an unofficial mirror.
  Verify against the official source: https://www.calottery.com/draw-games/daily-3
- The checker compares against the newest draw in your data. Keep it current (Step 3)
  or it will warn you that it's checking against an older draw.
- Auto-updating from a live source needs a small backend and a permitted data feed —
  a Work-portal project, not part of this static site.

Problem gambling? Call 1-800-GAMBLER.
