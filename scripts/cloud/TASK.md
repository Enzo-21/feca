Heavy job delegated from the owner's local Mac. The local checkout is the only source of truth: you run the job and
hand the result back on ONE branch; the local agent applies it and deletes the branch.

Rules: push ONLY branch cloud/{{SLUG}}. Never push to main or any other branch (main deploys to production), never
open PRs, never merge. Never create or read .env files, and never connect to Vercel, WhatsApp, ElevenLabs, payment or
email services. No secrets are available here and none are needed.

1. Record the starting point (it may be a clone or an upload squashed into one commit; both are fine):
     git checkout -b cloud/{{SLUG}} && git add -A && git commit -q --allow-empty -m "cloud: start"
   Then `git rev-parse HEAD^{tree}` must be {{TREE}} (the local files, local HEAD {{HEAD}} on {{BRANCH}}).
   If it differs, don't run anything: reply with both tree ids and `git status`, and stop.
2. Prepare the VM if needed: `bash scripts/cloud/setup.sh` (idempotent; Python numpy/scipy, Node 24, npm 11).
3. Run, in order, one at a time: {{COMMANDS}}
4. Code changes you had to make: commit them normally on the branch.
   Generated files to bring back ({{BRING_BACK}}): copy each one to `.cloud-artifacts/<same relative path>` and
   `git add -f .cloud-artifacts`. Keep every file under 90 MB (GitHub limit); if one is bigger, report it instead.
5. Final commit (even if nothing changed: `--allow-empty`), message:
     cloud: result
     <one line per command: exit code and the last useful line of output>

     Cloud-Base: {{HEAD}}
     Cloud-Tree: {{TREE}}
     Cloud-Done: yes
6. `git push -u origin cloud/{{SLUG}}`, then stop. Reply with the same summary as the final commit.
   An upload has no `origin` remote. In that case attach the GitHub repository {{REPO}} to this session (the "add repo"
   tool; the owner approves it), then push the branch from that clone without changing it:
     cd <clone dir> && git fetch <this checkout> cloud/{{SLUG}}:cloud/{{SLUG}} && git push -u origin cloud/{{SLUG}}
   Never guess remotes or use other credentials. If the push still fails, report the exact error and stop.
