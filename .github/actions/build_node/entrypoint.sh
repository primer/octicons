#!/bin/sh -l

set -e

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

cd ./lib/$*

echo "**************** Copying assets files to build directory ****************"
cp -R ../build/ .

echo "**************** Installing ****************"
npm install

echo "**************** Building ****************"
npm run build

echo "**************** Linting ****************"
npm run lint

echo "**************** Testing  ****************"
npm run test

{
  echo "**************** Publishing ****************"
  npm version $PACKAGE_VERSION && npm publish --access public
} || {
  exit 1
}
