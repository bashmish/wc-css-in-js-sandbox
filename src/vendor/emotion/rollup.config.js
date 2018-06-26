import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [
  {
    input: './src/vendor/emotion/exports.js',
    output: {
      file: './vendor/emotion.js',
      format: 'es',
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      resolve(),
      commonjs(),
    ]
  },
];
