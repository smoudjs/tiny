
const TerserPlugin = require("terser-webpack-plugin");

const config = {

    mode: 'production',

    context: `${__dirname}/src`,

    entry: {
        'tiny': './index.js',
        'tiny.mini': './mini.js',
        'tiny.base': './base.js'
    },

    output: {
        path: `${__dirname}/build/`,
        filename: `[name].js`,
        environment: {
            arrowFunction: false,
        }
    },

    performance: {
        hints: false
    },

    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            include: /\.js$/,
            parallel: true,
            terserOptions:
            {
                sourceMap: false,
                compress: true,
                ie8: false,
                ecma: 5,
                output:
                {
                    comments: false
                },
                warnings: false
            }
        })],
    },

    plugins: [],

    stats: {
        colors: true
    }
};

module.exports = config;