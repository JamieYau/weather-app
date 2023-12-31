const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const DotenvWebpackPlugin = require("dotenv-webpack");

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  devtool: "eval",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      // Add this rule for loading CSS files
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      }, // Add this rule for loading imagess
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext]",
        },
      }, // Add this rule for loading fonts
      {
        test: /\.(woff2?|ttf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: "Weather App",
      filename: "index.html",
      template: path.resolve(__dirname, "src/template.html"),
    }),
    new DotenvWebpackPlugin(),
  ],
};
