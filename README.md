# Nevergreen

Nevergreen is a build monitor with attitude. Continually deliver via fast clear feedback.

- Your builds should always be green. Nevergreen understands this and only shows you projects that have failed or are building
- Nevergreen uses your local browser to store configuration. You only need to run it once to host hundreds of different build monitors
- Nevergreen is fully responsive, it'll look just as good full screen or sharing the space with other dashboards
- You can track as many CI servers as you like, allowing you to easily track dependent builds from other teams

![Example Monitor page](doc/screenshot_monitor.png)

![Example Tracking page](doc/screenshot_tracking.png)

## How do I start monitoring my builds?

You can [try hosted Nevergreen](https://nevergreen.io) at `nevergreen.io` and if you like what you see we'd recommend 
[running it locally](https://github.com/build-canaries/nevergreen/wiki/running-locally).

Once loaded:

1. Add the URL of your CCTray XML feed on the Tracking page
2. Select which projects you'd like to track
3. Head to the Monitor page to see their current status!

### How can I find my CCTray XML feed URL?

More information about how to get the CCTray XML feed for your CI server can be found on the 
[Nevergreen wiki finding your CCTray XML](https://github.com/build-canaries/nevergreen/wiki/find-cctray) page.

### How can I get more help?

- Nevergreen has contextual help, just look for the question mark icon
- [The Nevergreen wiki](https://github.com/build-canaries/nevergreen/wiki)
- [Tweet to @BuildCanaries](https://twitter.com/BuildCanaries) on Twitter
- [Come chat to us on Slack](https://join.slack.com/t/nevergreen/shared_invite/enQtMzc4MDg5MTE2MDE2LWJjYjdiNDM4Y2U1YjBjZTdkZjFhZGQyOTM5ODQ2MzEwZDY4YjNiZDFmOTFlMGUwOWEyMjczNmUzNTlkZDk4ZmQ)

## Already using Nevergreen?

If you're already using Nevergreen please help us out by taking this [short usage survey](https://build-canaries.github.io/2015/09/14/nevergreen-survey.html), thanks!

## I want to fix a bug / add a feature / contribute!

You can run Nevergreen from source using the `./develop.sh` script. For more detailed information about running from
source please see the [contributing section of the wiki](https://github.com/build-canaries/nevergreen/wiki/contributing).

Please help us out by submitting a PR with any changes. We also keep a list of bugs / improvements / features using
[GitHub issues](https://github.com/build-canaries/nevergreen/issues), if you're looking for some inspiration.

## License

Copyright © 2014 - 2018 Build Canaries

Distributed under the Eclipse Public License either version 1.0 or (at your option) any later version.
