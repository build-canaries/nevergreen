const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const isProd = (process.env.NODE_ENV === 'production')

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
    modules: true,
    localIdentName: isProd ? '[hash:base64:6]' : '[name]-[local]-[hash:base64:6]'
  }
}

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    plugins: () => [autoprefixer({
      browsers: ['last 2 versions']
    })]
  }
}

const defaultName = '[name].[hash:8].[ext]'

module.exports = {
  devtool: 'source-map',
  entry: ['./src/client/index'],
  bail: true,
  output: {
    path: path.join(__dirname, 'resources/public'),
    filename: '[name].[hash:8].js',
    publicPath: ''
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
      parallel: true,
      extractComments: isProd,
      compress: isProd,
      mangle: isProd
    }),
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
      minify: {
        collapseWhitespace: isProd,
        removeComments: isProd,
        removeRedundantAttributes: isProd
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash:8].css',
      allChunks: true
    }),
    new CopyWebpackPlugin([{from: './src/client/favicons'}]),
    new OptimizeCssAssetsPlugin(),
    new ManifestPlugin({fileName: 'asset-manifest.json'}),
    new SWPrecacheWebpackPlugin({
      cacheId: 'nevergreen',
      dontCacheBustUrlsMatching: /\.\w{8}\./, // Don't cache bust URLs hashed by Webpack
      filename: 'service-worker.js',
      minify: isProd,
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: 'babel-loader',
        include: path.join(__dirname, 'src/client')
      },
      {
        test: /\.scss$/i,
        use: ExtractTextPlugin.extract({
          use: [
            cssLoader,
            postCssLoader,
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {sourceMap: true}
            }
          ]
        })
      },
      {
        test: /\.css$/i,
        use: ExtractTextPlugin.extract({
          use: [
            cssLoader,
            postCssLoader,
            'resolve-url-loader'
          ]
        })
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: defaultName,
              limit: '8192'
            }
          },
          'img-loader'
        ]
      },
      {
        test: /\.woff2?(\?.*)?$/i,
        use: [{
          loader: 'url-loader',
          options: {
            name: defaultName,
            limit: '8192',
            mimetype: 'application/font-woff'
          }
        }]
      },
      {
        test: /\.ttf(\?.*)?$/i,
        use: [{
          loader: 'url-loader',
          options: {
            name: defaultName,
            limit: '8192',
            mimetype: 'application/octet-stream'
          }
        }]
      },
      {
        test: /\.svg(\?.*)?$/i,
        use: [{
          loader: 'url-loader',
          options: {
            name: defaultName,
            limit: '8192',
            mimetype: 'image/svg+xml'
          }
        }]
      },
      {
        test: /\.mp3$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }]
      }
    ],
    noParse: [
      /localforage\.js$/
    ]
  }
}
