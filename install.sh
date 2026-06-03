#!/usr/bin/env bash
#
# install.sh — Token Savings dashboard installer
#
# Friendly, robust setup for the Token Savings dashboard. It:
#   1. Checks prerequisites (Node >= 18; sqlite3 recommended).
#   2. Detects which context tools you have (claude-mem, Graphify) — purely
#      informational, never fatal. The dashboard auto-detects too and shows a
#      friendly "not detected" hint for any tool it can't find.
#   3. Runs the collector (collect-savings.mjs) to write data/savings.js.
#   4. Optionally installs the Claude Code skill.
#   5. Prints the SessionStart hook snippet for auto-refresh.
#   6. Opens the dashboard in your browser.
#
# It writes no files of its own except via the collector, and never sends data
# anywhere. Safe to re-run any time.
#
# Flags:
#   --yes        Non-interactive. Accept safe defaults; never prompt.
#                (The skill install defaults to NO, so --yes will NOT install it.)
#   --no-open    Don't try to open the dashboard at the end.
#   -h, --help   Show usage and exit.
#
# Usage:
#   ./install.sh [--yes] [--no-open]
#
# Requirements: Node 18+. sqlite3 recommended (claude-mem panel needs it).

set -euo pipefail

# ---------------------------------------------------------------------------
# Resolve our own directory so this works no matter where it's invoked from.
# ---------------------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ---------------------------------------------------------------------------
# Pretty output helpers. ✓ = good, ○ = absent/info, ⚠ = warning, ✗ = error.
# Colors degrade gracefully when stdout isn't a TTY.
# ---------------------------------------------------------------------------
if [ -t 1 ]; then
  C_RESET=$'\033[0m'; C_BOLD=$'\033[1m'; C_DIM=$'\033[2m'
  C_GREEN=$'\033[32m'; C_YELLOW=$'\033[33m'; C_RED=$'\033[31m'; C_CYAN=$'\033[36m'
else
  C_RESET=''; C_BOLD=''; C_DIM=''
  C_GREEN=''; C_YELLOW=''; C_RED=''; C_CYAN=''
fi

ok()    { printf '%s✓%s %s\n'  "$C_GREEN"  "$C_RESET" "$1"; }   # success
info()  { printf '%s○%s %s\n'  "$C_DIM"    "$C_RESET" "$1"; }   # neutral / not detected
warn()  { printf '%s⚠%s %s\n'  "$C_YELLOW" "$C_RESET" "$1"; }   # warning, keep going
err()   { printf '%s✗%s %s\n'  "$C_RED"    "$C_RESET" "$1" >&2; } # fatal-ish error
step()  { printf '\n%s%s%s\n'  "$C_BOLD"   "$1" "$C_RESET"; }   # section heading

# ---------------------------------------------------------------------------
# Parse flags.
# ---------------------------------------------------------------------------
ASSUME_YES=0
DO_OPEN=1

usage() {
  cat <<EOF
${C_BOLD}Token Savings — installer${C_RESET}

Usage: ./install.sh [options]

Options:
  --yes        Non-interactive; accept safe defaults (skill install stays OFF).
  --no-open    Don't open the dashboard in a browser at the end.
  -h, --help   Show this help and exit.
EOF
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --yes|-y)      ASSUME_YES=1 ;;
    --no-open)     DO_OPEN=0 ;;
    -h|--help)     usage; exit 0 ;;
    *)             err "Unknown option: $1"; echo; usage; exit 1 ;;
  esac
  shift
done

# ---------------------------------------------------------------------------
# Banner.
# ---------------------------------------------------------------------------
printf '\n%s%s╭───────────────────────────────────────────╮%s\n' "$C_BOLD" "$C_CYAN" "$C_RESET"
printf '%s%s│   Token Savings — dashboard installer      │%s\n'   "$C_BOLD" "$C_CYAN" "$C_RESET"
printf '%s%s╰───────────────────────────────────────────╯%s\n'   "$C_BOLD" "$C_CYAN" "$C_RESET"
printf '%sSee how many tokens (and dollars) claude-mem + Graphify save you.%s\n' "$C_DIM" "$C_RESET"

# ===========================================================================
# 1. PREREQUISITE CHECKS
# ===========================================================================
step "Checking prerequisites…"

