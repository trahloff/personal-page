const webpack = require('webpack')

module.exports = env => {
  const prod = (env && env.prod) || process.env.NODE_ENV === 'production'
  return {
    entry: './assets/js/main.js',
    watch: !prod,
    output: {
      filename: './assets/dist/bundle.js'
    },
    module: {
      loaders: [{
        test: /\.(png|jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            outputPath: 'assets/dist/'
          }
        }]
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }]
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }]
    },
    plugins: !prod ? [] : [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ]
  }
}
