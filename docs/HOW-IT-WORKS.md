# How It Works — Methodology & Honesty

This doc explains exactly where every number on the dashboard comes from, the formulas behind them, every assumption baked in, and the one caveat that frames the whole thing. Nothing here is hand-wavy: each figure traces back to a real source on your machine.

If you just want to install it, see [INSTALL.md](INSTALL.md). This doc is about *trusting* the numbers.

---

## Contents

- [The one honesty caveat (read this first)](#the-one-honesty-caveat-read-this-first)
- [Cloud Mem: where the numbers come from](#cloud-mem-where-the-numbers-come-from)
- [Graphify: where the numbers come from](#graphify-where-the-numbers-come-from)
- [The formulas, exactly](#the-formulas-exactly)
- [Every assumption, stated plainly](#every-assumption-stated-plainly)
- [Data flow](#data-flow)
- [What's committed vs regenerated](#whats-committed-vs-regenerated)
- [Privacy: nothing leaves your machine](#privacy-nothing-leaves-your-machine)

---

## The one honesty caveat (read this first)

Every "saved" figure is measured against a **"load everything, every time" baseline** — the world where, to answer any question, you re-read the entire relevant corpus from scratch on every turn, with no memory and no graph.

**Nobody actually works that way.** You'd skim, you'd remember, you'd grep. So these numbers are **directional, not an invoice.** They tell you the *scale* of the work that memory and the graph are absorbing on your behalf — not a dollar amount you'd otherwise have literally been billed.

Two specific guardrails keep this honest:

1. **Cloud Mem efficiency is capped at 99.9%.** Even if the math rounds to a perfect 100% saving, the dashboard never claims it. Recall is cheap, but it's never free, so a fake 100% would be a lie. The cap makes that explicit.
2. **Any Graphify monthly projection is labelled "illustrative."** Graphify keeps no per-query log, so it cannot know how many graph queries you actually ran. Any "saved this month" number assumes a queries-per-day figure (default 8) and says so on its face.

Keep that framing in mind for everything below. The inputs are real; the baseline is deliberately generous; the page tells you so.

---

## Cloud Mem: where the numbers come from

[claude-mem](https://github.com/thedotmack/claude-mem) stores **observations** — discrete pieces of knowledge it captured while you worked — in a local SQLite database (default `~/.claude-mem/claude-mem.db`).

The key column is **`discovery_tokens`**: for each observation, how many tokens it cost to *originally produce* that piece of knowledge (the reading, reasoning, and exploration that surfaced it the first time).

The collector reads that database **read-only** (`sqlite3 -readonly`) and aggregates:

| Quantity | How it's computed (SQL) |
|---|---|
| **`observations`** | `COUNT(*)` of rows in `observations` |
| **`workTokens`** ("work captured") | `SUM(discovery_tokens)` — the total original cost of everything memory now holds |
| **`distinctDays`** | `COUNT(DISTINCT date(created_at))` — how many days have captured anything |
| **per-project breakdown** | `GROUP BY project` with the same count + sum |
| **daily / cumulative** | grouped by `date(created_at)`, with a running cumulative `workTokens` |

`workTokens` — the sum of every observation's `discovery_tokens` — is the headline "work captured": the total token cost of all the knowledge memory is now holding for you so you never have to rediscover it.

If the DB is missing, has no `observations` table, or has zero observations (optionally within your configured project scope), the panel reports `notDetected` with a friendly reason and the rest of the dashboard still renders. **No numbers are invented.**

---

## Graphify: where the numbers come from

[Graphify](https://www.npmjs.com/package/@graphify/cli) builds a knowledge graph (`graphify-out/graph.json`) over a repo. Two sources feed the dashboard:

### 1. `graphify benchmark` (per-query reduction)

The collector runs `graphify benchmark <graph.json>` and parses its output for:

| Field | Meaning |
|---|---|
| `corpusWords` | size of the source corpus, in words |
| `corpusTokensNaive` | the **naïve** token cost of reading the whole corpus to answer one question |
| `nodes`, `edges` | the size of the graph |
| `avgQueryTokens` | the average token cost of answering a structural question **via the graph** |
| `reductionFactor` | `corpusTokensNaive ÷ avgQueryTokens` (e.g. ~79.7×) |

The reduction factor is the headline: answering through the graph costs roughly `1 / reductionFactor` of reading everything.

### 2. `cost.json` (one-time build cost)

Building the graph isn't free — it costs tokens once. The collector reads `cost.json` (sitting next to `graph.json`) for:

| Field | Meaning |
|---|---|
| `total_input_tokens` + `total_output_tokens` | the total tokens spent building the graph (`buildTokens`) |
| `runs[]` | each build run, used for count and `lastBuilt` date |

So the graph's savings are always shown **honestly against their build cost** — a real per-query win, minus a real one-time investment.

If no graph is found, or the `graphify` CLI isn't on PATH, or the benchmark fails, the panel reports `notDetected` and the Cloud Mem panel still renders.

---

## The formulas, exactly

These are the literal computations in `collect-savings.mjs`.

### Cloud Mem

```
recallTokens  = observations × recallTokensPerObservation
savedTokens   = max(0, workTokens − recallTokens)
savedDollars  = (savedTokens / 1,000,000) × dollarsPerMillionTokens
efficiencyPct = min(99.9, round((savedTokens / workTokens) × 100, 1dp))
```

In words: **what you saved = the work captured, minus what it costs to recall it.** Producing knowledge the first time is expensive (`workTokens`); pulling it back from memory is cheap (`recallTokens`). The gap is your saving. Efficiency is that saving as a percentage of the work — capped at 99.9%, never 100%.

### Graphify

```
savedTokensPerQuery  = corpusTokensNaive − avgQueryTokens
savedDollarsPerQuery = (savedTokensPerQuery / 1,000,000) × dollarsPerMillionTokens

buildTokens          = total_input_tokens + total_output_tokens   (from cost.json)
buildCostDollars     = (buildTokens / 1,000,000) × dollarsPerMillionTokens
```

In words: **saving per query = reading everything, minus querying the graph.** The build cost is shown separately as the one-time investment that unlocked those per-query savings.

Any **monthly** projection multiplies `savedTokensPerQuery` by `graphifyAssumedQueriesPerDay × ~30` — and is **labelled illustrative**, because Graphify has no per-query log to count real usage.

### Dollars, everywhere

```
dollars = (tokens / 1,000,000) × dollarsPerMillionTokens
```

One rate, one rule, applied identically to both tools. Change the rate in `config.json` and every dollar figure moves with it.

---

## Every assumption, stated plainly

| Assumption | Default | What it means / why it's a judgment call |
|---|---|---|
| **`dollarsPerMillionTokens`** | `30` | The blended price you assign per million tokens. Real pricing varies by model and tier — this is a single representative rate so the page can talk in dollars. It's an *estimate*, and the page says so. |
| **`recallTokensPerObservation`** | `50` | A conservative flat model for what it costs to recall one memory. Recall isn't literally free, so we subtract this for every observation rather than pretend it's zero. |
| **`graphifyAssumedQueriesPerDay`** | `8` | **Illustrative only.** Graphify keeps no per-query log, so any monthly-saved projection assumes this many graph queries per day. Clearly labelled as an estimate on the page. |
| **The "load everything every time" baseline** | — | The reference world these savings are measured against. Directional, not a literal bill. See the [caveat](#the-one-honesty-caveat-read-this-first). |
| **99.9% efficiency cap** | — | Cloud Mem efficiency is hard-capped at 99.9% so the dashboard never shows a fake, dishonest 100%. |

Every one of these is a config key (except the baseline and the cap, which are deliberately fixed). Tune them to match your reality — but tune them *honestly*.

---

## Data flow

```
  claude-mem.db ─┐
                 ├─► collect-savings.mjs ─► data/savings.js  ─► index.html
  graphify ──────┘    (the collector)        (window.SAVINGS)    (renders)
   (benchmark
    + cost.json)
```

1. **The collector** (`collect-savings.mjs`, Node 18+, no npm install) reads up to two local sources, auto-detecting whichever are present. It shells out to the `sqlite3` and `graphify` CLIs already on your machine.
2. It writes **`data/savings.js`**, which sets `window.SAVINGS = { ... }` (and a human-readable twin, `data/savings.json`).
3. **`index.html`** loads `data/savings.js` with a plain `<script>` tag and renders it with the vendored Chart.js. Because it's a script, not a `fetch()`, the page works straight from `file://` — **no server required.**
4. The collector is **fail-safe**: any unexpected error writes a partial file with an `errors[]` array and still exits `0`, so a [SessionStart hook](INSTALL.md#auto-refresh-sessionstart-hook) never blocks a Claude session.

---

## What's committed vs regenerated

| File | Committed? | Why |
|---|---|---|
| `data/savings.js` | **No** (gitignored) | Rebuilt from your DB + benchmark on every run. It's just the latest rendered snapshot, and it's machine-specific. |
| `data/savings.json` | **No** (gitignored) | The human-readable twin of `savings.js`. Same reasoning. |
| `data/graphify-history.json` | **Yes** (intentionally *not* ignored) | The **only accruing state.** Graphify has no per-query log, so its daily reduction history can only be preserved by committing it. One snapshot per day is appended/updated. |
| `config.json` | up to you | Your local settings. Copy it from `config.example.json`. |

The source tools (the claude-mem DB and `graphify benchmark`) are the source of truth. The regenerated caches are disposable; delete `data/savings.js` and re-run the collector to rebuild it any time.

---

## Privacy: nothing leaves your machine

This is a local-only tool. The collector reads local files (`sqlite3 -readonly`), runs local CLIs (`graphify benchmark`), and writes local files. The dashboard is a static `index.html` you open from disk. There is **no network call, no telemetry, no upload** — none of your observations, code, queries, or token counts ever leave your machine.

---

See [INSTALL.md](INSTALL.md) for setup, configuration, and the auto-refresh hook.
