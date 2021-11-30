import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import minify from 'rollup-plugin-babel-minify';
import replace from '@rollup/plugin-replace';
import conditional from "rollup-plugin-conditional";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/index.js",
  output: {
    file: production ? 'public/dist/bundle.index.min.js' : 'public/dist/bundle.index.js', 
    format: "iife",
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      extensions: [".js"],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'development' ),
    }),
    babel({
      presets: ["@babel/preset-react"],
      exclude:'node_modules/**',
      babelHelpers: 'bundled'
    }),
    commonjs(),
    serve({
      //open: true,
      verbose: true,
      contentBase: ["", "public"],
      host: "localhost",
      port: 3000,
    }),
    livereload({ watch: "dist" }),
    conditional(production, [
      minify({
        comments:false
      })
    ])
  ]
};