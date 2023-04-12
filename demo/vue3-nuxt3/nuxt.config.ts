// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: ['@/assets/scss/base.scss'],
	modules: ['@pinia/nuxt'],
	webpack: {
		extractCSS: true,
	},
	runtimeConfig: {
		public: {
			apiBase: '',
		},
	},
})
