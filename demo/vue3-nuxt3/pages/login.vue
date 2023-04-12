<template>
	<div class="tm-login">
		<div>
			<h1>XXX 管理后台</h1>
			<a-form
				:model="formState"
				name="basic"
				autocomplete="off"
				@finish="onFinish"
			>
				<a-form-item
					name="username"
					:rules="[{ required: true, message: '请输入用户名！' }]"
				>
					<a-input v-model:value="formState.username">
						<template #prefix>
							<user-outlined />
						</template>
					</a-input>
				</a-form-item>
				<a-form-item
					name="password"
					:rules="[{ required: true, message: '请输入密码！' }]"
				>
					<a-input-password v-model:value="formState.password">
						<template #prefix>
							<unlock-outlined />
						</template>
					</a-input-password>
				</a-form-item>
				<a-form-item>
					<a-button
						type="primary"
						htmlType="submit"
						:loading="formState.loading"
						block
					>
						登录
					</a-button>
				</a-form-item>
			</a-form>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { UserOutlined, UnlockOutlined } from '@ant-design/icons-vue'

const router = useRouter()

definePageMeta({
	layout: false,
})

useHead({
	title: 'XRS-登录',
})

// 未登录跳转登录页
const cookieTmToken = useCookie('tm-token')
if (cookieTmToken.value) router.replace({ path: '/' })

interface FormState {
	username: string
	password: string
	loading: boolean
}
const formState = reactive<FormState>({
	username: '',
	password: '',
	loading: false,
})
const onFinish = () => {
	formState.loading = true
	setTimeout(() => {
		cookieTmToken.value = 'token'
		formState.loading = false
		const data = toRaw(formState)
		console.log(data)
		router.replace({ path: '/' })
	}, 1500)
}
</script>

<style lang="scss" scoped>
.tm-login {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	flex-wrap: wrap;
	h1,
	h3 {
		text-align: center;
	}
}
</style>
