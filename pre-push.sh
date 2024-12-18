#!/usr/bin/env bash
set -eo pipefail

kill_all() {
  echo
  echo -e '\x1B[34m[Clean-up]\x1B[0m Shutting down background processes...'
  trap '' INT TERM
  kill -TERM 0
  wait
  echo -e '\x1B[34m[Clean-up]\x1B[0m Processes killed'
}

# kill background processes on exit
trap 'kill_all' EXIT INT TERM ABRT

current_step=1
total_steps=8

print_step() {
  echo
  echo -e "\x1B[34m[Step $current_step of $total_steps]\x1B[0m $1..."
  echo
  current_step=$((current_step + 1))
}

export CI=true

print_step 'Checking if the ./develop.sh script is running'
if pgrep -fl develop.sh &>/dev/null; then
  echo -e "\x1B[31mdevelop.sh is running, it needs to be stopped before you can run pre-push\x1B[0m"
  exit 1
fi

print_step 'Checking prerequisites'
. ./config/check-prerequisites.sh

print_step 'Validating CI configuration (if the CircleCI CLI is installed)'
hash circleci 2>/dev/null && circleci config validate

print_step 'Running the CI dependencies script'
. ./.circleci/dependencies.sh
npm run install:mock

print_step 'Running the CI compile script'
. ./.circleci/compile.sh

print_step 'Running the CI test script'
. ./.circleci/test.sh

print_step 'Starting the server'
npm run start:mock &
java -jar ./target/nevergreen-standalone.jar &

export HOST="http://localhost:5000"
FULL_VERSION="$(cat "./resources/version.txt")+$(cat "./resources/version_meta.txt")"
export FULL_VERSION
./.circleci/smoke-test.sh # Don't source as the script calls exit

print_step 'Running the journey tests'
npm run test:journey

echo
echo -e "\x1B[32mEverything completed successfully, push away!\x1B[0m"
echo
