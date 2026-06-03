---
name: token-savings
description: Use when the user wants to regenerate and open the Token Savings dashboard — the local dark dashboard showing how many tokens and dollars claude-mem and Graphify save in their repos. Refreshes data, opens index.html, and reports the headline saved-$ and reduction factor.
---

# Token Savings

Refresh and open the **Token Savings** dashboard: a self-contained dark page that
shows how many tokens and dollars two Claude Code context tools save —

- **claude-mem**: a memory system. Each observation stores the tokens
  it cost to *originally* produce that knowledge; summed = "work captured".
  Recalling it later is nearly free, so **saved = work − recall**.
- **Graphify**: a knowledge graph over a repo. Answering a structural question via
  the graph costs a fraction of reading the whole corpus (e.g. ~79.7× reduction).

The dashboard auto-detects both tools. If one isn't installed or has no data, that
panel shows a friendly "not detected" state and the other still renders. No demo
or fake data is ever shown.

**Safety:** read-only except for writing files under `data/` (`savings.js`,
`savings.json`, history JSON). It shells out to the `sqlite3` and `graphify` CLIs
already on the machine — no npm install, no network, no fetch. Node 18+ required.

## Steps

1. **Locate the dashboard directory** (the cloned `claude-token-savings-dashboard`
   repo, which contains `collect-savings.mjs` and `index.html`). Resolve in order:
   - If `$TOKEN_SAVINGS_DIR` is set, use it.
   - Else use the path the user gives you, or a known clone location.
   - If you can't find it, ask the user where they cloned the repo.
   Confirm the directory contains `collect-savings.mjs` before proceeding.

2. **Refresh the data.** Run the collector from the dashboard directory so its
   relative paths and `config.json` resolve correctly:

   ```bash
   node "$TOKEN_SAVINGS_DIR/collect-savings.mjs"
   ```

   This rewrites `data/savings.js` (which sets `window.SAVINGS`) and
   `data/savings.json`. It is fail-safe — on any error it still writes a partial
   file and exits 0, so it never blocks.

3. **Open the dashboard.** It opens straight from disk (`file://`), no server:
   - macOS: `open "$TOKEN_SAVINGS_DIR/index.html"`
   - Linux: `xdg-open "$TOKEN_SAVINGS_DIR/index.html"`
   - (Windows: `start "" "%TOKEN_SAVINGS_DIR%\index.html"`)

4. **Summarize the headline numbers** by reading `data/savings.json` and reporting
   back to the user, in one or two lines:
   - **Combined:** `combined.savedDollars` (saved $) and `combined.savedTokens`.
   - **claude-mem:** `cloudMem.observations`, `cloudMem.workTokens` (work captured),
     `cloudMem.savedDollars`, `cloudMem.efficiencyPct` — or its `notDetected`
     reason if the panel is empty.
   - **Graphify:** `graphify.reductionFactor` (e.g. `79.7x/query`) and
     `graphify.savedDollarsPerQuery` — or its `notDetected` reason if empty.

## Honesty notes (keep these in the summary if relevant)

- All figures are framed against a "load everything, every time" baseline you'd
  never actually run — directional, not an invoice.
- claude-mem efficiency is capped at 99.9% (never a fake 100%).
- Any Graphify monthly projection is **illustrative** — Graphify has no per-query
  log, so usage volume is assumed (`graphifyAssumedQueriesPerDay`).

## Optional: auto-refresh on every session

To regenerate the data automatically each time Claude Code opens in the repo, add
a `SessionStart` hook to `.claude/settings.json` (replace the path):

```json
"hooks": {
  "SessionStart": [
    { "hooks": [ { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/PATH/TO/collect-savings.mjs\" >/dev/null 2>&1 || true" } ] }
  ]
}
```
