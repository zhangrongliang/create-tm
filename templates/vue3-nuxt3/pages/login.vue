<template>
	<div class="tm-login">
		<div class="login-form">
			<h1>口口口口口口口口口口</h1>
			<h5>欢迎使用 口口口</h5>
			<a-form
				:model="formState"
				name="basic"
				autocomplete="off"
				@finish="onFinish"
			>
				<label for="username">账户</label>
				<a-form-item
					name="username"
					:rules="[{ required: true, message: '请输入账户！' }]"
				>
					<a-input
						id="username"
						v-model:value="formState.username"
						:maxlength="50"
						placeholder="账户"
					>
						<template #prefix>
							<span class="iconfont font-weight-bold">&#xe634;</span>
						</template>
					</a-input>
				</a-form-item>
				<label for="password">密码</label>
				<a-form-item
					name="password"
					:rules="[{ required: true, message: '请输入密码！' }]"
				>
					<a-input-password
						id="password"
						v-model:value="formState.password"
						:maxlength="50"
						placeholder="密码"
					>
						<template #prefix>
							<span class="iconfont font-weight-bold">&#xe695;</span>
						</template>
					</a-input-password>
				</a-form-item>
				<div class="login-switch">
					<a-switch v-model:checked="formState.checked" />
					<span>保存登录信息，下次自动登录</span>
				</div>
				<a-form-item>
					<a-button
						type="primary"
						htmlType="submit"
						:loading="formState.loading"
						block
					>
						<span class="iconfont m-r-small font-weight-bold">&#xe653;</span>
						登录
					</a-button>
				</a-form-item>
			</a-form>
		</div>
		<div class="login-logo">
			<nuxt-img
				format="webp"
				src="/images/login.png"
				preload
				width="500"
				height="500"
				sizes="xs:500px"
			/>
		</div>
	</div>
	<admin-footer></admin-footer>
</template>
<script lang="ts" setup>
const router = useRouter()

definePageMeta({
	layout: false,
})

useHead({
	title: '口口口-登录',
})

interface FormState {
	username: string
	password: string
	loading: boolean
	checked: boolean
}
const formState = reactive<FormState>({
	username: '',
	password: '',
	loading: false,
	checked: false,
})
const onFinish = () => {
	formState.loading = true
	setTimeout(() => {
		const cookieTmToken = useCookie('tm-token')
		cookieTmToken.value = 'token'
		formState.loading = false
		const data = toRaw(formState)
		console.log(data)
		router.replace({ path: '/' })
	}, 1500)
}
</script>

<style lang="less">
.tm-login {
	display: flex;
	// justify-content: center;
	align-items: center;
	height: calc(100vh - @layout-footer);
	width: 100%;
	padding: 0 calc(@padding * 2);
	.login-form {
		margin-left: 20%;
		width: 420px;
		@defaultNum: 20%;
		@defaultTime: 8s;
		h1 {
			font-size: 42px;
			margin-bottom: 0;
			&::before {
				content: '口口口口口口口口口口';
				animation: login-slide-h1 @defaultTime ease 0s infinite;
			}
		}
		h5 {
			font-weight: 400;
			color: @text-color;
			font-size: 20px;
			margin-bottom: @padding;
			&::before {
				content: '欢迎使用 口口口';
				animation: login-slide-h5 @defaultTime ease 0s infinite;
			}
		}
		h1,
		h5 {
			position: relative;
			line-height: 2;
			&::before {
				background: @primary-color;
				color: #fff;
				overflow: hidden;
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				clip-path: polygon(0 0, @defaultNum 0, @defaultNum 100%, 0 100%);
			}
			@keyframes login-slide-h1 {
				0% {
					clip-path: polygon(0 0, @defaultNum 0, @defaultNum 100%, 0 100%);
				}
				35% {
					clip-path: polygon(
						calc(100% - @defaultNum) 0,
						100% 0,
						100% 100%,
						calc(100% - @defaultNum) 100%
					);
				}
				50% {
					clip-path: polygon(
						calc(100% - @defaultNum) 100%,
						100% 100%,
						100% 100%,
						calc(100% - @defaultNum) 100%
					);
				}
				85% {
					clip-path: polygon(
						0 100%,
						@defaultNum 100%,
						@defaultNum 100%,
						0 100%
					);
				}
				to {
					clip-path: polygon(0 0, @defaultNum 0, @defaultNum 100%, 0 100%);
				}
			}
			@keyframes login-slide-h5 {
				0% {
					clip-path: polygon(0 0, @defaultNum 0, @defaultNum 0, 0 0);
				}
				35% {
					clip-path: polygon(
						calc(100% - @defaultNum) 0,
						100% 0,
						100% 0,
						calc(100% - @defaultNum) 0
					);
				}
				50% {
					clip-path: polygon(
						calc(100% - @defaultNum) 0,
						100% 0,
						100% 100%,
						calc(100% - @defaultNum) 100%
					);
				}
				85% {
					clip-path: polygon(0 0, @defaultNum 0, @defaultNum 100%, 0 100%);
				}
				to {
					clip-path: polygon(0 0, @defaultNum 0, @defaultNum 0, 0 0);
				}
			}
		}
		label {
			display: block;
			font-weight: bold;
			margin-bottom: @padding;
		}
		input {
			line-height: 30px;
			background-color: #fff;
		}
		.login-switch {
			display: flex;
			align-items: center;
			margin-bottom: calc(@padding * 2);
			span {
				padding-left: @padding;
			}
		}
		.ant-btn {
			height: 40px;
		}
	}
	.login-logo {
		flex: 1;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		img {
			width: 100%;
			max-width: 500px;
			object-fit: contain;
			filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.15));
		}
	}
}
</style>
