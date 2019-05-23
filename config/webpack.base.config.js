const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
    modules: true,
    localIdentName: '[name]-[local]-[hash:base64:6]'
  }
}

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    plugins: () => [autoprefixer()]
  }
}

const imgLoader = {
  loader: 'img-loader',
  options: {
    plugins: [
      require('imagemin-optipng')({}),
      require('imagemin-svgo')({})
    ]
  }
}

const defaultName = '[name].[hash:8].[ext]'

function urlLoader(mimeType) {
  return {
    loader: 'url-loader',
    options: {
      name: defaultName,
      limit: '8192',
      mimetype: mimeType
    }
  }
}

module.exports = {
  devtool: 'source-map',
  entry: ['./src/client/index'],
  output: {
    path: path.join(__dirname, '../resources/public'),
    filename: '[name].[hash:8].js',
    publicPath: ''
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      allChunks: true
    }),
    new CopyWebpackPlugin([
      './src/client/robots.txt',
      './src/client/favicons',
      './src/client/reducers/schema.json'
    ]),
    new ManifestPlugin({ fileName: 'asset-manifest.json' })
  ],
  resolve: {
    extensions: ['.js', '.tsx', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        use: 'babel-loader',
        include: path.join(__dirname, '../src/client')
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
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          cssLoader,
          postCssLoader,
          'resolve-url-loader'
        ]
      },
      {
        test: /\.png$/i,
        use: [
          urlLoader('image/png'),
          imgLoader
        ]
      },
      {
        test: /\.woff2?(\?.*)?$/i,
        use: [
          urlLoader('application/font-woff')
        ]
      },
      {
        test: /\.ttf(\?.*)?$/i,
        use: [
          urlLoader('application/octet-stream')
        ]
      },
      {
        test: /\.svg(\?.*)?$/i,
        use: [
          urlLoader('image/svg+xml'),
          imgLoader
        ]
      },
      {
        test: /\.mp3$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }]
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  },
  stats: 'minimal'
}
