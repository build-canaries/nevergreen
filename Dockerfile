FROM azul/zulu-openjdk-alpine:21.0.2-jre

MAINTAINER Build Canaries <team@nevergreen.io>

RUN adduser -D -g '' nevergreenuser

USER nevergreenuser

WORKDIR /home/nevergreenuser

COPY target/nevergreen-standalone.jar nevergreen-standalone.jar

EXPOSE 5000

CMD java \
    --illegal-access=deny \
    -Duser.timezone="UTC" \
    -jar "nevergreen-standalone.jar"
