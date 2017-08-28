const webpack = require('webpack')

module.exports = () => {
  return {
    entry: './assets/js/main.js',
    watch: !prod,
    output: {
      filename: './dist/bundle.js'
    },
    module: {
      loaders: [{
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
        use: [ 'style-loader', 'css-loader' ]
      }]
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ]}
}
