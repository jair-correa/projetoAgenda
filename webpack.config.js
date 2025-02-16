const path = require("path"); // CommonJS

module.exports = {
  mode: "production",
  entry: "./frontend/main.js",
  output: {
    path: path.resolve(__dirname, "public", "assets", "js"),
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.css$/, // Processa arquivos CSS
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/, // Processa arquivos JS com Babel
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"]
          }
        }
      }
    ]
  },

  devtool: "source-map"
};
