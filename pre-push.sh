#!/bin/bash -e

echo 'Running the ui unit tests'
npm install
npm test
npm run lint

echo 'Running the server unit tests'
lein do clean, midje

echo 'Running the functional tests (the server must be running!)'
lein test

echo 'Building an uberjar'
lein uberjar
