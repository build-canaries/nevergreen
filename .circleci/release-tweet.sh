#!/bin/bash -eu

status="Nevergreen v${VERSION} ${VERSION_NAME} has been released! Find out more from https://github.com/build-canaries/nevergreen"

echo "${status}"

#curl -v \
#  -X POST \
#  -u${TWITTER_USERNAME}:${TWITTER_PASSWORD} \
#  -d status="${status}" \
#  "https://api.twitter.com/1.1/statuses/update.json"
