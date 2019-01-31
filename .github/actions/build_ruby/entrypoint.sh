#!/bin/sh -l

set -e

cd ./lib/$*

echo "**************** Copying assets files to build directory ****************"
cp -R ../build lib/

echo "**************** Installing ****************"
bundle install

echo "**************** Building ****************"
# bundle install

echo "**************** Linting ****************"
bundle exec rake lint

echo "**************** Testing  ****************"
bundle exec rake test
