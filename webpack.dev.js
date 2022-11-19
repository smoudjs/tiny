const webpack = require('webpack');
const packageInfo = require('./package.json');

const config = {

    mode: 'development',

    devtool: 'inline-sourcemap',

    context: `${__dirname}`,

    entry:
    {
        'tiny': './src/index.js',
        'tiny.mini': './src/mini.js',
        'plugins/extra': './plugins/extra',
        'plugins/particles': './plugins/particles',
        'plugins/three': './plugins/three',
        // 'particles_pack': './particles_pack.js',
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