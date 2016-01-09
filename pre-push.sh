#!/bin/bash -e

hash npm 2>/dev/null || {
    echo >&2 "npm command not found, you need to install Node. See wiki/contributing for more details.."
    exit 1
}

hash lein 2>/dev/null || {
    echo >&2 "lein command not found, you need to install Leiningen. See wiki/contributing for more details.."
    exit 1
}

echo '[Step 1 of 2] Running the ci test script...'
./ci/test.sh

echo '[Step 2 of 2] Running the functional tests (the server must be running!)...'
export JVM_OPTS="-Dwebdriver.chrome.driver=./node_modules/chromedriver/bin/chromedriver"
lein test functional.functional-test

echo 'Done! Check the output for any errors!'
