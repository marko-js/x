module.exports = {
  retainLines: true,
  presets: [
    [
      "@babel/env",
      {
        loose: true,
        targets: {
          node: "8"
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
