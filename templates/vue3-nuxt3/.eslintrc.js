module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	extends: [
		'@nuxtjs/eslint-config-typescript',
		'plugin:vue/vue3-recommended',
		'prettier',
	],
	plugins: [],
	// add your custom rules here
	ignorePatterns: ['http.ts', 'mock.js'],
	rules: {
		'vue/no-v-html': 'off',
		'vue/multi-word-component-names': 'off',
		'vue/no-multiple-template-root': 'off',
		'vue/attribute-hyphenation': 'off',
		'import/order': 'off',
		'no-console': 'off',
		'ypescript-eslint/no-unused-vars': 'off',
		'array-callback-return': 'off',
	},
}
