'use strict';
require("@babel/polyfill");
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const {
  resolve
} = require('path')

module.exports = {
  entry: ["@babel/polyfill", './app/client/main'],
  output: {
    path: __dirname,
    filename: './app/public/bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  module: {
    rules: [{
      test: /jsx?$/,
      include: resolve(__dirname, './app'),
      use: [{
        loader: 'babel-loader',
        query: {
          presets: ['es2015', "stage-2", "env", 'react'],
          "plugins": ["transform-class-properties"]
        }
      }]
    },
    {
      test: /\.css$/,
      use: [
        { loader: "style-loader" },
        { loader: "css-loader" }
      ]
    },
    ],
  }
}
