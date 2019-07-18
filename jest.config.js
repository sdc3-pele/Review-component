module.exports = {
  verbose: true,
  setupFilesAfterEnv: ['./client/setup-enzyme-adapter.js'],
  transform: {
    // "^.+\\.js$": "babel-jest", /* optional */
    '^.+\\.jsx?$': 'babel-jest'
  },
  /* configure Jest to gracefully handle asset files such as stylesheets and images. Usually, these files aren't particularly useful in tests so we can safely mock them out. However, if you are using CSS Modules then it's better to mock a proxy for your className lookups. And the mock files themselves (reference https://jestjs.io/docs/en/webpack)*/
  // "moduleNameMapper": {
  //   "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
  //   "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
  // }
};
