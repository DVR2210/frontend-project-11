// import globals from "globals";
// import pluginJs from "@eslint/js";
// import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
// import { fixupConfigRules } from "@eslint/compat";

// export default [
//   {files: ["**/*.{js,mjs,cjs,jsx}"]},
//   { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
//   ...fixupConfigRules(pluginReactConfig),
// ];

// import globals from 'globals';
// import pluginJs from '@eslint/js';
// import stylisticJs from '@stylistic/eslint-plugin-js';

// export default [
//   { files: ['**/*.{js,mjs,cjs}'] }, // Убрали .jsx, так как React не используется
//   {
//     languageOptions: {
//       globals: globals.browser,
//       ecmaVersion: 'latest',
//       sourceType: 'module',
//     },
//   },
//   pluginJs.configs.recommended, // Базовые правила ESLint
//   {
//     plugins: {
//       '@stylistic': stylisticJs, // Добавляем плагин для стилистических правил
//     },
//     rules: {
//       //'semi': 'off', // Отключаем базовое правило - как вариант!
//       '@stylistic/semi': ['error', 'always'], // Требуем точки с запятой
//       '@stylistic/indent': ['error', 2], // Отступы 2 пробела
//       '@stylistic/quotes': ['error', 'single'], // Одинарные кавычки
//       '@stylistic/no-trailing-spaces': 'error', // Запрещаем пробелы в конце строк
//       '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }], // Не более 1 пустой строки
//       '@stylistic/eol-last': ['error', 'always'], // Требуем пустую строку в конце файла
//       '@stylistic/object-curly-spacing': ['error', 'always'], // Пробелы внутри фигурных скобок
//       '@stylistic/arrow-parens': ['error', 'as-needed'], // Скобки в стрелочных функциях только при необходимости
//     },
//   },
// ];

import globals from 'globals';
import pluginJs from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**'], // Добавляем игнорирование
  },
  {
    files: ['**/*.{js,mjs,cjs}'], // Убрали .jsx, так как React не используется
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // Добавляем globals.node для webpack.config.js
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  pluginJs.configs.recommended, // Базовые правила ESLint
  {
    plugins: {
      '@stylistic': stylisticJs, // Плагин для стилистических правил
    },
    rules: {
      '@stylistic/semi': ['error', 'always'], // Требуем точки с запятой
      '@stylistic/indent': ['error', 2], // Отступы 2 пробела
      '@stylistic/quotes': ['error', 'single'], // Одинарные кавычки
      '@stylistic/no-trailing-spaces': 'error', // Запрещаем пробелы в конце строк
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }], // Не более 1 пустой строки
      '@stylistic/eol-last': ['error', 'always'], // Требуем пустую строку в конце файла
      '@stylistic/object-curly-spacing': ['error', 'always'], // Пробелы внутри фигурных скобок
      '@stylistic/arrow-parens': ['error', 'as-needed'], // Скобки в стрелочных функциях только при необходимости
    },
  },
];
