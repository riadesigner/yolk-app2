// eslint.config.js
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';

export default [
	// Базовые правила ESLint
	js.configs.recommended,

	// React правила
	{
		files: ['**/*.js', '**/*.jsx'],
		plugins: {
			react,
			'react-hooks': reactHooks,
			prettier,
		},
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: 'module',
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				browser: true,
				node: true,
				es2021: true,
			},
		},
		rules: {
			...react.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			'prettier/prettier': 'error',
			'react/react-in-jsx-scope': 'off',
			'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
];