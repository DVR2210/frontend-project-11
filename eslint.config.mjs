// import globals from 'globals'
// import pluginJs from '@eslint/js'
// import stylisticJs from '@stylistic/eslint-plugin-js'

// export default [
//   {
//     ignores: ['node_modules/**', 'dist/**', 'coverage/**'],
//   },
//   {
//     files: ['**/*.{js,mjs,cjs}'],
//     languageOptions: {
//       globals: {
//         ...globals.browser,
//         ...globals.node,
//       },
//       ecmaVersion: 'latest',
//       sourceType: 'module',
//     },
//   },
//   pluginJs.configs.recommended,
//   {
//     plugins: {
//       '@stylistic': stylisticJs,
//     },
//     rules: {
//       '@stylistic/semi': ['error', 'always'],
//       '@stylistic/indent': ['error', 2],
//       '@stylistic/quotes': ['error', 'single'],
//       '@stylistic/no-trailing-spaces': 'error',
//       '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }],
//       '@stylistic/eol-last': ['error', 'always'],
//       '@stylistic/object-curly-spacing': ['error', 'always'],
//       '@stylistic/arrow-parens': ['error', 'as-needed'],
//     },
//   },
// ]
import globals from 'globals'
import pluginJs from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    env: {
      node: true, // Явно указываем поддержку Node.js
      browser: true,
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      '@stylistic': stylisticJs,
    },
    rules: {
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/indent': ['error', 2], // Указывает 2 пробела, что может быть причиной других ошибок
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/arrow-parens': ['error', 'as-needed'],
    },
  },
]
