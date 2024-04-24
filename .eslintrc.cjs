module.exports = {
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-shadow': 'off',
    'no-underscore-dangle': ['error', { allow: ['__dirname'] }],
    'react/jsx-no-constructed-context-values': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.d.ts', '.native.js'],
      },
    },
  },
};
