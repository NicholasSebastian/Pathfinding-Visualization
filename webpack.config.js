module.exports = {
  entry: ["@babel/polyfill", "./scripts/main.js"],
  output: {
    path: __dirname,
    filename: "./build/bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js?$/, // Regex that looks at all javascript files.
        exclude: /node_modules/, // Ignore the node modules folder.
        loader: "babel-loader", // Use the Babel loader.
        query: {
          presets: ["@babel/preset-env"], // Define the Babel transpiler preset.
        },
      },
    ],
  },
  mode: "development",
  devServer: {
    port: 3000,
  },
};
