module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    project: ['./tsconfig.json','./tsconfig.eslint.json', './tsconfig.docks.json']
  },
  rules: {
    "prettier/prettier": "error",
    "react/function-component-definition": [2, { "namedComponents": "arrow-function" }],
    "@typescript-eslint/no-unsafe-assignment": "off",
    "no-underscore-dangle": ["error", { "allow": ["_id"] }]
  },
  root: true,
};
