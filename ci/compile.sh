#!/bin/bash -e

# clean client build folders
npm run clean --loglevel verbose

# build ui
npm run build-prod --loglevel verbose

# clean server build folders
./lein.sh clean

# build the server jar
./lein.sh uberjar
