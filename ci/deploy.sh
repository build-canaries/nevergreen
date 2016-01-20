#!/bin/bash -e

# deploy to staging
scp -i /var/go/nevergreen_rsa ./target/nevergreen-standalone.jar nevergreen@nevergreen.io:/home/nevergreen/deploy/staging
ssh -i /var/go/nevergreen_rsa nevergreen@nevergreen.io "sudo /etc/init.d/nevergreen-staging restart"

# smoke test
attempts=0
until curl -f https://staging.nevergreen.io/api/ping
do
  if [ ${attempts} -eq 10 ]
  then
    echo "Smoke test failed, the server did not respond to a ping after ~10 seconds"
    exit 1
  fi
  sleep 1
  attempts=$((attempts+1))
done
