# Nevergreen 

Nevergreen is a build monitor with attitude. It is awesome for two reasons:

* Your builds should always be green. Nevergreen understands this and only shows you jobs that have failed or are building. 
* Nevergreen uses HTML localStorage. So the config is local to your web browser. You only need to run it once to host hundreds of different build monitors.

Check out the demo at [http://nevergreen.herokuapp.com](http://nevergreen.herokuapp.com). You can use https://builds.apache.org/cc.xml as a test cctray xml.

## How to run

If your CI server is publishing it's cctray.xml on the web you don't need to install anything. You can just use [http://nevergreen.herokuapp.com](http://nevergreen.herokuapp.com).

If you'd like to run it yourself then you can run the jar file:

```
wget https://github.com/build-canaries/nevergreen/releases/download/v0.1.0/nevergreen-standalone.jar
java -jar nevergreen-standalone.jar
```
Nevergreen runs on Port 5000 by default. You can change this with the PORT environment variable if you wish.

```
PORT=4000 java -jar nevergreen-standalone.jar
```

# Finding your CCTray xml

You can find your *cctray.xml* in these locations  

 CI Server           | Location 
 ------------------- | -----------------------------------------------------
 Jenkins             |  http://jenkins.servername:8080/cc.xml
 Hudson              |  http://hudson.servername:8080/cc.xml
 Travis CI           |  http://travis-ci.org/ownername/repositoryname/cc.xml
 GO                  |  http://servername:8154/go/cctray.xml
 CruiseControl.rb    |  http://cc.rb.servername:3333/XmlStatusReport.aspx
 CruiseControl       |  http://cc.java.servername:8080/cctray.xml
 CruiseControl.NET   |  http://cc.net.servername/XmlStatusReport.aspx
 tddium              |  http://api.tddium.com/cc/long_uuid_string/cctray.xml

## Configuring your own Nevergreen

Navigate to `http://localhost:5000`. If it is the first visit to Nevergreen from a browser then it will redirect you to `http://localhost:5000/config.html`.

You'll need to first put in your cctray url then it will allow you to select which builds to show on your monitor.

## Contributing

[![Build Status](https://snap-ci.com/build-canaries/nevergreen/branch/master/build_image)](https://snap-ci.com/build-canaries/nevergreen/branch/master)

If you would like to add a feature/fix a bug for us please create a pull request.

## License

Copyright © 2014 Build Canaries and friends

Distributed under the Eclipse Public License either version 1.0 or (at your option) any later version.
