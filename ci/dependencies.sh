#!/bin/bash -e

# download ui dependencies
npm install npm@latest -g
npm prune --loglevel verbose
npm install --loglevel verbose

# attempt to deal with npm@5 problems (it seem to not install some packages correctly)
# https://github.com/npm/npm/issues/16991
npm install --loglevel verbose

# download server dependencies
./lein.sh deps
