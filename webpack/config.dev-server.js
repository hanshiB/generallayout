const merge = require("webpack-merge");

const parts = require("./common/webpack.parts");

module.exports = PATHS => merge([
  parts.clean(`${PATHS.build}/**/*`, {
    root: PATHS.root
  }),

  parts.entry("client", ["babel-polyfill", 'react-hot-loader/patch', `${PATHS.src}/client.js`]),
  parts.entry("server", ['react-hot-loader/patch', `${PATHS.src}/server.js`]),

  parts.output({
    publicPath: "http://localhost:8081/BeInformed/",
  }),

  parts.extractCSS({
    use: ["css-loader", "sass-loader"]
  }),

  parts.loadImages(),

  parts.addImportsToServerHTML()
]);