var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
var ManifestPlugin = require('webpack-manifest-plugin')
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
var isProd = (process.env.NODE_ENV === 'production')

var cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
    modules: true,
    localIdentName: isProd ? '[hash:base64:6]' : '[name]-[local]-[hash:base64:6]'
  }
}

var postCssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    plugins: () => [autoprefixer({
      browsers: ['last 2 versions']
    })]
  }
}

module.exports = {
  devtool: 'source-map',
  entry: ['./src/client/index'],
  bail: true,
  output: {
    path: path.join(__dirname, 'resources/public'),
    filename: '[hash].js',
    publicPath: ''
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
      minify: {
        collapseWhitespace: isProd,
        removeComments: isProd,
        removeRedundantAttributes: isProd
      }
    }),
    new ExtractTextPlugin({
      filename: '[hash].css',
      allChunks: true
    }),
    new CopyWebpackPlugin([{from: './src/client/favicons'}]),
    new OptimizeCssAssetsPlugin(),
    new ManifestPlugin({fileName: 'asset-manifest.json'}),
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./, // Don't cache bust URLs hashed by Webpack
      filename: 'service-worker.js',
      minify: isProd,
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
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
            limit: '8192',
            mimetype: 'image/svg+xml'
          }
        }]
      },
      {
        test: /\.mp3/i,
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
