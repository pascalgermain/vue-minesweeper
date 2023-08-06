const productionMode = process.env.NODE_ENV === 'production'

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/typescript/recommended', 'plugin:prettier/recommended'],
  plugins: ['simple-import-sort'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': productionMode ? 'warn' : 'off',
    'no-debugger': productionMode ? 'warn' : 'off',
    'vue/component-name-in-template-casing': ['warn', 'PascalCase', { registeredComponentsOnly: false }],
    'vue/multi-word-component-names': 'off',
    'vue/no-v-text': 'error',
    'import/no-duplicates': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': [
      'warn',
      {
        // https://github.com/lydell/eslint-plugin-simple-import-sort#custom-grouping
        // https://github.com/lydell/eslint-plugin-simple-import-sort/blob/main/examples/.eslintrc.js
        groups: [
          ['^\\u0000'], // side effect imports
          ['^@vue', '^vue', '^@?\\w'], // starting starting with @vue, with vue, other "external" modules
          ['^@/(?!components/)'], // NOT starting with {alias}/components
          ['^', '^\\.'], // the rest, relative imports (starting wit a dot)
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
  },
}
