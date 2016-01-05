#!/bin/bash -e

major="$VERSION_MAJOR"
minor="$VERSION_MINOR"
patch="$VERSION_PATCH"
meta="$SNAP_PIPELINE_COUNTER"
name="$VERSION_NAME"
hex="$VERSION_COLOUR"
hash="$SNAP_COMMIT_SHORT"

version="$major.$minor.$patch+$meta"

echo "Updating to version $version $name ..."

echo "Updating file ./project.clj ..."
sed -i.bak "s|defproject nevergreen \"[^\"]*\"|defproject nevergreen \"$version\"|" project.clj

echo "Updating file ./package.json ..."
sed -i.bak "s|\"version\": \"[^\"]*\"|\"version\": \"$version\"|" package.json
sed -i.bak "s|\"versionName\": \"[^\"]*\"|\"versionName\": \"$name\"|" package.json
sed -i.bak "s|\"versionColour\": \"[^\"]*\"|\"versionColour\": \"$hex\"|" package.json
sed -i.bak "s|\"commitHash\": \"[^\"]*\"|\"commitHash\": \"$hash\"|" package.json

find . -type f -name "*.bak" -exec rm -f {} \;
