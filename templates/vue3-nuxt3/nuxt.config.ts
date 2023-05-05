// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: ['~ant-design-vue/dist/antd.less', '@/assets/less/base.less'],
	modules: ['@pinia/nuxt', '@nuxt/image-edge'],
	vite: {
		// js 内联
		css: {
			preprocessorOptions: {
				less: {
					modifyVars: {
						'primary-color': '#1E85D1', // 全局主色
						'link-color': '#1E85D1;', // 链接色
						'success-color': '#4AD7A6;', // 成功色
						'warning-color': '#faad14;', // 警告色
						'error-color': '#f5222d;', // 错误色
						'font-size-base': '14px;', // 主字号
						'heading-color': 'rgba(0, 0, 0, 0.85);', // 标题色
						'text-color': 'rgba(0, 0, 0, 0.65);', // 主文本色
						'text-color-secondary': 'rgba(0, 0, 0, 0.45);', // 次文本色
						'disabled-color': 'rgba(0, 0, 0, 0.25);', // 失效色
						'border-radius-base': '6px;', // 组件/浮层圆角
						'border-color-base': '#f0f0f0;', // 边框色
						'box-shadow-base': '0 2px 8px rgba(0,0,0,.1);', // 浮层阴影
						'box-shadow-bottom': '8px 0px 8px 0 rgba(0,0,0,0.1)', // 底部-浮层阴影
						padding: '10px;',
						'color-bg': '#fff;',
						'layout-footer': '32px',
						'layout-height': '55px;',
					},
					javascriptEnabled: true,
				},
			},
		},
		resolve: {
			alias: [
				{
					find: /^~/,
					replacement: '',
				},
			],
		},
	},
	webpack: {
		extractCSS: true,
	},
	runtimeConfig: {
		public: {
			apiBase: '',
		},
	},
})
