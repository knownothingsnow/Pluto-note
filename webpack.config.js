var webpack = require('webpack')
var path    = require('path')

var publicPath = 'http://localhost:3000/'
// var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true'

var devConfig = {
  entry  : {
    index: './client/indexPage/js/main.js',
    login: './client/loginPage/js/main.js'
    // index: ['./client/indexPage/js/main.js', hotMiddlewareScript],
    // admin: ['./client/adminPage/js/main.js', hotMiddlewareScript],
    // login: ['./client/loginPage/js/main.js', hotMiddlewareScript]
  },
  output : {
    filename  : './[name].bundle.js',
    path      : path.resolve('./client/build'),
    publicPath: publicPath
  },
  // devtool: 'source-map',
  module : {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.(png|jpg)$/, loader: 'url?limit=8192&context=client&name=[path][name].[ext]'},
      {test: /\.css$/, loader: 'style!css!'},
      {test: /\.scss$/, loader: 'style!css!resolve-url!sass'},
      // {test: /\.scss$/, loader: 'style!css?sourceMap!resolve-url!sass?sourceMap'},
      {test: /\.woff/, loader: 'url?prefix=font/'},
      // {test: /\.woff/, loader: 'url?prefix=font/&limit=10000&mimetype=application/font-woff'},
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
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}

module.exports = devConfig