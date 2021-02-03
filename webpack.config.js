const path = require('path')

module.exports = {
  devtool: 'source-map',
  // this is for await in index.js
  experiments: { topLevelAwait: true },
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
      // use this to make code es5 compatible
      // },
      // {
      //   test: /\.js$/,
      //   use: ['babel-loader']
      // }
    ]
  }
}
