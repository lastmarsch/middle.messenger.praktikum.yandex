const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  resolve: {
    extensions: [".ts", ".js", ".css", ".svg", ".json"],
    alias: {
      handlebars: "handlebars/dist/handlebars.js",
      "@api": path.join(__dirname, "src/api/"),
      "@components": path.join(__dirname, "src/components/"),
      "@const": path.join(__dirname, "src/const/"),
      "@core": path.join(__dirname, "src/core/"),
      "@pages": path.join(__dirname, "src/pages/"),
      "@services": path.join(__dirname, "src/services/"),
      "@test": path.join(__dirname, "src/test/"),
      "@utils": path.join(__dirname, "src/utils/"),
      "@static": path.join(__dirname, "static/"),
    },
  },
  module: {
    rules: [
      {
        test: function (modulePath) {
          return modulePath.endsWith(".ts") && !modulePath.endsWith(".spec.ts");
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
        type: "asset",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      baseUrl: "/",
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
        };
      },
      chunksSortMode: "auto",
      minify: {
        collapseWhitespace: false,
      },
      cache: true,
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
    publicPath: "/",
  },
};
