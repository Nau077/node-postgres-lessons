const { off } = require("process");

module.exports = {
  "env": {
      "browser": true,
      "commonjs": true,
      "es6": true
  },
  "parser":"babel-eslint",
  "extends": ["plugin:prettier/recommended"],
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
      "ecmaVersion": 2018
  },
  "rules": {
    "semi": [2, "always"],
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }]
  }
};