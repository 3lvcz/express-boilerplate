// Load main dependencies.
const fs = require('fs');
const gulp = require('gulp');
const $$ = require('gulp-load-plugins')();
const bs = require('browser-sync').create();
const server = require('gulp-develop-server');
const {config} = require('./package.json');
const env = require('./env').init();

// Load tasks.
const clean = require('./tasks/clean');
const images = require('./tasks/images');
const scripts = require('./tasks/scripts');
const styles = require('./tasks/styles');
const views = require('./tasks/views');

// Declare manifest (used in tasks).
const MANIFEST = 'rev-manifest.json';

// Node server tasks (development only).
gulp.task('server:start', () => {
    server.listen({ path: './index.js' });
    return Promise.resolve();
});

gulp.task('server:watch', () => {
    gulp.watch('./index.js').on('change', () =>
        server.restart(bs.reload));
});

// Browser-sync task (development only).
gulp.task('bsync', () => {
    bs.init({
        ghostMode: false,
        open: false,
        port: config.BS_PORT,
        proxy: `localhost:${config.APP_PORT}`,
        ui: false
    });

    /* watch for builded assets */
    gulp.watch('./public/**/*').on('change', bs.reload);
    gulp.watch('./views/**/*').on('change', bs.reload);
});

gulp.task('build:clean', () => clean($$, $$.if, MANIFEST));
gulp.task('build:images', () => images($$, $$.if, MANIFEST));
gulp.task('build:scripts', () => scripts($$, $$.if, MANIFEST));
gulp.task('build:styles', () => styles($$, $$.if, MANIFEST));
gulp.task('build:views', () => views($$, $$.if, MANIFEST));

/* build assets */
gulp.task('build', gulp.series(
    'build:clean',
    'build:scripts',
    'build:images',
    'build:styles',
    'build:views'
));

/* watch to rebuild assets/views */
gulp.task('watch', () => {
    gulp.watch('./src/styles/**/*.styl', gulp.series('build:styles'));
    gulp.watch('./src/views/**/*.html', gulp.series('build:views'));
});

gulp.task('default', gulp.series(
    'build',
    gulp.parallel('watch', gulp.series(
        'server:start',
        gulp.parallel('server:watch', 'bsync')
    ))
));

function ensureFileSync(path, content = '') {
    let stat = null;

    try { stat = fs.statSync(path); }
    catch (e) { }

    if (stat) {
        if (stat.isFile()) return;
        throw Error(path + ' is not a file!');
    }

    try { fs.writeFileSync(path, content, 'utf-8'); }
    catch (e) { }

    try { stat = fs.statSync(path); }
    catch (e) { }

    if (stat) {
        if (stat.isFile()) return;
        throw Error('cannot create file ' + path);
    }
}
