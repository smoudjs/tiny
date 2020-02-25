const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');



// const fs = require('fs');

// const pkg = JSON.parse(fs.readFileSync('package.json'));
// const license = fs.readFileSync('LICENSE');

// const banner = `/*
// ${pkg.name} - v${pkg.version}
// [file]
// ---

// ${license}
// */
// `;

const config = {
	context: `${__dirname}/tiny`,
	entry: {
		
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
	output: {
		path: `${__dirname}/lib/`,
		filename: `[name].js`
	},
	plugins: [
		new UglifyJSPlugin()
		//new webpack.BannerPlugin({ banner: banner, raw: true }),
	],
	module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/env']
                }
            }
        ]
    },
	stats: {
        colors: true
    }
};

module.exports = config;