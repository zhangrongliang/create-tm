<template>
	<!-- search  -->
	<div class="table-search">
		<a-form
			layout="inline"
			:model="formSearch"
			autocomplete="off"
			:label-col="{ span: 7 }"
			:wrapper-col="{ span: 17 }"
		>
			<a-form-item label="班级" name="class">
				<a-select v-model:value="formSearch.class">
					<a-select-option value="">全部</a-select-option>
					<a-select-option value="2023">2023</a-select-option>
					<a-select-option value="2024">2024</a-select-option>
					<a-select-option value="2025">2025</a-select-option>
				</a-select>
			</a-form-item>
			<a-form-item label="名称" name="name">
				<a-input v-model:value="formSearch.name" />
			</a-form-item>
			<a-button
				type="primary"
				:loading="formSearch.loading"
				@click="fetchData(1)"
			>
				<template #icon><SearchOutlined /></template>
				提交
			</a-button>
		</a-form>
		<div class="table-search-add">
			<a-button
				size="small"
				@click="
					() => {
						formModal.visible = true
						formModal.title = '添加学生'
					}
				"
			>
				<template #icon><PlusOutlined /></template>
				添加学生
			</a-button>
		</div>
	</div>
	<!-- table  -->
	<a-table
		class="table-data"
		:data-source="dataSource"
		:columns="columns"
		:pagination="pagination"
		:loading="formSearch.loading"
		sticky
	/>
	<!-- 弹窗 -->
	<a-modal
		v-model:visible="formModal.visible"
		:title="formModal.title"
		okText="提交"
		cancelText="取消"
		:confirm-loading="formModal.loading"
		@ok="handleModel"
		@cancel="handleCancel"
	>
		<a-form
			ref="formModalRef"
			:model="formModal"
			name="basic"
			autocomplete="off"
			:label-col="{ span: 3 }"
			:wrapper-col="{ span: 21 }"
		>
			<a-form-item
				label="班级"
				name="class"
				:rules="[{ required: true, message: '请选择班级！' }]"
			>
				<a-select v-model:value="formModal.class">
					<a-select-option value="2023">2023</a-select-option>
					<a-select-option value="2024">2024</a-select-option>
					<a-select-option value="2025">2025</a-select-option>
				</a-select>
			</a-form-item>
			<a-form-item
				label="姓名"
				name="name"
				:rules="[{ required: true, message: '请输入姓名！' }]"
			>
				<a-input v-model:value="formModal.name" />
			</a-form-item>
			<a-form-item
				label="学号"
				name="number"
				:rules="[{ required: true, message: '请输入学号！' }]"
			>
				<a-input v-model:value="formModal.number" />
			</a-form-item>

			<a-form-item label="性别" name="sex">
				<a-radio-group v-model:value="formModal.sex">
					<a-radio :value="1">男</a-radio>
					<a-radio :value="0">女</a-radio>
				</a-radio-group>
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script setup lang="ts">
import { SearchOutlined, PlusOutlined } from '@ant-design/icons-vue'
import { fetchClass } from '~/fetch/http'
import { message, Modal } from 'ant-design-vue'

const router = useRouter()

useHead({
	title: 'XRS 管理后台',
})

onMounted(() => {
	fetchData()
})

// search
const formSearch = reactive({
	class: '',
	name: '',
	number: '',
	loading: false,
})

// table data
const dataSource = ref<any>([])
const fetchData = async (currentPage?: number | undefined) => {
	formSearch.loading = true
	try {
		const data: any = await fetchClass({
			currentPage: currentPage || 1,
			...toRaw(formSearch),
		})
		pagination.current = currentPage || 1
		pagination.total = data.total
		dataSource.value = data.data
		formSearch.loading = false
	} catch (error) {
		formSearch.loading = false
	}
}

// 分页配置  https://next.antdv.com/components/pagination-cn/
const pagination = reactive({
	current: 1,
	total: 0,
	showSizeChanger: false,
	position: ['bottomCenter'],
	onChange: (page: number) => fetchData(page),
})

// table 列
const columns = reactive<any[]>([
	{
		title: '名称',
		dataIndex: 'name',
		key: 'name',
		width: 300,
	},

	{
		title: '班级',
		dataIndex: 'class',
		key: 'class',
	},
	{
		title: '教师',
		dataIndex: 'teacher',
		key: 'teacher',
	},
	{
		title: '创建时间',
		dataIndex: 'date',
		key: 'date',
	},
	// {
	// 	title: '性别',
	// 	dataIndex: 'sex',
	// 	key: 'sex',
	// 	customRender: (row: any) => h('div', row.record.sex ? '男' : '女'),
	// },
	{
		title: '操作',
		dataIndex: 'active',
		key: 'active',
		customRender: (row: any) => {
			const data = toRaw(row.record)
			return h('div', { class: 'table-active' }, [
				h(
					'a',
					{
						onClick: () => {
							router.push({
								path: '/class-vr',
								query: {
									id: Math.floor(Math.random() * 10 + 1),
								},
							})
						},
					},
					'VR 管理'
				),
				h(
					'a',
					{
						onClick: () => {
							formModal.title = '编辑学生'
							formModal.class = data.class
							formModal.name = data.name
							formModal.number = data.number
							formModal.sex = data.sex
							formModal.visible = true
						},
					},
					'编辑'
				),
				h(
					'a',
					{
						class: 'text-danger',
						onClick: () => {
							console.log(data)
							Modal.confirm({
								title: '删除确认',
								content: '您确定删除当前数据吗？',
								okText: '删除',
								cancelText: '取消',
								okType: 'danger',
								onOk() {
									return new Promise<void>(resolve => {
										setTimeout(() => {
											message.success('操作成功')
											fetchData(1)
											resolve()
										}, 1500)
									})
								},
							})
						},
					},
					'删除'
				),
			])
		},
	},
])

// 弹窗
const formModalRef = ref()
const formModal = reactive({
	loading: false,
	visible: false,
	title: 'Form',
	sex: 1,
	name: '',
	class: '',
	number: '',
})
const handleModel = async () => {
	formModal.loading = true
	try {
		const data = await formModalRef.value.validate()
		console.log(data)
		setTimeout(() => {
			formModalRef.value.resetFields()
			formModal.loading = false
			formModal.visible = false
			message.success('操作成功')
		}, 1500)
	} catch (error) {
		formModal.loading = false
	}
}
const handleCancel = () => {
	formModalRef.value.resetFields()
	formModal.visible = false
}
</script>

<style lang="scss"></style>
