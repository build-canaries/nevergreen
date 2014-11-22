#!/bin/sh

lein do clean, midje
npm install
npm test
npm run lint
