#!/bin/sh -l

set -e

cd ./lib/octicons_gem

ls ../build

echo "**************** Copying assets files to build directory ****************"
cp -R ../build/ .

echo "**************** Installing ****************"
bundle install

echo "**************** Linting ****************"
bundle exec rubocop

echo "**************** Testing  ****************"
bundle exec rake
