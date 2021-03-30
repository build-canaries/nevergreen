#!/bin/bash -eu

echo "deploying to staging"
scp ./target/nevergreen-standalone.jar nevergreen@35.176.75.186:/home/nevergreen/deploy/staging
ssh nevergreen@35.176.75.186 "sudo /bin/systemctl restart nevergreen-staging-1"