# --- Node.js present and >= v18 -------------------------------------------
if ! command -v node >/dev/null 2>&1; then
  err "Node.js is not installed — it's required to run the collector."
  cat >&2 <<EOF

  Install Node 18 or newer, then re-run this script:
    • macOS (Homebrew):  brew install node
    • Linux (nvm):       https://github.com/nvm-sh/nvm  →  nvm install --lts
    • Or download from:  https://nodejs.org/

EOF
  exit 1
fi

# `node -v` prints something like "v20.11.1". Strip the leading "v" and read
# the major version with plain shell parameter expansion (no extra tools).
NODE_VERSION_RAW="$(node -v 2>/dev/null || echo '')"
NODE_VERSION="${NODE_VERSION_RAW#v}"          # 20.11.1
NODE_MAJOR="${NODE_VERSION%%.*}"              # 20

# Guard against an unparseable version string.
case "$NODE_MAJOR" in
  ''|*[!0-9]*)
    err "Could not parse Node version from: '${NODE_VERSION_RAW}'."
    err "Please ensure Node 18+ is installed and on your PATH."
    exit 1
    ;;
esac

if [ "$NODE_MAJOR" -lt 18 ]; then
  err "Node ${NODE_VERSION} found, but version 18 or newer is required."
  cat >&2 <<EOF

  Upgrade Node, then re-run this script:
    • macOS (Homebrew):  brew upgrade node
    • Linux (nvm):       nvm install --lts && nvm use --lts
    • Or download from:  https://nodejs.org/

EOF
  exit 1
fi
ok "Node ${NODE_VERSION} (>= 18) — good."

# --- sqlite3 present (recommended, not required) --------------------------
# claude-mem stores observations in a SQLite DB; the collector shells out to
# the sqlite3 CLI to read it. Graphify doesn't need sqlite3, so this is only a
# warning — the dashboard still works for the tools that don't depend on it.
if command -v sqlite3 >/dev/null 2>&1; then
  ok "sqlite3 — found."
else
  warn "sqlite3 not found. The Cloud Mem (claude-mem) panel needs it to read"
  warn "  your memory DB; without it that panel will show a hint. Graphify is"
  warn "  unaffected. To install:"
  warn "    • macOS:  brew install sqlite"
  warn "    • Debian/Ubuntu:  sudo apt-get install sqlite3"
  warn "    • Fedora:  sudo dnf install sqlite"
fi

# ===========================================================================
# 2. TOOL DETECTION (informational — the dashboard auto-detects too)
# ===========================================================================
step "Detecting context tools…"

# --- claude-mem (a.k.a. Cloud Mem) ----------------------------------------
# Default DB location. config.json can override claudeMemDbPath, but for a
# quick informational check the default path is the right thing to probe.
CLAUDE_MEM_DB="$HOME/.claude-mem/claude-mem.db"
if [ -f "$CLAUDE_MEM_DB" ]; then
  ok "claude-mem detected (DB: ${CLAUDE_MEM_DB})"
else
  info "claude-mem not detected (the Cloud Mem panel will show a hint)."
  info "  Looked for: ${CLAUDE_MEM_DB}"
fi

# --- Graphify -------------------------------------------------------------
# The CLI being on PATH is the signal here; the collector then looks for a
# built graph at graphify-out/graph.json under your repo(s).
if command -v graphify >/dev/null 2>&1; then
  ok "graphify detected (CLI on PATH)."
  info "  The collector looks for a built graph at graphify-out/graph.json."
else
  info "graphify not detected (the Graphify panel will show a hint)."
  info "  Install + build a graph so this panel lights up; the collector looks"
  info "  for graphify-out/graph.json."
fi

# ===========================================================================
# 3. RUN THE COLLECTOR
# ===========================================================================
# collect-savings.mjs is fail-safe: if a tool is missing or has no data it
# writes a "not detected" state for that panel rather than erroring. So we run
# it unconditionally and just report whether it exited cleanly.
step "Collecting savings data…"
if node "$SCRIPT_DIR/collect-savings.mjs"; then
  ok "Wrote data/savings.js (the dashboard reads this — no server needed)."
else
  warn "The collector exited with a non-zero status."
  warn "  The dashboard will still open; panels without data show a hint."
fi

# ===========================================================================
# 4. OPTIONAL: INSTALL THE CLAUDE CODE SKILL
# ===========================================================================
# If the user runs Claude Code, they likely have ~/.claude/skills. We offer to
# drop our skill in so it's available as a slash command. Default is NO.
SKILL_SRC="$SCRIPT_DIR/skill"
SKILLS_DIR="$HOME/.claude/skills"
SKILL_DEST="$SKILLS_DIR/token-savings"

