#!/bin/sh -l

set -e

cd ./lib/octicons_node

echo "**************** Copying assets files to build directory ****************"
cp -R ../build/ .

echo "**************** npm install ****************"
npm ci

echo "**************** Testing  ****************"
npm run test
