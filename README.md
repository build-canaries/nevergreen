# Nevergreen [![Build Status](https://snap-ci.com/build-canaries/nevergreen/branch/master/build_image)](https://snap-ci.com/build-canaries/nevergreen/branch/master)

### An interesting build monitor.

See a demo at [http://nevergreen.herokuapp.com](http://nevergreen.herokuapp.com)

you can use https://builds.apache.org/cc.xml as a test cctray xml

# CCTray default locations

You can find your *cctray.xml* in these locations  

* GO - http://servername:8154/go/cctray.xml
* CruiseControl.rb - http://cc.rb.servername:3333/XmlStatusReport.aspx
* CruiseControl - http://cc.java.servername:8080/cctray.xml
* CruiseControl.NET - http://cc.net.servername/XmlStatusReport.aspx
* Jenkins - http://jenkins.servername:8080/cc.xml
* Hudson - http://hudson.servername:8080/cc.xml
* Travis CI - http://travis-ci.org/ownername/repositoryname/cc.xml
* tddium - - http://api.tddium.com/cc/long_uuid_string/cctray.xml

## How to Run

Nevergreen runs on port 5000 (by default).

```
lein run
```

## Config

The port is configured as an environment variable named `PORT`. This is defaulted to 5000.
Under *nix operating systems you can use the `export` command and under Windows the `set` command to easily set this value in a start up script.

When the application starts using a web browser navigate to `http://localhost:PORT`. This will check if the cctray url and a list of included projects has been set. If either have not been set it will redirect you to `http://localhost:PORT/config.html` here you are able to enter the cctray url and select the projects to show on the monitor. Once you have done this if you navigate back to `http://localhost:PORT` you will see your lovely monitor in action.

## Heroku deployment

If you are with the team you can deploy to Heroku after adding this remote

`git remote add heroku git@heroku.com:nevergreen.git`

## Contributing

If you would like to add a feature/fix a bug for us please create a pull request.

## CC Tray XML Spec

See https://github.com/robertmaldon/cc_dashboard/blob/master/README.md#summary

## License

Copyright © 2014 Build Canaries and friends

Distributed under the Eclipse Public License either version 1.0 or (at your option) any later version.
