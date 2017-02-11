#!/bin/bash -e

# run ui tests
npm run lint
npm test

# run the server tests
./lein.sh midje 'nevergreen.*'
