const merge = require("webpack-merge");

const parts = require("./common/webpack.parts");

module.exports = PATHS =>
  merge([
    parts.entry("client", ["babel-polyfill", `${PATHS.src}/client.js`]),

    parts.loadJavaScript({ include: [PATHS.src, PATHS.webpack] }),

    parts.loadCSS({ include: PATHS.src }),

    parts.loadFonts({
      options: {
        name: "[name].[ext]"
      }
    }),

    parts.loadImages(),

    parts.loadAssets({
      options: {
        name: "[name].[ext]"
      }
    }),

    parts.addAlias(
      "rsg-components/Wrapper",
      PATHS.webpack + "/styleguide/ReduxWrapper.js"
    ),

    parts.addAlias(
      "rsg-components/Props",
      PATHS.webpack + "/styleguide/PropsRenderer.js"
    )
  ]);
