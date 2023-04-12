<template>
	<div class="tm-admin-layout">
		<!-- left -->
		<div class="tm-admin-layout-left">
			<!-- logo -->
			<nuxt-link to="/" class="tm-admin-layout-logo">
				<img src="/favicon.ico" width="40" height="40" />
				<span v-show="tmAdminLayoutLogoText">XXX 管理后台</span>
			</nuxt-link>
			<!-- menu -->
			<a-menu
				class="tm-admin-ant-menu"
				:openKeys="openKeys"
				:selectedKeys="selectedKeys"
				:inlineCollapsed="collapsed"
				mode="inline"
				@click="handleClick"
			>
				<template v-for="(item, index) in menuData" :key="index">
					<a-menu-item v-if="!item.children" :key="item.index">
						<template #icon>
							<HomeOutlined v-if="item.icon === 'HomeOutlined'" />
						</template>
						{{ item.title }}
					</a-menu-item>
					<a-sub-menu v-else :key="item.index">
						<template #icon>
							<TeamOutlined v-if="item.icon === 'TeamOutlined'" />
							<DeploymentUnitOutlined
								v-if="item.icon === 'DeploymentUnitOutlined'"
							/>
							<SettingOutlined v-if="item.icon === 'SettingOutlined'" />
							<ReconciliationOutlined
								v-if="item.icon === 'ReconciliationOutlined'"
							/>
						</template>
						<template #title>{{ item.title }}</template>
						<a-menu-item
							v-for="children in item.children"
							:key="children.index"
						>
							{{ children.title }}
						</a-menu-item>
					</a-sub-menu>
				</template>
			</a-menu>
		</div>
		<!-- right -->
		<div class="tm-admin-layout-right">
			<div class="tm-admin-layout-header">
				<a-button type="text" @click="toggleCollapsed">
					<MenuUnfoldOutlined v-if="collapsed" />
					<MenuFoldOutlined v-else />
				</a-button>
				<!-- page breadcrumb -->
				<client-only>
					<a-breadcrumb>
						<a-breadcrumb-item v-for="item in adminMenu.menu" :key="item.index">
							{{ item.title }}
						</a-breadcrumb-item>
					</a-breadcrumb>
				</client-only>
				<div class="flex-grow"></div>
				<!-- personal setting -->
				<a-dropdown class="tm-admin-layout-header-dropdown">
					<a @click.prevent>
						<a-avatar :size="36">
							<template #icon><UserOutlined /></template>
						</a-avatar>
						<span class="tm-admin-layout-header-dropdown-name">系统管理员</span>
						<DownOutlined />
					</a>
					<template #overlay>
						<ul class="tm-admin-layout-header-dropdown-ul">
							<li @click="setVisible = true">个人设置</li>
							<li @click="logoutConfirm">退出登录</li>
						</ul>
					</template>
				</a-dropdown>
			</div>
			<div class="tm-admin-layout-content"><slot /></div>
			<div class="tm-admin-layout-footer">合作单位：成都泰盟软件有限公司</div>
		</div>
		<!-- 个人设置抽屉内容 -->
		<a-drawer
			:visible="setVisible"
			class="tm-admin-layout-drawer"
			title="个人设置"
		>
			<div>
				<client-only>
					<a-form
						ref="formRef"
						:model="formState"
						name="basic"
						autocomplete="off"
						:label-col="{ span: 8 }"
						:wrapper-col="{ span: 16 }"
					>
						<a-form-item
							label="姓名"
							name="username"
							:rules="[{ required: true, message: '请输入用户名！' }]"
						>
							<a-input
								v-model:value="formState.username"
								:disabled="formState.loading"
							/>
						</a-form-item>
						<a-form-item label="登录名" name="name">
							<a-input :value="formState.name" disabled />
						</a-form-item>
						<a-form-item label="工号" name="name">
							<a-input v-model:value="formState.name" disabled />
						</a-form-item>
						<a-form-item label="性别" name="sex">
							<a-radio-group v-model:value="formState.sex">
								<a-radio :value="1">男</a-radio>
								<a-radio :value="0">女</a-radio>
							</a-radio-group>
						</a-form-item>
						<a-form-item label="密码管理" name="switch">
							<a-switch
								v-model:checked="formState.switch"
								checked-children="修改密码"
								un-checked-children="保持密码不变"
							/>
						</a-form-item>
						<template v-if="formState.switch">
							<a-form-item
								label="旧密码"
								name="password"
								:rules="[{ required: true, message: '请输入密码！' }]"
							>
								<a-input-password v-model:value="formState.password" />
							</a-form-item>
							<a-form-item
								label="新密码"
								name="password"
								:rules="[{ required: true, message: '请输入密码！' }]"
							>
								<a-input-password v-model:value="formState.password" />
							</a-form-item>
							<a-form-item
								label="确认密码"
								name="password"
								:rules="[{ required: true, message: '请输入密码！' }]"
							>
								<a-input-password v-model:value="formState.password" />
							</a-form-item>
						</template>
						<a-form-item :wrapper-col="{ span: 16, offset: 8 }">
							<a-button
								type="primary"
								:loading="formState.loading"
								@click="handleFinishSettings"
							>
								提交
							</a-button>
							<a-button :disabled="formState.loading" @click="handleCancel">
								取消
							</a-button>
						</a-form-item>
					</a-form>
				</client-only>
			</div>
		</a-drawer>
	</div>
