/*
jiangbei
*/

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const resolve = (url) => path.join(__dirname, url)



module.exports = function(env) {
	const mode = env.mode
	const isProd = mode === 'production'
	const plugins = []
	const cssUses = []
	if(isProd){
		plugins.push(new MiniCssExtractPlugin())
		cssUses.unshift(MiniCssExtractPlugin.loader)
	}
	return {
		devServer:{
			port:"8088"
		},
		entry: {
			index: resolve("./src/index.js")
		},
		output: {
			path: resolve("./dist"),
			filename: "index.js",
			library:{
				name:"FineIcon",
				type: 'umd',
			}
		},
		mode: mode,
		resolve:{
			alias:{
				'@':resolve("./src")
			}
		},
		module: {
			rules: [
				{
				  test: /\.css$/,
				  use: [
					...cssUses,
				    'css-loader'
				  ]
				},
				{
					test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
					loader: 'url-loader',
					options: {
						limit: 150000,
						name: path.posix.join('', 'fonts/[name].[hash:7].[ext]')
					}
				}
			],
		},
		plugins: plugins
	}
}
