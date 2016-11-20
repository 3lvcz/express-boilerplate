'use strict';

const del = require('del');
const gulp = require('gulp');

module.exports = ($$, _if, manifest) =>
    del(['public', manifest, 'views']);
