#!/bin/bash -e

echo "running ui tests"
npm run lint
npm run coverage

echo "running the server tests"
JVM_OPTS="-Dorg.slf4j.simpleLogger.defaultLogLevel=off" ./lein.sh eastwood # linting
JVM_OPTS="-Dorg.slf4j.simpleLogger.defaultLogLevel=off" ./lein.sh midje 'nevergreen.*' # unit tests
