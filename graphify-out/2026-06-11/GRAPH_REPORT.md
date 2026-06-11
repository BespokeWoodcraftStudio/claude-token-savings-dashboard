# Graph Report - .  (2026-06-09)

## Corpus Check
- 14 files · ~69,350 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 838 nodes · 2238 edges · 32 communities (28 shown, 4 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 219 edges (avg confidence: 0.8)
- Token cost: 146,443 input · 0 output

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
- `Install & Setup Guide` --references--> `token-savings Claude Code Skill`  [AMBIGUOUS]
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

## Communities (32 total, 4 thin omitted)

### Community 0 - "Chart.js Plugin Hooks"
Cohesion: 0.07
Nodes (30): afterDraw(), afterEvent(), afterUpdate(), ai(), ba, beforeDatasetDraw(), beforeDatasetsDraw(), da() (+22 more)

### Community 1 - "Chart.js Event Binding"
Cohesion: 0.06
Nodes (10): afterDatasetsUpdate(), an(), cn(), dn(), ke(), Mn(), onClick(), p() (+2 more)

### Community 2 - "Chart.js Context & Scales"
Cohesion: 0.05
Nodes (13): Ci(), Fi(), K(), labelColor(), labelPointStyle(), ls, ns(), on() (+5 more)

### Community 3 - "Chart.js Bar Pixel Math"
Cohesion: 0.06
Nodes (15): _calculateBarIndexPixels(), d(), fe(), getPixelForTick(), getPixelForValue(), _getRuler(), _getStackCount(), _getStackIndex() (+7 more)

### Community 4 - "Contributing & Methodology Docs"
Cohesion: 0.08
Nodes (46): Contributing Guide, Honest-by-Default Principle, Overlap Check (check-overlaps.mjs), Load-Everything-Every-Time Baseline, graphify benchmark Command, cost.json Build Ledger, discovery_tokens Column, 99.9% Efficiency Cap (+38 more)

### Community 5 - "Chart.js Color Utilities"
Cohesion: 0.08
Nodes (14): Bi(), Bt(), color(), Gt(), jt(), kt(), mt(), qt() (+6 more)

### Community 6 - "Chart.js Data Limits & Ticks"
Cohesion: 0.09
Nodes (20): a(), aa(), As(), buildTicks(), determineDataLimits(), Fn(), g(), Gn() (+12 more)

### Community 7 - "Chart.js Layout Helpers"
Cohesion: 0.08
Nodes (13): b(), Be(), co(), Do(), eo(), label(), mo(), ne() (+5 more)

### Community 8 - "Chart.js Registry & Elements"
Cohesion: 0.08
Nodes (8): addElements(), ce(), de, dt(), he(), Oe(), qs(), tn

### Community 9 - "Chart.js Dataset Visibility"
Cohesion: 0.10
Nodes (12): ca(), _calculateBarValuePixels(), getBasePixel(), getLabelAndValue(), getLabelForValue(), hn(), jn, n() (+4 more)

### Community 10 - "Chart.js Init & Colors Plugin"
Cohesion: 0.08
Nodes (16): _(), at(), bn(), destroy(), Di(), e(), easeInOutElastic(), je() (+8 more)

### Community 11 - "Dashboard Config Example"
Cohesion: 0.08
Nodes (25): claudeMemDbPath, dashboardTitle, dollarsPerMillionTokens, graphify, graphPath, searchPaths, graphifyAssumedQueriesPerDay, highlightProjects (+17 more)

### Community 12 - "Dashboard Screenshot Insights"
Cohesion: 0.14
Nodes (23): Token Savings Dashboard Screenshot, Graph Build Cost and Payback Panel (build cost, payback Jun 2, 2026), Work Banked Day-by-Day Chart (May-Jun, bars + cumulative line), Hero Savings Metric ($2,903 saved), Method Footnote (data sources and counting method), Per-Project Token Breakdown (docs-site, knowledge-base, ops-dashboard, +6 more), Graph Query vs Naive Read Comparison (190,366 tok vs 2,386 tok, 79.7x), Summary Stat Cards (99.8% recall efficiency, 79.7x, 4,482 extractions, 2s setup) (+15 more)

### Community 13 - "Chart.js Animation Engine"
Cohesion: 0.15
Nodes (4): Cs, os(), pi(), sn

### Community 14 - "Date Adapter Internals"
Cohesion: 0.18
Nodes (7): En, ia(), ln(), nt(), rn(), vo(), wo()

### Community 15 - "Chart.js Geometry Helpers"
Cohesion: 0.20
Nodes (13): ao(), average(), getCenterPoint(), ho(), Hs, _i(), inRange(), inXRange() (+5 more)

### Community 16 - "Chart.js Misc Utilities"
Cohesion: 0.17
Nodes (9): ct(), fs(), ge(), ms(), pe(), we(), ws, xe() (+1 more)

### Community 17 - "Dashboard Live Config"
Cohesion: 0.14
Nodes (13): claudeMemDbPath, dashboardTitle, dollarsPerMillionTokens, graphify, graphPath, searchPaths, graphifyAssumedQueriesPerDay, highlightProjects (+5 more)

### Community 18 - "Chart.js Dataset Ranges"
Cohesion: 0.21
Nodes (14): dataset(), ei(), getRange(), H(), hi(), index(), ji(), li() (+6 more)

### Community 20 - "Chart.js Legend & Segments"
Cohesion: 0.17
Nodes (9): es(), generateLabels(), is(), Qi(), ss(), ts(), update(), zi() (+1 more)

### Community 21 - "Chart.js Time Lookup Tables"
Cohesion: 0.18
Nodes (6): buildLookupTable(), Fo(), _generate(), _getTimestampsForTable(), initOffsets(), lt()

### Community 22 - "Chart.js Box Layout & Log Scale"
Cohesion: 0.17
Nodes (9): addBox(), beforeUpdate(), configure(), initialize(), logarithmic(), numeric(), reset(), start() (+1 more)

### Community 23 - "Chart.js Linear Scale Pixels"
Cohesion: 0.17
Nodes (3): Ae(), bo, et()

### Community 24 - "Chart.js Decimal Pixel Mapping"
Cohesion: 0.18
Nodes (4): beforeLayout(), getValueForPixel(), ko, qo()

### Community 26 - "Installer Logging Helpers"
Cohesion: 0.46
Nodes (7): err(), info(), ok(), step(), usage(), warn(), install.sh script

### Community 27 - "Chart.js Draw Overflow & Bezier"
Cohesion: 0.29
Nodes (7): beforeDraw(), draw(), getMaxOverflow(), kn(), qn(), size(), uo()

### Community 28 - "Chart.js Small Helpers"
Cohesion: 0.25
Nodes (7): Ee(), It(), j(), Le(), pt(), q(), ro()

### Community 29 - "Chart.js Internal Constructors"
Cohesion: 0.33
Nodes (4): gi(), mi(), un(), vi()

## Ambiguous Edges - Review These
- `Install & Setup Guide` → `token-savings Claude Code Skill`  [AMBIGUOUS]
  docs/INSTALL.md · relation: references

## Knowledge Gaps
- **43 isolated node(s):** `require`, `clearancePx`, `HERE`, `CWD`, `DATA_DIR` (+38 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Install & Setup Guide` and `token-savings Claude Code Skill`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `_()` connect `Chart.js Init & Colors Plugin` to `Chart.js Plugin Hooks`, `Chart.js Event Binding`, `Chart.js Context & Scales`, `Chart.js Bar Pixel Math`, `Chart.js Color Utilities`, `Chart.js Data Limits & Ticks`, `Chart.js Layout Helpers`, `Chart.js Registry & Elements`, `Chart.js Dataset Visibility`, `Dashboard Screenshot Insights`, `Chart.js Animation Engine`, `Date Adapter Internals`, `Chart.js Geometry Helpers`, `Chart.js Misc Utilities`, `Chart.js Dataset Ranges`, `Chart.js Tick Formatting`, `Chart.js Legend & Segments`, `Chart.js Time Lookup Tables`, `Chart.js Box Layout & Log Scale`, `Chart.js Linear Scale Pixels`, `Chart.js Decimal Pixel Mapping`, `Chart.js DOM Platform Layer`, `Chart.js Draw Overflow & Bezier`, `Chart.js Small Helpers`, `Chart.js Internal Constructors`, `Format Init Helpers`?**
  _High betweenness centrality (0.613) - this node is a cross-community bridge._
- **Why does `js()` connect `Chart.js Bar Pixel Math` to `Chart.js Plugin Hooks`, `Chart.js Event Binding`, `Chart.js Context & Scales`, `Chart.js Data Limits & Ticks`, `Chart.js Layout Helpers`, `Chart.js Init & Colors Plugin`, `Chart.js Legend & Segments`, `Chart.js Linear Scale Pixels`, `Chart.js Decimal Pixel Mapping`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Why does `an()` connect `Chart.js Event Binding` to `Chart.js Context & Scales`, `Chart.js Layout Helpers`, `Chart.js Registry & Elements`, `Chart.js Dataset Visibility`, `Chart.js Init & Colors Plugin`, `Chart.js Legend & Segments`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `_()` (e.g. with `Work Banked Day-by-Day Chart (May-Jun, bars + cumulative line)` and `Per-Project Token Breakdown (docs-site, knowledge-base, ops-dashboard, +6 more)`) actually correct?**
  _`_()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `n()` (e.g. with `.hasValue()` and `._generate()`) actually correct?**
  _`n()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `require`, `clearancePx`, `HERE` to the rest of the system?**
  _44 weakly-connected nodes found - possible documentation gaps or missing edges._