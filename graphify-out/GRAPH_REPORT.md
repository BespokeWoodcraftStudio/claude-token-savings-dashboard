# Graph Report - claude-token-savings-dashboard  (2026-06-11)

## Corpus Check
- 13 files · ~69,429 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 909 nodes · 2303 edges · 38 communities (35 shown, 3 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 219 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fffc64dd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Chart.js Plugin Hooks|Chart.js Plugin Hooks]]
- [[_COMMUNITY_Chart.js Event Binding|Chart.js Event Binding]]
- [[_COMMUNITY_Chart.js Context & Scales|Chart.js Context & Scales]]
- [[_COMMUNITY_Chart.js Bar Pixel Math|Chart.js Bar Pixel Math]]
- [[_COMMUNITY_Contributing & Methodology Docs|Contributing & Methodology Docs]]
- [[_COMMUNITY_Chart.js Color Utilities|Chart.js Color Utilities]]
- [[_COMMUNITY_Chart.js Data Limits & Ticks|Chart.js Data Limits & Ticks]]
- [[_COMMUNITY_Chart.js Layout Helpers|Chart.js Layout Helpers]]
- [[_COMMUNITY_Chart.js Registry & Elements|Chart.js Registry & Elements]]
- [[_COMMUNITY_Chart.js Dataset Visibility|Chart.js Dataset Visibility]]
- [[_COMMUNITY_Chart.js Init & Colors Plugin|Chart.js Init & Colors Plugin]]
- [[_COMMUNITY_Dashboard Config Example|Dashboard Config Example]]
- [[_COMMUNITY_Dashboard Screenshot Insights|Dashboard Screenshot Insights]]
- [[_COMMUNITY_Chart.js Animation Engine|Chart.js Animation Engine]]
- [[_COMMUNITY_Date Adapter Internals|Date Adapter Internals]]
- [[_COMMUNITY_Chart.js Geometry Helpers|Chart.js Geometry Helpers]]
- [[_COMMUNITY_Chart.js Misc Utilities|Chart.js Misc Utilities]]
- [[_COMMUNITY_Dashboard Live Config|Dashboard Live Config]]
- [[_COMMUNITY_Chart.js Dataset Ranges|Chart.js Dataset Ranges]]
- [[_COMMUNITY_Chart.js Tick Formatting|Chart.js Tick Formatting]]
- [[_COMMUNITY_Chart.js Legend & Segments|Chart.js Legend & Segments]]
- [[_COMMUNITY_Chart.js Time Lookup Tables|Chart.js Time Lookup Tables]]
- [[_COMMUNITY_Chart.js Box Layout & Log Scale|Chart.js Box Layout & Log Scale]]
- [[_COMMUNITY_Chart.js Linear Scale Pixels|Chart.js Linear Scale Pixels]]
- [[_COMMUNITY_Chart.js Decimal Pixel Mapping|Chart.js Decimal Pixel Mapping]]
- [[_COMMUNITY_Chart.js DOM Platform Layer|Chart.js DOM Platform Layer]]
- [[_COMMUNITY_Installer Logging Helpers|Installer Logging Helpers]]
- [[_COMMUNITY_Chart.js Draw Overflow & Bezier|Chart.js Draw Overflow & Bezier]]
- [[_COMMUNITY_Chart.js Small Helpers|Chart.js Small Helpers]]
- [[_COMMUNITY_Chart.js Internal Constructors|Chart.js Internal Constructors]]
- [[_COMMUNITY_Overlap Check Script|Overlap Check Script]]
- [[_COMMUNITY_Format Init Helpers|Format Init Helpers]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]

## God Nodes (most connected - your core abstractions)
1. `_()` - 271 edges
2. `js()` - 71 edges
3. `an()` - 61 edges
4. `ns()` - 55 edges
5. `n()` - 37 edges
6. `no` - 32 edges
7. `s()` - 30 edges
8. `va` - 28 edges
9. `updateElements()` - 25 edges
10. `a()` - 24 edges

