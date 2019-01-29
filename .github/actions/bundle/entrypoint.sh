#!/bin/sh -l

cd "$1"



echp "################## Preparing"
cp -R ../build ./lib

echo "################## Bundle installing"
bundle install

echo "################## Linting"
bundle exec rubocop

echo "################## Running tests"
bundle exec rake

echo "################## All done!"
