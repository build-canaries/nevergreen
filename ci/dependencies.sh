#!/bin/bash -e

# download ui dependencies
npm install npm@latest --no-save
npm prune
npm install

# download server dependencies
./lein.sh deps
