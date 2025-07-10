import path from "path";

export default {
  entry: "./src/server.js",
  output: {
    path: path.resolve("dist"),
    filename: "bundle.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  target: "node",
  mode: "production",
  resolve: {
    alias: {
      sequelize: path.resolve("node_modules/sequelize")
    },
    fallback: {
      fs: false,
      path: false,
      crypto: false
    }
  },
  optimization: {
    minimize: false 
  },
  stats: {
    errorDetails: true
  },
  experiments: {
    outputModule: true
  }
};


// import path from "path";

// export default {
//   entry: "./src/server.js",
//   output: {
//     path: path.resolve("dist"),
//     filename: "bundle.js"
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader"
//         }
//       }
//     ]
//   },
//   target: "node",
//   mode: "production",
//   experiments: {
//     outputModule: true
//   },
// };
