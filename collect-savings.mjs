#!/usr/bin/env node
/**
 * collect-savings.mjs — the data collector behind the Token Savings dashboard.
 *
 * Reads up to two local-only sources, AUTO-DETECTING whichever are present, and
 * writes data/savings.js (+ savings.json). The dashboard (index.html) renders it.
 *
 *   1. claude-mem  — the claude-mem SQLite DB (default ~/.claude-mem/claude-mem.db).
 *                   Each observation stores `discovery_tokens` (the tokens it cost
 *                   to originally produce that knowledge). Summed = "work captured".
 *   2. Graphify   — `graphify benchmark` (per-query token reduction) + cost.json
 *                   (what the graph cost to build).
 *
 * If a tool isn't installed / has no data, that section is reported as
 * { notDetected: true, reason } and the dashboard shows a friendly empty panel —
 * the other tool still renders. No demo data is fabricated.
 *
 * Zero npm install: shells out to the `sqlite3` and `graphify` CLIs. Fail-safe —
 * any unexpected error writes a partial file with an `errors[]` array and exits 0,
 * so a SessionStart hook never blocks a session.
 *
 * Run:  node collect-savings.mjs
 * Paths in config.json may be absolute, ~-relative, or relative to the directory
 * you run this from (your repo root) — see resolveExisting().
 */

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, resolve, join, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const CWD = process.cwd();
const DATA_DIR = join(HERE, "data");
const errors = [];

function expandHome(p) {
  return p && p.startsWith("~") ? join(homedir(), p.slice(1)) : p;
}

/** Resolve the first path that exists, trying: absolute as-is; then relative to
 *  CWD; then relative to this script's dir; then any provided fallbacks. */
function resolveExisting(p, fallbacks = []) {
  const candidates = [];
  if (p) {
    const ep = expandHome(p);
    if (isAbsolute(ep)) candidates.push(ep);
    else { candidates.push(resolve(CWD, ep)); candidates.push(resolve(HERE, ep)); }
  }
  for (const f of fallbacks) {
    const ef = expandHome(f);
    if (isAbsolute(ef)) candidates.push(ef);
    else { candidates.push(resolve(CWD, ef)); candidates.push(resolve(HERE, ef)); }
  }
  for (const c of candidates) if (existsSync(c)) return c;
  return null;
}

function loadConfig() {
  const p = join(HERE, "config.json");
  if (!existsSync(p)) {
    errors.push("config.json not found — using built-in defaults.");
    return {};
  }
  return JSON.parse(readFileSync(p, "utf8"));
}

function cmdAvailable(cmd) {
  try {
    execFileSync(cmd, ["--version"], { stdio: "ignore" });
    return true;
  } catch {
    // some CLIs don't support --version; fall back to `which`
    try { execFileSync("which", [cmd], { stdio: "ignore" }); return true; }
    catch { return false; }
  }
}

function sql(dbPath, query) {
  const out = execFileSync(
    "sqlite3",
    ["-readonly", "-separator", "\t", dbPath, query],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }
  );
  return out.trim().split("\n").filter((l) => l.length > 0).map((l) => l.split("\t"));
}

function scopeClause(scope) {
  if (!scope || scope.mode !== "projects" || !Array.isArray(scope.projects) || scope.projects.length === 0) return "";
  const list = scope.projects.map((p) => `'${String(p).replace(/'/g, "''")}'`).join(",");
  return `WHERE project IN (${list})`;
}

