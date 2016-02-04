module.exports = function(config)
{
  config.set({
    basePath: '',
    frameworks: ['browserify', 'mocha'],
    files: ['app/*.js'],
    exclude: [],
    preprocessors: {
      'app/*.js': ['browserify']
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
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
