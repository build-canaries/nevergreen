#!/bin/bash -e

# run ui tests
npm run lint
npm test

# run the server tests
JVM_OPTS="-Dorg.slf4j.simpleLogger.defaultLogLevel=off" ./lein.sh midje 'nevergreen.*'
