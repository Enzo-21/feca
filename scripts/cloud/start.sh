#!/usr/bin/env bash
# Starts a cloud session (Claude Code on the web, Anthropic VM) for one heavy job.
# Usage: scripts/cloud/start.sh <task-slug> "<exact commands to run>" ["<what to bring back>"]
#   <task-slug>   short kebab-case name; the result comes back on branch cloud/<task-slug>
#   commands      e.g. "cd marketing/video && npm ci && ./make.sh render"
#   bring back    files/folders to return, e.g. "marketing/video/out/*.mp4 marketing/video/out/posts"
# It prints the task it sends and runs `claude --cloud` (interactive: run it in a terminal or a Herdr pane).
# Then wait for and apply the result:  scripts/cloud/apply-result.sh cloud/<task-slug> --wait
set -euo pipefail
slug=${1:?usage: start.sh <task-slug> "<commands>" ["<files to bring back>"]}
cmds=${2:?missing commands}
back=${3:-}
[[ $slug =~ ^[a-z0-9][a-z0-9-]{0,50}$ ]] || { echo "task-slug must be kebab-case" >&2; exit 2; }
cd "$(git rev-parse --show-toplevel)"
head=$(git rev-parse HEAD)
# Content fingerprint: the git tree of HEAD plus tracked uncommitted changes (`git stash create` changes nothing).
# Uploads arrive squashed into one commit, so the cloud checks this tree, not the commit hash.
snap=$(git stash create 2>/dev/null || true)
tree=$(git rev-parse "${snap:-HEAD}^{tree}")
branch=$(git branch --show-current)
untracked=$(git ls-files --others --exclude-standard | head -5)
if [[ -n $untracked ]]; then
  echo "Untracked files never reach the cloud. Commit them or 'git add' them first:" >&2; echo "$untracked" >&2; exit 3
fi
# With the Claude GitHub App on this repo the VM clones origin at the current branch and pushes cloud/<slug> by itself.
# If HEAD isn't pushed or the tree has changes, upload a bundle instead (tracked changes included; untracked files and
# .env* never included); a bundle has no origin, so pushing back needs the repo attached (TASK.md) and the owner's
# approval on the session screen. In this repo pushing means deploying main to production, so a bundle is the usual
# way to check work that isn't on main yet.
if [[ -n $(git status --porcelain) ]] || ! git branch -r --contains "$head" 2>/dev/null | grep -q .; then
  export CCR_FORCE_BUNDLE=1; how="bundle of the local checkout (CCR_FORCE_BUNDLE=1): commit and push first to avoid it"
else
  how="clone of origin/$branch"
fi
repo=$(git remote get-url origin | sed -E 's#^(https://github\.com/|git@[^:]+:)##; s#\.git$##')
# CLOUD_TASK picks another task template (default scripts/cloud/TASK.md).
task=$(sed -e "s|{{REPO}}|$repo|g" -e "s|{{SLUG}}|$slug|g" -e "s|{{HEAD}}|$head|g" -e "s|{{TREE}}|$tree|g" -e "s|{{BRANCH}}|$branch|g" "${CLOUD_TASK:-scripts/cloud/TASK.md}")
# Quoted replacements: bash 5.2+ would otherwise turn "&" (as in "&&") into the matched text
back=${back:-nothing besides code changes}
task=${task//\{\{COMMANDS\}\}/"$cmds"}
task=${task//\{\{BRING_BACK\}\}/"$back"}
echo "Cloud task cloud/$slug from $branch@${head:0:9} ($how):"; echo "----"; echo "$task"; echo "----"
exec claude --cloud "$task"
