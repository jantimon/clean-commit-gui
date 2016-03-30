/* eslint strict: 0 */
'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      include: [path.join(__dirname, 'app')]
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.html/,
      loader: 'react-templates-loader?targetVersion=0.14.0',
      include: [path.join(__dirname, 'app')]
    },
    {
      test: /\.svg$/,
      loader: 'url-loader?limit=10000',
      include: [path.join(__dirname, 'app')]
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
    alias: {
      'any-promise': path.join(__dirname, 'app', 'utils', 'promise.js')
    }
  },
  postcss: () => [autoprefixer],
  plugins: [

  ],
  externals: [
    // put your node 3rd party libraries which can't be built with webpack here
    // (mysql, mongodb, and so on..)
    'nodegit'
  ]
};
