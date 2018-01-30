FROM openjdk:8-jre-alpine

MAINTAINER Manasi Kulkarni <mkulkarn@thoughtworks.com>, Stephen Cowley <ste@thoughtworks.com>, Joe Wright <joe@joejag.com>, Christopher Martin

ARG VERSION 

RUN wget https://github.com/build-canaries/nevergreen/releases/download/$VERSION/nevergreen-standalone.jar

EXPOSE 5000

CMD ["java", "-jar", "nevergreen-standalone.jar"]
