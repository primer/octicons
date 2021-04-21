#!/bin/bash -l

set -e

PACKAGE_VERSION=$(jq '.version' --raw-output ./package.json)

PACKAGE_VERSION=$(echo $PACKAGE_VERSION | sed -e 's/^0\.0\.0./0.0.0.pre./g')
PACKAGE_VERSION=$(echo $PACKAGE_VERSION | sed -e 's/-rc/.pre/g')

echo "************* Building v$PACKAGE_VERSION *************"

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

perl -pi -e "s/\"octicons\", \"[^\"]+\"/\"octicons\", \"${PACKAGE_VERSION}\"/" ./Gemfile ./*.gemspec

echo "**************** Installing ****************"
bundle install

echo "**************** Versioning ****************"
bundle exec rake version\["$PACKAGE_VERSION"\]

bundle update

echo "**************** Building ****************"
(bundle exec rake build; gem push pkg/*.gem) && wait
