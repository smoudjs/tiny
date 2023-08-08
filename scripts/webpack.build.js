process.env.mode = 'production';
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const Webpack = require('webpack'),
    path = require('path'),
    commonConfig = require('./webpack.common.js'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    TerserPlugin = require('terser-webpack-plugin');

const DEFINES = {
    __DEV__: JSON.stringify(false)
};

const webpackConfig = {
    mode: 'production',

    devtool: false,

    watch: false,

    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    compress: {
                        drop_console: true,
                        arrows: false
                    },
                    output: {
                        comments: false,
                        quote_style: 3
                    }
                }
            })
        ]
    },

    performance: { hints: false },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../build'),
        environment: {
            arrowFunction: false
        }
    }
};

Object.assign(webpackConfig, commonConfig);

webpackConfig.plugins.splice(0, 0, new CleanWebpackPlugin());
webpackConfig.plugins.push(new Webpack.DefinePlugin(DEFINES));

// Create new Webpack compiler
const compiler = Webpack(webpackConfig);

compiler.run(function done(err, stats) {
    if (err || stats.hasErrors()) {
        console.log(err);
    }

    console.log(
        stats.toString({
            colors: true
        })
    );

    console.log('--------- BUILD DONE --------- ');
    // process.exit(0);
});

// Export config for further using
module.exports = webpackConfig;
