const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.js',

    vendor: [
      'babel-polyfill',

      'react',
      'react-dom',
      'prop-types',

      'redux',
      'react-redux',
      'redux-multi',
      'redux-thunk',
      'redux-logger',
      'redux-devtools-extension',

      'react-router-dom',
      'react-router-redux',

      'truffle-contract'
    ]
  },

  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ],
    extensions: [
      '.js',
      '.jsx'
    ]
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [ 'babel-loader' ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Application',
      template: 'public/index.html'
    }),

    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'runtime' }),

    new webpack.HashedModuleIdsPlugin()
  ]
}
