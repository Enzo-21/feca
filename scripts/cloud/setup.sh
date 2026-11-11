#!/usr/bin/env bash
# Setup script for the Claude Code cloud environment (claude.ai/code → environment → Setup script).
# Runs as root on Ubuntu 24.04 before each session (cached ~7 days). One environment serves all the owner's repos.
# Must finish in ~5 minutes and exit 0, so every network step has a time limit and is best effort: the environment's
# network is "Limited" (package managers only), and a blocked download must not hang the session. No secrets here.
set -uo pipefail
# Python audio pipeline of marketing/video (make_audio.py, mix_voice.py)
python3 -c 'import numpy, scipy' 2>/dev/null ||
  timeout 180 pip install --quiet --break-system-packages numpy scipy ||
  echo "setup: numpy/scipy not installed (only ./make.sh audio needs them)"
# Node 24 (repos pin it on Vercel; the VM ships 20–22). n downloads from nodejs.org, which "Limited" may block:
# keep the VM's Node if it doesn't work in time.
if ! node -v 2>/dev/null | grep -q '^v24'; then
  { timeout 60 npm install -g --silent n && timeout 90 n 24 >/dev/null; } ||
    echo "setup: Node 24 not available, using $(node -v 2>/dev/null)"
  hash -r
fi
# npm 11: the lockfiles are resolved with npm 11 (Node 24 locally) and the VM's npm 10 resolves some nested packages
# differently, so `npm ci` fails ("lockfile out of sync"). It comes from the npm registry, which "Limited" allows.
if ! npm -v 2>/dev/null | grep -qE '^(1[1-9]|[2-9][0-9])\.'; then
  timeout 90 npm install -g --silent npm@11 >/dev/null 2>&1 ||
    echo "setup: npm 11 not available, using npm $(npm -v 2>/dev/null)"
  hash -r
fi
timeout 30 corepack enable >/dev/null 2>&1 || true
# Remotion uses the VM's Chrome for Testing through CHROME_PATH (see marketing/video/remotion.config.ts).
# Same script as the environment's setup script on claude.ai (shared with the owner's other repos): keep them in sync.
echo "setup ok: node $(node -v 2>/dev/null), npm $(npm -v 2>/dev/null), python $(python3 -c 'import numpy,scipy;print(numpy.__version__, scipy.__version__)' 2>/dev/null || echo 'without numpy/scipy'), chrome ${CHROME_PATH:-/usr/bin/google-chrome}"
exit 0
