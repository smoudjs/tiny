const Webpack = require('webpack'),
    TerserPlugin = require('terser-webpack-plugin'),
    path = require('path');

const webpackConfig = {
    mode: 'development',
    // watch: true,

    devtool: 'inline-source-map',

    // context: `${__dirname}`,

    entry: {
        'tiny': './src/index.js',
        'tiny.mini': './src/mini.js',
        'plugins/extra': './plugins/extra',
        'plugins/particles': './plugins/particles',
        'plugins/three': './plugins/three',
        'plugins/create': './plugins/create',
        'plugins/sound': './plugins/sound',
        'plugins/anim': './plugins/anim'
        // 'particles_pack': './particles_pack.js',
    },

    // optimization: {
    //     minimize: true,
    //     minimizer: [
    //         new TerserPlugin({
    //             include: /\.js$/,
    //             parallel: true,
    //             terserOptions: {
    //                 sourceMap: false,
    //                 compress: true,
    //                 ie8: false,
    //                 ecma: 5,
    //                 output: {
    //                     comments: false
    //                 },
    //                 warnings: false
    //             }
    //         })
    //     ]
    // },

    output: {
        path: path.resolve(__dirname, 'examples/libs/tiny'),
        filename: '[name].js',
        environment: {
            arrowFunction: false
        }
    },

    plugins: [
        new Webpack.DefinePlugin({
            __DEBUG__: 'true'
        })
    ],

    stats: {
        colors: true
    }

    // devServer: {
    //     host: '0.0.0.0',
    //     port: 3000,
    //     // hot: true,
    //     static: {
    //         directory: path.resolve('examples')
    //         // watch: true
    //     }
    // }
};

// const compiler = Webpack(webpackConfig);
// const devServerOptions = { ...webpackConfig.devServer, open: true };
// const server = new WebpackDevServer(devServerOptions, compiler);

// const runServer = async () => {
//     console.log('Starting server...');
//     await server.start();
// };

// runServer();

module.exports = webpackConfig;
