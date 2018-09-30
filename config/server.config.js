const webpack = require('webpack')
const path = require('path')

module.exports = {
	entry: {
		server: `${__dirname}./../src/server/server.js`
	},
	output: {
		path: path.join(__dirname, '..'),
		filename: 'server.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				options: { presets: ['@babel/env'] }
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	target: 'node',
	node: {
		fs: 'empty',
		net: 'mock'
	}
}