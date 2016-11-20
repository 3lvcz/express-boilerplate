'use strict';

const gulp = require('gulp');
const combine = require('stream-combiner2').obj;
const {dev, prod} = require('../env');

module.exports = ($$, _if, manifest) =>
    gulp.src('./src/styles/index.styl')
        .pipe($$.plumber({
            errorHandler: $$.notify.onError(err => ({
                title: 'Styles',
                message: err.message
            }))
        }))
        .pipe(_if(dev, $$.sourcemaps.init()))
        .pipe($$.stylus({
            'include css': true
            /*define: { url: stylus.resolver() }*/
        }))
        .pipe(_if(prod, combine(
            $$.revReplace({
                manifest: gulp.src(manifest, {allowEmpty: true})
            }),
            $$.cleanCss()
        )))
        .pipe($$.rename('app.css'))
        .pipe(_if(prod, $$.rev()))
        .pipe(_if(dev, $$.sourcemaps.write())) // or before rev() ???
        .pipe(gulp.dest('./public/css'))
        .pipe(_if(prod, combine(
            $$.rev.manifest({ merge: true }),
            gulp.dest('./')
        )));
