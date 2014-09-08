# build-monitor-clj [![Build Status](https://travis-ci.org/cowley05/build-monitor-clj.svg?branch=master)](https://travis-ci.org/cowley05/build-monitor-clj)

A Clojure application designed to run an interesting build monitor.

It uses the *cctray.xml* format which is supported by nearly all CI servers. (I'm looking at you Bamboo)

See a demo at http://build-monitor-clj.herokuapp.com

## How to Run

The build monitor runs on port 5000.

```
export CCTRAY_URL=https://builds.apache.org/cc.xml
lein ring server
```

# Config

All configuration variables are read from the environment (see http://12factor.net/config). 
Under *nix operating systems you can use the `export` command and under Windows the `set` command to easily set this values in a start up script.

Name              | Required? | Default Value | Description | Example
------------------|-----------|---------------|-------------|---------
CCTRAY_URL        | Yes       | N/A           | The absolute url to the cctray.xml file to parse | https://builds.apache.org/cc.xml
INCLUDED_PROJECTS | No        | All projects  | A comma separated list of projects to include, this list is matched against the sentanceized project name and may include regular expressions | "foo service, .\*environment, test.\*" 
EXCLUDED_PROJECTS | No        | None          | A comma separated list of projects to exclude, this list is matched against the sentanceized project name and may include regular expressions | "sandbox environment, test external stuff"

# Contributing

## CC Tray XML Spec

See https://github.com/robertmaldon/cc_dashboard/blob/master/README.md#summary

## TODO

* Themeable - Zero broken/building builds screen (http-status-cats, keep calm and keep committing, Days since last accident)
* Themeable - Build status change noises
* D3 screen

## License

Copyright © 2014 Ste Cowley, Joe Wright and friends (insert your name here!)

Distributed under the Eclipse Public License either version 1.0 or (at
your option) any later version.
