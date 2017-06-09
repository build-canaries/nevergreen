#!/bin/bash -e

# download ui dependencies
npm install npm@latest -g
npm install

# download server dependencies
./lein.sh deps
