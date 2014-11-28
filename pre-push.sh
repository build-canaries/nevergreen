#!/bin/sh

lein do clean, midje
npm install
npm run build
npm test
npm run lint
