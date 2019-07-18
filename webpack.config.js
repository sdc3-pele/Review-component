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

  /* Plugin that simplifies creation of HTML files to serve your bundles */
  // plugins: [
  //   new HtmlWebpackPlugin( /* line 15 is optional */
  //     template: '/public/index.html' /* you can add this line if you want to build a bundle based on html template. HtmlWebpackPlugin will create HTML based on template, add bundle/bundles as source scripts in that created HTML and and place it in output folder */
  // ],

  module: {
    rules: [
      {
        test: /\.jsx?$/, /* /\.(js|jsx)$/ -  if you have js files as well */
        // exclude: /(node_modules|bower_components)/,
        // according to docs, they suggest to choose INCLUDE over EXCLUDE
        include: path.join(__dirname, './client'),
        use: {
          loader: 'babel-loader', /* This package allows transpiling JavaScript files using Babel and webpack. */
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
      }
      // { /* no need if use react-styled-components */
      //   // Preprocess our own .css files
      //   // This is the place to add your own loaders (e.g. sass/less etc.)
      //   // for a list of loaders, see https://webpack.js.org/loaders/#styling
      //   test: /\.css$/,
      //   include: /node_modules/,
      //   use: ['style-loader', 'css-loader']
      // }
    ],
  },
  devtool: "eval-source-map"
};
