const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const path = require('./paths');
const config = require('./index');

const assets = 'assets';

const htmlPlugin = new HtmlWebpackPlugin({
  template: path.public + '/index.html',
  meta: { viewport: 'width=device-width, initial-scale=1' },
  inject: 'body',
  title: config.name
});

const faviconsPlugin = new FaviconsWebpackPlugin({
  logo: path.public + '/img/logo.png',
  prefix: assets + '/icons/'
});

const uglifyPlugin = new UglifyJsPlugin({
  sourceMap: true
});

const cssOptimizePlugin = new OptimizeCSSAssetsPlugin({
  cssProcessorOptions: {
    map: {
      inline: false,
      annotation: true
    }
  }
});

const cssExtractPlugin = new MiniCssExtractPlugin({
  filename: assets + '/[name].[hash].css',
  chunkFilename: '[id].[hash].css'
});

const md5Hash = new WebpackMd5Hash();

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    vendor: path.src + '/vendor',
    main: path.src + '/index'
  },
  output: {
    path: path.build,
    publicPath: '/',
    filename: assets + '/[name].[chunkhash].js'
  },
  optimization: {
    minimizer: [
      uglifyPlugin,
      cssOptimizePlugin
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: path.node_modules,
          name: 'vendor',
          enforce: true
        }
      }
    }
  },
  plugins: [
    md5Hash,
    cssExtractPlugin,
    htmlPlugin,
    faviconsPlugin
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            }
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