</template>

<script setup lang="ts">
import {
	SettingOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	DownOutlined,
	UserOutlined,
	HomeOutlined,
	TeamOutlined,
	ReconciliationOutlined,
	DeploymentUnitOutlined,
	QuestionCircleOutlined,
} from '@ant-design/icons-vue'
import { createVNode } from 'vue'
import { MenuProps, message, Modal } from 'ant-design-vue'
import { menuStore } from '@/stores/admin.js'
import menuJson from '@/assets/json/menu.json'
const router = useRouter()
const route = useRoute()

useHead({
	title: 'XRS 管理后台',
})

interface menuType {
	title: string
	index: string
	key?: string
	icon?: string
	isMenu?: boolean
	children?: menuType[]
}

// 菜单数据
const openKeys = ref<string[] | any[] | undefined>([''])
const selectedKeys = ref<string[] | any[] | undefined>([''])
const menuData = reactive<menuType[]>(menuJson)

// 菜单选中监听
const handleClick: MenuProps['onClick'] = e => {
	router.replace({ path: e.key.toString() })
	if (e.keyPath) {
		setMenuActive([
			e.keyPath[0].toString(),
			(e.keyPath[1] && e.keyPath[1].toString()) || e.keyPath[0].toString(),
		])
	}
}

// 菜单展示方法, cookie 解决缩小的菜单选择非同级菜单后，展开时展开不正常的 bug
const cookieTmMenuActiveArray = useCookie('tm-menu-active-array')
const setMenuActive = (data: string[], is: Boolean = true) => {
	openKeys.value = [data[0]]
	selectedKeys.value = [data[1] || data[0]]
	if (is) cookieTmMenuActiveArray.value = JSON.stringify(data)
}

// 菜单展开/折叠
const collapsed = ref<boolean>(false)
const tmAdminLayoutLogoText = ref<boolean>(true)
const toggleCollapsed = () => {
	collapsed.value = !collapsed.value
}

// 防抖处理 logo 文字显示
let tmAdminLayoutLogoTextNum: number | null | undefined = null
watch(
	() => collapsed.value,
	val => {
		tmAdminLayoutLogoTextNum && clearTimeout(tmAdminLayoutLogoTextNum)
		if (val) {
			tmAdminLayoutLogoText.value = false
		} else {
			cookieTmMenuActiveArray.value &&
				setMenuActive(JSON.parse(cookieTmMenuActiveArray.value), false)
			tmAdminLayoutLogoTextNum = window.setTimeout(() => {
				tmAdminLayoutLogoText.value = true
			}, 300)
		}
	}
)

// 处理带单数据，返回路由高亮数据
const queryActiveMenu = (data: menuType[], path: string) => {
	return new Promise(resolve => {
		let menuParentIndex = ''
		let menuHeader: any[] = []
		const menuMap = (data: menuType[], path: string, level: number) => {
			data.map(element => {
				if (level === 1) {
					menuParentIndex = element.index
					menuHeader = []
					menuHeader.push(element)
				}
				if (element.index === path) {
					if (element.index !== menuHeader[0].index) {
						menuHeader.push(element)
					}
					resolve({
						title: menuHeader,
						route: [menuParentIndex, element.index],
					})
					throw new Error('jump')
				}
				if (element.children?.length) menuMap(element.children, path, 2)
			})
		}
		menuMap(data, path, 1)
	})
}

