<template>
	<!-- table page -->
	<admin-table-page
		ref="tablePageRef"
		:columns="formPage.columns"
		:fetchData="fetchData"
	>
		<template #search="{ loading, handleTable }">
			<a-form
				layout="inline"
				:model="formPage"
				autocomplete="off"
				:label-col="formPage.labelCol"
				:wrapper-col="formPage.wrapperCol"
			>
				<a-form-item label="口口 名称" name="classID">
					<a-cascader
						v-model:value="formPage.classID"
						:options="options"
						:show-search="true"
						placeholder="请选择口口 名称"
						@change="handleChange"
					/>
				</a-form-item>
				<a-form-item label="口口 名称" name="name">
					<a-input v-model:value="formPage.name" />
				</a-form-item>
				<a-button type="primary" :loading="loading" @click="handleTable(1)">
					<span class="iconfont m-r-small">&#xe67c;</span>
					搜索
				</a-button>
			</a-form>
			<div class="table-search-add">
				<a-button size="small" @click="formModalVrAdd.visible = true">
					<span class="iconfont m-r-small">&#xe62d;</span>
					添加 口口
				</a-button>
			</div>
		</template>
		<template #table="{ column, text }">
			<template v-if="column.dataIndex === 'img'">
				<a-image :src="text || errorImg" placeholder />
			</template>
		</template>
	</admin-table-page>

	<!-- 添加 口口 弹窗 -->
	<a-modal
		v-model:visible="formModalVrAdd.visible"
		class="tm-modal"
		:width="800"
		:centered="true"
	>
		<template #title>
			<span class="iconfont m-r-small">&#xe62d;</span>
			添加 口口
		</template>
		<!-- table page  -->
		<admin-table-page
			ref="tableVrRef"
			:columns="formModalVrAdd.columns"
			:fetchData="fetchDataVrtAdd"
			size="middle"
			:isPageTableClass="false"
			:rowSelection="handleSelectionAdd"
			:autoAjax="false"
		>
			<!-- search -->
			<template #search="{ loading, handleTable }">
				<a-form
					ref="formModalVrRef"
					class="tm-form"
					layout="inline"
					:model="formModalVrAdd"
					autocomplete="off"
					:label-col="formModalVrAdd.labelCol"
					:wrapper-col="formModalVrAdd.wrapperCol"
				>
					<a-form-item label="口口 名称" name="name">
						<a-input
							v-model:value="formModalVrAdd.name"
							:maxlength="50"
							placeholder="请输入 口口 名称"
						/>
					</a-form-item>
					<a-button type="primary" :loading="loading" @click="handleTable(1)">
						<span class="iconfont m-r-small">&#xe67c;</span>
						搜索
					</a-button>
				</a-form>
			</template>
			<template #table="{ column, text }">
				<template v-if="column.dataIndex === 'img'">
					<a-image :src="text" placeholder />
				</template>
			</template>
		</admin-table-page>
		<template #footer>
			<a-button key="back" @click="formModalVrAdd.visible = false">
				取消
			</a-button>
			<a-button
				key="submit"
				type="primary"
				:loading="formModalVrAdd.loading"
				:disabled="!selectedRowKeysAdd.arr.length"
				@click="handleVrtAdd"
			>
				添加
			</a-button>
		</template>
	</a-modal>

	<!-- 口口 附件 -->
	<a-modal
		v-model:visible="formModalVrParts.visible"
		class="tm-modal"
		:width="800"
		:centered="true"
		:footer="null"
	>
		<template #title>
			<span class="iconfont m-r-small">&#xe618;</span>
			口口 附件：{{ '<' + formModalVrParts.title + '>' }}
		</template>
		<!-- table page  -->
		<admin-table-page
			ref="tableVrPartsRef"
			:fetchData="fetchModalVrParts"
			:columns="formModalVrParts.columns"
			size="middle"
			:isPageTableClass="false"
			:autoAjax="false"
		>
			<!-- search -->
			<template #search="{ loading, handleTable }">
				<a-form
					class="tm-form"
					layout="inline"
					:model="formModalVrParts"
					autocomplete="off"
					:label-col="formModalVrParts.labelCol"
					:wrapper-col="formModalVrParts.wrapperCol"
				>
					<a-form-item label="口口 名称" name="name">
						<a-input
							v-model:value="formModalVrParts.name"
							:maxlength="50"
							placeholder="请输入 口口 名称"
						/>
					</a-form-item>
					<a-button type="primary" :loading="loading" @click="handleTable(1)">
						<span class="iconfont m-r-small">&#xe67c;</span>
						搜索
					</a-button>
				</a-form>
			</template>
		</admin-table-page>
	</a-modal>
</template>

<script setup lang="ts">
import { fetchVr } from '~/fetch/http'
import { CascaderProps } from 'ant-design-vue'
import { _handleDelete, _locationQuery } from '~/assets/tsx/tool'
import { pageColumns, modalColumns } from '~/assets/tsx/table2'
const route = useRoute()
const errorImg =
	'data:image/jpeg;base64,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'

