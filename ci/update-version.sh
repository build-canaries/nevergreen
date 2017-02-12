#!/bin/bash -e

echo "Updating commit hash [$COMMIT_HASH] and meta [$BUILD_NUM] in file ./package.json ..."
sed -i.bak "s|\"versionMeta\": \"[^\"]*\"|\"versionMeta\": \"$BUILD_NUM\"|" package.json
sed -i.bak "s|\"commitHash\": \"[^\"]*\"|\"commitHash\": \"$COMMIT_HASH\"|" package.json

find . -type f -name "*.bak" -exec rm -f {} \;
