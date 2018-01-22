#!/bin/bash -eu

versionFile="./src/client/version.json"

version=$(cat ${versionFile} | jq -r '.version')
versionMeta=$(cat ${versionFile} | jq -r '.versionMeta')
commitHash=$(cat ${versionFile} | jq -r '.commitHash')
versionName=$(cat ${versionFile} | jq -r '.versionName')

echo "export VERSION=\"$version\"" >> $BASH_ENV
echo "export VERSION_META=\"$versionMeta\"" >> $BASH_ENV
echo "export COMMIT_HASH=\"$commitHash\"" >> $BASH_ENV
echo "export VERSION_NAME=\"$versionName\"" >> $BASH_ENV
echo "export FULL_VERSION=\"$version+$versionMeta.$commitHash\"" >> $BASH_ENV
