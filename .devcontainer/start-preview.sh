#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
# A forwarded Codespaces port remains private by default.
if curl -fsS http://127.0.0.1:3000 >/dev/null 2>&1; then
  exit 0
fi
nohup npm run dev > /tmp/elevora-preview.log 2>&1 < /dev/null &
