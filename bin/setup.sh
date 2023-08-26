#! /bin/bash

# setup pre commits
cp ./bin/pre-commit ./.git/hooks

# making pre commit executable
chmod u+x ./.git/hooks/pre-commit

# install npm packages
npm install

# run tests with coverage
npm run coverage