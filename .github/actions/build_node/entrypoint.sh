#!/bin/bash -l

set -e

printf "//registry.npmjs.org/:_authToken=%s" "$NPM_AUTH_TOKEN_SHARED" > "$HOME/.npmrc"

PACKAGE_VERSION=$(jq '.version' --raw-output ./package.json)

echo "************* Building v$PACKAGE_VERSION *************"

PUBLISH_TAG=latest
if [[ "$PACKAGE_VERSION" =~ ^0\.0\.0\- ]]
then
  PUBLISH_TAG=canary
elif [[ "$PACKAGE_VERSION" =~ \-rc ]]
then
  PUBLISH_TAG=next
fi

cd ./lib/$*

echo "**************** Copying assets files to build directory ****************"
cp -R ../build/ .

echo "**************** Installing ****************"
npm install --legacy-peer-deps

echo "**************** Building ****************"
npm run build

{
  echo "**************** Publishing ****************"
  npm version --allow-same-version $PACKAGE_VERSION && npm publish --tag $PUBLISH_TAG --access public
} || {
  # Bail out of publishing
  exit 0
}
