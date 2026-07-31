# CLAUDE.md

## Cross-repo knowledge (graphify hub)

For any question that might span repos, query the unified hub graph:

```bash
cd /Users/ahamade/Documents/GitHub/_graphify-hub && graphify query "<question>"
```

Every result node is tagged with its origin `repo:`. The hub is a merged snapshot of all 12
graphified repos (woodwiki, claude-os, ai-ops-dashboard, cabinet-designer, project-ops-plan,
claude-chat, ship-it, claude-worklog-skill, claude-token-savings-dashboard, beeco,
vercel-react-best-practices, claude-seo) plus verified cross-repo bridge edges. It is a
snapshot — rebuild it with `/Users/ahamade/Documents/GitHub/_graphify-hub/refresh-hub.sh`
after updating any repo's local graph.