step "Claude Code skill (optional)…"
if [ -d "$SKILL_SRC" ] && [ -d "$SKILLS_DIR" ]; then
  install_skill=0

  if [ "$ASSUME_YES" -eq 1 ]; then
    # --yes accepts *safe* defaults only; installing into ~/.claude is opt-in,
    # so we deliberately skip it in non-interactive mode.
    info "Skipping skill install (default is No; --yes won't opt you in)."
    info "  To install later:  cp -R \"$SKILL_SRC\" \"$SKILL_DEST\""
  elif [ ! -t 0 ]; then
    # No TTY to prompt on — don't block, just tell them how.
    info "Not an interactive terminal; skipping skill prompt."
    info "  To install later:  cp -R \"$SKILL_SRC\" \"$SKILL_DEST\""
  else
    printf 'Install the Token Savings skill to %s? [y/N] ' "$SKILL_DEST"
    read -r reply || reply=''
    case "$reply" in
      [yY]|[yY][eE][sS]) install_skill=1 ;;
      *)                  install_skill=0 ;;
    esac
  fi

  if [ "$install_skill" -eq 1 ]; then
    if [ -e "$SKILL_DEST" ]; then
      warn "Destination already exists: $SKILL_DEST — leaving it untouched."
      warn "  Remove it first if you want to reinstall."
    else
      cp -R "$SKILL_SRC" "$SKILL_DEST"
      ok "Installed skill → $SKILL_DEST"
    fi
  fi
elif [ ! -d "$SKILL_SRC" ]; then
  # Nothing to install — this build doesn't ship a skill/ folder.
  info "No skill/ folder in this repo — nothing to install. (That's fine.)"
else
  # ~/.claude/skills doesn't exist → probably not using Claude Code skills.
  info "No ~/.claude/skills directory found — skipping skill install."
  info "  (Create it and re-run if you'd like the skill.)"
fi

# ===========================================================================
# 5. SESSIONSTART HOOK SNIPPET (auto-refresh)
# ===========================================================================
# A Claude Code SessionStart hook re-runs the collector every time you open
# Claude in a repo, so the dashboard always reflects your latest savings.
COLLECTOR_PATH="$SCRIPT_DIR/collect-savings.mjs"

step "Auto-refresh (optional but recommended)…"
cat <<EOF
Add this to your repo's ${C_BOLD}.claude/settings.json${C_RESET} so the collector runs each
time you start Claude Code in that repo:

${C_CYAN}  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node \"${COLLECTOR_PATH}\" >/dev/null 2>&1 || true"
          }
        ]
      }
    ]
  }${C_RESET}

${C_DIM}The "|| true" keeps a failed/absent collector from blocking your session.
If settings.json already has a "hooks" block, merge "SessionStart" into it.${C_RESET}
EOF

# ===========================================================================
# 6. OPEN THE DASHBOARD
# ===========================================================================
INDEX_HTML="$SCRIPT_DIR/index.html"

step "Opening the dashboard…"
if [ "$DO_OPEN" -eq 0 ]; then
  info "Skipping (--no-open). Open it yourself:"
  info "  $INDEX_HTML"
elif [ ! -f "$INDEX_HTML" ]; then
  warn "Couldn't find index.html at: $INDEX_HTML"
  warn "  Open the dashboard's index.html manually once it's in place."
else
  opened=0
  if command -v open >/dev/null 2>&1; then
    # macOS
    open "$INDEX_HTML" && opened=1 || true
  elif command -v xdg-open >/dev/null 2>&1; then
    # Most Linux desktops
    xdg-open "$INDEX_HTML" >/dev/null 2>&1 && opened=1 || true
  fi

  if [ "$opened" -eq 1 ]; then
    ok "Opened $INDEX_HTML in your browser."
  else
    info "Couldn't auto-open a browser. Open this file manually:"
    info "  $INDEX_HTML"
  fi
fi

# ===========================================================================
# DONE
# ===========================================================================
step "All set."
ok "Token Savings is ready. Re-run this script any time to refresh."
printf '%sNote: if you cloned without execute bits, you may need:%s  chmod +x install.sh\n' \
  "$C_DIM" "$C_RESET"
