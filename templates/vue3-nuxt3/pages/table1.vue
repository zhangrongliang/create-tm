<template>
	<!-- table page  -->
	<admin-table-page
		ref="tablePageRef"
		:columns="formPage.columns"
		:fetchData="fetchData"
	>
		<!-- search -->
		<template #search="{ loading, handleTable }">
			<a-form
				class="tm-form"
				layout="inline"
				:model="formPage"
				autocomplete="off"
				:label-col="formPage.labelCol"
				:wrapper-col="formPage.wrapperCol"
			>
				<a-form-item label="届别" name="class">
					<a-date-picker
						v-model:value="formPage.class"
						picker="year"
						placeholder="请选择届别"
					/>
				</a-form-item>
				<a-form-item label="名称" name="name">
					<a-input
						v-model:value="formPage.name"
						:maxlength="50"
						placeholder="请输入名称"
					/>
				</a-form-item>
				<a-button type="primary" :loading="loading" @click="handleTable(1)">
					<span class="iconfont m-r-small">&#xe67c;</span>
					搜索
				</a-button>
			</a-form>
			<div class="table-search-add">
				<a-button
					size="small"
					@click="
						() => {
							formModalClass.title = '添加口口 '
							formModalClass.visible = true
						}
					"
				>
					<span class="iconfont m-r-small">&#xe62d;</span>
					添加口口
				</a-button>
			</div>
		</template>
	</admin-table-page>

	<!-- 添加/编辑，口口 弹窗 -->
	<a-modal
		v-model:visible="formModalClass.visible"
		class="tm-modal"
		okText="提交"
		cancelText="取消"
		:confirm-loading="formModalClass.loading"
		@ok="handleModel"
		@cancel="handleCancel"
	>
		<template #title>
			<span v-if="formModalClass.title === '添加口口 '" class="iconfont">
				&#xe62d;
			</span>
			<span v-else class="iconfont">&#xf0213;</span>
			{{ formModalClass.title }}
		</template>
		<a-form
			ref="formModalClassRef"
			:model="formModalClass"
			name="basic"
			autocomplete="off"
			:label-col="{ span: 3 }"
			:wrapper-col="{ span: 21 }"
		>
			<a-form-item
				label="名称"
				name="name"
				:maxlength="50"
				:rules="[{ required: true, message: '请输入名称' }]"
			>
				<a-input v-model:value="formModalClass.name" placeholder="请输入名称" />
			</a-form-item>
			<a-form-item
				label="届别"
				name="class"
				:rules="[{ required: true, message: '请选择届别' }]"
			>
				<a-date-picker
					v-model:value="formModalClass.class"
					picker="year"
					placeholder="请选择届别"
				/>
			</a-form-item>
			<a-form-item label="备注" name="comment">
				<a-textarea
					v-model:value="formModalClass.comment"
					:rows="4"
					:maxlength="200"
					placeholder="请输入备注"
				/>
			</a-form-item>
		</a-form>
	</a-modal>

	<!-- 口口 管理 弹窗 -->
	<a-modal
		v-model:visible="formModalStudent.visible"
		class="tm-modal"
		:footer="null"
		:width="800"
		:centered="true"
	>
		<template #title>
			<span class="iconfont">&#xe69c;</span>
			口口 管理：{{ '<' + modalTitle + '>' }}
		</template>
		<!-- table page  -->
		<admin-table-page
			ref="tableStudentRef"
			:columns="formModalStudent.columns"
			:fetchData="fetchDataStudent"
			size="middle"
			:isPageTableClass="false"
			:rowSelection="handleSelection"
			:autoAjax="false"
		>
			<!-- search -->
			<template #search="{ loading, handleTable }">
				<a-form
					ref="formModalStudentRef"
					class="tm-form"
					layout="inline"
					:model="formModalStudent"
					autocomplete="off"
					:label-col="formModalStudent.labelCol"
					:wrapper-col="formModalStudent.wrapperCol"
				>
					<a-form-item label="届别" name="class">
						<a-date-picker
							v-model:value="formModalStudent.class"
							picker="year"
							placeholder="请选择届别"
						/>
					</a-form-item>
					<a-form-item label="名称" name="name">
						<a-input
							v-model:value="formModalStudent.name"
							:maxlength="50"
							placeholder="请输入名称"
						/>
					</a-form-item>
					<a-form-item label="学号" name="number">
						<a-input
							v-model:value="formModalStudent.number"
							:maxlength="50"
							placeholder="请输入学号"
						/>
					</a-form-item>
					<a-button type="primary" :loading="loading" @click="handleTable(1)">
						<span class="iconfont m-r-small">&#xe67c;</span>
						搜索
					</a-button>
				</a-form>
				<div class="table-search-add">
					<a-button
						size="small"
						@click="
							() => {
								formModalStudentAdd.visible = true
							}
						"
					>
						<span class="iconfont">&#xe62d;</span>
						添加口口
					</a-button>
					<label for="student-file" class="table-btn">
						<span class="iconfont">&#xe616;</span>
						导入口口
						<input id="student-file" class="none" type="file" />
					</label>
					<a href="./班级学生导入模板.xls" download="班级学生导入模板.xls">
						<a-button size="small">
							<span class="iconfont">&#xe60e;</span>
							下载导入模板
						</a-button>
					</a>
					<a-button
						size="small"
						danger
						:disabled="!selectedRowKeys.arr.length"
						@click="handleMoreRemoveStudent"
					>
						<span class="iconfont">&#xe615;</span>
						批量移除
					</a-button>
				</div>
			</template>
		</admin-table-page>
	</a-modal>

	<!-- 添加口口  弹窗-->
	<a-modal
		v-model:visible="formModalStudentAdd.visible"
		class="tm-modal"
		:width="800"
		:centered="true"
	>
		<template #title>
			<span class="iconfont">&#xe62d;</span>
			添加口口 ：{{ '<' + modalTitle + '>' }}
		</template>
		<!-- table page  -->
		<admin-table-page
			ref="tableStudentAddRef"
			:columns="formModalStudentAdd.columns"
			:fetchData="fetchDataStudentAdd"
			size="middle"
			:isPageTableClass="false"
			:rowSelection="handleSelectionAdd"
			:autoAjax="false"
		>
			<!-- search -->
			<template #search="{ loading, handleTable }">
				<a-form
					ref="formModalStudentAddRef"
					class="tm-form"
					layout="inline"
					:model="formModalStudentAdd"
					autocomplete="off"
					:label-col="formModalStudentAdd.labelCol"
					:wrapper-col="formModalStudentAdd.wrapperCol"
				>
					<a-form-item label="届别" name="class">
						<a-date-picker
							v-model:value="formModalStudentAdd.class"
							picker="year"
							placeholder="请选择届别"
						/>
					</a-form-item>
					<a-form-item label="名称" name="name">
						<a-input
							v-model:value="formModalStudentAdd.name"
							:maxlength="50"
							placeholder="请输入名称"
						/>
					</a-form-item>
					<a-form-item label="学号" name="number">
						<a-input
							v-model:value="formModalStudentAdd.number"
							:maxlength="50"
							placeholder="请输入学号"
						/>
					</a-form-item>
					<a-button type="primary" :loading="loading" @click="handleTable(1)">
						<span class="iconfont m-r-small">&#xe67c;</span>
						搜索
					</a-button>
				</a-form>
			</template>
		</admin-table-page>
		<template #footer>
			<a-button key="back" @click="formModalStudentAdd.visible = false">
				取消
			</a-button>
			<a-button
				key="submit"
				type="primary"
				:loading="formModalStudentAdd.loading"
				:disabled="!selectedRowKeysAdd.arr.length"
				@click="handleClassModalAdd"
			>
				添加
			</a-button>
		</template>
	</a-modal>
