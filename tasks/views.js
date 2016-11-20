'use strict';

const gulp = require('gulp');
const {dev, prod} = require('../env');

module.exports = ($$, _if, manifest) =>
    gulp.src('./src/views/**/*.html')
        .pipe(_if(prod, $$.revReplace({
            manifest: gulp.src(manifest, {allowEmpty: true})
        })))
        .pipe(gulp.dest('./views'));
