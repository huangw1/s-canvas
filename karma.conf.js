const rollupPluginBundle = require('rollup-plugin-buble')

module.exports = function(config) {
    config.set({
        basePath: '',
        files: [{
            pattern: 'test/**/*.spec.js',
            watched: false
        }],
        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        preprocessors: {
            './test/**/*.js': ['rollup']
        },
        rollupPreprocessor: {
            plugins: [
                rollupPluginBundle(),
            ],
            output: {
                format: 'iife',
                name: 'SC',
                sourcemap: 'inline'
            }
        }
    })
}