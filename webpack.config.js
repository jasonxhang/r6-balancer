const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');
process.env.NODE_ENV = 'development'

// App directory
const appDirectory = fs.realpathSync(process.cwd());
// Gets absolute path of file within app directory
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);
// Host
const host = process.env.HOST || 'localhost';
// Required for babel-preset-react-app
process.env.NODE_ENV = 'development';

module.exports = {
	mode: 'development',
  entry: resolveAppPath('src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				include: resolveAppPath('src'),
				loader: 'babel-loader',
				options: {
					presets: [
						require.resolve('babel-preset-react-app'), 
						require.resolve('@babel/preset-env')
					]
				}
			}, 
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				loader: "file-loader"
			}
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    // path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
  },
  devServer: {
		contentBase: resolveAppPath('public'),
		compress: true,
		hot: true,
		host,
		port: 9000,
		publicPath: '/'
	},
	plugins: [
		new HtmlWebpackPlugin({
		inject: true,
		template: resolveAppPath('public/index.html'),
	})
]

};