#!/bin/bash
set -eo pipefail

echo "Building nevergreen docker image..."
source "./build.sh"

echo "Launching nevergreen..."
docker run -d --rm --init -p 5000:5000 nevergreen

echo "Done! Head to http://localhost:5000"