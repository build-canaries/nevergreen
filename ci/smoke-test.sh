#!/bin/bash -u

expectedVersion=${FULL_VERSION}

url="$HOST/api/version"
version='unknown'

echo "running smoke test using url [$url] with expected version [$expectedVersion]"

attempts=0
while [ ${attempts} -lt 10 ]; do
  version=$(curl -s -f -k --connect-timeout 10 -m 5 ${url})

  if [ "${expectedVersion}" == "${version}" ]
  then
    echo
    echo "smoke test success, version [${version}] was deployed"
    exit 0
  fi

  if [ "${version}" != "" ]
  then
    echo
    echo "smoke test failed, got version [${version}] but was expecting [${expectedVersion}]"
    exit 1
  else
    echo -ne "."
  fi

  sleep 1
  attempts=$((attempts+1))
done

echo
echo "smoke test failed, the server did not respond after ~10 seconds"
exit 1
