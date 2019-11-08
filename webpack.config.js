const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const fs = require('fs');

const pkg = JSON.parse(fs.readFileSync('package.json'));
const license = fs.readFileSync('LICENSE');

const banner = `/*
${pkg.name} - v${pkg.version}
[file]
---

${license}
*/
`;

const config = {
	context: `${__dirname}/src/`,
	entry: {
		
		// 'asset-loader': './asset-loader/AssetLoader.js',
		// 'three-ui': './three-ui/ThreeUI.js',

		'tiny': './Tiny.js',
	},
	output: {
		path: `${__dirname}/lib/`,
		filename: `[name].min.js`
	},
	plugins: [
		new UglifyJSPlugin()
		//new webpack.BannerPlugin({ banner: banner, raw: true }), // with banner
	],
};

module.exports = config;