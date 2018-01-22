#!/bin/bash -u

echo "downloading nvm"
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

echo "sourcing '$HOME/.nvm/nvm.sh'"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "installing node"
nvm install

echo "$NVM_DIR/nvm.sh" >> $BASH_ENV
