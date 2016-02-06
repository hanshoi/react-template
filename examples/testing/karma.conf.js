module.exports = function(config)
{
  config.set({
    basePath: '',
    frameworks: ['browserify', 'mocha'],
    files: ['app/test.js'],
    exclude: ['app/build.js'],
    preprocessors: {
      'app/test.js': ['browserify']
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    autoWatchBatchDelay: 5000,   // delay execution of tests for 5s
    browsers: ['Chrome'],
    browserify: {
      debug: true,
      transform: ["reactify"]
    },
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-mocha','karma-bro'
    ],
    singleRun: true
    });
};
