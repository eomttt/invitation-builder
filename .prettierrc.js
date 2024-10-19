module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  useTabs: false,
  jsxSingleQuote: false,
  plugins: [require.resolve('@ianvs/prettier-plugin-sort-imports')],
  importOrder: [
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '',
    '^\\.\\.',
    '',
    '^[.]',
  ],
};