## Surprising Connections (you probably didn't know these)
- `Work Banked Day-by-Day Chart (May-Jun, bars + cumulative line)` --references--> `_()`  [INFERRED]
  docs/assets/dashboard.png → vendor/chart.umd.min.js
- `Per-Project Token Breakdown (docs-site, knowledge-base, ops-dashboard, +6 more)` --references--> `_()`  [INFERRED]
  docs/assets/dashboard.png → vendor/chart.umd.min.js
- `Install & Setup Guide` --references--> `Token Savings`  [AMBIGUOUS]
  docs/INSTALL.md → skill/SKILL.md
- `Token Savings Dashboard` --references--> `How It Works — Methodology & Honesty`  [EXTRACTED]
  README.md → docs/HOW-IT-WORKS.md
- `No-Server file:// Design` --rationale_for--> `Dashboard UI (index.html)`  [EXTRACTED]
  README.md → index.html

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Savings Data Flow Pipeline** — readme_claude_mem, readme_graphify, readme_collector, readme_savings_data, index_dashboard_ui [EXTRACTED 1.00]
- **Honesty Guardrails** — contributing_honesty_principle, docs_how_it_works_baseline, docs_how_it_works_efficiency_cap, docs_how_it_works_illustrative_projection [EXTRACTED 1.00]
- **Auto-Refresh Mechanism** — readme_sessionstart_hook, readme_collector, docs_how_it_works_failsafe, skill_skill_token_savings [EXTRACTED 1.00]

## Communities (38 total, 3 thin omitted)

### Community 0 - "Chart.js Plugin Hooks"
Cohesion: 0.06
Nodes (40): afterDraw(), afterEvent(), afterUpdate(), ai(), ba, beforeDatasetDraw(), beforeDatasetsDraw(), da() (+32 more)

### Community 1 - "Chart.js Event Binding"
Cohesion: 0.06
Nodes (13): afterDatasetsUpdate(), an(), cn(), f(), je(), ke(), ls, Mn() (+5 more)

### Community 2 - "Chart.js Context & Scales"
Cohesion: 0.06
Nodes (16): As(), buildTicks(), Fn(), go(), K(), labelColor(), labelPointStyle(), ns() (+8 more)

### Community 3 - "Chart.js Bar Pixel Math"
Cohesion: 0.05
Nodes (12): Ae(), Ci(), d(), fe(), Fi(), gs(), Ie(), js() (+4 more)

### Community 4 - "Contributing & Methodology Docs"
Cohesion: 0.07
Nodes (49): Contributing Guide, Honest-by-Default Principle, Overlap Check (check-overlaps.mjs), Load-Everything-Every-Time Baseline, graphify benchmark Command, cost.json Build Ledger, discovery_tokens Column, 99.9% Efficiency Cap (+41 more)

### Community 5 - "Chart.js Color Utilities"
Cohesion: 0.08
Nodes (15): at(), Bi(), Bt(), color(), Gt(), jt(), kt(), mt() (+7 more)

### Community 6 - "Chart.js Data Limits & Ticks"
Cohesion: 0.35
Nodes (3): a(), determineDataLimits(), r()

### Community 7 - "Chart.js Layout Helpers"
Cohesion: 0.05
Nodes (19): aa(), Be(), ce(), co(), de, Do(), dt(), eo() (+11 more)

### Community 9 - "Chart.js Dataset Visibility"
Cohesion: 0.08
Nodes (21): ca(), _calculateBarIndexPixels(), _calculateBarValuePixels(), getBasePixel(), getLabelAndValue(), getLabelForValue(), getPixelForTick(), getPixelForValue() (+13 more)

### Community 10 - "Chart.js Init & Colors Plugin"
Cohesion: 0.09
Nodes (9): _(), destroy(), Di(), easeInOutElastic(), generateLabels(), Jo(), removeBox(), stop() (+1 more)

