#!/bin/bash -e

# download ui dependencies
npm install npm@latest --no-save
npm prune
npm install

# TODO: temp workaround for npm@5 issues causing broken build on CI
# seems to be related to https://github.com/npm/npm/issues/15558 maybe?
npm install semver

# download server dependencies
./lein.sh deps
