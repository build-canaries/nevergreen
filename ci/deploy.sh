#!/bin/bash -euo pipefail

echo "deploying to staging"
scp ./target/nevergreen-standalone.jar nevergreen@35.176.150.70:/home/nevergreen/deploy/staging
ssh nevergreen@35.176.150.70 "sudo /bin/systemctl restart nevergreen-staging-1"
