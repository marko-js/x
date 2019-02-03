module.exports = {
  presets: [
    [
      "@babel/env",
      {
        loose: true,
        targets: {
          node: "6"
        }
      }
    ]
  ],
  plugins: [
    "@babel/transform-runtime",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread"
  ],
  env: {
    test: {
      plugins: ["babel-plugin-istanbul"]
    }
  }
};
