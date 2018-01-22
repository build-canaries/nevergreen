#!/bin/bash -eu

echo "deploying to production"
scp ./target/nevergreen-standalone.jar nevergreen@nevergreen.io:/home/nevergreen/deploy/production
ssh nevergreen@nevergreen.io "sudo service nevergreen-production restart"
ssh nevergreen@nevergreen.io "sudo service nevergreen-failover restart"
