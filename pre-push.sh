#!/bin/sh

lein do clean, midje
npm install
./node_modules/karma/bin/karma start