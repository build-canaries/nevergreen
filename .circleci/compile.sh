#!/bin/bash -eu

echo "cleaning build folders"
npm run clean:all

echo "type checking"
npm run check-types

echo "building"
npm run build
./lein.sh uberjar
