## From the box

- Backend: [Express](https://expressjs.com/), [Nunjucks](https://mozilla.github.io/nunjucks/)
- Frontend: [Gulp 4.0](http://gulpjs.com/), [Webpack](https://webpack.github.io/), [Stylus](http://stylus-lang.com/), [WebFont](https://npmjs.org/packages/webfontloader)
- Development: [BrowserSync](https://npmjs.org/package/browser-sync) (asset onchange reloading) + [GulpDevelopServer](https://npmjs.org/package/gulp-develop-server) (node.js start/onchange reloading), [GulpNotify](https://npmjs.org/package/gulp-notify), [Sourcemaps](https://npmjs.org/packages/gulp-sourcemaps)
- Production: [Asset](https://npmjs.org/packages/gulp-rev) [Revisioning](https://npmjs.org/packages/gulp-rev-replace), [Image Optimization](https://npmjs.org/package/gulp-imagemin)

## Development

`yarn run dev`

or

`npm run dev`

BrowserSync starts at [:8080](https://github.com/3lvcz/express-boilerplate/blob/master/package.json#L32)

## Production build
`./build.sh`

Server starts at [:3000](https://github.com/3lvcz/express-boilerplate/blob/master/package.json#L31)
