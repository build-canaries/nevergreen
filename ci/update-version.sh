#!/bin/bash -e

meta="$SNAP_PIPELINE_COUNTER"
hash="$SNAP_COMMIT_SHORT"

echo "Updating commit hash and meta in file ./package.json ..."
sed -i.bak "s|\"versionMeta\": \"[^\"]*\"|\"versionMeta\": \"$meta\"|" package.json
sed -i.bak "s|\"commitHash\": \"[^\"]*\"|\"commitHash\": \"$hash\"|" package.json

find . -type f -name "*.bak" -exec rm -f {} \;
