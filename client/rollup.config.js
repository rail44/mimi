import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';

export default {
  input: 'index.js',
  output: {
    file: 'bundle.js',
    format: 'es'
  },
  plugins: [
    resolve({
      module: true,
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs({
      namedExports: {
        'node_modules/inferno-component/index.js': ['Component'],
        'node_modules/inferno-redux/index.js': ['Provider', 'connect'],
        'node_modules/inferno-router/index.js': ['Router', 'Route'],
      },
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};
