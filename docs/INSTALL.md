# Install & Setup

This is the full setup guide for **Token Savings** — a self-contained dark dashboard that shows how many tokens (and dollars) two Claude Code context tools save you:

- **Cloud Mem** ([claude-mem](https://github.com/thedotmack/claude-mem)) — a memory system. Every observation it stores remembers how many tokens it cost to *originally* produce that knowledge. Recalling it later is nearly free, so the difference is your saving.
- **Graphify** — a knowledge graph over a repo. Answering a structural question through the graph costs a fraction of reading the whole codebase (e.g. ~79.7× fewer tokens).

The dashboard **auto-detects** both tools. If you only have one installed, that panel renders and the other shows a friendly "not detected" state. **No demo or fake data is ever shown** — if there's nothing real to display, it says so.

---

## Contents

- [Prerequisites](#prerequisites)
- [Quick install (one command)](#quick-install-one-command)
- [Manual install](#manual-install)
- [Point it at your data](#point-it-at-your-data)
- [Auto-refresh (SessionStart hook)](#auto-refresh-sessionstart-hook)
- [Optional: the Claude Code skill](#optional-the-claude-code-skill)
- [Viewing the dashboard](#viewing-the-dashboard)
- [Troubleshooting](#troubleshooting)
- [macOS vs Linux notes](#macos-vs-linux-notes)

---

## Prerequisites

You need:

| Requirement | Why | Check |
|---|---|---|
| **Node.js 18+** | Runs the collector (`collect-savings.mjs`). Uses only built-in modules — **zero `npm install`**. | `node --version` |
| **`sqlite3` CLI** | The collector reads the claude-mem database by shelling out to `sqlite3`. Only needed for the Cloud Mem panel. | `sqlite3 --version` |
| **At least one of:** [claude-mem](https://github.com/thedotmack/claude-mem) **or** [graphify](https://www.npmjs.com/package/@graphify/cli) | These are what you're measuring. With neither installed there's nothing to show. | `which graphify` / claude-mem DB exists |

You do **not** need a web server, a build step, or any npm packages. Chart.js is vendored in `vendor/chart.umd.min.js`.

> **Heads up:** the collector is *fail-safe*. If `sqlite3` or `graphify` is missing, the relevant panel simply reports "not detected" — the collector still exits cleanly (exit code `0`) and writes whatever data it could gather.

---

## Quick install (one command)

From the repo root:

```bash
./install.sh
```

That script:

1. Verifies Node 18+ is present.
2. Runs the collector once (`node collect-savings.mjs`) to generate `data/savings.js`.
3. Prints the path to open and the exact SessionStart hook JSON to wire up auto-refresh.

Then [open the dashboard](#viewing-the-dashboard).

---

## Manual install

If you'd rather do it by hand (or `install.sh` isn't available on your platform):

```bash
# 1. Clone the repo
git clone https://github.com/BespokeWoodcraftStudio/claude-token-savings-dashboard.git
cd claude-token-savings-dashboard

# 2. Create your config from the example
cp config.example.json config.json
#    (config.json is what the collector reads; edit it to match your setup)

# 3. Run the collector once — this writes data/savings.js
node collect-savings.mjs
```

A successful run prints something like:

```
[collect-savings] $1,240 saved · 318 obs | 79.7x/query — wrote data/savings.js
```

Now [open `index.html`](#viewing-the-dashboard).

> **What just happened:** the collector read your local claude-mem DB and/or ran `graphify benchmark`, did the math, and wrote `data/savings.js` (which sets `window.SAVINGS`). The page loads that file with a plain `<script>` tag — so there's no `fetch()`, no server, and it works straight from `file://`.

---

## Point it at your data

Everything lives in **`config.json`** (copied from `config.example.json`). The example file has inline `_notes` for every key. The ones that matter for *finding your data*:

### Cloud Mem (claude-mem)

```jsonc
{
  "claudeMemDbPath": "~/.claude-mem/claude-mem.db"
}
```

- `claudeMemDbPath` defaults to where claude-mem installs its database. **This is global** — it covers every project claude-mem has captured, across all your repos. That's usually what you want for a "total savings" view.
- Supports `~`, absolute paths, and paths relative to where you run the collector.
- To narrow it down to specific projects, use the `scope` block:

  ```jsonc
  {
    "scope": { "mode": "projects", "projects": ["my-app", "client-site"] }
  }
  ```

  With `scope.mode: "global"` (the default) every project in the DB is counted.

- `highlightProjects` pins specific projects with a tag in the per-project breakdown:

  ```jsonc
  { "highlightProjects": ["my-app"] }
  ```

### Graphify

```jsonc
{
  "graphify": {
    "graphPath": "graphify-out/graph.json",
    "searchPaths": [
      "graphify-out/graph.json",
      "../graphify-out/graph.json",
      "../../graphify-out/graph.json"
    ]
  }
}
```

- Point `graphify.graphPath` at your repo's `graphify-out/graph.json`. Relative paths are resolved **from where you run the collector** (your repo root) first, then from the dashboard folder.
- `searchPaths` are extra locations the collector tries automatically if `graphPath` isn't found — handy when one dashboard tracks a graph that lives in a sibling repo.
- The build cost (`cost.json`) is read from **right next to** `graph.json` automatically. You can override it with `graphify.costJsonPath` if it lives elsewhere.

### Numbers & assumptions

```jsonc
{
  "dollarsPerMillionTokens": 30,
  "recallTokensPerObservation": 50,
  "graphifyAssumedQueriesPerDay": 8
}
```

- `dollarsPerMillionTokens` — the blended $/million-tokens rate used for every dollar figure. Pick a rate that reflects the model you mostly run.
- `recallTokensPerObservation` — the conservative cost-to-recall-one-memory model.
- `graphifyAssumedQueriesPerDay` — **illustrative only.** Graphify keeps no per-query log, so any monthly projection assumes this many graph queries per day. The page labels it as an estimate.

See [HOW-IT-WORKS.md](HOW-IT-WORKS.md) for the formulas and why each assumption is framed the way it is.

### Labels

```jsonc
{
  "siteName": "",
  "dashboardTitle": "Token Savings"
}
```

- `siteName` — an optional label above the title (your name or org). Leave `""` to hide it.
- `dashboardTitle` — the `<h1>` on the page.

After any config change, **re-run the collector** (`node collect-savings.mjs`) to regenerate `data/savings.js`, then reload the page.

---

## Auto-refresh (SessionStart hook)

You don't want to remember to run the collector by hand. Claude Code can run it for you **every time you open a session in a repo**, via a `SessionStart` hook.

### Where the settings file lives

Claude Code reads hooks from `.claude/settings.json`:

- **Per-project:** `<your-repo>/.claude/settings.json` — the hook fires whenever you open Claude in that repo.
- **Global:** `~/.claude/settings.json` — the hook fires in *every* repo. Good for a global, all-projects savings view.

If the file doesn't exist yet, create it.

### The hook JSON

Add this `hooks` block. Replace `PATH/TO/collect-savings.mjs` with the path to the collector (e.g. an absolute path, or one relative to your project via `$CLAUDE_PROJECT_DIR`):

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node \"$CLAUDE_PROJECT_DIR/PATH/TO/collect-savings.mjs\" >/dev/null 2>&1 || true"
          }
        ]
      }
    ]
  }
}
```

If your `.claude/settings.json` already has a `hooks` object, merge the `SessionStart` array into it rather than overwriting the whole file.

### Why it's safe

- **Fail-safe:** the trailing `|| true` (plus the collector's own exit-`0`-on-error behavior) means a missing tool or a bad path **never blocks your session**. Worst case, the dashboard just keeps the data from the previous successful run.
- **Quiet:** `>/dev/null 2>&1` swallows all output, so it never clutters your session start.

After the hook is in place, the dashboard refreshes itself in the background each time you start Claude in that repo — just reload the page.

---

## Optional: the Claude Code skill

If you want to ask Claude things like "how many tokens have I saved?" and have it pull from this dashboard, install the bundled skill (if present in your copy of the repo):

```bash
# Copy the skill into your Claude Code skills directory
cp -r skills/token-savings ~/.claude/skills/
```

Then in any Claude Code session you can invoke it by name. The skill simply runs the collector and reads back the numbers from `data/savings.json` — no extra setup. (Skip this step if your checkout doesn't include a `skills/` folder.)

---

## Viewing the dashboard

The dashboard is a single `index.html` that loads `data/savings.js` via a `<script>` tag. **No server needed.**

### Option A — open straight from disk (simplest)

```bash
# macOS
open index.html

# Linux
xdg-open index.html
```

Or just double-click `index.html` in your file manager. It runs from `file://` because the data is a local script, not a `fetch()`.

### Option B — serve it locally (optional)

If you prefer a `http://` URL (some browsers restrict a few features under `file://`):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Either way, the page renders whatever is in `data/savings.js` as of the last collector run.

---

## Troubleshooting

### "No data yet" / the dashboard is empty

`data/savings.js` hasn't been generated. Run the collector:

```bash
node collect-savings.mjs
```

Then reload the page. If you set up the [SessionStart hook](#auto-refresh-sessionstart-hook), this also happens automatically next time you open Claude in the repo.

### "Cloud Mem not detected"

The collector couldn't find or read your claude-mem database. Check, in order:

1. **Is claude-mem installed and has it captured anything?** It needs at least one session with observations. The `observations` table must exist and be non-empty.
2. **Is `claudeMemDbPath` correct?** The default is `~/.claude-mem/claude-mem.db`. If yours lives elsewhere, set the right path in `config.json`.
3. **Is `sqlite3` installed?** See the next item — the Cloud Mem panel needs it.
4. **Scope too narrow?** If `scope.mode` is `"projects"`, make sure the project names in `scope.projects` actually exist in the DB. An empty scope returns "no observations for the configured project scope."

Re-run `node collect-savings.mjs` after fixing.

### "Graphify not detected"

The collector couldn't find a graph or run the benchmark. Check:

1. **Have you built a graph?** Run `graphify` on a repo to produce `graphify-out/graph.json`.
2. **Is `graphify.graphPath` pointing at it?** Set it in `config.json`, or rely on `searchPaths`. Remember relative paths resolve from where you *run* the collector.
3. **Is the `graphify` CLI on PATH?** The collector can find a `graph.json` but still needs the `graphify` CLI to compute `graphify benchmark`. Install graphify if it's missing.

### "sqlite3 not found"

Install the `sqlite3` CLI:

- **macOS:** preinstalled on modern macOS. If missing: `brew install sqlite3`.
- **Debian / Ubuntu:** `sudo apt install sqlite3`
- **Fedora / RHEL:** `sudo dnf install sqlite`
- **Arch:** `sudo pacman -S sqlite`

Confirm with `sqlite3 --version`, then re-run the collector.

### The collector ran but a number looks off

Open `data/savings.json` (the human-readable twin of `savings.js`). It includes an `errors[]` array with any warnings the collector hit, plus every raw figure it computed. That's the fastest way to see exactly what was read and where.

### `node: command not found` or an old Node

Install Node 18+ from [nodejs.org](https://nodejs.org) or via your version manager (`nvm install 18`). Confirm with `node --version`.

---

## macOS vs Linux notes

The collector and dashboard are cross-platform. The only differences are in setup commands:

| Task | macOS | Linux |
|---|---|---|
| Install `sqlite3` | preinstalled (or `brew install sqlite3`) | `apt install sqlite3` (Debian/Ubuntu), `dnf install sqlite` (Fedora) |
| Open the dashboard | `open index.html` | `xdg-open index.html` |
| Default claude-mem DB | `~/.claude-mem/claude-mem.db` | `~/.claude-mem/claude-mem.db` |

`~` expansion, absolute paths, and the SessionStart hook work identically on both. On both platforms the page opens from `file://` with no server.

---

Next: read [HOW-IT-WORKS.md](HOW-IT-WORKS.md) for exactly where every number comes from, the formulas, and the honesty caveats behind the figures.
