# Contributing

Thanks for taking a look. This is a small, self-contained project and contributions are very welcome — bug reports, fixes, docs, and thoughtful features all help.

## Run it locally

You need **Node 18+** and the `sqlite3` and `graphify` CLIs already on your machine (the collector shells out to them — there's no `npm install`).

```bash
# 1. Collect savings data from whatever tools are installed.
#    Writes data/savings.js (which sets window.SAVINGS).
node collect-savings.mjs

# 2. Open the dashboard. It loads data/savings.js via a <script> tag,
#    so it works straight from disk — no server, no fetch().
open index.html        # macOS  (or: xdg-open index.html / double-click it)
```

If a tool isn't installed or has no data, its panel shows a friendly "not detected" state and the other panel still renders. We never show demo or placeholder numbers.

## Project layout

| File | What it is |
|------|-----------|
| `index.html` | The view — the dashboard UI and charts (vendored Chart.js in `vendor/`). |
| `collect-savings.mjs` | The collector — reads claude-mem's SQLite DB and Graphify's graph, writes `data/savings.js`. |
| `config.json` | Settings — dollars-per-million-tokens, recall cost, paths, scope, highlighted projects. Copy `config.example.json` to start. |
| `check-overlaps.mjs` | The visual test — flags any overlapping or clipped text on the rendered page. |

## The one hard rule for visual changes

**Any change that touches the UI must pass the overlap check before it's merged.** Text on top of text is the thing we care about most here.

```bash
# Serve the folder on any port, then point the checker at the page:
node check-overlaps.mjs http://localhost:<port>/index.html
```

It must report **0 overlaps and 0 clipping**. If it doesn't, the change isn't ready. Please paste the checker's output (the passing run) into your PR description so reviewers can see it.

## Proposing changes

- **Found a bug or have an idea?** Open an issue first — a quick description and, for bugs, your OS / Node version and what you expected vs. saw.
- **Sending a fix?** Fork, branch, make the change, run the relevant checks, and open a PR. Keep PRs focused — one logical change each. Describe what you changed and why.
- Small, clear commit messages are appreciated.

## Honest by default

This dashboard exists to give people a real, defensible read on what these tools save — so honesty is a feature, not a nicety:

- **No fabricated or demo data, ever.** If we can't measure it, we don't show a number.
- **Label estimates as estimates.** All figures are framed against a "load everything, every time" baseline you'd never actually run — directional, not an invoice. claude-mem efficiency is capped at 99.9% (never a fake 100%), and any Graphify monthly projection is labelled "illustrative" because Graphify keeps no per-query log.

If a change would make a number look better than the underlying data supports, it doesn't belong here. When in doubt, undercount and say so.

Thanks again — happy to review anything you send.
