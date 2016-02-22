var PATHS = {
  app: "./frontend/javascript/app.js",
  build: "./backend/static/"
};

module.exports = {
  entry: {
    app: PATHS.app
  },

  // Add resolve.extensions.
  // '' is needed to allow imports without an extension.
  // Note the .'s before extensions as it will fail to match without!!!
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        // for sourcemaps you need to pass css?sourceMaps and sass?sourceMaps to loaders
        loaders: ['style', 'css', 'sass'],
        include: PATHS.app
      },

      // Set up jsx. This accepts js too thanks to RegExp
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: PATHS.app,
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
