FROM openjdk:8-jre-alpine

MAINTAINER Manasi Kulkarni <mkulkarn@thoughtworks.com>, Stephen Cowley <ste@thoughtworks.com>, Joe Wright <joe@joejag.com>, Christopher Martin

RUN adduser -D -g '' nevergreenuser

USER nevergreenuser

WORKDIR /home/nevergreenuser

COPY target/nevergreen-standalone.jar nevergreen-standalone.jar

EXPOSE 5000

CMD java \
    -Duser.timezone="UTC" \
    -XX:+UnlockExperimentalVMOptions \
    -XX:+UseCGroupMemoryLimitForHeap \
    -XX:MaxRAMFraction=1 \
    -jar "nevergreen-standalone.jar"
