
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';
const devMode = process.env.NODE_ENV !== 'production';

// Multiple chunks or bundles for different parameters
// module.exports = [{},{},{}];
module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, 'barbershop'),
  entry: {
    // gllacy: ['./gllacy/app.js', './gllacy/css/styles.css'],
    barbershop: ['./js/app.js', './css/styles.css']
  },

  output: {
    pathinfo: false,
    path: path.resolve(__dirname, 'dist'),
    filename: devMode ? '[name].js' : '[name].[hash].js',
    library: "[name]"
  },

  devtool: devMode ? 'inline-source-map' : false,
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true
  },
  module: {
      rules: [{
            test: /\.(css| scss)$/,
            use: [
              devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader'
            ]
          },
          {
            test: /\.(woff|woff2)$/,
            use: [
              'file-loader',
            ]
          },
          {
            test: /\.(png|svg|jpg)$/,
            use: [
              'url-loader',
            ]
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel?optional[]=runtime',
              options: {
                  presets: ['@babel/preset-env']
              }
            }

          },
        ]
      },

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
          template: path.join(__dirname, 'barbershop/index.html'),
          // path: context,
          // excludeChunks: ['base'],
          filename: 'index.html',
          minify: {
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true
          }
    })
  ],

  resolve: {
    modules: ['node_modules'],
    extensions: [ '.js']
  },
  resolveLoader: {
    modules: ['node_modules'],
    moduleExtensions: ['-loader'],
    extensions: [ '.js']
  },

  optimization: {
    nodeEnv: NODE_ENV,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [new UglifyJsPlugin()],
  },

};
