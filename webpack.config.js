var path    = require('path');
var webpack = require('webpack');

module.exports = {
  entry        : {
    index: './public/index.js',
    login: './public/login.js',
    admin: './public/admin.js'
  },
  output       : {
    path      : path.resolve(__dirname, './public/build'),
    publicPath: '/public/build/',
    filename  : '[name].js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module       : {
    loaders: [
      {
        test   : /\.js$/,
        loader : 'babel',
        exclude: /node_modules/
      },
      {
        test  : /\.json$/,
        loader: 'json'
      },
      {
        test  : /\.(png|jpg|gif|svg|ico)$/,
        loader: 'url',
        query : {
          limit: 10000,
          name : '[name].[ext]?[hash]'
        }
      }
    ]
  },
  devtool      : 'eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = 'source-map'
  // http://vuejs.github.io/vue-loader/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}
