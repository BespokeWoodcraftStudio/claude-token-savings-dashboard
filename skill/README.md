# `token-savings` skill

An **optional** Claude Code skill that regenerates and opens the
[Token Savings](../README.md) dashboard — a local dark page showing how many
tokens and dollars **claude-mem** and **Graphify** save in your repos.

When invoked, the skill:

1. Locates your cloned dashboard repo (via `$TOKEN_SAVINGS_DIR`, a path you give,
   or by asking).
2. Runs `collect-savings.mjs` to refresh `data/savings.js` + `data/savings.json`.
3. Opens `index.html` straight from disk (`file://`, no server needed).
4. Reads `data/savings.json` and reports the headline saved-$ and reduction factor.

It's read-only except for writing files under `data/`. No npm install, no network —
it shells out to the `sqlite3` and `graphify` CLIs already on your machine. Node 18+.

## Install

This skill is just a folder. Copy it into your Claude Code skills directory:

```bash
cp -R skill ~/.claude/skills/token-savings
```

…or let the repo's installer do it:

```bash
./install.sh
```

> Note: `~/.claude/skills/token-savings` is the **skill**. The dashboard itself is
> the **cloned repo** (the one containing `collect-savings.mjs` and `index.html`).
> Point the skill at that repo with `$TOKEN_SAVINGS_DIR`, e.g. add to your shell
> profile:
>
> ```bash
> export TOKEN_SAVINGS_DIR="$HOME/path/to/claude-token-savings-dashboard"
> ```

## Use it

In Claude Code, either:

- Invoke it directly: **`/token-savings`**
- …or just ask: **"refresh my token savings dashboard"**,
  **"how many tokens has claude-mem saved me?"**, or
  **"open the token savings dashboard"**.

Claude will refresh the data, open the dashboard, and summarize the numbers.
