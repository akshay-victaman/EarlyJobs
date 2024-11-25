require("ignore-styles");

require("@babel/register")({
  ignore: [/(node_modules)/],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-class-properties"
  ],
  extensions: [".js", ".jsx"]
});

require("./server");