#!/bin/bash -eu

echo "Log in to DockerHub"

docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD}

echo "Creating docker image with tag [${VERSION}]"

echo "what is your context currently???????????"
ls -la Dockerfile

echo "docker version is "
docker --version

docker build --build-arg VERSION=${VERSION} -t buildcanariesteam/nevergreen:latest -t buildcanariesteam/nevergreen:${VERSION} .

docker push buildcanariesteam/nevergreen:${VERSION} buildcanariesteam/nevergreen:latest
