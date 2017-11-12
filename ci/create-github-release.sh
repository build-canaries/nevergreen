#!/usr/bin/env bash -e

version=$(cat ./package.json | jq -r '.version')
versionName=$(cat ./package.json | jq -r '.versionName')
body="### New Features\r\n\r\n### Closed Bugs\r\n\r\n### Improvements\r\n"

echo "Creating a GitHub release with tag [${version}] and name [${versionName}]"

curl -v \
  -X POST \
  -u ${GITHUB_USERNAME}:${GITHUB_TOKEN} \
  -H "Content-Type: application/vnd.github.v3+json" \
  -d "{\"tag_name\": \"v${version}\", \"target_commitish\": \"master\", \"name\": \"${versionName}\", \"body\": \"${body}\", \"draft\": true, \"prerelease\": false}" \
  https://api.github.com/repos/build-canaries/nevergreen/releases
