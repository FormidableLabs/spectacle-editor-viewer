const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './demo/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'demo'),
      ],
    }, {
      test: /\.json$/,
      loaders: ['json'],
      include: [
        path.join(__dirname, 'demo'),
        path.join(__dirname, 'node_modules/entities/maps'),
        path.join(__dirname, 'node_modules/sanitize-html/node_modules/entities/maps')
      ],
    }],
  },
};