useHead({
	title: '口口口 管理后台',
})

// search
const handleThe = (data: any) => {
	formModalVrParts.title = data.name
	formModalVrParts.visible = true
}
const handleDelete = (data: any) => {
	_handleDelete('删除', data.name, () => handleDeleteBtn(data))
}
const formPage = reactive({
	classID: 0,
	name: '',
	labelCol: {
		style: { width: '70px' },
	},
	wrapperCol: {
		style: { width: '160px' },
	},
	columns: pageColumns(handleThe, handleDelete).data,
})

// 口口 名称
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
const setUrlParams = (id: number | undefined) => {
	const params = new URLSearchParams(window.location.search)
	if (id) {
		params.set('id', id + '')
		window.history.replaceState(
			{},
			'',
			`${window.location.pathname}?${params.toString()}`
		)
	} else {
		window.history.replaceState({}, '', `${window.location.pathname}`)
	}
}

// table data
const fetchData = (currentPage?: number | undefined) => {
	return new Promise(resolve => {
		try {
			fetchVr({
				currentPage: currentPage || 1,
				...toRaw(formPage),
			}).then(data => {
				setUrlParams(formPage.classID)
				resolve(data)
			})
		} catch (error) {
			console.log(error)
		}
	})
}

// table delete button ajax
const tablePageRef = ref()
const handleDeleteBtn = (data: object | []) => {
	console.log('开始异步')
	return new Promise<void>(resolve => {
		setTimeout(() => {
			// TODO  ajax
			console.log(data, '异步结束')
			tablePageRef.value.handleTable(1)
			resolve()
		}, 1500)
	})
}

/**
 * 添加 口口 弹窗
 */
interface formModalVrType {
	name: string
	number: string
	labelCol: object
	wrapperCol: object
	columns: object[]
	visible: boolean
	loading?: boolean
}
const formModalVrAdd = reactive<formModalVrType>({
	visible: false,
	name: '',
	number: '',
	loading: false,
	labelCol: {
		style: { width: '70px' },
	},
	wrapperCol: {
		style: { width: '160px' },
	},
	// table 列
	columns: [
		{
			title: '缩略图',
			dataIndex: 'img',
			key: 'img',
			fixed: true,
			width: 100,
		},
		{
			title: '名称',
			width: 200,
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '分类',
			dataIndex: 'type',
			key: 'type',
			width: 200,
		},
		{
			title: '创建日期',
			dataIndex: 'date',
			key: 'date',
			width: 150,
		},
	],
})
const formModalVrRef = ref()
const tableVrRef = ref()
// 口口 添加功能
const selectedRowKeysAdd = reactive({
	arr: [],
	obj: [],
})
const handleSelectionAdd = {
	onChange: (rowKeys: [], rowObj: []) => {
		selectedRowKeysAdd.arr = rowKeys
		selectedRowKeysAdd.obj = rowObj
	},
}

// fetchDataVrtAdd
const fetchDataVrtAdd = (currentPage?: number | undefined) => {
	return new Promise(resolve => {
		try {
			const data = { ...toRaw(formModalVrAdd) }
			fetchVr({
				currentPage: currentPage || 1,
				...data,
			}).then(data => {
				resolve(data)
			})
		} catch (error) {}
	})
}
// 添加 口口  添加事件
const handleVrtAdd = () => {
	formModalVrAdd.loading = true
	setTimeout(() => {
		formModalVrAdd.visible = false
		tableVrRef.value.handleTable(1)
	}, 1500)
}

const handleChange = (data: any) => {
	let query = ''
	if (data && data[0]) {
		query = `?id=${data[0]}`
	}
	_locationQuery(query)
}

watch(
	() => formModalVrAdd.visible,
	val => {
		if (val) {
			nextTick(() => {
				tableVrRef.value.handleTable(1)
			})
		} else {
			formModalVrRef.value.resetFields()
			formModalVrAdd.loading = false
			tableVrRef.value.handleTable(0)
		}
	}
)

/**
 * 口口 附件弹窗
 */

const formModalVrParts = reactive({
	visible: false,
	title: '',
	name: '',
	labelCol: {
		style: { width: '70px' },
	},
	wrapperCol: {
		style: { width: '160px' },
	},
	// table 列
	columns: modalColumns().data,
})

const fetchModalVrParts = (currentPage?: number | undefined) => {
	return new Promise(resolve => {
		try {
			const data = { ...toRaw(formModalVrAdd) }
			fetchVr({
				currentPage: currentPage || 1,
				...data,
			}).then(data => {
				resolve(data)
			})
		} catch (error) {}
	})
}

onMounted(() => {
	const id = route.query.id
	formPage.classID = Number(id)
})
</script>
