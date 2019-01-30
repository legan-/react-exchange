const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const path = require('./paths');
const config = require('./index');

const htmlPlugin = new HtmlWebpackPlugin({
  template: path.public + '/index.html',
  meta: { viewport: 'width=device-width, initial-scale=1' },
  inject: 'body',
  title: config.name
});

const faviconsPlugin = new FaviconsWebpackPlugin({
  logo: path.public + '/img/logo.png',
  icons: {
    android: false,
    appleIcon: false,
    appleStartup: false,
    firefox: false,
    opengraph: false,
    twitter: false,
    windows: false
  }
});

const hmrPlugin = new webpack.HotModuleReplacementPlugin();

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [path.src + '/index'],
  output: {
    path: path.build,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    host: config.host,
    port: config.clientPort,
    inline: true,
    disableHostCheck: true,
    stats: {
      chunks: false,
      chunkGroups: false,
      chunkOrigins: false,
      chunkModules: false,
      modules: false,
      children: false,
    },
  },
  plugins: [htmlPlugin, faviconsPlugin, hmrPlugin],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/'
            }
          }
        ]
      }
    ]
  }
};
