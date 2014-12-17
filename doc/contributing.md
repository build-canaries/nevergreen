Run locally
===========

You can run the `develop.sh` script to automatically watch all the sources and run tests, see the script for more
information.

Once you are ready, run the ```pre-push.sh``` which mimics what the CI server will build.

How to make your own monitor
============================

If you'd like to make your own monitor page then we can provide you with a bare bones page. The page has no styling and
just polls nevergreen.io. You can run it just by opening the file. You don't need anything else, get started with the [mvp monitor](mvp-monitor.html)

The following commands allow you to run it over http:

```
wget https://raw.githubusercontent.com/build-canaries/nevergreen/master/doc/mvp-monitor.html
python -m SimpleHTTPServer
open http://localhost:8000/mvp-monitor.html
```

Releases
=========

Alphabetically using the [Crayola colours](http://en.wikipedia.org/wiki/List_of_Crayola_crayon_colors), but not any green variations naturally!

Heroku
======

You will need to specify a buildpack using:

```heroku config:add 'BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git''```

Our instances

```
prod	git@heroku.com:nevergreen.git
staging	git@heroku.com:nevergreen-staging.git
```