### Community 11 - "Dashboard Config Example"
Cohesion: 0.08
Nodes (25): claudeMemDbPath, dashboardTitle, dollarsPerMillionTokens, graphify, graphPath, searchPaths, graphifyAssumedQueriesPerDay, highlightProjects (+17 more)

### Community 12 - "Dashboard Screenshot Insights"
Cohesion: 0.14
Nodes (23): Token Savings Dashboard Screenshot, Graph Build Cost and Payback Panel (build cost, payback Jun 2, 2026), Work Banked Day-by-Day Chart (May-Jun, bars + cumulative line), Hero Savings Metric ($2,903 saved), Method Footnote (data sources and counting method), Per-Project Token Breakdown (docs-site, knowledge-base, ops-dashboard, +6 more), Graph Query vs Naive Read Comparison (190,366 tok vs 2,386 tok, 79.7x), Summary Stat Cards (99.8% recall efficiency, 79.7x, 4,482 extractions, 2s setup) (+15 more)

### Community 13 - "Chart.js Animation Engine"
Cohesion: 0.14
Nodes (5): Cs, nn(), os(), pi(), sn

### Community 14 - "Date Adapter Internals"
Cohesion: 0.39
Nodes (3): nt(), vo(), wo()

### Community 15 - "Chart.js Geometry Helpers"
Cohesion: 0.31
Nodes (7): ao(), average(), getCenterPoint(), Hs, lo(), nearest(), tooltipPosition()

### Community 16 - "Chart.js Misc Utilities"
Cohesion: 0.17
Nodes (9): ct(), fs(), ge(), ms(), pe(), we(), ws, xe() (+1 more)

### Community 17 - "Dashboard Live Config"
Cohesion: 0.14
Nodes (13): claudeMemDbPath, dashboardTitle, dollarsPerMillionTokens, graphify, graphPath, searchPaths, graphifyAssumedQueriesPerDay, highlightProjects (+5 more)

### Community 18 - "Chart.js Dataset Ranges"
Cohesion: 0.25
Nodes (10): b(), ei(), getRange(), H(), hi(), li(), mo(), Ni() (+2 more)

### Community 19 - "Chart.js Tick Formatting"
Cohesion: 0.19
Nodes (3): ii(), no, zi()

### Community 20 - "Chart.js Legend & Segments"
Cohesion: 0.07
Nodes (26): Auto-refresh (SessionStart hook), claude-mem, "claude-mem not detected", Contents, Graphify, "Graphify not detected", Install & Setup, Labels (+18 more)

### Community 21 - "Chart.js Time Lookup Tables"
Cohesion: 0.20
Nodes (5): buildLookupTable(), Fo(), _generate(), _getTimestampsForTable(), initOffsets()

### Community 22 - "Chart.js Box Layout & Log Scale"
Cohesion: 0.22
Nodes (6): addBox(), beforeUpdate(), configure(), initialize(), reset(), start()

### Community 23 - "Chart.js Linear Scale Pixels"
Cohesion: 0.22
Nodes (3): bo, et(), getValueForPixel()

### Community 24 - "Chart.js Decimal Pixel Mapping"
Cohesion: 0.29
Nodes (3): beforeLayout(), ko, qo()

### Community 25 - "Chart.js DOM Platform Layer"
Cohesion: 0.18
Nodes (3): is(), rs, zs()

### Community 26 - "Installer Logging Helpers"
Cohesion: 0.46
Nodes (7): err(), info(), ok(), step(), usage(), warn(), install.sh script

### Community 27 - "Chart.js Draw Overflow & Bezier"
Cohesion: 0.29
Nodes (7): beforeDraw(), draw(), getMaxOverflow(), kn(), qn(), size(), uo()

### Community 28 - "Chart.js Small Helpers"
Cohesion: 0.15
Nodes (12): Ee(), getDecimalForValue(), ho(), inXRange(), inYRange(), It(), j(), Le() (+4 more)

