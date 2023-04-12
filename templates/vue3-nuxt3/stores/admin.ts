import { defineStore } from 'pinia'

export const menuStore = defineStore('adminMenu', {
	state: () => ({ menu: [] }),
	actions: {
		setMenu(data: any) {
			this.menu = data
		},
	},
})
