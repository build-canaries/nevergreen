#!/bin/bash -e

# download ui dependencies
npm install npm@latest -g
npm install

# TODO: since updating to npm@5 the build breaks with an error about missing semver, this is a temp workaround to keep the build working
# see issue https://github.com/build-canaries/nevergreen/issues/177
npm install semver@5.3.0

# download server dependencies
./lein.sh deps
