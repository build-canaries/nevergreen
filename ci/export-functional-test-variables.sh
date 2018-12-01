#!/bin/bash -eu

versionFile="./resources/version.txt"
metaFile="./resources/version_meta.txt"

version=$(cat ${versionFile})
versionMeta=$(cat ${metaFile})

echo "export CYPRESS_BASE_URL=\"https://staging.nevergreen.io\"" >> $BASH_ENV
echo "export CYPRESS_TRAY_URL=\"https://drive.google.com/uc?export=download&id=0BzdMs1jfanaARkJJX1VRR2QtdTA\"" >> $BASH_ENV
echo "export CYPRESS_TRAY_USERNAME=\"u\"" >> $BASH_ENV
echo "export CYPRESS_TRAY_PASSWORD=\"p\"" >> $BASH_ENV
echo "export CYPRESS_FULL_VERSION=\"$version+$versionMeta\"" >> $BASH_ENV
