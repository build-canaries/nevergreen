#!/bin/bash -e

# Script take from https://github.com/chronogolf/circleci-google-chrome Copyright (c) 2016 Chronogolf

curl -L -o google-chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome.deb
sudo sed -i 's|HERE/chrome\"|HERE/chrome\" --disable-setuid-sandbox|g' /opt/google/chrome/google-chrome
rm google-chrome.deb
