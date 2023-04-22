const Webpack = require('webpack');

const config = {
    mode: 'development',

    devtool: 'inline-source-map',

    context: `${__dirname}`,

    entry: {
        'tiny': './src/index.js',
        'tiny.mini': './src/mini.js',
        'plugins/extra': './plugins/extra',
        'plugins/particles': './plugins/particles',
        'plugins/three': './plugins/three',
        'plugins/create': './plugins/create',
        'plugins/sound': './plugins/sound'
        // 'particles_pack': './particles_pack.js',
    },

    output: {
        path: `${__dirname}/examples/libs/tiny`,
        filename: `[name].js`
    },

    plugins: [
        new Webpack.DefinePlugin({
            __DEBUG__: 'true'
        })
    ],

    stats: {
        colors: true
    }
};

module.exports = config;
