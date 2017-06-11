#!/bin/bash

killall() {
    echo 'Stopping the server...'
    trap '' INT TERM
    kill -TERM 0
    wait
    echo "Done!"
}

./check-node.sh

echo '[Step 1 of 6] Stopping the ./develop.sh script (if it is running)...'
pkill -SIGINT -f ./develop.sh

# pkill returns a non zero exist status so we need to set exit on error here
set -e

# kill all background process on exit or error
trap 'killall' EXIT
trap 'killall' INT

echo '[Step 2 of 6] Running the ci dependencies script...'
# remove the package-lock.json file as it wouldn't exist on the CI server, see issue #177 for more details
rm -f package-lock.json # TODO: [#177] remove once we figure out how to get package-lock.json working consistently
./ci/dependencies.sh

echo '[Step 3 of 6] Running the ci compile script...'
./ci/compile.sh

echo '[Step 4 of 6] Running the ci test script...'
./ci/test.sh

echo '[Step 5 of 6] Starting the server...'
./lein.sh run &
npm run ci-stub-server &

./ci/smoke-test.sh "http://localhost:5000/api/ping"

echo '[Step 4 of 6] Running the functional tests...'
./lein.sh test functional.functional-test

export BROWSER=firefox
./lein.sh test functional.functional-test

echo
echo 'Everything completed successfully, push away!'
echo
echo 'You will need to manually restart the ./develop script, to continue development...'
