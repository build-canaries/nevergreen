#!/bin/bash -e

# download ui dependencies
npm prune
npm install

# run ui tests
npm run lint
npm test

# build ui
npm run sass
npm run build

# clean server build folders
lein clean

# run the server tests
lein midje 'nevergreen.*'

# build the server jar
lein uberjar