</template>

<script setup lang="ts">
import { fetchClass, fetchClassStudent } from '~/fetch/http'
import { message } from 'ant-design-vue'
import dayjs, { Dayjs } from 'dayjs'
import { _handleDelete } from '~/assets/tsx/tool'
import { pageColumns, modalColumns, modalAddColumns } from '~/assets/tsx/table1'
const router = useRouter()

useHead({
	title: '口口口 管理后台',
})

// page form
interface formPageType {
	class: Dayjs | ''
	name: string
	labelCol: object
	wrapperCol: object
	columns: object[]
}
const tablePageRef = ref()
const handleGoVRPage = (data: any) => {
	router.push({
		path: '/table2',
		query: {
			id: Math.floor(Math.random() * 10 + 1),
			class: data.class,
		},
	})
}
const handleClassModal = (data: any) => {
	modalTitle.value = data.name
	formModalStudent.visible = true
}
const handleEdit = (data: any) => {
	formModalClass.title = `编辑口口 ：<${data.name}>`
	formModalClass.class = dayjs(data.class)
	formModalClass.name = data.name
	formModalClass.comment = data.comment
	formModalClass.visible = true
}

const handleDelete = (data: any) => {
	_handleDelete('强制删除口口 ', data.name, () => handleDeleteClass(data))
}
const handleDeleteClass = (data: object) => {
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

const formPage = reactive<formPageType>({
	class: '',
	name: '',
	labelCol: {
		style: { width: '40px' },
	},
	wrapperCol: {
		style: { width: '160px' },
	},
	// page table 列
	columns: pageColumns(
		handleGoVRPage,
		handleClassModal,
		handleEdit,
		handleDelete
	).data,
})

// page fetchData
const fetchData = (currentPage?: number | undefined) => {
	return new Promise(resolve => {
		try {
			const data = { ...toRaw(formPage) }
			Object.assign(data, {
				class: dayjs(data.class).format('YYYY'),
			})
			fetchClass({
				currentPage: currentPage || 1,
				...data,
			}).then(data => {
				resolve(data)
			})
		} catch (error) {}
	})
}

/**
 * 口口 弹窗，添加、编辑
 */
interface formModalClassType {
	class: Dayjs | ''
	name: string
	loading: boolean
	visible: boolean
	title: string
	comment: string
}
const formModalClassRef = ref()
const formModalClass = reactive<formModalClassType>({
	loading: false,
	visible: false,
	title: '',
	name: '',
	class: '',
	comment: '',
})
const handleModel = async () => {
	formModalClass.loading = true
	try {
		const data = await formModalClassRef.value.validate()
		Object.assign(data, {
			class: dayjs(data.class).format('YYYY'),
		})
		console.log(data)
		setTimeout(() => {
			formModalClass.loading = false
			formModalClass.visible = false
			message.success('操作成功')
		}, 1500)
	} catch (error) {
		formModalClass.loading = false
	}
}
const handleCancel = () => {
	formModalClassRef.value.resetFields()
	formModalClass.class = ''
	formModalClass.name = ''
	formModalClass.comment = ''
}

/**
 * 口口 弹窗
 */
interface formModalStudentType {
	class: Dayjs | ''
	name: string
	number: string
	labelCol: object
	wrapperCol: object
	columns: object[]
	visible: boolean
	loading?: boolean
}
const modalTitle = ref('')
const tableStudentRef = ref()
const formModalStudentRef = ref()
const handleModalDelete = (data: any) => {
	_handleDelete('移除口口 ', data.name, () => handleRemoveStudent(data))
}
const formModalStudent = reactive<formModalStudentType>({
	visible: false,
	class: '',
	name: '',
	number: '',
	labelCol: {
		style: { width: '40px' },
	},
	wrapperCol: {
		style: { width: '160px' },
	},
	// table 列
	columns: modalColumns(handleModalDelete).data,
})
// 口口 表单移除功能
const selectedRowKeys = reactive({
	arr: [],
	obj: [],
})
const handleSelection = {
	onChange: (rowKeys: [], rowObj: []) => {
		selectedRowKeys.arr = rowKeys
		selectedRowKeys.obj = rowObj
	},
}
// fetchDataStudent
const fetchDataStudent = (currentPage?: number | undefined) => {
	return new Promise(resolve => {
		try {
			const data = { ...toRaw(formModalStudent) }
			Object.assign(data, {
				class: dayjs(data.class).format('YYYY'),
			})
			fetchClassStudent({
				currentPage: currentPage || 1,
				...data,
			}).then(data => {
				resolve(data)
			})
		} catch (error) {}
	})
}
// 批量移除口口
const handleMoreRemoveStudent = () => {
	_handleDelete('批量移除口口 ', '', () =>
		handleRemoveStudent(toRaw(selectedRowKeys).arr)
	)
}
// 移除口口  ajax
const handleRemoveStudent = (data: object | []) => {
	console.log('开始异步')
	return new Promise<void>(resolve => {
		setTimeout(() => {
			// TODO  ajax
			console.log(data, '异步结束')
			tableStudentRef.value.handleTable(1)
			resolve()
		}, 1500)
	})
}

watch(
	() => formModalStudent.visible,
	val => {
		!val && formModalStudentRef.value.resetFields()
		val &&
			nextTick(() => {
				tableStudentRef.value.handleTable(1)
			})
	}
)

/**
 * 添加口口
 */
const formModalStudentAdd = reactive<formModalStudentType>({
	visible: false,
	class: '',
	name: '',
	number: '',
	loading: false,
	labelCol: {
		style: { width: '40px' },
	},
	wrapperCol: {
		style: { width: '160px' },
	},
	// table 列
	columns: modalAddColumns().data,
})
const formModalStudentAddRef = ref()
const tableStudentAddRef = ref()
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
// fetchDataStudentAdd
const fetchDataStudentAdd = (currentPage?: number | undefined) => {
	return new Promise(resolve => {
		try {
			const data = { ...toRaw(formModalStudent) }
			Object.assign(data, {
				class: dayjs(data.class).format('YYYY'),
			})
			fetchClassStudent({
				currentPage: currentPage || 1,
				...data,
			}).then(data => {
				resolve(data)
			})
		} catch (error) {}
	})
}
// 添加口口  添加事件
const handleClassModalAdd = () => {
	formModalStudentAdd.loading = true
	setTimeout(() => {
		formModalStudentAdd.visible = false
		tableStudentRef.value.handleTable(1)
	}, 1500)
}

watch(
	() => formModalStudentAdd.visible,
	val => {
		if (val) {
			nextTick(() => {
				tableStudentAddRef.value.handleTable(1)
			})
		} else {
			formModalStudentAddRef.value.resetFields()
			formModalStudentAdd.loading = false
		}
	}
)
</script>
