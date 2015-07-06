#!/bin/bash -e

trap 'killall' INT

killall() {
    trap '' INT TERM
    echo
    echo "shutting down..."
    kill -TERM 0
    wait
    echo "done!"
}

echo
echo "######################################################################################"
echo "# This script will run several commands to watch the source files for changes.       #"
echo "#                                                                                    #"
echo "# This means all tests will automatically run when you make changes and the running  #"
echo "# server will also be automatically updated.                                         #"
echo "#                                                                                    #"
echo "# One downside is all output is currently just spammed onto the same terminal window #"
echo "# and may get a little hard to read.                                                 #"
echo "#                                                                                    #"
echo "# Killing this script will automatically kill all the spawned processes.             #"
echo "######################################################################################"
echo

hash npm 2>/dev/null || {
    echo >&2 "npm command not found, you need to install Node. See wiki/contributing for more details."
    exit 1
}

hash lein 2>/dev/null || {
    echo >&2 "lein command not found, you need to install Leiningen. See wiki/contributing for more details."
    exit 1
}

echo "[0] Clear build directory"
rm -rf build

echo "[1] fetching node modules and performing first build"
npm prune
npm install

echo "[2] watching the css for changes ..."
npm run watchJs &

echo "[3] watching the js for changes ..."
npm run watchCss &

echo "[4] automatically running the js tests on changes ..."
npm run watchTest &

echo "[5] automatically running js lint on changes ..."
npm run watchLint &

echo "[6] automatically running the server tests on changes ..."
lein midje :autotest 'src/nevergreen' 'test/nevergreen' &

echo "[7] running the server ..."
lein ring server-headless &

wait

# Proper clean up taken from this unix stackexchange post:
# http://unix.stackexchange.com/questions/55558/how-can-i-kill-and-wait-for-background-processes-to-finish-in-a-shell-script-whe