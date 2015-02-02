#!/bin/bash -e

echo '[Step 1 of 6] Updating node packages...'
npm install

echo '[Step 2 of 6] Running the ui unit tests...'
npm test

echo '[Step 3 of 6] Linting the JavaScript...'
npm run lint

echo '[Step 4 of 6] Running the server unit tests...'
lein do clean, midje 'nevergreen.*'

echo '[Step 5 of 6] Running the functional tests (the server must be running!)...'
lein test functional.functional-test

echo '[Step 6 of 6] Building an uberjar...'
lein uberjar

echo 'Done! Check the output for any errors!'