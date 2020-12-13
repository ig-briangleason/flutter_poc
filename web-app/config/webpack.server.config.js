require('dotenv').config();
const path = require('path');
const nodeExternals = require("webpack-node-externals");
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const webpack = require("webpack");

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

module.exports = {
  entry: './server/app.ts',
  target: 'node',
  mode: getEnvironment(),
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, '../dist-server'),
    filename: 'server.js'
  },
  resolve: {
    plugins: [
      new TsConfigPathsPlugin()
    ],
    extensions: ['.ts', '.tsx', '.js']
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        query: {
          configFileName: './tsconfig.json'
        }
      }
    ]
  }
};
