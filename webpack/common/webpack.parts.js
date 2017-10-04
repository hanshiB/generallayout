const webpack = require("webpack");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
const StyleLintPlugin = require("stylelint-bare-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const CleanWebpackPlugin = require("clean-webpack-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const BabiliPlugin = require("babili-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ProgressPlugin = require("simple-webpack-progress-plugin");
const cssnano = require("cssnano");
const chalk = require("chalk");

const AddAssetsToServerHTMLPlugin = require("../plugins/AddAssetsToServerHTMLPlugin");

exports.entry = (name, paths) => ({
  entry: {
    [name]: paths
  }
});

exports.output = config => ({
  output: config
});

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    historyApiFallback: true,
    stats: "errors-only",
    host, // Defaults to `localhost`
    port, // Defaults to 8080,
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    overlay: {
      errors: false,
      warnings: false
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});

exports.setFreeVariable = (key, value) => {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [new webpack.DefinePlugin(env)]
  };
};

exports.loadJavaScript = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,

        use: {
          loader: "babel-loader",
          options: {
            // Enable caching for improved performance during
            // development.
            cacheDirectory: true
          }
        }
      }
    ]
  }
});

exports.lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        enforce: "pre",

        loader: "eslint-loader",
        options
      }
    ]
  }
});

exports.minifyJavaScript = () => ({
  plugins: [new BabiliPlugin()]
});

exports.concatModules = () => ({
  plugins: [new webpack.optimize.ModuleConcatenationPlugin()]
});

/**
 * LoadCSS gives problems with nashorn, because style-loader needs a DOM to insert the css it generate
 */
exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.s?css$/,
        include,
        exclude,

        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("autoprefixer")]
            }
          },
          {
            loader: "sass-loader",
            sourceMap: true
          }
        ]
      }
    ]
  }
});

exports.extractCSS = ({ include, exclude, use }) => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    filename: "[name].css"
  });

  return {
    module: {
      rules: [
        {
          test: /\.s?css$/,
          include,
          exclude,

          use: plugin.extract({
            use,
            fallback: "style-loader"
          })
        }
      ]
    },
    plugins: [plugin]
  };
};

exports.autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    plugins: () => [require("autoprefixer")]
  }
});

exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurifyCSSPlugin({ paths })]
});

exports.lintCSS = () => ({
  plugins: [new StyleLintPlugin()]
});

exports.minifyCSS = ({ options }) => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: options,
      canPrint: false
    })
  ]
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        include,
        exclude,

        use: {
          loader: "url-loader",
          options
        }
      }
    ]
  }
});

exports.optimizeImages = (
  options = {
    test: /\.(jpe?g|png|gif|svg)$/i
  }
) => ({
  plugins: [new ImageminPlugin(options)]
});

exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        // Capture eot, ttf, woff, and woff2
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        include,
        exclude,

        use: {
          loader: "file-loader",
          options
        }
      }
    ]
  }
});

/**
 * Load all assets except for explicitly created parts
 */
exports.loadAssets = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        include,
        exclude,

        use: {
          loader: "file-loader",
          options
        }
      }
    ]
  }
});

exports.exportAssetsInformation = (options = {}) => ({
  plugins: [new AssetsPlugin(options)]
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type
});

exports.extractBundles = bundles => ({
  plugins: bundles.map(
    bundle => new webpack.optimize.CommonsChunkPlugin(bundle)
  )
});

exports.clean = (path, options) => ({
  plugins: [new CleanWebpackPlugin([path], options)]
});

exports.stats = () => ({
  stats: {
    // minimal logging
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    children: false
  }
});

exports.watchOptions = (
  ignored = /\.svn|.svcode|coverage|jest|META-INF|node_modules|WEB-INF|webpack/
) => ({
  watchOptions: {
    ignored
  }
});

exports.progressBar = () => ({
  plugins: [new ProgressPlugin()]
});

exports.addImportsToServerHTML = () => ({
  plugins: [new AddAssetsToServerHTMLPlugin()]
});

exports.addAlias = (key, value) => ({
  resolve: {
    alias: {
      [key]: value
    }
  }
});

exports.filterMomentLocales = (localesToInclude = /en|nl/) => ({
  plugins: [
    new webpack.ContextReplacementPlugin(
      /moment[\/\\]locale$/,
      localesToInclude
    )
  ]
});
