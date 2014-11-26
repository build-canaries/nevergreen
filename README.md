# Nevergreen [![Build Status](https://snap-ci.com/build-canaries/nevergreen/branch/master/build_image)](https://snap-ci.com/build-canaries/nevergreen/branch/master)

### An interesting build monitor.

Nevergreen is awesome for two reasons

* Your builds should always be green. Nevergreen understands this and only shows you failed and builing builds. 
* Nevergreen uses HTML localStorage. So you only need to run it once to provide hundreds of build monitors.

Check the demo at [http://nevergreen.herokuapp.com](http://nevergreen.herokuapp.com). You can use https://builds.apache.org/cc.xml as a test cctray xml

## How to run

If your CI server is sharing it's cctray on the web you can use [http://nevergreen.herokuapp.com](http://nevergreen.herokuapp.com)

If you'd like to run it yourself, or have an internal network hosted CI then you can run the jar file:

```
wget https://github.com/build-canaries/nevergreen/releases/download/v0.1.0/nevergreen-standalone.jar
java -jar nevergreen-standalone.jar
```
Nevergreen runs on Port 5000 by default. You can change this with the PORT env var if you wish.

# Finding your CCTray xml

You can find your *cctray.xml* in these locations  

* Jenkins - http://jenkins.servername:8080/cc.xml
* Hudson - http://hudson.servername:8080/cc.xml
* Travis CI - http://travis-ci.org/ownername/repositoryname/cc.xml
* GO - http://servername:8154/go/cctray.xml
* CruiseControl.rb - http://cc.rb.servername:3333/XmlStatusReport.aspx
* CruiseControl - http://cc.java.servername:8080/cctray.xml
* CruiseControl.NET - http://cc.net.servername/XmlStatusReport.aspx
* tddium - - http://api.tddium.com/cc/long_uuid_string/cctray.xml

## Config

When the application starts using a web browser navigate to `http://localhost:PORT`. This will check if the cctray url and a list of included projects has been set. If either have not been set it will redirect you to `http://localhost:PORT/config.html` here you are able to enter the cctray url and select the projects to show on the monitor. Once you have done this if you navigate back to `http://localhost:PORT` you will see your lovely monitor in action.

## Contributing

If you would like to add a feature/fix a bug for us please create a pull request.

## License

Copyright © 2014 Build Canaries and friends

Distributed under the Eclipse Public License either version 1.0 or (at your option) any later version.
