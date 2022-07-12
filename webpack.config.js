const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require('webpack');


module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  resolve: {
    extensions: [".ts", ".js", ".css", ".svg", ".json"],
    alias: {
      'handlebars' : 'handlebars/dist/handlebars.js',
      process: "process/browser"
    }
  },
  module: {
    rules: [
      {
        test: function (modulePath) {
          return modulePath.endsWith('.ts') && !modulePath.endsWith('.spec.ts');
        },
        include: [path.resolve(__dirname, "src")],
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json"),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.svg$/,
        type: 'asset',
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader:
              process.env.NODE_ENV === "development"
                ? "style-loader"
                : MiniCssExtractPlugin.loader,
          },
          "@teamsupercell/typings-for-css-modules-loader",
          {
            loader: "css-loader",
            options: { modules: true },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, ".postcssrc"),
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      baseUrl: '/',
      template: "src/index.html",
      templateParameters(compilation, assets, options) {
        return {
          compilation,
          webpack: compilation.getStats().toJson(),
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            files: assets,
            options,
          },
          process,
        }
      },
      chunksSortMode: 'auto',
      minify: {
        collapseWhitespace: false,
      },
      cache: true,
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
    publicPath: "/",
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: {
      index: "index.html",
    },
  },
};
