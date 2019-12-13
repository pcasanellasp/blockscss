module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  "extends": "standard",
  // add your custom rules here
  rules: {
    'no-console': ['error', { 'allow': ['info', 'warn', 'error'] }],
  },
}