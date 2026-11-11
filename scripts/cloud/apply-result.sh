#!/usr/bin/env bash
# Brings a cloud session's result into the local checkout (the local checkout is the source of truth), then deletes
# the transport branch.
# Usage: scripts/cloud/apply-result.sh cloud/<task-slug> [--wait[=MINUTES]] [--keep-branch]
#   --wait          poll GitHub every 30 s until the branch has its "Cloud-Done: yes" commit (default 60 min)
#   --keep-branch   don't delete the branch (e.g. to inspect it)
# What it does:
#   1. code changes (start → result, without .cloud-artifacts/) → `git apply` as uncommitted local changes
#   2. .cloud-artifacts/<path> → written to <path> locally (renders, stills, reports; usually gitignored)
#   3. deletes origin/cloud/<task-slug>
# Nothing is committed: review the changes like your own edit, then commit following AGENTS.md.
set -euo pipefail
die() { echo "apply-result: $*" >&2; exit 1; }
b=${1:-}; [[ $b == cloud/* ]] || die "usage: apply-result.sh cloud/<task-slug> [--wait[=MIN]] [--keep-branch]"
shift; wait_min=0; keep=0
for a in "$@"; do case $a in --wait) wait_min=60;; --wait=*) wait_min=${a#--wait=};; --keep-branch) keep=1;; *) die "unknown option $a";; esac; done
cd "$(git rev-parse --show-toplevel)"
ref=refs/remotes/origin/$b
done_commit() { git fetch -q origin "+refs/heads/$b:$ref" 2>/dev/null && git log -1 --format=%B "$ref" | grep -q '^Cloud-Done: yes'; }
deadline=$(( $(date +%s) + wait_min * 60 ))
until done_commit; do
  (( $(date +%s) < deadline )) || die "no finished result on origin/$b yet (it needs a commit with 'Cloud-Done: yes')"
  sleep 30
done
tip=$(git rev-parse "$ref")
msg=$(git log -1 --format=%B "$tip")
want_tree=$(sed -n 's/^Cloud-Tree: //p' <<<"$msg" | head -1)
# The cloud's starting point is its "cloud: start" commit (a clone or an upload squashed into one commit).
# awk reads the whole log (no early exit): an early exit makes git log die of SIGPIPE, fatal with pipefail.
start=$(git log --format='%H %s' "$tip" | awk '!s && $2=="cloud:" && $3=="start" && NF==3 {s=$1} END {print s}')
[[ -n $start ]] || die "no 'cloud: start' commit on origin/$b; branch kept for a manual look"
if [[ -n $want_tree && $(git rev-parse "$start^{tree}") != "$want_tree" ]]; then
  die "the cloud started from different files than the local checkout (tree mismatch); branch kept"
fi
snap=$(git stash create 2>/dev/null || true)
if [[ -n $want_tree && $(git rev-parse "${snap:-HEAD}^{tree}") != "$want_tree" ]]; then
  echo "Note: local files changed since the job started; applying the cloud's changes on top."
fi
patch=$(mktemp); trap 'rm -f "$patch"' EXIT
git diff --binary "$start" "$tip" -- . ':(exclude).cloud-artifacts' > "$patch"
if [[ -s $patch ]]; then
  git apply --check "$patch" || die "code changes don't apply cleanly on the local tree; branch kept for a manual look"
  git apply "$patch"
  echo "Applied code changes (uncommitted):"; git diff --stat "$start" "$tip" -- . ':(exclude).cloud-artifacts' | sed 's/^/  /'
else
  echo "No code changes."
fi
n=0
while IFS= read -r f; do
  [[ -n $f ]] || continue
  dest=${f#.cloud-artifacts/}
  mkdir -p "$(dirname "$dest")"
  git cat-file blob "$tip:$f" > "$dest"; n=$((n+1)); echo "  artifact → $dest ($(du -h "$dest" | cut -f1))"
done < <(git ls-tree -r --name-only "$tip" -- .cloud-artifacts)
echo "Artifacts written: $n"
echo "Cloud report:"; git log -1 --format=%B "$tip" | sed '/^Cloud-/d;s/^/  /'
if (( keep )); then echo "Branch kept: origin/$b"; else
  git push -q origin --delete "$b" && git update-ref -d "$ref" && echo "Deleted origin/$b"
fi
