'use strict';

const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    target: 'node',
    externals: [nodeExternals()],
    entry: './src/server.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: isProduction ? false : 'source-map',
    optimization: {
      minimize: isProduction,
    },
  };
};



// const path = require('path');
// const Dotenv = require('dotenv-webpack');

// module.exports = {
//   mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
//   target: 'node',
//   entry: './src/server.js',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
//   plugins: [
//     new Dotenv({
//       path: process.env.NODE_ENV === 'production' 
//         ? '.env.production' 
//         : '.env.development',
//     }),
//   ],
// };

// const path = require('path');

// module.exports = {
//   mode: 'production',
//   target: 'node',
//   entry: './src/server.js',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
// };
