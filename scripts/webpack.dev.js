process.env.mode = 'development';
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const Webpack = require('webpack'),
    path = require('path'),
    commonConfig = require('./webpack.common.js'),
    WebpackDevServer = require('webpack-dev-server'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

const isTest = process.argv[2] === '--test';

const DEFINES = {
    __DEV__: JSON.stringify(!isTest)
};

const webpackConfig = {
    mode: 'development',

    devtool: 'inline-source-map',

    resolve: {
        alias: {
            '@smoud/tiny': path.resolve('src')
        }
    },

    watch: true,

    entry: path.resolve(__dirname, '../dev/bunny-mark/index.js'),

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },

    devServer: {
        hot: true,
        port: 3000,
        open: true
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
};

Object.assign(webpackConfig, commonConfig);

webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
        template: path.resolve('dev/index.html')
    })
);
webpackConfig.plugins.push(new Webpack.DefinePlugin(DEFINES));

// Create new Webpack compiler
const compiler = Webpack(webpackConfig);

// Prepare server instance
const server = new WebpackDevServer(webpackConfig.devServer, compiler);

// Run server on port
server.start();

// Export config for further using
module.exports = webpackConfig;
