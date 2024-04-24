module.exports = {
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-shadow': 'off',
    'no-underscore-dangle': ['error', { allow: ['__dirname'] }],
    'react/jsx-no-constructed-context-values': 'off',
    "extends": ["@babel/plugin-transform-private-property-in-object", "next/core-web-vitals"]

  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.d.ts', '.native.js'],
      },
    },
  },
};
