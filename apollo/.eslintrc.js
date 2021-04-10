module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
  plugins: ['@typescript-eslint', 'react-hooks', 'jest', 'prettier', 'react', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  rules: {
    semi: ['error', 'never'],
    'import/named': 'off',
    'import/export': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off', // Allow single Named-export
    'no-unused-expressions': [
      'warn',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    '@typescript-eslint/prefer-interface': 'off', // also want to use "type"
    '@typescript-eslint/explicit-function-return-type': 'off', // annoying to force return type
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    camelcase: 'warn',
    'prefer-destructuring': 'warn',
    'arrow-body-style': 'warn',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/forbid-prop-types': 'off',
    'react/sort-comp': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    // note you must disable the base rule as it can report incorrect errors
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
}
