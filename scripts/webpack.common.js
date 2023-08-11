const webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path');

const config = {

    // devtool: 'source-map',
    plugins: [],

    module: {
        rules: [
            // HTML
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },

            // JS
            // {
            //     test: /\.m?js$/,
            //     exclude: /node_modules/,
            //     use: ['babel-loader']
            // },

            // CSS
            // {
            //     test: /\.(sa|sc|c)ss$/i,
            //     exclude: /node_modules/,
            //     use: [
            //         process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
            //         'css-loader',
            //         'sass-loader'
            //     ]
            // },

            // Fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                exclude: /node_modules/,
                type: 'asset/resource' //use: ['file-loader']
            },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                exclude: /node_modules/,
                type: 'javascript/auto',
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            outputPath: 'assets/images/'
                        }
                    }
                ]
            },

            // Models
            {
                test: /\.(glb|gltf|fbx|obj)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            outputPath: 'assets/models/'
                        }
                    }
                ]
            },

            {
                test: /\.(CUBE)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            outputPath: 'assets/models/'
                        }
                    }
                ]
            },

            // MP3
            {
                test: /\.(mp3|ogg|wav)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            outputPath: 'assets/audios/'
                        }
                    }
                ]
            },

            // Shaders
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                use: ['raw-loader', 'glslify-loader']
            }
        ]
    },

    stats: {
        colors: true
    }
};

module.exports = config;
