# Nevergreen

Nevergreen is a build monitor with attitude. It has two distinct features that set it apart:

* Your builds should always be green. Nevergreen understands this and only shows you jobs that have failed or are building.
* Nevergreen uses HTML local storage, so config is stored in your web browser. You only need to run it once to host hundreds of different build monitors.

![Example of Nevergreen on Apache builds](doc/screenshot.png)

## How do I start monitoring my builds?

You can [try hosted Nevergreen](https://nevergreen.io) at `nevergreen.io` and if you like what you see we'd recommend 
[running it locally](https://github.com/build-canaries/nevergreen/wiki/running-locally).

Once loaded add the URL of your CCTray XML on the tracking page, select which projects you'd like to track then head to 
the monitor page to see their current status!

### How can I find my CCTray XML URL?

More information about how to get the CCTray XML for your CI server can be found on the 
[Nevergreen wiki finding your CCTray XML](https://github.com/build-canaries/nevergreen/wiki/find-cctray) page.

### How can I get more help?

Additional help and information can be found on the help page of Nevergreen or in the [Nevergreen wiki](https://github.com/build-canaries/nevergreen/wiki).

You can also tweet to the [@BuildCanaries](https://twitter.com/BuildCanaries) on Twitter.

## Already using Nevergreen?

If you're already using Nevergreen please help us out by taking this [short usage survey](https://build-canaries.github.io/2015/09/14/nevergreen-survey.html), thanks!

## I want to fix a bug / add a feature / contribute!

You can run Nevergreen from source using the `./develop.sh` script. For more detailed information about running from
source please see the [contributing section of the wiki](https://github.com/build-canaries/nevergreen/wiki/contributing).

Please help us out by submitting a PR with any changes. We also keep a list of bugs / improvements / features using
[GitHub issues](https://github.com/build-canaries/nevergreen/issues), if you're looking for some inspiration.

## Build status

|   | Status |
|---|---|
| CI     | [![CircleCI](https://circleci.com/gh/build-canaries/nevergreen.svg?style=shield)](https://circleci.com/gh/build-canaries/nevergreen) |
| Server | [![Clojure Dependencies Status](http://jarkeeper.com/build-canaries/nevergreen/status.svg)](http://jarkeeper.com/build-canaries/nevergreen) |
| Client | [![Javascript Dependencies Status](https://david-dm.org/build-canaries/nevergreen.svg)](https://david-dm.org/build-canaries/nevergreen) |
| Compliance | [![Dependency Status](https://dependencyci.com/github/build-canaries/nevergreen/badge)](https://dependencyci.com/github/build-canaries/nevergreen) |

## License

Copyright © 2017 Build Canaries

Distributed under the Eclipse Public License either version 1.0 or (at your option) any later version.
