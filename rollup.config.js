import serve from "rollup-plugin-serve";
import css from 'rollup-plugin-css-only';
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import minify from 'rollup-plugin-babel-minify';
import replace from '@rollup/plugin-replace';
import conditional from "rollup-plugin-conditional";

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: "src/entries/index.js",
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
      css({ 
        output: 'bundle.index.css' 
      }),
      copy({
        targets: [
          { 
            src: 'node_modules/font-awesome/fonts/*', 
            dest: 'public/fonts'
          },
          {
            src: "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
            dest: "public/vendor/bootstrap",
          },
        ]
      }),
      // livereload({ watch: "dist" }), // websocket
      conditional(
        production, [
          minify({
            comments:false
          })
        ]
      )
    ]
  },
  {
    input: "src/entries/login.js",
    output: {
      file: production ? 'public/dist/bundle.login.min.js' : 'public/dist/bundle.login.js', 
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
      css({ 
        output: 'bundle.login.css' 
      }),
      // livereload({ watch: "dist" }), // websocket
      conditional(
        production, [
          minify({
            comments:false
          })
        ]
      )
    ]
  },
  {
    input: "src/entries/error.js",
    output: {
      file: production ? 'public/dist/bundle.error.min.js' : 'public/dist/bundle.error.js', 
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
      css({ 
        output: 'bundle.error.css' 
      }),
      // livereload({ watch: "dist" }), // websocket
      conditional(
        production, [
          minify({
            comments:false
          })
        ]
      )
    ]
  },
];