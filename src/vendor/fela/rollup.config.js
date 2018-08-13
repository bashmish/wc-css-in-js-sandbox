import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify-es';

export default [
  {
    input: './src/vendor/fela/exports.js',
    output: {
      file: './vendor/fela.js',
      format: 'es',
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
      resolve(),
      commonjs(),
      uglify(),
    ]
  },
];
