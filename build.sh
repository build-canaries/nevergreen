#!/bin/bash
set -eo pipefail

echo "Checking for prerequisites..."
. ./config/check-prerequisites.sh

echo "Cleaning repository..."
./lein.sh clean
npm run clean

echo "Fetching node modules and performing first build..."
. ./.circleci/dependencies.sh

echo "Building uberjar..."
./lein.sh uberjar

echo "Building webapp..."
npm run build:prod

echo "Building docker image..."
docker build . -t nevergreen

printf "All done! To run nevergreen, execute:\n./run.sh"