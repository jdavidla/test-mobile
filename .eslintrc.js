module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: none,
        jsxBracketSameLine: false,
        bracketSpacing: true,
        endOfLine: auto,
        jsxSingleQuote: false,
        semi: false
      }
    ]
  }
}
