const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
    modules: {
      localIdentName: '[name]-[local]-[contenthash:base64:6]',
    },
  },
}

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      sourceMap: true,
      plugins: [autoprefixer()],
    },
  },
}

module.exports = {
  devtool: 'source-map',
  entry: ['./src/client/index'],
  output: {
    path: path.join(__dirname, '../resources/public'),
    filename: '[name].[contenthash:8].js',
    publicPath: '/',
    assetModuleFilename: '[name].[contenthash:8][ext]',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
    new CopyWebpackPlugin({
      patterns: ['./src/client/robots.txt', './src/client/favicons'],
    }),
  ],
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        use: 'babel-loader',
        include: path.join(__dirname, '../src/client'),
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          cssLoader,
          postCssLoader,
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(png|svg|woff|woff2|ttf)$/i,
        type: 'asset',
      },
      {
        test: /\.mp3$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        },
      },
      {
        test: /\.txt$/,
        type: 'asset/source',
      },
    ],
  },
  stats: 'minimal',
}
