<template>
	<!-- search -->
	<div class="table-search">
		<slot name="search" :loading="loading" :handleTable="handleTable"></slot>
	</div>
	<!-- table -->
	<a-table
		class="table-data"
		:class="{
			'page-table': isPageTableClass,
		}"
		:data-source="dataSource"
		:columns="columns"
		:pagination="pagination"
		:loading="loading"
		sticky
		:size="size"
		:row-selection="rowSelection"
		:row-class-name="
			(_record, index) => (index % 2 === 1 ? 'table-striped' : null)
		"
	>
		<template #bodyCell="{ column, text, record }">
			<slot
				name="table"
				:column="column"
				:text="text"
				:record="record"
				:handleTable="handleTable"
			></slot>
		</template>
	</a-table>
</template>

<script setup lang="ts">
const props = defineProps({
	columns: {
		type: Array,
		default() {
			return []
		},
	},
	isPageTableClass: {
		type: Boolean,
		default: true,
	},
	rowSelection: {
		type: Object,
		default: null,
	},
	size: {
		type: String,
		default: 'default', // default | middle | small
	},
	fetchData: {
		type: Function,
		default() {},
	},
	autoAjax: {
		type: Boolean,
		default: true,
	},
})

const loading = ref<boolean>(false)
const dataSource = ref<any>([])

// 分页配置  https://next.antdv.com/components/pagination-cn/
const pagination = reactive({
	current: 1,
	total: 0,
	showSizeChanger: false,
	position: ['bottomCenter'],
	onChange: (page: number) => handleTable(page),
})

const handleTable = (page = 1) => {
	return new Promise<void>((resolve, reject) => {
		loading.value = true
		;(async page => {
			try {
				if (page) {
					const data = await props.fetchData(page)
					pagination.total = data.total
					pagination.current = page
					dataSource.value = data.data
					loading.value = false
					// 组件功能优化-table 内容滚动条滚到顶部
					const dom = document.querySelector('.ant-table-body')
					dom && dom.scrollTo(0, 0)
				}
				// 组件功能优化-清空 table selection
				props.rowSelection && props.rowSelection.onChange([], [])
				resolve()
			} catch (error) {
				loading.value = false
				reject(new Error('接口报错'))
			}
		})(page)
	})
}

// props.autoAjax = false 时，配合 handleTable 方法获取 table 数据，ref
defineExpose({
	handleTable,
})

onMounted(() => {
	props.autoAjax && handleTable()
})
</script>
