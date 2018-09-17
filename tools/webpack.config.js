'use strict';

require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const pkg = require('../package.json');

// Directories
const ROOT_DIR = path.resolve(__dirname, '../');
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);
const CLIENT_DIR = resolvePath('src/client');
const BUILD_DIR = resolvePath('build');

// Enviroment Verification
const isProduction = process.argv.includes('--env.production');

// File names and extensions
const reScript = /\.(js|jsx|mjs)$/;
const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;
const reFont = /\.(eot|otf|ttf|woff|woff2)$/;
const staticAssetName = '[name].[ext]';

const config = {
  context: ROOT_DIR,

  name: 'client',

  target: 'web',

  mode: isProduction ? 'production' : 'development',

  entry: {
    client: ['babel-polyfill', resolvePath(CLIENT_DIR, 'app.js')]
  },

  resolve: {
    modules: ['node_modules']
  },

  output: {
    path: resolvePath(BUILD_DIR, 'static'),
    publicPath: '/static/',
    filename: !isProduction
      ? 'js/[name].js'
      : 'js/[name].[hash:8].js',
    chunkFilename: !isProduction
      ? 'js/[name].js'
      : 'js/[name].[hash:8].js'
  },

  optimization: {
    minimize: isProduction,
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },

  plugins: [
    new ExtractTextPlugin({
      filename: !isProduction
        ? 'css/[name].css'
        : 'css/[name].[contenthash:base64:8].css',
      publicPath: '/static/',
      allChunks: true
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': !isProduction ? '"development"' : '"production"',
      'process.env.BROWSER': true
    }),

    new AssetsPlugin({
      path: BUILD_DIR,
      filename: 'assets.json',
      prettyPrint: true
    }),

    ...(isProduction
      ? [
        new webpack.optimize.ModuleConcatenationPlugin()
      ]
      : [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin()
      ]
    )
  ],
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: reScript,
        include: [
          CLIENT_DIR,
          resolvePath('tools')
        ],
        loader: 'babel-loader',
        options: {
          cacheDirectory: isProduction,
          babelrc: false,
          presets: [
            [
              'env',
              {
                targets: {
                  browsers: pkg.browserslist,
                  forceAllTransforms: !isProduction
                },
                modules: false,
                useBuiltIns: false,
                debug: false
              }
            ],
            'stage-0',
            'react'
          ],
          plugins: [
            'transform-decorators-legacy',
            ...(!isProduction ? ['transform-react-jsx-source'] : []),
            ...(!isProduction ? ['transform-react-jsx-self'] : [])
          ]
        }
      },
      {
        test: /\.css/,
        rules: [
          {
            include: [CLIENT_DIR],
            use: ExtractTextPlugin.extract({
              fallback: 'isomorphic-style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    sourceMap: !isProduction,
                    camelCase: 'dashes',
                    modules: true,
                    localIdentName: !isProduction
                      ? '[name]-[local]-[hash:base64:5]'
                      : '[hash:base64:5]',
                    minimize: isProduction,
                    discardComments: { removeAll: true }
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    config: {
                      path: resolvePath('./tools/postcss.config.js')
                    }
                  }
                }
              ]
            })
          }
        ]
      },
      {
        test: reImage,
        oneOf: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              name: staticAssetName
            }
          }
        ]
      },
      {
        test: reFont,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts/',
          name: staticAssetName
        }
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader'
      },
      {
        exclude: [reScript, reStyle, reImage, reFont, /\.json$/, /\.txt$/, /\.md$/],
        loader: 'file-loader',
        options: {
          name: staticAssetName
        }
      }

    ]
  },

  bail: isProduction,
  cache: !isProduction,

  devtool: isProduction ? 'source-map' : 'cheap-module-inline-source-map',

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },

  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: !isProduction,
    timings: true,
    version: false
  }
};

module.exports = config;
