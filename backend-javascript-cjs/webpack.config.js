const path = require('path');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  return {
    mode: isProduction ? 'production' : 'development',
    target: 'node',
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
// const CopyPlugin = require('copy-webpack-plugin');

// module.exports = (env, argv) => {
//   const isProduction = argv.mode === 'production';

//   return {
//     mode: isProduction ? 'production' : 'development',
//     target: 'node',
//     entry: './src/server.js',
//     output: {
//       filename: 'bundle.js',
//       path: path.resolve(__dirname, 'dist'),
//     },
//     devtool: isProduction ? false : 'source-map',
//     optimization: {
//       minimize: isProduction,
//     },
//     plugins: [
//       new CopyPlugin({
//         patterns: [
//           {
//             from: path.resolve(__dirname, 'node_modules/swagger-ui-dist'),
//             to: path.resolve(__dirname, 'dist/swagger-ui-dist'),
//           },
//         ],
//       }),
//     ],
//   };
// };


// // const path = require('path');

// // module.exports = (env, argv) => {
// //   const isProduction = argv.mode === 'production';
// //   return {
// //     mode: isProduction ? 'production' : 'development',
// //     target: 'node',
// //     entry: './src/server.js',
// //     output: {
// //       filename: 'bundle.js',
// //       path: path.resolve(__dirname, 'dist'),
// //     },
// //     devtool: isProduction ? false : 'source-map',
// //     optimization: {
// //       minimize: isProduction,
// //     },
// //   };
// // };