function collectCloudMem(cfg) {
  const dbPath = resolveExisting(cfg.claudeMemDbPath || "~/.claude-mem/claude-mem.db");
  if (!dbPath) {
    return { notDetected: true, reason: "claude-mem database not found. Install claude-mem and let it capture some sessions, or set claudeMemDbPath in config.json." };
  }
  if (!cmdAvailable("sqlite3")) {
    return { notDetected: true, reason: "The `sqlite3` CLI was not found on PATH. Install it (macOS: preinstalled; Debian/Ubuntu: apt install sqlite3)." };
  }

  let where = scopeClause(cfg.scope);
  let rows;
  try {
    rows = sql(dbPath, `SELECT name FROM sqlite_master WHERE type='table' AND name='observations';`);
  } catch (e) {
    return { notDetected: true, reason: "Could not read the claude-mem database: " + e.message };
  }
  if (!rows.length) {
    return { notDetected: true, reason: "The claude-mem database has no `observations` table yet — capture a session first." };
  }

  const [[obsStr, workStr, daysStr]] = sql(
    dbPath,
    `SELECT COUNT(*), COALESCE(SUM(discovery_tokens),0), COUNT(DISTINCT substr(created_at,1,10)) FROM observations ${where};`
  );
  const observations = Number(obsStr);
  const workTokens = Number(workStr);
  const distinctDays = Number(daysStr);

  if (observations === 0) {
    return { notDetected: true, reason: "No observations captured yet" + (where ? " for the configured project scope." : "."), empty: true };
  }

  const byProject = sql(
    dbPath,
    `SELECT project, COUNT(*), COALESCE(SUM(discovery_tokens),0) FROM observations GROUP BY project ORDER BY 3 DESC;`
  ).map(([project, obs, work]) => ({
    project,
    observations: Number(obs),
    workTokens: Number(work),
    highlighted: Array.isArray(cfg.highlightProjects) && cfg.highlightProjects.includes(project),
  }));

  const dailyRaw = sql(
    dbPath,
    `SELECT substr(created_at,1,10) AS day, COUNT(*), COALESCE(SUM(discovery_tokens),0)
       FROM observations ${where} GROUP BY day ORDER BY day ASC;`
  );
  let cum = 0;
  const daily = dailyRaw.map(([day, obs, work]) => {
    const w = Number(work); cum += w;
    return { day, observations: Number(obs), workTokens: w, cumulativeWorkTokens: cum };
  });

  const recallPer = Number(cfg.recallTokensPerObservation) || 0;
  const recallTokens = observations * recallPer;
  const savedTokens = Math.max(0, workTokens - recallTokens);
  const rate = Number(cfg.dollarsPerMillionTokens) || 0;
  const savedDollars = (savedTokens / 1e6) * rate;
  const efficiencyPct = workTokens > 0 ? Math.min(99.9, Math.round((savedTokens / workTokens) * 1000) / 10) : 0;

  return {
    observations, workTokens, distinctDays,
    recallTokensPerObservation: recallPer, recallTokens,
    savedTokens, savedDollars, efficiencyPct,
    byProject, daily,
    dbPath,
  };
}

function parseBenchmark(text) {
  const num = (re) => { const m = text.match(re); return m ? Number(m[1].replace(/,/g, "")) : null; };
  return {
    corpusWords: num(/Corpus:\s+([\d,]+)\s+words/),
    corpusTokensNaive: num(/~([\d,]+)\s+tokens\s+\(naive\)/),
    nodes: num(/Graph:\s+([\d,]+)\s+nodes/),
    edges: num(/([\d,]+)\s+edges/),
    avgQueryTokens: num(/Avg query cost:\s+~([\d,]+)\s+tokens/),
    reductionFactor: num(/Reduction:\s+([\d.]+)x/),
  };
}

function collectGraphify(cfg) {
  const g = cfg.graphify || {};
  const graphPath = resolveExisting(g.graphPath || "graphify-out/graph.json", g.searchPaths || [
    "graphify-out/graph.json", "../graphify-out/graph.json", "../../graphify-out/graph.json",
  ]);
  if (!graphPath) {
    return { notDetected: true, reason: "No Graphify graph found. Run `graphify` on a repo to build graphify-out/graph.json, or set graphify.graphPath in config.json." };
  }
  if (!cmdAvailable("graphify")) {
    return { notDetected: true, reason: "Found a graph but the `graphify` CLI is not on PATH. Install graphify to compute the benchmark." };
  }

  let bench = null;
  try {
    bench = parseBenchmark(execFileSync("graphify", ["benchmark", graphPath], { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 }));
  } catch (e) {
    return { notDetected: true, reason: "`graphify benchmark` failed: " + e.message };
  }

  // cost.json sits next to the graph
  const costPath = resolveExisting(g.costJsonPath, [graphPath.replace(/graph\.json$/, "cost.json")]);
  let build = null;
  if (costPath && existsSync(costPath)) {
    try {
      const cost = JSON.parse(readFileSync(costPath, "utf8"));
      build = {
        totalInputTokens: Number(cost.total_input_tokens) || 0,
        totalOutputTokens: Number(cost.total_output_tokens) || 0,
        runs: Array.isArray(cost.runs) ? cost.runs.length : 0,
        lastBuilt: Array.isArray(cost.runs) && cost.runs.length ? cost.runs[cost.runs.length - 1].date : null,
      };
    } catch (e) { errors.push("reading graphify cost.json failed: " + e.message); }
  }

  const rate = Number(cfg.dollarsPerMillionTokens) || 0;
  const savedTokensPerQuery = bench.corpusTokensNaive != null && bench.avgQueryTokens != null ? bench.corpusTokensNaive - bench.avgQueryTokens : null;
  const savedDollarsPerQuery = savedTokensPerQuery != null ? (savedTokensPerQuery / 1e6) * rate : null;
  const buildTokens = build ? build.totalInputTokens + build.totalOutputTokens : null;
  const buildCostDollars = buildTokens != null ? (buildTokens / 1e6) * rate : null;

  return { ...bench, savedTokensPerQuery, savedDollarsPerQuery, build, buildTokens, buildCostDollars, graphPath };
}

