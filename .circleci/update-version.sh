#!/bin/bash -eu

metaFile="./resources/version_meta.txt"

BUILD_NUM=$CIRCLE_BUILD_NUM
COMMIT_HASH=${CIRCLE_SHA1:0:7}

echo "updating version meta with commit hash [$COMMIT_HASH] and build number [$BUILD_NUM] in file [$metaFile] ..."
echo -n "$BUILD_NUM.$COMMIT_HASH" > ${metaFile}
