#!/bin/bash -eu

versionFile="./resources/version.txt"
metaFile="./resources/version_meta.txt"

version=$(cat ${versionFile})
versionMeta=$(cat ${metaFile})

echo "export CYPRESS_BASE_URL=\"https://staging.nevergreen.io\"" >> $BASH_ENV
echo "export CYPRESS_TRAY_URL=\"https://raw.githubusercontent.com/build-canaries/nevergreen/master/ci_stub_server/cctray.xml\"" >> $BASH_ENV
echo "export CYPRESS_TRAY_USERNAME=\"\"" >> $BASH_ENV
echo "export CYPRESS_TRAY_PASSWORD=\"\"" >> $BASH_ENV
echo "export CYPRESS_FULL_VERSION=\"$version+$versionMeta\"" >> $BASH_ENV
