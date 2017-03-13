#!/bin/bash -e

mkdir -p ${CIRCLE_TEST_REPORTS}/client/
mv ./target/client/*.xml ${CIRCLE_TEST_REPORTS}/client

mkdir -p ${CIRCLE_TEST_REPORTS}/server/
mv ./target/surefire-reports/*.xml ${CIRCLE_TEST_REPORTS}/server
