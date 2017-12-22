module.exports = {
  'parser': 'babel-eslint',
  'globals': {
    'process': true
  },
  'env': {
    'es6': true,
    'node': true,
    'browser': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'modules': true,
      'jsx': true
    },
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'indent': [
      'error',
      2,
      { "SwitchCase": 1 }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'eol-last': [
      'error',
      'always'
    ],
    'no-multi-spaces': [
      'error'
    ]
  }
}
