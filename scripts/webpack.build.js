process.env.mode = 'production';
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const Webpack = require('webpack'),
    path = require('path'),
    commonConfig = require('./webpack.common.js'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    TerserPlugin = require('terser-webpack-plugin'),
    { globSync } = require('glob');

const DEFINES = {
    __DEV__: JSON.stringify(false)
};

const files = globSync('./extras/*/index.js', { withFileTypes: true });
const extrasNames = files.map((e) => e.parent.name);
const extras = {};

for (let extra of extrasNames) {
    extras['extras/' + extra] = path.resolve('extras/' + extra + '/index.js');
}

const webpackConfig = {
    mode: 'production',

    devtool: false,

    watch: false,

    entry: {
        ...extras,
        // 'tiny.core': [path.resolve('src/core.js')],
        // 'tiny.app': [path.resolve('src/core.js'), path.resolve('src/app.js')],
        // 'tiny.2d': [
        //     path.resolve('src/core.js'),
        //     path.resolve('src/app.js'),
        //     path.resolve('src/2d.js'),
        //     path.resolve('src/webgl.js')
        // ],
        // 'tiny.3d': [path.resolve('src/core.js'), path.resolve('src/app.js'), path.resolve('src/3d.js')],
        // 'tiny': [
        //     path.resolve('src/core.js'),
        //     path.resolve('src/app.js'),
        //     path.resolve('src/2d.js'),
        //     path.resolve('src/3d.js'),
        //     path.resolve('src/webgl.js')
        // ]
        'tiny.core': path.resolve('src/tiny.core.js'),
        'tiny.app': path.resolve('src/tiny.app.js'),
        'tiny.2d': path.resolve('src/tiny.2d.js'),
        'tiny.3d': path.resolve('src/tiny.3d.js'),
        'tiny': path.resolve('src/tiny.js')
    },

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
        chunkFilename: '[name].chunk.bundle.js',
        path: path.resolve('dist'),
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
