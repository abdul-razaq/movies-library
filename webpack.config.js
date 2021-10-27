const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const DotEnv = require('dotenv-webpack');

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	entry: ['babel-polyfill', './src/index.js'],
	output: {
		publicPath: '/',
		path: path.resolve(__dirname, 'dist'),
		filename: 'index_build.js',
	},
	module: {
		rules: [
			{ test: /\.(js)$/, use: 'babel-loader' },
			{
				test: /\.css$/,
				use: 'css-loader',
			},
			{
				test: /\.module\.s(a|c)ss$/,
				use: [
					isDevelopment ? 'style-loader' : MiniCSSExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { modules: true, sourceMap: isDevelopment },
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: isDevelopment,
						},
					},
				],
			},
			{
				test: /\.s(a|c)ss$/,
				exclude: /.\module\.s(a|c)ss$/,
				use: [
					isDevelopment ? 'style-loader' : MiniCSSExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: isDevelopment,
						},
					},
				],
			},
			{
				test: /\.svg$/,
				// use: ['@svgr/webpack', 'url-loader'],
				type: 'asset/resource',
			},
			{
				test: /\.png$/,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		new webpack.EnvironmentPlugin({
			mode: isDevelopment ? 'development' : 'production',
		}),
		new MiniCSSExtractPlugin({
			filename: isDevelopment ? '[name].css' : '[name].[fullhash].css',
			chunkFilename: isDevelopment ? '[id].css' : '[id].[fullhash].css',
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			process: 'process/browser',
		}),
		new DotEnv(),
	],
	mode: isDevelopment ? 'development' : 'production',
	resolve: {
		extensions: ['.jsx', '.js', '.scss', '.sass'],
		fallback: {
			fs: false,
			os: false,
			path: false,
		},
	},
	performance: {
		hints: false,
	},
	devServer: {
		port: 8080,
		open: true,
		hot: true,
		compress: true,
		historyApiFallback: true,
	},
};
