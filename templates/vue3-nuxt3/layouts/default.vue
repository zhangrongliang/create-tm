<template>
	<a-config-provider :locale="locale">
		<div class="tm-admin-layout">
			<header class="tm-admin-layout-header">
				<!-- logo -->
				<nuxt-link to="/" class="tm-admin-layout-logo">
					<img src="/favicon.ico" width="40" height="40" />
					<h1>口口口 口口口口口口口口口口</h1>
				</nuxt-link>
				<div class="flex-grow"></div>
				<div class="tm-admin-layout-header-right" @click="setVisible = true">
					<span class="iconfont m-r-small">&#xe8b7;</span>
					系统管理员
				</div>
				<div class="tm-admin-layout-header-right" @click="logoutConfirm">
					<span class="iconfont m-r-small">&#xe654;</span>
					退出登录
				</div>
			</header>
			<!-- left -->
			<div class="tm-admin-layout-left">
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
								<span class="iconfont" v-html="item.icon"></span>
							</template>
							{{ item.title }}
						</a-menu-item>
						<a-sub-menu v-else :key="item.index">
							<template #icon>
								<span class="iconfont" v-html="item.icon"></span>
							</template>
							<template #title>
								{{ item.title }}
							</template>
							<a-menu-item
								v-for="children in item.children"
								:key="children.index"
							>
								<template #icon>
									<span class="iconfont" v-html="children.icon"></span>
								</template>
								{{ children.title }}
							</a-menu-item>
						</a-sub-menu>
					</template>
				</a-menu>
			</div>
			<!-- right -->
			<div
				class="tm-admin-layout-right"
				:class="{ 'tm-admin-layout-right-index ': isInexPage }"
			>
				<!-- breadcrumb -->
				<div
					class="tm-admin-layout-breadcrumb"
					:class="{
						'box-shadow-bottom': isInexPage && breadcrumbBoxShadowBottom,
					}"
				>
					<a-button type="text font-weight-bold" @click="toggleCollapsed">
						<span v-if="collapsed" class="iconfont m-r-small">&#xe717;</span>
						<span v-else class="iconfont m-r-small">&#xe718;</span>
					</a-button>
					<client-only>
						<a-breadcrumb>
							<a-breadcrumb-item
								v-for="(item, key) in adminMenu.menu"
								:key="key"
							>
								<nuxt-link
									v-if="
										!item.index.indexOf('/') && key < adminMenu.menu.length - 1
									"
									class="text-decoration"
									:to="item.index"
								>
									<span class="iconfont" v-html="item.icon"></span>
									{{ item.title }}
								</nuxt-link>
								<span v-else>
									<span class="iconfont" v-html="item.icon"></span>
									{{ item.title }}
								</span>
							</a-breadcrumb-item>
						</a-breadcrumb>
					</client-only>
					<span v-if="adminMenu.pageTitle" class="admin-menu-page-title">
						：{{ '<' + adminMenu.pageTitle + '>' }}
					</span>
					<div class="flex-grow"></div>
					<div class="tm-admin-layout-online-num">
						<span class="iconfont">&#xe633;</span>
						当前在线人数：1 人
					</div>
				</div>
				<div
					ref="tmAdminLayoutContent"
					class="tm-admin-layout-content"
					:class="{
						'no-index-page': !isInexPage,
					}"
				>
					<slot />
				</div>
				<admin-footer v-if="!isInexPage"></admin-footer>
			</div>
			<!-- 个人设置抽屉内容 -->
			<a-drawer
				v-model:visible="setVisible"
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
									class="m-r"
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
	</a-config-provider>
</template>

<script setup lang="ts">
import { MenuProps, message, Modal } from 'ant-design-vue'
import { menuStore } from '@/stores/admin.js'
import menuJson from '@/assets/json/menu.json'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
// eslint-disable-next-line import/no-named-as-default-member
dayjs.locale('zh-cn')

const locale = zhCN
const router = useRouter()
const route = useRoute()
const adminMenu = menuStore()

useHead({
	title: '口口口 管理后台',
})

interface menuType {
	title: string
	index: string
	level: number
	key?: string
	icon?: string
	isMenu?: boolean
	children?: menuType[]
}

