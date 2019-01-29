#!/bin/sh -l

cd "$1"

bundle show --paths

sh -c "bundle $2"
