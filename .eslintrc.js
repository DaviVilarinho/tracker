module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 'off',
    '@vuejs-accessibility/form-control-has-label': 'off',
    'max-len': 'off',
    'vue/max-len': 'off',
    'vue/no-unused-vars': 'warn',
    'vuejs-accessibility/label-has-for': 'off',
  },
};
