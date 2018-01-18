#!/bin/bash -e

echo "downloading ui dependencies"
npm install

echo "downloading server dependencies"
./lein.sh deps
