#!/bin/bash -e

# download ui dependencies
npm prune
npm install

# run ui tests
npm run lint
npm test

# clean client build folders
npm run clean

# build ui
npm run build-prod

# clean server build folders
./lein.sh clean

# run the server tests
./lein.sh midje 'nevergreen.*'

# build the server jar
./lein.sh uberjar
