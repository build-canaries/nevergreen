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
echo "# One downside is all output is currently just spammed onto the same terminal window #"
echo "# and may get a little hard to read.                                                 #"
echo "#                                                                                    #"
echo "# Killing this script will automatically kill all the spawned processes.             #"
echo "######################################################################################"
echo

./check-node.sh

echo "clean"
./lein.sh clean
npm run clean

echo "fetching node modules and performing first build"
npm prune
npm install

echo "watching the js for changes ..."
npm run watchJs &

echo "starting the CI stub server ..."
npm run ci-stub-server &

echo "running the server ..."
./lein.sh run &

wait

# Proper clean up taken from this unix stackexchange post:
# http://unix.stackexchange.com/questions/55558/how-can-i-kill-and-wait-for-background-processes-to-finish-in-a-shell-script-whe
