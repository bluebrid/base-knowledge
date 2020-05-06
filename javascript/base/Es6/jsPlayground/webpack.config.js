"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    main: path.resolve("./src/index.js")
  },

  output: {
    filename: "[name].[hash:8].js",
    path: path.resolve("./dist")
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [
    // new InterpolateHtmlPlugin(),
    new HtmlWebpackPlugin({
      inject: "header",
      template: path.resolve("./public/index.html")
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  }
};
