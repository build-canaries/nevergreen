#!/bin/bash -eu

echo "running ui dependency audit"
mkdir -p ./target/security-reports/client
set +e
npm --no-color audit | tee ./target/security-reports/client/npm-audit.txt
set -e

echo "running ui tests"
npm run lint
npm run test:coverage

echo "running the server tests"
./lein.sh lint
./lein.sh unit

echo "moving test reports"
mkdir -p ./target/test-reports/client
mv ./target/client/*.xml ./target/test-reports/client
mkdir -p ./target/test-reports/server
mv ./target/test-reports/server/xml/*.xml ./target/test-reports/server
