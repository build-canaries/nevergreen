#!/bin/bash -eu

echo "cleaning client build folders"
npm run clean

echo "building ui"
npm run build-prod

echo "cleaning server build folders"
./lein.sh clean

echo "building the server jar"
./lein.sh uberjar
