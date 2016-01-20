#!/bin/bash -e

url=$1

echo "Running smoke test using url [$url]"

attempts=0
until curl -f -s ${url}
do
  if [ ${attempts} -eq 10 ]
  then
    echo "Smoke test failed, the server did not respond to a ping after ~10 seconds"
    exit 1
  fi
  sleep 1
  attempts=$((attempts+1))
done
