module.exports = {
  "parser": "babel-eslint",
  "plugins": ["react"],
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true,
    "jest": true,
    "es6": true
  },
  "rules": {
    "quotes": [2, "single"],
    semi: [2, "never"]
  }
}