// @ts-check

import js from '@eslint/js'
import ts from 'typescript-eslint'
import react from 'eslint-plugin-react'
import hooks from 'eslint-plugin-react-hooks'
import testingLibrary from 'eslint-plugin-testing-library'
import prettier from 'eslint-config-prettier'
import jest from 'eslint-plugin-jest'
import globals from 'globals'

export default [
  js.configs.recommended,
  ...ts.configs.strictTypeChecked,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  prettier,
  {
    plugins: {
      'react-hooks': hooks,
    },
    rules: {
      ...hooks.configs.recommended.rules,
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    rules: {
      'no-console': 'error',
      'object-shorthand': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
  {
    files: ['**/*.test.[jt]s?(x)', '**/testUtils/**'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    ...jest.configs['flat/recommended'],
    ...testingLibrary.configs['flat/react'],
  },
  { ignores: ['**/fileTransformer.js', '**/fileMock.js', '**/mockApcaW3.js'] },
]
