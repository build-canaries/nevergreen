#!/bin/bash -e

npm install
npm test
npm run lint

lein do clean, midje, uberjar
