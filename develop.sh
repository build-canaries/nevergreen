#!/bin/bash
set -eo pipefail

if pgrep -fl pre-push.sh &>/dev/null; then
  echo -e "\x1B[31mpre-push.sh is running, it needs to finish before you can run develop\x1B[0m"
  exit 1
fi

. ./config/check-prerequisites.sh

npm run clean:all
npm run install:all
npm run start:all
