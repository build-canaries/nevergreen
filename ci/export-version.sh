#!/bin/bash -eu

versionFile="./resources/version.txt"
metaFile="./resources/version_meta.txt"
nameFile="./resources/version_name.txt"

version=$(cat ${versionFile})
versionMeta=$(cat ${metaFile})
versionName=$(cat ${nameFile})

echo "export VERSION=\"$version\"" >> $BASH_ENV
echo "export VERSION_META=\"$versionMeta\"" >> $BASH_ENV
echo "export VERSION_NAME=\"$versionName\"" >> $BASH_ENV
echo "export FULL_VERSION=\"$version+$versionMeta\"" >> $BASH_ENV
echo "export CYPRESS_FULL_VERSION=\"$version+$versionMeta\"" >> $BASH_ENV
