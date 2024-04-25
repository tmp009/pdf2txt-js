#!/usr/bin/env bash

set -eEuo pipefail

case "$1" in
  start)
    exec node index.mjs
    ;;
  test)
    exec npm run test
    ;;
  hang)
    exec tail -f /dev/null
  ;;
esac
