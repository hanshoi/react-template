var conf = require('./package.json');

module.exports = function(config)
{
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [conf.vars.build_folder + "/" +conf.vars.test_bundle],
    exclude: [],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-mocha'
    ],
    singleRun: true
    });
};
