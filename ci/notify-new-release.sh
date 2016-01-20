#!/bin/bash -e

url=$1
message="A new version v$VERSION_MAJOR.$VERSION_MINOR.$VERSION_PATCH+$SNAP_PIPELINE_COUNTER is available, refresh to update!"

sleep 5 # sleep a little so users browsers can reconnect

curl -u ${ADMIN_USERNAME}:${ADMIN_PASSWORD} -X POST -d "{\"data\":\"$message\"}" -H "Content-Type: application/json" ${url}
