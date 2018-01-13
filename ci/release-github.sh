#!/bin/bash -e

version=$(cat ./package.json | jq -r '.version')
versionName=$(cat ./package.json | jq -r '.versionName')
body="### New Features\r\n\r\n### Closed Bugs\r\n\r\n### Improvements\r\n"

echo "Creating a GitHub release with tag [${version}] and name [${versionName}]"

responseJson=$(curl -v \
  -u ${GITHUB_USERNAME}:${GITHUB_TOKEN} \
  -H "Content-Type: application/vnd.github.v3+json" \
  -d "{\"tag_name\": \"v${version}\", \"target_commitish\": \"master\", \"name\": \"${versionName}\", \"body\": \"${body}\", \"draft\": true, \"prerelease\": false}" \
  https://api.github.com/repos/build-canaries/nevergreen/releases)

echo "Got response [${responseJson}]"

uploadUrl=$(echo ${responseJson} | jq -r '.upload_url' | sed "s|{?name,label}||")

echo "Adding the nevergreen-standalone.jar as an asset using URL [${uploadUrl}]"

curl -v \
  -u ${GITHUB_USERNAME}:${GITHUB_TOKEN} \
  -H "Content-Type: application/zip" \
  --data-binary '@./target/nevergreen-standalone.jar' \
  "${uploadUrl}?name=nevergreen-standalone.jar"
