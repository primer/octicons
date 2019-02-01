#!/bin/bash -l

set -e

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

# Setup rubygems creds
mkdir -p ~/.gem
cat << EOF > ~/.gem/credentials
---
:rubygems_api_key: ${RUBYGEMS_TOKEN}
EOF
chmod 0600 ~/.gem/credentials

cd ./lib/$*

echo "**************** Copying assets files to build directory ****************"
cp -R ../build lib/

echo "**************** Installing ****************"
bundle install

echo "**************** Linting ****************"
bundle exec rake lint

echo "**************** Testing  ****************"
bundle exec rake test

echo "**************** Versioning ****************"
bundle exec rake version\["$PACKAGE_VERSION"\]

echo "**************** Building ****************"
(bundle exec rake build; gem push pkg/*.gem) && wait
