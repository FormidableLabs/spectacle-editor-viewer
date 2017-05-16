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
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
    },
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'demo'),
      ],
    }, {
      test: /\.json$/,
      loaders: ['json-loader'],
      include: path.join(__dirname, 'demo'),
    }],
  },
};
