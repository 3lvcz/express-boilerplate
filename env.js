'use strict';

const assert = require('assert');

module.exports = {
    init(name = 'NODE_ENV') {
        assert(typeof name === 'string', '`name` must be a string.');
        const value = process.env[name];
        const isDev = isDevelopment(value);
        const isProd = !isDev;
        Object.assign(this, {
            dev: isDev,
            isDev: isDev,
            isDevelopment: isDev,

            prod: isProd,
            isProd: isProd,
            isProduction: isProd,

            str: value
        });
        return this;
    }
};

function isDevelopment(str) {
    return str && /dev(elopment)?/i.test(str);
}
