var webpack = require('webpack')
var path    = require('path')

var publicPath = 'http://localhost:3000/'

var devConfig = {
  entry  : {
    index: './client/indexPage/js/main.js',
    login: './client/loginPage/js/main.js'
  },
  output : {
    filename  : './[name].bundle.js',
    path      : path.resolve('./client/build'),
    publicPath: publicPath
  },
  module : {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.(png|jpg)$/, loader: 'url?limit=8192&context=client&name=[path][name].[ext]'},
      {test: /\.css$/, loader: 'style!css!'},
      {test: /\.scss$/, loader: 'style!css!resolve-url!sass'},
      {test: /\.woff/, loader: 'url?prefix=font/'},
      {test: /\.ttf/, loader: 'file?prefix=font/'},
      {test: /\.eot/, loader: 'file?prefix=font/'},
      {test: /\.svg/, loader: 'file?prefix=font/'}
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name     : ['jquery'],
      filename : "commons.bundle.js",
      minChunks: Infinity
    }),
    new webpack.ProvidePlugin({
      $              : 'jquery',
      jQuery         : 'jquery',
      'window.jQuery': 'jquery',
      'root.jQuery'  : 'jquery'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}

module.exports = devConfig