# Graph Report - /Users/ahamade/Documents/GitHub/claude-token-savings-dashboard  (2026-07-31)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 900 nodes · 2630 edges · 39 communities (27 shown, 12 thin omitted)
- Extraction: 86% EXTRACTED · 14% INFERRED · 0% AMBIGUOUS · INFERRED: 367 edges (avg confidence: 0.69)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- va
- an
- ns
- js
- Dashboard Render Script (IIFE)
- zt
- d
- eo
- tn
- n
- chart.umd.min.js
- _notes
- collect-savings.mjs
- ._createDescriptors
- Savings Collector (collect-savings.mjs)
- Token Savings
- .getDataset
- config.json
- .getContext
- parse
- Install & Setup
- no
- beforeUpdate
- bo
- ko
- rs
- install.sh
- ._computeLabelItems
- Dashboard UI (index.html)
- xn
- check-overlaps.mjs
- ._resolveElementOptions
- How It Works — Methodology & Honesty
- s
- Token Savings
- Contributing
- `token-savings` skill
- CLAUDE.md

## God Nodes (most connected - your core abstractions)
1. `js()` - 71 edges
2. `an()` - 61 edges
3. `va` - 56 edges
4. `ns()` - 55 edges
5. `s()` - 52 edges
6. `o()` - 46 edges
7. `a()` - 44 edges
8. `n()` - 40 edges
9. `l()` - 39 edges
10. `r()` - 35 edges

## Surprising Connections (you probably didn't know these)
- `resolveExisting()` --indirect_call--> `f()`  [INFERRED]
  collect-savings.mjs → vendor/chart.umd.min.js
- `Install & Setup Guide` --references--> `Token Savings`  [AMBIGUOUS]
  docs/INSTALL.md → skill/SKILL.md
- `install.sh Installer` --references--> `Savings Collector (collect-savings.mjs)`  [EXTRACTED]
  docs/INSTALL.md → README.md
- `Token Savings Dashboard` --references--> `How It Works — Methodology & Honesty`  [EXTRACTED]
  README.md → docs/HOW-IT-WORKS.md
- `Token Savings` --references--> `Dashboard UI (index.html)`  [EXTRACTED]
  skill/SKILL.md → index.html

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Savings Data Flow Pipeline** — readme_claude_mem, readme_graphify, readme_collector, readme_savings_data, index_dashboard_ui [EXTRACTED 1.00]
- **Honesty Guardrails** — contributing_honesty_principle, docs_how_it_works_baseline, docs_how_it_works_efficiency_cap, docs_how_it_works_illustrative_projection [EXTRACTED 1.00]
- **Auto-Refresh Mechanism** — readme_sessionstart_hook, readme_collector, docs_how_it_works_failsafe, skill_skill_token_savings [EXTRACTED 1.00]

## Communities (39 total, 12 thin omitted)

### Community 0 - "va"
Cohesion: 0.06
Nodes (30): Ae(), afterDraw(), afterEvent(), afterUpdate(), ai(), ba, ea(), Ee() (+22 more)

### Community 1 - "an"
Cohesion: 0.06
Nodes (17): addBox(), an(), cn(), ct(), dn(), ge(), Mn(), ms() (+9 more)

### Community 4 - "Dashboard Render Script (IIFE)"
Cohesion: 0.19
Nodes (16): graphify-history.json Accruing State, compactTokens Formatter, countUp Number Animation, esc HTML Escaper, gfxHistChart Reduction History Chart, grad Gradient Helper, ledgerRow Template Helper, Dashboard Render Script (IIFE) (+8 more)

### Community 5 - "zt"
Cohesion: 0.08
Nodes (15): at(), Bi(), Bt(), color(), Gt(), It(), jt(), kt() (+7 more)

### Community 6 - "d"
Cohesion: 0.14
Nodes (5): buildTicks(), d(), determineDataLimits(), kn(), po()

### Community 7 - "eo"
Cohesion: 0.13
Nodes (9): co(), Do(), eo(), ho(), inXRange(), inYRange(), Oe(), oo() (+1 more)

### Community 9 - "n"
Cohesion: 0.08
Nodes (21): afterDatasetsUpdate(), ca(), _calculateBarIndexPixels(), _calculateBarValuePixels(), getBasePixel(), getLabelAndValue(), getLabelForValue(), getPixelForTick() (+13 more)

### Community 10 - "chart.umd.min.js"
Cohesion: 0.07
Nodes (19): As(), Be(), beforeDatasetDraw(), beforeDatasetsDraw(), configure(), destroy(), Di(), easeInOutElastic() (+11 more)

### Community 11 - "_notes"
Cohesion: 0.15
Nodes (18): claudeMemDbPath, dashboardTitle, dollarsPerMillionTokens, graphify, graphPath, searchPaths, graphifyAssumedQueriesPerDay, highlightProjects (+10 more)

### Community 12 - "collect-savings.mjs"
Cohesion: 0.14
Nodes (23): cmdAvailable(), collectCloudMem(), collectGraphify(), CWD, DATA_DIR, errors, expandHome(), HERE (+15 more)

