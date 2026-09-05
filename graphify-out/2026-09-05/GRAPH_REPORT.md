# Graph Report - claude-token-savings-dashboard  (2026-09-05)

## Corpus Check
- 15 files · ~69,429 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 810 nodes · 2200 edges · 30 communities (25 shown, 5 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 115 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Vendor — determineDataLimits constructor
- Vendor — configure constructor
- Vendor — beforeLayout constructor
- Vendor — drawTitle update
- Docs — Helper Savings
- Vendor — init constructor
- Vendor — getPixelForValue updateElements
- Collect Savings.Mjs — Claude Config
- Vendor — acquireContext updateConfig
- Vendor — getContext drawBackground
- Vendor — color alpha
- Vendor — constructor notify
- Vendor — addElements unregister
- Vendor — computeTickLimit getLabelAndValue
- Vendor — generateTickLabels buildTicks
- Vendor — draw getDataElement
- Vendor — tooltipPosition isPointInArea
- Vendor — getPixelForTick calculatePadding
- Vendor — configure resolveAnimations
- Vendor — beforeDraw draw
- Vendor — register constructor
- Vendor — getLegendItemAt handleEvent
- Vendor — clearCache constructor
- Vendor — init insertElements
- Vendor — getValueForPixel computeTickLimit
- Vendor — addElements buildOrUpdateElements
- Vendor — initialize beforeUpdate
- Check Overlaps.Mjs — clearancePx require
- Vendor — labelColor labelPointStyle
- Chart Library

## God Nodes (most connected - your core abstractions)
1. `an()` - 61 edges
2. `ns()` - 55 edges
3. `s()` - 42 edges
4. `o()` - 39 edges
5. `a()` - 38 edges
6. `n()` - 37 edges
7. `no` - 35 edges
8. `l()` - 32 edges
9. `d()` - 31 edges
10. `va` - 30 edges

## Surprising Connections (you probably didn't know these)
- `Claude Markdown` --references--> `Graphify`  [EXTRACTED]
  CLAUDE.md → collect-savings.mjs
- `Install & Setup Guide` --references--> `token-savings Claude Code Skill`  [AMBIGUOUS]
  docs/INSTALL.md → skill/SKILL.md
- `Config` --references--> `Graphify`  [EXTRACTED]
  config.json → collect-savings.mjs
- `Config Example` --references--> `Graphify`  [EXTRACTED]
  config.example.json → collect-savings.mjs
- `Honest-by-Default Principle` --conceptually_related_to--> `99.9% Efficiency Cap`  [EXTRACTED]
  CONTRIBUTING.md → docs/HOW-IT-WORKS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Dashboard Components** — check_overlaps, collect_savings, install, chart_js [INFERRED 0.80]
- **Data Sources** — claude_mem, graphify, sqlite3 [EXTRACTED 1.00]
- **Configuration Files** — config, config_example [EXTRACTED 1.00]
- **Savings Data Flow Pipeline** — readme_claude_mem, readme_graphify, readme_collector, readme_savings_data, index_dashboard_ui [EXTRACTED 1.00]
- **Honesty Guardrails** — contributing_honesty_principle, docs_how_it_works_baseline, docs_how_it_works_efficiency_cap, docs_how_it_works_illustrative_projection [EXTRACTED 1.00]
- **Auto-Refresh Mechanism** — readme_sessionstart_hook, readme_collector, docs_how_it_works_failsafe, skill_skill_token_savings [EXTRACTED 1.00]

## Communities (30 total, 5 thin omitted)

### Community 0 - "Vendor — determineDataLimits constructor"
Cohesion: 0.05
Nodes (45): a(), aa(), ca(), da(), determineDataLimits(), Di(), dt(), e() (+37 more)

### Community 1 - "Vendor — configure constructor"
Cohesion: 0.06
Nodes (16): addBox(), afterDatasetsUpdate(), an(), configure(), generateLabels(), ke(), kn(), Mn() (+8 more)

### Community 2 - "Vendor — beforeLayout constructor"
Cohesion: 0.04
Nodes (19): Ae(), beforeDatasetDraw(), beforeDatasetsDraw(), beforeLayout(), cn(), destroy(), es(), fe() (+11 more)

### Community 3 - "Vendor — drawTitle update"
Cohesion: 0.08
Nodes (16): afterDraw(), afterEvent(), afterUpdate(), ba, f(), ki(), oa(), Oi() (+8 more)

### Community 4 - "Docs — Helper Savings"
Cohesion: 0.08
Nodes (46): Contributing Guide, Honest-by-Default Principle, Overlap Check (check-overlaps.mjs), Load-Everything-Every-Time Baseline, graphify benchmark Command, cost.json Build Ledger, discovery_tokens Column, 99.9% Efficiency Cap (+38 more)

### Community 5 - "Vendor — init constructor"
Cohesion: 0.07
Nodes (15): buildLookupTable(), ei(), En, Fo(), _generate(), getDecimalForValue(), _getTimestampsForTable(), init() (+7 more)

### Community 6 - "Vendor — getPixelForValue updateElements"
Cohesion: 0.09
Nodes (14): _calculateBarIndexPixels(), _calculateBarValuePixels(), getBasePixel(), getLabelAndValue(), getLabelForValue(), getPixelForValue(), _getRuler(), _getStackCount() (+6 more)

### Community 7 - "Collect Savings.Mjs — Claude Config"
Cohesion: 0.09
Nodes (36): Claude Markdown, Claude Memory, cmdAvailable(), collectCloudMem(), collectGraphify(), CWD, DATA_DIR, errors (+28 more)

### Community 8 - "Vendor — acquireContext updateConfig"
Cohesion: 0.08
Nodes (13): ct(), fs(), ge(), gs(), ls, ms(), ps(), rs (+5 more)

### Community 9 - "Vendor — getContext drawBackground"
Cohesion: 0.11
Nodes (7): Bi(), Ci(), Do(), eo(), Fi(), Oe(), Y()

### Community 10 - "Vendor — color alpha"
Cohesion: 0.09
Nodes (14): Bt(), color(), Ft(), Gt(), It(), jt(), kt(), mt() (+6 more)

### Community 11 - "Vendor — constructor notify"
Cohesion: 0.10
Nodes (5): Cs, nn(), os(), sn, xt

### Community 12 - "Vendor — addElements unregister"
Cohesion: 0.12
Nodes (4): addElements(), at(), tn, w()

### Community 13 - "Vendor — computeTickLimit getLabelAndValue"
Cohesion: 0.11
Nodes (14): b(), Be(), H(), s(), label(), m(), mo(), ne() (+6 more)

### Community 14 - "Vendor — generateTickLabels buildTicks"
Cohesion: 0.13
Nodes (3): buildTicks(), d(), po()

### Community 16 - "Vendor — tooltipPosition isPointInArea"
Cohesion: 0.18
Nodes (15): ao(), average(), dataset(), getCenterPoint(), Hs, _i(), index(), ji() (+7 more)

### Community 17 - "Vendor — getPixelForTick calculatePadding"
Cohesion: 0.13
Nodes (4): getPixelForTick(), Ie(), Xs(), ze()

### Community 18 - "Vendor — configure resolveAnimations"
Cohesion: 0.19
Nodes (4): bn(), on(), pn(), Ye()

### Community 19 - "Vendor — beforeDraw draw"
Cohesion: 0.14
Nodes (13): ai(), beforeDraw(), draw(), Ee(), getMaxOverflow(), getRange(), hi(), Le() (+5 more)

### Community 20 - "Vendor — register constructor"
Cohesion: 0.21
Nodes (4): ce(), de, he(), qs()

### Community 21 - "Vendor — getLegendItemAt handleEvent"
Cohesion: 0.21
Nodes (10): ho(), inRange(), inXRange(), inYRange(), K(), li(), oo(), tt() (+2 more)

### Community 22 - "Vendor — clearCache constructor"
Cohesion: 0.24
Nodes (3): dn(), un(), xn

### Community 23 - "Vendor — init insertElements"
Cohesion: 0.25
Nodes (3): go(), ii(), parse()

### Community 24 - "Vendor — getValueForPixel computeTickLimit"
Cohesion: 0.25
Nodes (3): bo, et(), getValueForPixel()

### Community 27 - "Check Overlaps.Mjs — clearancePx require"
Cohesion: 0.50
Nodes (3): clearancePx, require, Playwright

## Ambiguous Edges - Review These
- `Install & Setup Guide` → `token-savings Claude Code Skill`  [AMBIGUOUS]
  docs/INSTALL.md · relation: references

## Knowledge Gaps
- **14 isolated node(s):** `require`, `clearancePx`, `HERE`, `CWD`, `DATA_DIR` (+9 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 106 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Install & Setup Guide` and `token-savings Claude Code Skill`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `an()` connect `Vendor — configure constructor` to `Vendor — beforeLayout constructor`, `Vendor — acquireContext updateConfig`, `Vendor — getContext drawBackground`, `Vendor — addElements unregister`, `Vendor — computeTickLimit getLabelAndValue`, `Vendor — tooltipPosition isPointInArea`, `Vendor — register constructor`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Why does `ns()` connect `Vendor — draw getDataElement` to `Vendor — determineDataLimits constructor`, `Vendor — configure constructor`, `Vendor — beforeLayout constructor`, `Vendor — drawTitle update`, `Vendor — getPixelForValue updateElements`, `Vendor — getContext drawBackground`, `Vendor — constructor notify`, `Vendor — addElements unregister`, `Vendor — generateTickLabels buildTicks`, `Vendor — configure resolveAnimations`, `Vendor — init insertElements`, `Vendor — addElements buildOrUpdateElements`, `Vendor — initialize beforeUpdate`, `Vendor — labelColor labelPointStyle`?**
  _High betweenness centrality (0.076) - this node is a cross-community bridge._
- **Why does `Work Banked Day-by-Day Chart (May-Jun, bars + cumulative line)` connect `Collect Savings.Mjs — Claude Config` to `Vendor — beforeLayout constructor`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Are the 12 inferred relationships involving `s()` (e.g. with `beforeUpdate()` and `da()`) actually correct?**
  _`s()` has 12 INFERRED edges - model-reasoned connections that need verification._
- **Are the 13 inferred relationships involving `o()` (e.g. with `ai()` and `da()`) actually correct?**
  _`o()` has 13 INFERRED edges - model-reasoned connections that need verification._
- **Are the 15 inferred relationships involving `a()` (e.g. with `ai()` and `cn()`) actually correct?**
  _`a()` has 15 INFERRED edges - model-reasoned connections that need verification._