# build-monitor-clj

A Clojure application designed to run an interesting build monitor.

It uses the *cctray.xml* format which is supported by nearly all CI servers. (I'm looking at you Bamboo)

See a demo at http://build-monitor-clj.herokuapp.com

## CC Tray XML

See https://github.com/robertmaldon/cc_dashboard/blob/master/README.md#summary

## TODO

* Connect to cctray.xml on real server
* Config via environment variables (see http://12factor.net/config)
* Themeable - Zero broken/building builds screen (http-status-cats, keep calm and keep committing, Days since last accident)
* Themeable - Build status change noises
* D3 screen

## License

Copyright © 2014 Ste Cowley, Joe Wright and friends (insert your name here!)

Distributed under the Eclipse Public License either version 1.0 or (at
your option) any later version.
