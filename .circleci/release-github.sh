#!/bin/bash -eu

body="### New Features\r\n\r\n### Closed Bugs\r\n\r\n### Improvements\r\n\r\n### Misc\r\n"

echo "Creating a GitHub release with tag [${VERSION}] and name [${VERSION_NAME}]"

responseJson=$(curl \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  https://api.github.com/repos/build-canaries/nevergreen/releases \
  -d "{\"tag_name\": \"v${VERSION}\", \"target_commitish\": \"main\", \"name\": \"${VERSION_NAME}\", \"body\": \"${body}\", \"draft\": true, \"prerelease\": false}" \
  https://api.github.com/repos/build-canaries/nevergreen/releases)

echo "Got response [${responseJson}]"

uploadUrl=$(echo ${responseJson} | jq -r '.upload_url' | sed "s|{?name,label}||")

echo "Adding the nevergreen-standalone.jar as an asset using URL [${uploadUrl}]"

curl \
  -X POST \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -H "Content-Type: application/zip" \
  --data-binary '@./target/nevergreen-standalone.jar' \
  "${uploadUrl}?name=nevergreen-standalone.jar"
