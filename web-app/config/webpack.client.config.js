require('dotenv').config();
let webpack = require('webpack');
let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  TsConfigPathsPlugin
} = require('awesome-typescript-loader');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');

let BUILD_DIR = path.resolve(__dirname, '../dist/public');
let APP_DIR = path.resolve(__dirname, '../client');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const rnd = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

function getEnvironment() {
  switch (process.env.NODE_ENV) {
    case "test":
    case undefined:
    case "":
      return "development";
    default:
      return process.env.NODE_ENV;
  }
}

const config = {
  mode: getEnvironment(),
  entry: {
    main: APP_DIR + '/index.tsx'
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    usedExports: true,
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  output: {
    filename: `[name].${rnd}.js`,
    path: BUILD_DIR,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].${rnd}.css`,
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    // Add in `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.scss'],
    modules: [
      `${root}/node_modules`,
      'node_modules'
    ],
    plugins: [
      new TsConfigPathsPlugin(),
    ],
    alias: {
      mixins$: APP_DIR + '/styles/mixins.scss',
      constants$: APP_DIR + '/styles/constants.scss'
    }
  },
  module: {
    rules: [{
      test: /\.s[ac]ss$/i,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            implementation: require('node-sass'),
          },
        },
      ],
    },
    {
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: process.env.NODE_ENV === 'development',
        },
      },
        'css-loader',
      ],
    },
    {
      test: /\.ts*/,
      use: [{
        loader: 'awesome-typescript-loader',
        query: {
          configFileName: './tsconfig.json'
        }
      }]
    },
    // cache bust images, but embed small ones as data URIs
    {
      test: /\.(png|jpg|jpeg|gif)$/,
      use: [{
        loader: 'file-loader',
        query: {
          prefix: 'img/',
          name: 'assets/[hash].[ext]',
          publicPath: process.env.CDN_URL ? process.env.CDN_URL : "/",
        }
      }]
    },
    // cache bust svgs
    {
      test: /\.svg?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: [{
        loader: 'file-loader',
        query: {
          name: 'assets/[hash].[ext]',
          publicPath: process.env.CDN_URL ? process.env.CDN_URL : "/",
        }
      }]
    },

    // cache bust fonts
    {
      test: /\.[ot]tf$/,
      use: [{
        loader: "file-loader",
        options: {
          name: '[name].[ext]',
          publicPath: process.env.CDN_URL ? process.env.CDN_URL : "/",
        }
      }]
    },
    {
      test: /\.mp3$/,
      use: [{
        loader: 'file-loader',
        query: {
          prefix: 'sfx/',
          name: 'assets/[hash].[ext]',
          publicPath: process.env.CDN_URL ? process.env.CDN_URL : "/",
        }
      }]
    },
    // Cache bust or data-uri web fonts
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: [{
        loader: 'file-loader',
        query: {
          mimetype: 'application/font-woff',
          name: 'fonts/[hash].[ext]',
          publicPath: process.env.CDN_URL ? process.env.CDN_URL : "/",
        }
      }]
    },
    {
      test: /\.html$/,
      loader: 'html-loader',
      // publicPath: process.env.CDN_URL ? process.env.CDN_URL : "/",
    },
    ]
  }
};

module.exports = config;
