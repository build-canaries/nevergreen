#!/bin/bash -eu

echo "Log in to DockerHub"

docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD}

echo "Creating docker image with tag [${VERSION}]"

echo "what is your context currently???????????"
pwd

docker build --build-arg VERSION=${VERSION} -f ~/nevergreen/docker/Dockerfile -t buildcanariesteam/nevergreen:latest -t buildcanariesteam/nevergreen:${VERSION} ~/nevergreen 

docker push buildcanariesteam/nevergreen:${VERSION} buildcanariesteam/nevergreen:latest
