#!/usr/bin/env bash
# Where should a heavy job run? (rule: AGENTS.md, "Trabajos pesados")
#   exit 0  → run it locally (load is low and no other heavy job is running on this Mac)
#   exit 10 → send it to a cloud session (scripts/cloud/start.sh)
# The Mac is shared by every user and agent, so this looks at ALL processes, not only yours.
# Usage: scripts/cloud/heavy-check.sh        (HEAVY_LOAD_LIMIT overrides the limit of 6)
set -u
LIMIT=${HEAVY_LOAD_LIMIT:-6}
if load=$(sysctl -n vm.loadavg 2>/dev/null); then load=$(awk '{print $2}' <<<"$load"); else load=$(cut -d' ' -f1 /proc/loadavg); fi
PATTERN='(^|/| )(tsc|vitest|jest|playwright)( |$)|(tsx|node) --test|next (build|start|dev)|remotion (render|still|bundle|studio|benchmark)|chrome-headless-shell'
busy=$(ps -Ao pid=,user=,etime=,command= | grep -E "$PATTERN" | grep -vE "grep|heavy-check" || true)
if awk -v l="$load" -v m="$LIMIT" 'BEGIN{exit !(l >= m)}'; then
  echo "cloud: 1-minute load $load >= $LIMIT"; exit 10
fi
if [[ -n $busy ]]; then
  echo "cloud: another heavy job is running on this Mac:"; echo "$busy" | cut -c1-160; exit 10
fi
echo "local: load $load < $LIMIT and no other heavy job running"
