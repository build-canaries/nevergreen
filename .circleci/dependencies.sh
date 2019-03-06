#!/bin/bash -eu

echo "downloading ui dependencies"
npm ci

echo "downloading server dependencies"
./lein.sh deps
