#!/bin/bash -e

# clean client build folders
npm run clean

# build ui
npm run build-prod

# clean server build folders
./lein.sh clean

# build the server jar
./lein.sh uberjar
