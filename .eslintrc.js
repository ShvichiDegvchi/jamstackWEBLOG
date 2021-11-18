module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'google',
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'linebreak-style': 0,
    'eol-last': 0,
    'max-len': 0,
    'object-shorthand': 0,
    'semi': ['error', 'always'],
    'vue/name-property-casing': 0,
    'vue/prop-name-casing': 0,
    'vue/no-v-html': 0,
    'vue/component-definition-name-casing': [
      'error',
      'kebab-case',
    ],
    'no-irregular-whitespace': 0,
  },
};
