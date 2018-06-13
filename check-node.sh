#!/bin/bash -euo pipefail

if [ -f ~/.nvm/nvm.sh ]; then
    echo "nvm.sh found, ensuring the correct version of node is installed"
    . ~/.nvm/nvm.sh
    nvm install
    nvm use
else
    echo "~/.nvm/nvm.sh file not found, using nvm is recommended. See wiki/contributing for more details."
fi

hash npm 2>/dev/null || {
    echo >&2 "npm command not found, you need to install Node. See wiki/contributing for more details.."
    exit 1
}
