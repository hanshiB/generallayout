const merge = require("webpack-merge");

const parts = require("./common/webpack.parts");

module.exports = PATHS =>
  merge([
    parts.entry("client", ["babel-polyfill", 'react-hot-loader/patch', `${PATHS.src}/client.js`]),
    parts.entry("server", ['react-hot-loader/patch', `${PATHS.src}/server.js`]),

    parts.devServer({
      // Customize host/port here if needed
      host: process.env.HOST,
      port: 8081 //process.env.PORT
    }),

    parts.extractCSS({
      use: ["css-loader", "sass-loader"]
    }),

    parts.loadImages(),

    parts.generateSourceMaps({ type: "cheap-module-source-map" })
  ]);
