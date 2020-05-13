const webpack = require('webpack');
const packageInfo = require('./package.json');

const config = {

    mode: 'development',

    devtool: 'inline-sourcemap',

    context: `${__dirname}/tiny`,

    entry:
    {
        'tiny': './index.js',
        'plugins': './plugins.js',
        'pack': './pack.js',
    },

    output:
    {
        path: `${__dirname}/examples/`,
        filename: `[name].js`
    },

    plugins: [
        // new webpack.DefinePlugin(
        // {
        //     _VERSION_: '"' + packageInfo.version + '"',
        // })
    ],

    stats:
    {
        colors: true
    }
};

module.exports = config;