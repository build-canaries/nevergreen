#!/bin/bash -e

# deploy to staging
scp -i /var/go/nevergreen_rsa ./target/nevergreen-standalone.jar nevergreen@nevergreen.io:/home/nevergreen/deploy/staging
ssh -i /var/go/nevergreen_rsa nevergreen@nevergreen.io "sudo /etc/init.d/nevergreen-staging restart"

# smoke test
./ci/smoke-test.sh https://staging.nevergreen.io/api/ping

# notify users
./ci/notify-new-release.sh  https://staging.nevergreen.io/admin/push-msg
