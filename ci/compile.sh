#!/bin/bash -e

# download ui dependencies
npm install npm@latest -g
npm prune
npm install --loglevel error

# clean client build folders
npm run clean

# build ui
npm run build-prod

# clean server build folders
./lein.sh clean

# build the server jar
./lein.sh uberjar
