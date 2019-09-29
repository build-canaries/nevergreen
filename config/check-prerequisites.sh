#!/bin/bash
set -euo pipefail

if [ -f ~/.nvm/nvm.sh ]; then
    echo "nvm.sh found, using to set the correct version of Node"
    . ~/.nvm/nvm.sh
    nvm install
    nvm use
else
    echo "$HOME/.nvm/nvm.sh file not found, you will need to manually install the correct version of Node. See wiki/contributing for more details."
fi

hash node 2>/dev/null || {
    echo >&2 "node command not found, you need to install Node. See wiki/contributing for more details."
    exit 1
}

if [ -f ~/.jabba/jabba.sh ]; then
    echo "jabba command found, using to set the correct version of Java"
    . ~/.jabba/jabba.sh
    jabba install
    jabba use
else
  echo "jabba command not found, you will need to manually install the correct version of Java. See wiki/contributing for more details."
fi

hash java 2>/dev/null || {
    echo >&2 "java command not found, you need to install Java. See wiki/contributing for more details."
    exit 1
}

java -version

hash circleci 2>/dev/null || {
    echo "circleci command not found, it's recommended to install. See wiki/contributing for more details."
}
