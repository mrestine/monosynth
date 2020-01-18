const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './app/app.js',
  devtool: 'inline-source-map',
  mode: 'none',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  module: {
    rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        //include: [path.resolve(__dirname, 'app')],
        use: ['babel-loader'],
    }, {
      test: /\.s?css$/,
      include: [path.resolve(__dirname, 'app')],
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'sass-loader' },
      ]
    }, {
      //include: [path.resolve(__dirname, 'app/fonts')],
      test: /\.(woff2?|ttf|mp3)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        }
      }]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({ 
      title: 'Web Synth',
      template: path.resolve(__dirname, 'index.html'), 
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
};