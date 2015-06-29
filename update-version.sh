#!/bin/bash -e

echo
echo "This script can be used to update the version number in all the required files."
echo "It's very hacky and a better method should be found!"
echo

read -p "major? " major
read -p "minor? " minor
read -p "revision? " revision
read -p "name? " name
read -p "hex value? " hex

version="$major.$minor.$revision"

echo "Updating to version $version $name ..."

echo "Updating file ./resources/public/index.html ... "
sed -i '' "s|data-version-major=\"[^\"]*\"|data-version-major=\"$major\"|" ./resources/public/index.html
sed -i '' "s|data-version-minor=\"[^\"]*\"|data-version-minor=\"$minor\"|" ./resources/public/index.html
sed -i '' "s|data-version-revision=\"[^\"]*\"|data-version-revision=\"$revision\"|" ./resources/public/index.html

echo "Updating file ./project.clj ..."
sed -i '' "s|defproject nevergreen \"[^\"]*\"|defproject nevergreen \"$version\"|" ./project.clj

echo "Updating file ./package.json ..."
sed -i '' "s|\"version\": \"[^\"]*\"|\"version\": \"$version\"|" ./package.json

echo "Updating file ./src/nevergreen/app/routes.clj ..."
sed -i '' "s|releases/download/[^/]*/|releases/download/v$version/|" ./src/nevergreen/app/routes.clj

echo "Updating file ./src/js/views/general/menu.jsx ..."
sed -i '' "s|<p id='version-number'>[^<]*<|<p id='version-number'>v$version<|" ./src/js/views/general/menu.jsx
sed -i '' "s|<p id='version-name'>[^<]*<|<p id='version-name'>$name<|" ./src/js/views/general/menu.jsx

echo "Updating file ./src/scss/base/_variables.scss ..."
sed -i '' "s|\$version.*|\$version: $hex\;|" ./src/scss/base/_variables.scss
