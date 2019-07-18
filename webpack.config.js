const path = require('path');

module.exports = {
  // where is the base of our app located
  entry: path.resolve(__dirname, 'client/index.jsx'),
  output: {
    // what we want our bundle to be called
    filename: 'bundle.js',
    // where we want our bundle to live
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // exclude: /(node_modules|bower_components)/,
        // according to docs, they suggest to choose INCLUDE over EXCLUDE
        include: path.join(__dirname, './client'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  devtool: "eval-source-map"
};
