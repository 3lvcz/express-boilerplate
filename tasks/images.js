'use strict';

const gulp = require('gulp');
const combine = require('stream-combiner2').obj;
const {dev, prod} = require('../env');

module.exports = ($$, _if, manifest) =>
    gulp.src('./src/images/**/*.{png,jpg,gif}')
        .pipe(_if(prod, combine(
            $$.imagemin(),
            $$.rev({
                base: '/images'
            })
        )))
        .pipe(gulp.dest('./public/images'))
        .pipe(_if(prod, combine(
            $$.rev.manifest({ merge: true }),
            gulp.dest('.')
        )));
