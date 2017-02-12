#!/bin/bash -e

# deploy to production
scp ./target/nevergreen-standalone.jar nevergreen@nevergreen.io:/home/nevergreen/deploy/production
ssh nevergreen@nevergreen.io "sudo service nevergreen restart"

# smoke test
./ci/smoke-test.sh https://nevergreen.io/api/ping
