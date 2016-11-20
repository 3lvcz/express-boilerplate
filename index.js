'use strict';

const node_path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');
const {config} = require('./package.json');
const env = require('./env').init();
const app = express();

app.use(express.static(node_path.join(__dirname, 'public')));

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    noCache: env.dev
});

app.get('/', (req, res) => {
    res.render('index.html', {
    	title: 'express-boilerplate'
    });
});

app.listen(config.APP_PORT, () =>
    console.log(`started at :${config.APP_PORT}`));
