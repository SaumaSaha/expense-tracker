#!/bin/bash

# setup pre commits
cp ./bin/pre-commit ./.git/hooks

# install npm packages
npm install

# run tests with coverage
npm run coverage