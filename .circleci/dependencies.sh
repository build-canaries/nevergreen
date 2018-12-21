#!/bin/bash -eu

echo "downloading ui dependencies"
npm install

echo "downloading server dependencies"
./lein.sh deps
