#!/bin/bash -eu

./lein.sh functional
npm run cypress
