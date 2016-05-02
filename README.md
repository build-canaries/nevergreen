# Nevergreen

Nevergreen is a build monitor with attitude. It has two distinct features that set it apart:

* Your builds should always be green. Nevergreen understands this and only shows you jobs that have failed or are building.
* Nevergreen uses HTML localStorage. So the config is stored in your web browser. You only need to run it once to host hundreds of different build monitors.

Get started by visiting [nevergreen.io](https://nevergreen.io) or [run it locally](https://github.com/build-canaries/nevergreen/wiki/running-locally)!

![Example of Nevergreen on Apache builds](doc/screenshot.png)

## Getting started

On the [tracking page](https://nevergreen.io/#/tracking) enter the url of your [cctray xml](https://github.com/build-canaries/nevergreen/wiki/find-cctray).

Additional help and information can be found on the [help page](https://nevergreen.io/help) of Nevergreen or in the [wiki](https://github.com/build-canaries/nevergreen/wiki).

Already using Nevergreen? Please help us out by taking this [short usage survey](https://build-canaries.github.io/2015/09/14/nevergreen-survey.html).

## Build status

|   | Status |
|---|---|
| CI     | [![Build Status](https://snap-ci.com/build-canaries/nevergreen/branch/master/build_image)](https://snap-ci.com/build-canaries/nevergreen/branch/master) |
| Server | [![Clojure Dependencies Status](http://jarkeeper.com/build-canaries/nevergreen/status.svg)](http://jarkeeper.com/build-canaries/nevergreen) |
| Client | [![Javascript Dependencies Status](https://david-dm.org/build-canaries/nevergreen.svg)](https://david-dm.org/build-canaries/nevergreen) |

We are usually hanging out on [chat](https://gitter.im/build-canaries/nevergreen) if you have any questions or comments.
[![Join the chat at https://gitter.im/build-canaries/nevergreen](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/build-canaries/nevergreen?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Contributing

You can run nevergreen locally by just running the ```develop.sh``` script. For more info see the [Contributing](https://github.com/build-canaries/nevergreen/wiki/contributing) section of our wiki.

If you would like to add a feature/fix a bug for us please create a pull request.

## License

Copyright © 2015 Build Canaries

Distributed under the Eclipse Public License either version 1.0 or (at your option) any later version.
