const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const packageInfo = require('./package.json');

const config = {

    mode: 'production',

    context: `${__dirname}/tiny`,

    entry:
    {

        // 'asset-loader': './asset-loader/AssetLoader.js',
        // 'three-ui': './three-ui/ThreeUI.js',

        'tiny': './index.js',
        'mini': './mini.js',
        'base': './base.js',
        'standard': './standard.js',
        'standard_tween': './standard_tween.js',
        'full': './full.js',
        'standard_graphics': './standard_graphics.js',
        'standard_full': './standard_full.js',
        'plugins': './plugins.js',
        'pack': './pack.js',
        // 'three/base': './three/base.js',
        // 'three/mini': './three/mini.js',
        // 'three/standard': './three/standard.js',
        // 'three/tiny': './three/index.js',
    },

    output:
    {
        path: `${__dirname}/lib/`,
        filename: `[name].js`
    },

    performance:
    {
        hints: false
    },

    optimization:
    {
        minimizer: [
            new UglifyJSPlugin(
            {
                include: /\.js$/,
                parallel: true,
                sourceMap: false,
                uglifyOptions:
                {
                    compress: true,
                    ie8: false,
                    ecma: 5,
                    output:
                    {
                        comments: false
                    },
                    warnings: false
                },
                warningsFilter: () => false
            })
        ]
    },

    plugins: [
        // new webpack.DefinePlugin(
        // {
        //     _VERSION_: '"' + packageInfo.version + '"',
        // })

        //new UglifyJSPlugin()
        //new webpack.BannerPlugin({ banner: banner, raw: true }),
    ],

    stats:
    {
        colors: true
    }
};

module.exports = config;