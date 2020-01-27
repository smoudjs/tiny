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
	context: `${__dirname}/src/`,
	entry: {
		
		// 'asset-loader': './asset-loader/AssetLoader.js',
		// 'three-ui': './three-ui/ThreeUI.js',

		'tiny': './index.js',
		'mini': './mini.js',
		'base': './base.js',
		'standard': './standard.js',
		'standardtween': './standardtween.js',
		'full': './full.js',
		'nomask_notint': './nomask_notint.js',
		'standard_nographics': './standard_nographics.js',
		'three': './three.js',
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