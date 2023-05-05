import { defineStore } from 'pinia'

export const menuStore = defineStore('adminMenu', {
	state: () => ({ menu: [], activeMenu: '', pageTitle: '', collapsed: false }),
	actions: {
		// 菜单当前激活页面的所有路径 []
		storeMenu(data: []) {
			this.menu = data
		},
		// 菜单当前激活的页面 title，string
		storeActiveMenu(data: string) {
			this.activeMenu = data
		},
		// 面包屑特殊显示 title，string
		storePageTitle(data: string) {
			this.pageTitle = data
		},
		// 菜单折叠存储，方便在页面布局变动的监听，例如首页的 echarts
		storeCollapsed(data: boolean) {
			this.collapsed = data
		},
	},
})
