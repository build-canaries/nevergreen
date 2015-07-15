#!/bin/bash -e

echo
echo "This script can be used to update the version number in all the required files."
echo "It's very hacky and a better method should be found!"
echo

read -p "major? [a number] " major
read -p "minor? [a number] " minor
read -p "revision? [a number] " revision
read -p "pre-release? [y/n] " pre
echo "Leave the following values blank if they haven't changed since the last release"
read -p "name? [string] " name
read -p "colour? [hex value e.g. #000000] " hex

case $pre in
    [Yy]* ) pre='-alpha';;
    [Nn]* ) pre='';;
esac

version="$major.$minor.$revision$pre"

echo "Updating to version $version $name ..."

echo "Updating file ./src/nevergreen/api/routes.clj ..."
sed -i '' "s|{:body \"[^\"]*\"}|{:body \"$version\"}|" ./src/nevergreen/api/routes.clj

echo "Updating file ./project.clj ..."
sed -i '' "s|defproject nevergreen \"[^\"]*\"|defproject nevergreen \"$version\"|" ./project.clj

echo "Updating file ./package.json ..."
sed -i '' "s|\"version\": \"[^\"]*\"|\"version\": \"$version\"|" ./package.json

if [ -z "$pre" ]
then
    echo "Updating file ./src/nevergreen/app/routes.clj ...";
    sed -i '' "s|releases/download/[^/]*/|releases/download/v$version/|" ./src/nevergreen/app/routes.clj;
else
    echo "Skipping file ./src/nevergreen/app/routes.clj as pre-release is true"
fi

echo "Updating file ./src/js/views/general/menu.jsx ..."
sed -i '' "s|<p id='version-number'>[^<]*<|<p id='version-number'>v$version<|" ./src/js/views/general/menu.jsx

if [ -z "$name" ]
then
    echo "Skipping updating name in file ./src/js/views/general/menu.jsx as name was blank"
else
    sed -i '' "s|<p id='version-name'>[^<]*<|<p id='version-name'>$name<|" ./src/js/views/general/menu.jsx
fi

if [ -z "$hex" ]
then
    echo "Skipping file ./src/scss/base/_variables.scss as colour was blank"
else
    echo "Updating file ./src/scss/base/_variables.scss ..."
    sed -i '' "s|\$version.*|\$version: $hex\;|" ./src/scss/base/_variables.scss
fi
