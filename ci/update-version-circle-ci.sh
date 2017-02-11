#!/bin/bash -e

meta="$CIRCLE_BUILD_NUM"
hash="$CIRCLE_SHA1" | cut -c1-7

echo "Updating commit hash and meta in file ./package.json ..."
sed -i.bak "s|\"versionMeta\": \"[^\"]*\"|\"versionMeta\": \"$meta\"|" package.json
sed -i.bak "s|\"commitHash\": \"[^\"]*\"|\"commitHash\": \"$hash\"|" package.json

find . -type f -name "*.bak" -exec rm -f {} \;
