import json from 'rollup-plugin-json'

export default {
    input: './src/index.js',
    output: {
        name: 'SC',
        file: 'dist/canvas.js',
        format: 'iife'
    },
    plugins: [
        json({
            exclude: [ 'node_modules/**'],
            preferConst: true,
            compact: true,
        })
    ]
};