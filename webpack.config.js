var webpack = require('webpack')
var path    = require('path')

var publicPath          = 'http://localhost:3000/'
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true'

var devConfig = {
  entry  : {
    index: ['./client/indexPage/js/main.js', hotMiddlewareScript],
    admin: ['./client/adminPage/js/main.js', hotMiddlewareScript],
    login: ['./client/loginPage/js/main.js', hotMiddlewareScript]
  },
  output : {
    filename  : './[name].bundle.js',
    path      : path.resolve('./client/build'),
    publicPath: publicPath
  },
  devtool: 'source-map',
  module : {
    loaders: [{
      test   : /\.js$/,
      loader : 'babel',
      exclude: /node_modules/
    },
      {
        test  : /\.(png|jpg)$/,
        loader: 'url?limit=8192&context=client&name=[path][name].[ext]'
      },
      {
        test  : /\.css$/,
        loader: 'style!css!'
      },
      {
        test  : /\.scss$/,
        loader: 'style!css?sourceMap!resolve-url!sass?sourceMap'
      }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['jquery'],
      filename: "commons.bundle.js"
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}

module.exports = devConfig