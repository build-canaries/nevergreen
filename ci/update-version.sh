#!/bin/bash -e

versionFile="./src/client/version.json"

echo "updating commit hash [$COMMIT_HASH] and meta [$BUILD_NUM] in file $versionFile ..."
sed -i.bak "s|\"versionMeta\": \"[^\"]*\"|\"versionMeta\": \"$BUILD_NUM\"|" ${versionFile}
sed -i.bak "s|\"commitHash\": \"[^\"]*\"|\"commitHash\": \"$COMMIT_HASH\"|" ${versionFile}

find . -type f -name "*.bak" -exec rm -f {} \;
