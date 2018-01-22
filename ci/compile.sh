#!/bin/bash -e

echo "cleaning client build folders"
npm run clean

echo "building ui"
npm run build-prod

echo "cleaning server build folders"
./lein.sh clean

echo "building the server jar"
cp -f ./src/client/version.json ./resources/public
./lein.sh uberjar
