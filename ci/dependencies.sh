#!/bin/bash -e

# install the correct version of node
./ci/check-node.sh

# download ui dependencies
npm install npm@latest -g
npm prune
npm install --loglevel error

# download server dependencies
./lein.sh deps
