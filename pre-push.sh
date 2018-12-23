#!/bin/bash -euo pipefail

killall() {
    echo 'shutting down...'
    trap '' INT TERM
    kill -TERM 0
    wait
    echo "done!"
}

# kill all background process on exit or error
trap 'killall' EXIT
trap 'killall' INT

. ./check-node.sh

echo '[Step 1 of 6] Stopping the ./develop.sh script (if it is running)...'
set +e
pkill -SIGINT -f ./develop.sh
set -e

echo '[Step 2 of 6] Running the ci dependencies script...'
. ./.circleci/dependencies.sh

echo '[Step 3 of 6] Running the ci compile script...'
. ./.circleci/compile.sh

echo '[Step 4 of 6] Running the ci test script...'
. ./.circleci/test.sh

echo '[Step 5 of 6] Starting the server...'
./lein.sh run &
cd cctray_xml_feed_mock
npm install
npm start &
cd ..

export HOST="http://localhost:5000"
export FULL_VERSION="$(cat "./resources/version.txt")+$(cat "./resources/version_meta.txt")"
./.circleci/smoke-test.sh # Don't source as the script calls exit

echo '[Step 6 of 6] Running the journey tests...'
npm run test:journey

echo
echo 'Everything completed successfully, push away!'
echo
echo 'You will need to manually restart the ./develop script, to continue development...'
