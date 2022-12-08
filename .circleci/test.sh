#!/bin/bash -eu

echo "running linting"
npm run prettier:check
npm run lint
./lein.sh lint

echo "running unit tests"
mkdir -p ./target/test-reports/client
mkdir -p ./target/test-reports/server

npm run test:coverage

# We use cloverage to create the coverage report, but it can also create a junit XML report for us.
# So we want to stop test failures from exiting the script immediately so we can move the junit report to the correct
# folder

EXIT_STATUS=0

./lein.sh coverage || EXIT_STATUS=$?

if [ -f ./target/coverage-reports/server/junit.xml ]; then
  mv ./target/coverage-reports/server/junit.xml ./target/test-reports/server/test-results.xml
fi

if [ $EXIT_STATUS -ne 0 ]; then
  exit ${EXIT_STATUS}
fi
