FROM openjdk:8-jre-alpine

MAINTAINER Manasi Kulkarni <mkulkarn@thoughtworks.com>, Stephen Cowley <ste@thoughtworks.com>, Joe Wright <joe@joejag.com>, Christopher Martin

COPY target/nevergreen-standalone.jar /home/nevergreen-standalone.jar

EXPOSE 5000

CMD ["java", "-jar", "/home/nevergreen-standalone.jar"]