// 监听页面加载时，菜单高亮
const adminMenu = menuStore()
watch(
	() => route.path,
	path => {
		;(async () => {
			try {
				const res: any = await queryActiveMenu(menuJson, path)
				setMenuActive(res.route)
				adminMenu.setMenu(res.title)
			} catch (error) {}
		})()
	},
	{ immediate: true }
)

// 个人设置
const formRef = ref()
const setVisible = ref<boolean>(false)
interface FormState {
	username: string
	password: string
	switch: boolean
	loading: boolean
	sex: number
}
const formState = reactive<FormState>({
	username: 'zhangsan',
	password: '',
	loading: false,
	switch: false,
	sex: 1,
})
const handleFinishSettings = async () => {
	try {
		const data = await formRef.value.validate()
		console.log(data)
		const formData = toRaw(formState)
		console.log(formData)
		formState.loading = true
		setTimeout(() => {
			formState.loading = false
			setVisible.value = false
			message.success('编辑成功')
		}, 1500)
	} catch (error) {}
}
const handleCancel = () => {
	formRef.value.resetFields()
	setVisible.value = false
}
// 退出登录
const logoutConfirm = () => {
	Modal.confirm({
		title: '退出登录确认',
		content: '您确定退出登录当前账户吗？',
		icon: createVNode(QuestionCircleOutlined),
		okText: '退出',
		cancelText: '取消',
		onOk() {
			return new Promise<void>(resolve => {
				setTimeout(() => {
					const cookieTmToken = useCookie('tm-token')
					cookieTmToken.value = null
					router.replace({ path: '/login' })
					message.success('退出登录成功')
					resolve()
				}, 1500)
			})
		},
	})
}
</script>

<style lang="scss">
.tm-admin-layout {
	display: flex;
	height: 100vh;
	.tm-admin-layout-left {
		.tm-admin-layout-logo {
			display: flex;
			align-items: center;
			height: var(--layout-height);
			padding: var(--padding);
			color: var(--color-black);
			font-weight: bold;
			font-size: 18px;
			span {
				padding-left: var(--padding);
			}
		}
		.tm-admin-ant-menu {
			width: 200px;
			border-right: none;
			height: calc(100vh - var(--layout-height));
			overflow-y: auto;
			overflow-x: hidden;
			&.ant-menu-inline-collapsed {
				width: 60px;
			}
		}
	}

	.tm-admin-layout-right {
		flex: 1;
		width: calc(100vw - 200px);
		.tm-admin-layout-header {
			display: flex;
			align-items: center;
			height: var(--layout-height);
			.flex-grow {
				flex-grow: 1;
			}
			.tm-admin-layout-header-dropdown {
				padding-right: var(--padding);
				color: var(--color-black);
				.tm-admin-layout-header-dropdown-name {
					padding-left: var(--padding);
					padding-right: calc(var(--padding) / 2);
				}
			}
		}
		.tm-admin-layout-content {
			height: calc(
				100vh - var(--layout-height) - var(--layout-footer) - var(--padding)
			);
			overflow-y: auto;
			box-shadow: var(--box-shadow);
			margin: 0 var(--padding) var(--padding) 0;
			padding: calc(var(--padding) * 2);
		}
		.tm-admin-layout-footer {
			height: var(--layout-footer);
			line-height: var(--layout-footer);
			text-align: center;
			color: var(--color-hint);
		}
	}
}
.tm-admin-layout-drawer {
	button {
		margin-right: var(--padding);
	}
}
.tm-admin-layout-header-dropdown-ul {
	background: #fff;
	list-style-type: none;
	border-radius: calc(var(--padding) / 1.5);
	padding: 0;
	position: relative;
	box-shadow: var(--box-shadow);
	overflow: hidden;
	li {
		display: block;
		padding: var(--padding);
		border-bottom: solid 1px var(--color-border);
		text-align: center;
		cursor: pointer;
		&:last-child {
			border-bottom: none;
		}
		&:hover {
			background: var(--color-border);
		}
	}
}

// table
.table-search {
	margin-bottom: var(--padding);
	.ant-form-item-control-input {
		width: 160px;
	}
	.table-search-add {
		margin-top: var(--padding);
	}
}
.table-data {
	height: calc(100vh - var(--layout-height) - var(--layout-footer) - 127px);
	overflow: auto;
	.ant-table-pagination.ant-pagination {
		margin: var(--padding) 0 0 0;
	}
	.table-active {
		a {
			display: inline-block;
			margin: 0 calc(var(--padding) / 3);
		}
	}
}
</style>
