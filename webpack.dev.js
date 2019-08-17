const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  // This option controls if and how source maps are generated.
  // https://webpack.js.org/configuration/devtool/
  devtool: 'eval-cheap-module-source-map',

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    index: ['./barbershop2/src/page-index/index.js', './barbershop2/src/page-index/index.css'],
    // item: './barbershop2/src/page-item/',
    price: ['./barbershop2/src/page-price/price.js', './barbershop2/src/page-price/price.css']
    // catalog: './barbershop2/src/page-catalog/'
  },

  devServer: {
    port: 8080,
    writeToDisk: false,

  },

  // https://webpack.js.org/concepts/loaders/
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?optional[]=runtime',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
          // Please note we are not running postcss here
        ]
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            // On development we want to see where the file is coming from, hence we preserve the [path]
            name: '[path][name].[ext]?hash=[hash:20]',
            limit: 8192
          }
        }]
      }
    ]
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
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
  ]
}
