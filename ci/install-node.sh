#!/bin/bash -u

echo "downloading nvm"
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

echo "sourcing '$HOME/.nvm/nvm.sh'"
. ~/.nvm/nvm.sh

echo "installing node"
nvm install
