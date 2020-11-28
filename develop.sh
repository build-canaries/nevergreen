#!/bin/bash
set -euo pipefail

kill_all() {
  echo
  echo 'shutting down background processes...'
  trap '' INT TERM
  kill -TERM 0
  wait
  echo 'processes killed'
}

# kill all background process on interrupt or terminate
trap 'kill_all' INT TERM

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

. ./config/check-prerequisites.sh

echo "clean"
./lein.sh clean
npm run clean

echo "fetching node modules and performing first build"
. ./.circleci/dependencies.sh

echo "watching the js for changes ..."
npm run watch:js &

echo "starting the CI stub server ..."
cd cctray_xml_feed_mock
npm install
npm start &
cd ..

echo "running the server ..."
./lein.sh run &

wait

# Proper clean up taken from this unix stackexchange post:
# http://unix.stackexchange.com/questions/55558/how-can-i-kill-and-wait-for-background-processes-to-finish-in-a-shell-script-whe
