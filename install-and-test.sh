#!/bin/sh

dir=$(pwd)
cd "$dir/songs-api" && npm install && npm test .
cd "$dir/songs-client" && npm install && CI=true npm test -- --coverage
# cd "$dir/songs-subscriber" && npm install && npm test