function updateGraphifyHistory(today, graphify) {
  const path = join(DATA_DIR, "graphify-history.json");
  let history = [];
  if (existsSync(path)) { try { history = JSON.parse(readFileSync(path, "utf8")); if (!Array.isArray(history)) history = []; } catch { history = []; } }
  const snapshot = {
    day: today,
    reductionFactor: graphify.reductionFactor ?? null,
    corpusTokensNaive: graphify.corpusTokensNaive ?? null,
    avgQueryTokens: graphify.avgQueryTokens ?? null,
    nodes: graphify.nodes ?? null,
    edges: graphify.edges ?? null,
    buildTokens: graphify.buildTokens ?? null,
  };
  const idx = history.findIndex((h) => h.day === today);
  if (idx >= 0) history[idx] = snapshot; else history.push(snapshot);
  history.sort((a, b) => a.day.localeCompare(b.day));
  writeFileSync(path, JSON.stringify(history, null, 2) + "\n");
  return history;
}

function main() {
  const cfg = loadConfig();
  const now = new Date();
  const today = now.toLocaleDateString("en-CA");

  let cloudMem = null, graphify = null;
  try { cloudMem = collectCloudMem(cfg); } catch (e) { errors.push("claude-mem collection failed: " + e.message); cloudMem = { notDetected: true, reason: e.message }; }
  try { graphify = collectGraphify(cfg); } catch (e) { errors.push("Graphify collection failed: " + e.message); graphify = { notDetected: true, reason: e.message }; }

  let graphifyHistory = [];
  if (graphify && !graphify.notDetected) {
    try { graphifyHistory = updateGraphifyHistory(today, graphify); } catch (e) { errors.push("updating graphify history failed: " + e.message); }
  }

  const memOk = cloudMem && !cloudMem.notDetected;
  const combined = { savedTokens: memOk ? cloudMem.savedTokens : 0, savedDollars: memOk ? cloudMem.savedDollars : 0 };

  const out = {
    generatedAt: now.toISOString(),
    generatedAtLocal: now.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
    config: {
      siteName: cfg.siteName || "",
      dashboardTitle: cfg.dashboardTitle || "Token Savings",
      dollarsPerMillionTokens: Number(cfg.dollarsPerMillionTokens) || 0,
      recallTokensPerObservation: Number(cfg.recallTokensPerObservation) || 0,
      graphifyAssumedQueriesPerDay: Number(cfg.graphifyAssumedQueriesPerDay) || 0,
      scopeMode: cfg.scope ? cfg.scope.mode : "global",
      scopeProjects: cfg.scope && Array.isArray(cfg.scope.projects) ? cfg.scope.projects : [],
    },
    combined, cloudMem, graphify, graphifyHistory, errors,
  };

  const json = JSON.stringify(out, null, 2);
  writeFileSync(join(DATA_DIR, "savings.json"), json + "\n");
  writeFileSync(join(DATA_DIR, "savings.js"),
    "/* auto-generated by collect-savings.mjs — do not edit */\n" + "window.SAVINGS = " + json + ";\n");

  const memMsg = memOk ? `$${combined.savedDollars.toFixed(0)} saved · ${cloudMem.observations} obs` : "claude-mem not detected";
  const gfxMsg = graphify && !graphify.notDetected ? `${graphify.reductionFactor}x/query` : "Graphify not detected";
  console.log(`[collect-savings] ${memMsg} | ${gfxMsg} — wrote data/savings.js`);
  if (errors.length) { console.error(`[collect-savings] ${errors.length} warning(s):`); for (const e of errors) console.error("  - " + e); }
  process.exit(0);
}

main();