### Community 29 - "Chart.js Internal Constructors"
Cohesion: 0.09
Nodes (10): bn(), dn(), e(), ia(), on(), pn(), qs(), un() (+2 more)

### Community 31 - "Format Init Helpers"
Cohesion: 0.24
Nodes (4): En, init(), ln(), rn()

### Community 32 - "Community 32"
Cohesion: 0.12
Nodes (15): 1. `graphify benchmark` (per-query reduction), 2. `cost.json` (one-time build cost), claude-mem, claude-mem: where the numbers come from, Contents, Data flow, Dollars, everywhere, Every assumption, stated plainly (+7 more)

### Community 33 - "Community 33"
Cohesion: 0.23
Nodes (11): dataset(), _i(), index(), inRange(), ji(), logarithmic(), numeric(), Re() (+3 more)

### Community 34 - "Community 34"
Cohesion: 0.20
Nodes (9): Configure, FAQ, How the numbers work, Keep it fresh automatically, More, Quick start, Requirements, Token Savings (+1 more)

### Community 35 - "Community 35"
Cohesion: 0.29
Nodes (6): Contributing, Honest by default, Project layout, Proposing changes, Run it locally, The one hard rule for visual changes

### Community 36 - "Community 36"
Cohesion: 0.50
Nodes (3): Install, `token-savings` skill, Use it

## Ambiguous Edges - Review These
- `Token Savings` → `Install & Setup Guide`  [AMBIGUOUS]
  docs/INSTALL.md · relation: references

## Knowledge Gaps
- **95 isolated node(s):** `require`, `clearancePx`, `HERE`, `CWD`, `DATA_DIR` (+90 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Token Savings` and `Install & Setup Guide`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `_()` connect `Chart.js Init & Colors Plugin` to `Chart.js Plugin Hooks`, `Chart.js Event Binding`, `Chart.js Context & Scales`, `Chart.js Bar Pixel Math`, `Chart.js Color Utilities`, `Chart.js Data Limits & Ticks`, `Chart.js Layout Helpers`, `Chart.js Registry & Elements`, `Chart.js Dataset Visibility`, `Dashboard Screenshot Insights`, `Chart.js Animation Engine`, `Date Adapter Internals`, `Chart.js Geometry Helpers`, `Chart.js Misc Utilities`, `Chart.js Dataset Ranges`, `Chart.js Tick Formatting`, `Chart.js Time Lookup Tables`, `Chart.js Box Layout & Log Scale`, `Chart.js Linear Scale Pixels`, `Chart.js Decimal Pixel Mapping`, `Chart.js DOM Platform Layer`, `Chart.js Draw Overflow & Bezier`, `Chart.js Small Helpers`, `Chart.js Internal Constructors`, `Format Init Helpers`, `Community 33`?**
  _High betweenness centrality (0.521) - this node is a cross-community bridge._
- **Why does `js()` connect `Chart.js Bar Pixel Math` to `Chart.js Plugin Hooks`, `Chart.js Context & Scales`, `Chart.js Data Limits & Ticks`, `Chart.js Layout Helpers`, `Chart.js Dataset Visibility`, `Chart.js Init & Colors Plugin`, `Chart.js Linear Scale Pixels`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `an()` connect `Chart.js Event Binding` to `Community 33`, `Chart.js Bar Pixel Math`, `Chart.js Layout Helpers`, `Chart.js Registry & Elements`, `Chart.js Dataset Visibility`, `Chart.js Init & Colors Plugin`, `Chart.js Internal Constructors`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `_()` (e.g. with `Work Banked Day-by-Day Chart (May-Jun, bars + cumulative line)` and `Per-Project Token Breakdown (docs-site, knowledge-base, ops-dashboard, +6 more)`) actually correct?**
  _`_()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `n()` (e.g. with `.hasValue()` and `._generate()`) actually correct?**
  _`n()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `require`, `clearancePx`, `HERE` to the rest of the system?**
  _96 weakly-connected nodes found - possible documentation gaps or missing edges._