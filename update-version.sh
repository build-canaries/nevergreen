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
sed "s|defproject nevergreen \"[^\"]*\"|defproject nevergreen \"$version\"|" project.clj > project.clj.tmp && mv project.clj.tmp project.clj

echo "Updating file ./package.json ..."
sed "s|\"version\": \"[^\"]*\"|\"version\": \"$version\"|" package.json > package.json.tmp && mv package.json.tmp package.json

echo "Updating file ./src/js/views/app.jsx ..."
sed "s|versionNumber: '[^']*'|versionNumber: '$version'|" src/js/views/app.jsx > src/js/views/app.jsx.tmp && mv src/js/views/app.jsx.tmp src/js/views/app.jsx

if [ -z "$name" ]
then
    echo "Skipping updating name in file ./src/js/views/app.jsx as name was blank"
else
    sed "s|versionName: '[^']*'|versionName: '$name'|" src/js/views/app.jsx > src/js/views/app.jsx.tmp && mv src/js/views/app.jsx.tmp src/js/views/app.jsx
fi

if [ -z "$hash" ]
then
    echo "Skipping updating commit hash in file ./src/js/views/app.jsx as hash was blank"
else
    sed "s|commitHash: '[^']*'|commitHash: '$hash'|" src/js/views/app.jsx > src/js/views/app.jsx.tmp && mv src/js/views/app.jsx.tmp src/js/views/app.jsx
fi

if [ -z "$hex" ]
then
    echo "Skipping file ./src/scss/base/_variables.scss as colour was blank"
else
    echo "Updating file ./src/scss/base/_variables.scss ..."
    sed "s|\$version.*|\$version: $hex\;|" src/scss/base/_variables.scss > src/scss/base/_variables.scss.tmp && mv src/scss/base/_variables.scss.tmp src/scss/base/_variables.scss
fi
