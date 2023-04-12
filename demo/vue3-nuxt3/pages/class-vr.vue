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
			<a-form-item label="班级名称" name="classID">
				<a-cascader
					v-model:value="formSearch.classID"
					:options="options"
					:show-search="true"
					placeholder="请选择班级名称"
				/>
			</a-form-item>
			<a-form-item label="VR 名称" name="name">
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
						formModal.title = '添加 VR'
					}
				"
			>
				<template #icon><PlusOutlined /></template>
				添加 VR
			</a-button>
		</div>
	</div>
	<!-- table  -->
	<div class="table-data">
		<a-table
			:data-source="dataSource"
			:columns="columns"
			:pagination="pagination"
			:loading="formSearch.loading"
			sticky
		>
			<template #bodyCell="{ column, text }">
				<template v-if="column.dataIndex === 'img'">
					<a-image :width="120" :height="80" :src="text" placeholder />
				</template>
			</template>
		</a-table>
	</div>
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
				label="班级名称"
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
import { fetchVr } from '~/fetch/http'
import { CascaderProps, message, Modal } from 'ant-design-vue'

const route = useRoute()

useHead({
	title: 'XRS 管理后台',
})

onMounted(() => {
	const id = route.query.id
	formSearch.classID = Number(id)
	fetchData()
})

// search
const formSearch = reactive({
	classID: 0,
	name: '',
	loading: false,
})

// 班级名称
const options: CascaderProps['options'] = [
	{
		value: 1,
		label: '一班一班',
	},
	{
		value: 2,
		label: '二班一班',
	},
	{
		value: 3,
		label: '三班一班',
	},
	{
		value: 4,
		label: '四班一班',
	},
	{
		value: 5,
		label: '五班一班',
	},
	{
		value: 6,
		label: '六班一班',
	},
	{
		value: 7,
		label: '七班一班',
	},
	{
		value: 8,
		label: '八班一班',
	},
	{
		value: 9,
		label: '九班一班',
	},
	{
		value: 10,
		label: '十班一班',
	},
]
const setUrlParams = () => {
	const params = new URLSearchParams(window.location.search)
	params.set('id', formSearch.classID + '')
	window.history.replaceState(
		{},
		'',
		`${window.location.pathname}?${params.toString()}`
	)
}

// table data
const dataSource = ref<any>([])
const fetchData = async (currentPage?: number | undefined) => {
	formSearch.loading = true
	try {
		const data: any = await fetchVr({
			currentPage: currentPage || 1,
			...toRaw(formSearch),
		})
		pagination.current = currentPage || 1
		pagination.total = data.total
		dataSource.value = data.data
		formSearch.loading = false
		setUrlParams()
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
		title: '缩略图',
		dataIndex: 'img',
		key: 'img',
		fixed: true,
	},
	{
		title: '名称',
		maxWidth: 200,
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: '分类',
		dataIndex: 'type',
		key: 'type',
	},
	{
		title: '学习次数',
		dataIndex: 'number',
		key: 'number',
	},
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
