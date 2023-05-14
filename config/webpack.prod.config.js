const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const baseConfig = require('./webpack.base.config.js')

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
      },
    }),
    new GenerateSW({
      swDest: 'service-worker.js',
      cacheId: 'nevergreen',
      exclude: [/\.map$/],
      clientsClaim: true,
      skipWaiting: true,
      navigateFallback: '/index.html',
      navigateFallbackDenylist: [
        new RegExp('/[^/]+\\.[^/]+$'), // Exclude URLs containing a dot, as they're likely a resource in public
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()],
    splitChunks: {
      chunks: 'all',
    },
  },
})
