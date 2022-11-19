const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {

    mode: 'production',

    context: `${__dirname}/src`,

    entry:
    {

        // 'asset-loader': './asset-loader/AssetLoader.js',
        // 'three-ui': './three-ui/ThreeUI.js',

        'tiny': './index.js',
        'tiny.mini': './mini.js',
        'tiny.base': './base.js',
        // 'plugins': './plugins.js',
        // 'particles_pack': './particles_pack.js',
        // 'three/base': './three/base.js',
        // 'three/mini': './three/mini.js',
        // 'three/standard': './three/standard.js',
        // 'three/tiny': './three/index.js',
    },

    output:
    {
        path: `${__dirname}/build/`,
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