// 首页判断
const isInexPage = ref(false)
// 当前展开的 SubMenu 菜单项 key 数组
const openKeys = ref<string[] | any[] | undefined>([''])
// 当前选中的菜单项 key 数组
const selectedKeys = ref<string[] | any[] | undefined>([''])
// 菜单数据
const menuData = reactive<menuType[]>(menuJson)

// 菜单选中监听
const handleClick: MenuProps['onClick'] = e => {
	router.push({ path: e.key.toString() })
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
	// 取一个表示每次只展开 1 个折叠
	openKeys.value = [data[0]]
	// 取一个表示每次只高亮 1 个菜单
	selectedKeys.value = [data[1] || data[0]]
	if (is) cookieTmMenuActiveArray.value = JSON.stringify(data)
}

// 菜单展开/折叠
const collapsed = ref<boolean>(false)
const toggleCollapsed = () => {
	collapsed.value = !collapsed.value
	adminMenu.storeCollapsed(collapsed.value)
}
// 组件功能优化-防抖处理菜单折叠到展开时，选择其他菜单的高亮效果
watch(
	() => collapsed.value,
	val => {
		if (!val) {
			cookieTmMenuActiveArray.value &&
				setMenuActive(JSON.parse(cookieTmMenuActiveArray.value), false)
		}
	}
)

// 处理菜单数据，返回菜单展开和高亮的数据组 []
const queryActiveMenu = (data: menuType[], path: string) => {
	return new Promise(resolve => {
		let menuParentIndex = ''
		let menuHeaderItems: any[] = []
		let level2Data: any = null

		/**
		 * @description:
		 * @param {*} data 菜单数据[]
		 * @param {*} path 地址栏路径
		 * @return {*} title 头部页面标题数组 []
		 * @return {*} route 菜单组件展开数组 []，下标 0 控制菜单展开，下标 1 控制菜单高亮，只有 0 时，展开自己并高亮
		 * @author: zhangrongliang
		 */
		const menuMap = (data: menuType[], path: string) => {
			data.map(item => {
				// 当菜单 level 等于 1 时，重置必要数据和赋值 level 1 级数据
				if (item.level === 1) {
					level2Data = null
					menuHeaderItems = []
					menuParentIndex = item.index
					menuHeaderItems.push(item)
				}
				if (item.index === path) {
					// 新的 level 2 ，清空数据
					if (item.level === 2) level2Data = null
					// level 3 ，添加 level 2 的数据
					if (level2Data && item.level === 3) {
						menuHeaderItems.push(level2Data)
					}
					// 因 level 1 时已经赋值，故排除 level 1
					if (item.level !== 1) menuHeaderItems.push(item)
					resolve({
						title: menuHeaderItems,
						route: [menuParentIndex, level2Data?.index || item.index],
					})
					throw new Error('jump')
				} else if (item.children?.length) {
					if (item.level === 2) {
						level2Data = item
					}
					menuMap(item.children, path)
				}
			})
		}
		menuMap(data, path)
	})
}

// index page 专用
const breadcrumbBoxShadowBottom = ref(false)
const tmAdminLayoutContent = ref()
const handleIndexScroll = () => {
	if (tmAdminLayoutContent.value.scrollTop >= 10) {
		breadcrumbBoxShadowBottom.value = true
	} else {
		breadcrumbBoxShadowBottom.value = false
	}
}

// 监听页面加载时，菜单高亮
watch(
	() => route.path,
	path => {
		if (path === '/') {
			isInexPage.value = true
			try {
				setTimeout(() => {
					tmAdminLayoutContent.value &&
						tmAdminLayoutContent.value.addEventListener &&
						tmAdminLayoutContent.value.addEventListener(
							'scroll',
							handleIndexScroll
						)
				}, 1000)
			} catch (error) {}
		} else {
			isInexPage.value = false
			breadcrumbBoxShadowBottom.value = false
			try {
				tmAdminLayoutContent.value.removeEventListener(
					'scroll',
					handleIndexScroll
				)
			} catch (error) {}
		}
		;(async () => {
			try {
				const res: any = await queryActiveMenu(menuJson, path)
				setMenuActive(res.route)
				adminMenu.storeMenu(res.title)
				adminMenu.storeActiveMenu(res.title.slice(-1)[0].title || '')
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
		okText: '退出',
		cancelText: '取消',
		maskClosable: true,
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
