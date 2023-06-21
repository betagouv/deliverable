import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'

export default {
  input: './build/index.js',
  output: {
    file: './dist/deliverable.cjs',
    format: 'cjs',
  },
  plugins: [
    commonjs(),
    nodeResolve({
      preferBuiltins: true,
    }),
    json(),
    replace({
      'if (typeof navigator === "object" && "userAgent" in navigator)': 'if (false)',
      'if (navigator.userAgentData)': 'if (false)',
      'test(navigator.userAgent)': "test('')",
      delimiters: ['', ''],
    }),
  ],
}
