module.exports = {
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  "env": {
    "node": true,
    "es6": true
  },
  "rules": {
    "no-empty": "error",
    "no-multiple-empty-lines": "warn",
    "no-unused-vars": [
      "error",
      {
        "varsIgnorePattern": "should|expect"
      }
    ],
    "no-var": "error",
    "prefer-const": "error"
  }
};
