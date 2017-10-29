#!/bin/bash -e

# download ui dependencies
npm install

# download server dependencies
./lein.sh deps
