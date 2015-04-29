# Prerequisites

You'll need the follow tools installed to run locally:

* [Java](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
* [Node](https://nodejs.org/)
* [Leiningen](http://leiningen.org/)

## Mac OSX

These tools can be easily installed on OSX using [Homebrew](http://brew.sh/).

# Run locally

You can run the `develop.sh` script to automatically watch all the sources and run tests, see the script for more
information.

Once you are ready, run the ```pre-push.sh``` which mimics what the CI server will build.

# Releases

Alphabetically using the [Crayola colours](http://en.wikipedia.org/wiki/List_of_Crayola_crayon_colors), but not any green variations naturally!

# Heroku

You will need to specify a buildpack using:

```heroku config:add 'BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git''```

Our instances

```
prod	git@heroku.com:nevergreen.git
staging	git@heroku.com:nevergreen-staging.git
```

# Contributors

* [Christopher Martin](https://github.com/GentlemanHal) - Founder / Developer
* [Ste Cowley](https://github.com/cowley05) - Founder / Developer
* [Joe Wright](https://github.com/joejag) - Founder / Developer
* Doug Stuart - Logo
* [George Gray](https://github.com/mrgeorgegray) - UI
* [Manasi Kulkarni](https://github.com/manasik) - Developer
* [Livingston Samuel](https://github.com/livingston) - UI