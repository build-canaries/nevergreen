#!/bin/bash -e

echo
echo "This script can be used to update the version number in all the required files."
echo "It's very hacky and a better method should be found!"
echo

if [ -z "$CI" ]
then
    read -p "major? [a number] " major
    read -p "minor? [a number] " minor
    read -p "revision? [a number] " revision
    echo "Leave the following values blank if they haven't changed since the last release"
    read -p "name? [string] " name
    read -p "colour? [hex value e.g. #000000] " hex
else
    major="$VERSION_MAJOR"
    minor="$VERSION_MINOR"
    revision="$SNAP_PIPELINE_COUNTER"
    name="$VERSION_NAME"
    hex="$VERSION_COLOUR"
    hash="$SNAP_COMMIT_SHORT"
fi

version="$major.$minor.$revision"

echo "Updating to version $version $name ..."

echo "Updating file ./project.clj ..."
sed -i '' -e "s|defproject nevergreen \"[^\"]*\"|defproject nevergreen \"$version\"|" ./project.clj

echo "Updating file ./package.json ..."
sed -i '' -e "s|\"version\": \"[^\"]*\"|\"version\": \"$version\"|" ./package.json

echo "Updating file ./src/js/views/app.jsx ..."
sed -i '' -e "s|versionNumber: '[^']*'|versionNumber: '$version'|" ./src/js/views/app.jsx

if [ -z "$name" ]
then
    echo "Skipping updating name in file ./src/js/views/app.jsx as name was blank"
else
    sed -i '' -e "s|versionName: '[^']*'|versionName: '$name'|" ./src/js/views/app.jsx
fi

if [ -z "$hash" ]
then
    echo "Skipping updating commit hash in file ./src/js/views/app.jsx as hash was blank"
else
    sed -i '' -e "s|commitHash: '[^']*'|commitHash: '$hash'|" ./src/js/views/app.jsx
fi

if [ -z "$hex" ]
then
    echo "Skipping file ./src/scss/base/_variables.scss as colour was blank"
else
    echo "Updating file ./src/scss/base/_variables.scss ..."
    sed -i '' -e "s|\$version.*|\$version: $hex\;|" ./src/scss/base/_variables.scss
fi
