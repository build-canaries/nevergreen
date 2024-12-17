#!/bin/bash -eu

echo "downloading ui dependencies"
npm ci

echo "downloading server dependencies"
npm run install:server
