#!/bin/bash -e

# restore cached node_modules if it exists
[[ -d ${SNAP_CACHE_DIR}/node_modules ]] && mv -f "${SNAP_CACHE_DIR}/node_modules" node_modules

# download ui dependencies
npm prune
npm install

# copy node_modules back to cache
[[ -d ${SNAP_CACHE_DIR} ]] && mv -f ${SNAP_CACHE_DIR} node_modules

# restore cached maven repo if it exists
[[ -d ${SNAP_CACHE_DIR}/.m2 ]] && mv -f "${SNAP_CACHE_DIR}/.m2" ~/.m2

# download server dependencies
lein deps

# copy the maven repo back to cache
[[ -d ${SNAP_CACHE_DIR} ]] && mv -f ${SNAP_CACHE_DIR} ~/.m2

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
