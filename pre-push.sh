#!/usr/bin/env bash
set -euo pipefail

kill_all() {
  echo 'shutting down background processes...'
  trap '' INT TERM
  kill -TERM 0
  wait
  echo 'processes killed'
}

current_step=1
total_steps=9

print_step() {
  echo
  echo -e "\x1B[34m[Step $current_step of $total_steps]\x1B[0m $1..."
  echo
  current_step=$((current_step + 1))
}

export CI=true

print_step 'Checking prerequisites'
. ./config/check-prerequisites.sh

print_step 'Stopping the ./develop.sh script (if it is running)'
set +e
pkill -SIGINT -f ./develop.sh
set -e

print_step 'Validating CI configuration (if the CircleCI CLI is installed)'
hash circleci 2>/dev/null && circleci config validate

print_step 'Running the CI dependencies script'
. ./.circleci/dependencies.sh

print_step 'Running the CI compile script'
. ./.circleci/compile.sh

print_step 'Running the CI test script'
. ./.circleci/test.sh

print_step 'Starting the server'

# kill background processes on interrupt, terminate and abort
trap 'kill_all' INT TERM ABRT

./lein.sh run &
cd cctray_xml_feed_mock
npm install
npm start &
cd ..

export HOST="http://localhost:5000"
FULL_VERSION="$(cat "./resources/version.txt")+$(cat "./resources/version_meta.txt")"
export FULL_VERSION
./.circleci/smoke-test.sh # Don't source as the script calls exit

print_step 'Running the journey tests'
npm run test:journey

print_step 'Stopping the server'
kill_all

echo
echo -e "\x1B[32mEverything completed successfully, push away!\x1B[0m"
echo
echo 'You will need to manually restart the ./develop script, to continue development...'
