const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "/public/js/eye-detactor.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public/js/dist/"),
  },
  devtool: "source-map",
};
