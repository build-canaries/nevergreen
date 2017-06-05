#!/bin/bash -e

# download ui dependencies
npm install npm@latest -g
npm prune --loglevel verbose
npm install --loglevel verbose

# download server dependencies
./lein.sh deps