### Community 13 - "._createDescriptors"
Cohesion: 0.09
Nodes (13): average(), Cs, fe(), getCenterPoint(), Hs, K(), nearest(), nn() (+5 more)

### Community 14 - "Savings Collector (collect-savings.mjs)"
Cohesion: 0.23
Nodes (15): Honest-by-Default Principle, Load-Everything-Every-Time Baseline, graphify benchmark Command, cost.json Build Ledger, discovery_tokens Column, 99.9% Efficiency Cap, Graphify Savings Formula, Illustrative Monthly Projection (+7 more)

### Community 15 - "Token Savings"
Cohesion: 0.21
Nodes (11): Fail-Safe Collector Behavior, Install & Setup Guide, install.sh Installer, Graceful Not-Detected Degradation, SessionStart Auto-Refresh Hook, Token Savings Dashboard, token-savings Skill README, Honesty notes (keep these in the summary if relevant) (+3 more)

### Community 16 - ".getDataset"
Cohesion: 0.23
Nodes (3): fs(), rt(), vs()

### Community 17 - "config.json"
Cohesion: 0.14
Nodes (13): claudeMemDbPath, dashboardTitle, dollarsPerMillionTokens, graphify, graphPath, searchPaths, graphifyAssumedQueriesPerDay, highlightProjects (+5 more)

### Community 20 - "Install & Setup"
Cohesion: 0.07
Nodes (26): Auto-refresh (SessionStart hook), claude-mem, "claude-mem not detected", Contents, Graphify, "Graphify not detected", Install & Setup, Labels (+18 more)

### Community 21 - "no"
Cohesion: 0.06
Nodes (24): buildLookupTable(), ei(), En, Fo(), _generate(), getDecimalForValue(), _getTimestampsForTable(), init() (+16 more)

### Community 24 - "ko"
Cohesion: 0.10
Nodes (9): beforeLayout(), ce(), de, dt(), he(), ia(), ko, qo() (+1 more)

### Community 26 - "install.sh"
Cohesion: 0.46
Nodes (7): err(), info(), ok(), install.sh script, step(), usage(), warn()

### Community 28 - "Dashboard UI (index.html)"
Cohesion: 0.40
Nodes (6): Contributing Guide, Overlap Check (check-overlaps.mjs), Local-Only Privacy, Dashboard UI (index.html), No-Server file:// Design, data/savings.js (window.SAVINGS)

### Community 29 - "xn"
Cohesion: 0.14
Nodes (6): bn(), pn(), removeBox(), stop(), un(), xn

### Community 32 - "How It Works — Methodology & Honesty"
Cohesion: 0.12
Nodes (15): 1. `graphify benchmark` (per-query reduction), 2. `cost.json` (one-time build cost), claude-mem, claude-mem: where the numbers come from, Contents, Data flow, Dollars, everywhere, Every assumption, stated plainly (+7 more)

### Community 33 - "s"
Cohesion: 0.06
Nodes (63): a(), aa(), ao(), b(), beforeDraw(), da(), dataset(), draw() (+55 more)

### Community 34 - "Token Savings"
Cohesion: 0.20
Nodes (9): Configure, FAQ, How the numbers work, Keep it fresh automatically, More, Quick start, Requirements, Token Savings (+1 more)

### Community 35 - "Contributing"
Cohesion: 0.29
Nodes (6): Contributing, Honest by default, Project layout, Proposing changes, Run it locally, The one hard rule for visual changes

### Community 36 - "`token-savings` skill"
Cohesion: 0.50
Nodes (3): Install, `token-savings` skill, Use it

## Ambiguous Edges - Review These
- `Token Savings` → `Install & Setup Guide`  [AMBIGUOUS]
  docs/INSTALL.md · relation: references

## Knowledge Gaps
- **81 isolated node(s):** `require`, `clearancePx`, `HERE`, `CWD`, `DATA_DIR` (+76 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Token Savings` and `Install & Setup Guide`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `ns()` connect `ns` to `va`, `an`, `s`, `n`, `chart.umd.min.js`, `._createDescriptors`, `.getDataset`, `.getContext`, `parse`, `no`, `beforeUpdate`, `xn`, `._resolveElementOptions`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Why does `an()` connect `an` to `va`, `s`, `tn`, `n`, `chart.umd.min.js`, `.getContext`, `ko`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Why does `tn` connect `tn` to `ko`, `an`, `chart.umd.min.js`, `._createDescriptors`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Are the 22 inferred relationships involving `s()` (e.g. with `chart.umd.min.js` and `._updateDatasets()`) actually correct?**
  _`s()` has 22 INFERRED edges - model-reasoned connections that need verification._
- **What connects `require`, `clearancePx`, `HERE` to the rest of the system?**
  _81 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `va` be split into smaller, more focused modules?**
  _Cohesion score 0.05800588078053996 - nodes in this community are weakly interconnected._