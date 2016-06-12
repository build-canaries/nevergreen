#!/bin/bash -e

# restore cached node_modules if it exists
# [[ -d ${SNAP_CACHE_DIR}/node_modules ]] && cp -R ${SNAP_CACHE_DIR}/node_modules/ ${SNAP_WORKING_DIR}/node_modules/

# download ui dependencies
npm prune
npm install

# copy node_modules back to cache
# [[ -d ${SNAP_CACHE_DIR} ]] && cp -R ${SNAP_WORKING_DIR}/node_modules/ ${SNAP_CACHE_DIR}/node_modules/

# run ui tests
npm run lint
npm test

# build ui
npm run sass
npm run build

# clean server build folders
lein clean

# run the server tests
lein midje 'nevergreen.*'

# build the server jar
lein uberjar
