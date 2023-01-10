#!/bin/bash
set -eo pipefail

echo "Launching nevergreen..."
docker run -d --rm --init -p 5000:5000 nevergreen

echo "Head to http://localhost:5000"