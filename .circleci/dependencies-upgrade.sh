#!/bin/bash -eu

echo "updating server dependencies"
./lein.sh ancient upgrade

echo "updating client dependencies"
npm install -g npm-check-updates
npx ncu -u

echo "checking things still work"
./pre-push.sh

TYPE_OF_RUN=${1:-testing} 
if [ $TYPE_OF_RUN == 'push' ]
  then
  echo "pushing changes"
  git add -a .
  git commit -m 'Updating dependencies'
  git push
fi
