#!/bin/bash -euo pipefail

metaFile="./resources/version_meta.txt"

echo "updating version meta with commit hash [$COMMIT_HASH] and build number [$BUILD_NUM] in file [$metaFile] ..."
echo -n "$BUILD_NUM.$COMMIT_HASH" > ${metaFile}
