'use strict';

var fs = require('fs');
var _package = require('./.package.json');
delete _package.devDependencies;
delete _package.scripts;
var content = JSON.stringify(_package, null, 2);
fs.writeFileSync('./package.json', content, 'utf-8');
