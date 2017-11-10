const { environment } = require('@rails/webpacker')
const merge = require('webpack-merge')
const webpack = require('webpack')

environment.loaders.set('sass-import', {
	enforce: 'pre',
  exclude: /node_modules/,
  test: /\.sass$/,
  loader: 'import-glob-loader'
})

environment.plugins.set('Provide', new webpack.ProvidePlugin({
		$: 'jquery',
		jquery: 'jquery',
		jQuery: 'jquery',
		'window.jQuery': 'jquery',
		Tether: 'tether',
		'window.Tether': 'tether'
	})
)

const aliasConfig = {
	resolve: {
		alias: {
			jquery: 'jquery/src/jquery'
		}
	}
}

module.exports = merge(environment.toWebpackConfig(), aliasConfig)