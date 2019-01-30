#!/bin/sh -l

set -e

cd ./lib/$*

echo "**************** Copying assets files to build directory ****************"
cp -R ../build/ .

echo "**************** Installing ****************"
npm install

echo "**************** Linting ****************"
npm run lint

echo "**************** Testing  ****************"
npm run test
