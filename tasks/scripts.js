'use strict';

const node_path = require('path');
const gulp = require('gulp');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const notifier = require('node-notifier');
const {dev, prod} = require('../env');

module.exports = ($$, _if, manifest) => {
    const config = {
        entry: {
            app: ['babel-polyfill', './src/scripts/index.js']
        },
        output: {
            path: node_path.join(__dirname, '../public/js'),
            publicPath: '/js',
            filename: dev ? '[name].js' : '[name]-[chunkhash:10].js'
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    include: node_path.resolve('./src'),
                    loader: 'babel',
                    query: {
                        presets: ['es2015']
                    }
                }
            ]
        },
        node: {
            'child_process': 'empty',
            'crypto': 'empty',
            'fs': 'empty',
            'http': 'empty',
            'https': 'empty',
            'net': 'empty',
            'os': 'empty',
            'string_decoder': 'empty',
            'vm': 'empty',
            'zlib': 'empty'
        },
        watch: dev,
        devtool: dev ? 'cheap-module-inline-source-map' : null,
        plugins: [
            new webpack.NoErrorsPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(
                    prod ? 'production' : 'development')
            }),
            new webpack.optimize.DedupePlugin()
        ]
    };

    if (prod) {
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                // don't show unreachable variables etc
                warnings: false,
                unsafe: true
            }),
            new AssetsPlugin({
                filename: manifest,
                path: node_path.join(__dirname, '../'),
                processOutput(assets) {
                    for (let key in assets) {
                        assets[key + '.js'] = assets[key].js.slice(config.output.publicPath.length);
                        delete assets[key];
                    }
                    return JSON.stringify(assets, null, ' '.repeat(2));
                }
            }));
    }

    return new Promise((resolve, reject) => {
        webpack(config, (err, stats) => {
            if (!err) { // no hard error
                // try to get a soft error from stats
                err = stats.toJson().errors[0];
            }

            if (err && dev) {
                notifier.notify({
                    title: 'Scripts',
                    message: err.toString()
                });
            }

            // task never errs in watch mode, it waits and recompile
            if (err && !config.watch) {
                reject(err);
                return;
            }

            resolve();
        });
    });
};
