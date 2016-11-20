#!/bin/bash

# =========
# Constants
# =========
 
BIN="./node_modules/.bin"
NODE_ENV="production"
FILES="public views env.js index.js"

# ====================
# Clean previous build
# ====================

if [ -f "release.tar.gz" ]; then
	rm release.tar.gz
fi

# =============
# Build project
# =============

# run gulp build
${BIN}/gulp build

# backup package.json
mv package.json .package.json

# make production version of package.json
node package.js

# make tar.gz archive
tar -zcvf release.tar.gz public views env.js index.js package.json yarn.lock

# clean after-release files
rm -rf public views rev-manifest.json package.json

# put back package.json
mv .package.json package.json
