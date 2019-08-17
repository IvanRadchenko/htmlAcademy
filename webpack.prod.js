
const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin') // installed via npm
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const buildPath = path.resolve(__dirname, 'barbershop2/dist')

module.exports = {
  // This option controls if and how source maps are generated.
  // https://webpack.js.org/configuration/devtool/
  devtool: 'source-map',

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    index: './barbershop2/src/page-index/index.js',
      // item: './barbershop2/src/page-item/',
      price: './barbershop2/src/page-price/price.js'
    // catalog: './barbershop2/src/page-catalog/'
  },

  // how to write the compiled files to disk
  // https://webpack.js.org/concepts/output/
  output: {
    filename: '[name].[hash:20].js',
    path: buildPath
  },

  // https://webpack.js.org/concepts/loaders/
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name].[hash:20].[ext]',
            limit: 8192
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
         'file-loader'
         ]
      }
    ]
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CleanWebpackPlugin(), // cleans output.path by default
    new HtmlWebpackPlugin({
      template: './barbershop2/src/page-index/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    }),
    // new HtmlWebpackPlugin({
    //   template: './barbershop2/src/page-item/item.html',
    //   inject: true,
    //   chunks: ['item'],
    //   filename: 'item.html'
    // }),
    new HtmlWebpackPlugin({
      template: './barbershop2/src/page-price/price.html',
      inject: true,
      chunks: ['price'],
      filename: 'price.html'
    })
    // new HtmlWebpackPlugin({
    //   template: './barbershop2/src/page-catalog/catalog.html',
    //   inject: true,
    //   chunks: ['catalog'],
    //   filename: 'catalog.html'
    // })
  ],

  // https://webpack.js.org/configuration/optimization/
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  }
}
