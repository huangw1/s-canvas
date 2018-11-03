
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: './src/index.js',
    output: {
        name: 'SC',
        file: 'dist/canvas.js',
        format: "iife",
    },
    plugins: [
        resolve(),
        commonjs({
            include: 'node_modules/**',
        }),
        babel({
            exclude: 'node_modules/**',
            externalHelpers: false,
            runtimeHelpers: true
        }),
    ]
};