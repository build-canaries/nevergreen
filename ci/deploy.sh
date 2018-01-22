#!/bin/bash -eu

echo "deploying to staging"
scp ./target/nevergreen-standalone.jar nevergreen@nevergreen.io:/home/nevergreen/deploy/staging
ssh nevergreen@nevergreen.io "sudo service nevergreen-staging restart"
