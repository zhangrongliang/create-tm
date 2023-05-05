<template>
	<a-button
		class="m-r m-b"
		type="primary"
		:disabled="tree.draggable"
		@click="handleAdd(0)"
	>
		<span class="iconfont m-r-small">&#xe62d;</span>
		添加根分类
	</a-button>
	<a-button
		class="m-b m-r"
		:type="tree.draggable ? '' : 'primary'"
		@click="handleTreeActive"
	>
		<span class="iconfont m-r-small">&#xe624;</span>
		{{ tree.draggable ? '关闭拖拽排序（恢复到拖拽前）' : '开启拖拽分类排序' }}
	</a-button>
	<a-button
		class="m-b"
		type="primary"
		:disabled="tree.disabled"
		@click="handleSaveDropData"
	>
		<span class="iconfont m-r-small">&#xe66e;</span>
		确认修改排序
	</a-button>
	<!-- alert 提示 -->
	<a-alert
		v-if="tree.draggable"
		class="m-b"
		type="info"
		message="拖拽内容：与图片对齐，表示同级；与文字对齐，表示下级。"
	/>

	<!-- 课件 tree -->
	<!-- selectable 是否可选中 -->
	<!-- block-node 是否是块级 -->
	<div class="tm-tree" :class="{ 'tree-draggable': tree.draggable }">
		<a-skeleton active :title="false" :loading="loadingTree">
			<a-tree
				v-if="tree.data.length"
				showLine
				:draggable="tree.draggable"
				block-node
				:selectable="false"
				:tree-data="tree.data"
				@drop="onDrop"
			>
				<template #title="{ key, title, img, cname, ename }">
					<div class="tree-title">
						<img class="tree-image" :src="img || errorImg" loading="lazy" />
						{{ title }}
						<div v-show="!tree.draggable" class="tree-btn">
							<a-button
								size="small"
								@click="handEdit(key, img, title, cname, ename)"
							>
								<span class="iconfont m-r-small">&#xf0213;</span>
								编辑
							</a-button>
							<a-button size="small" @click="handleAdd(key)">
								<span class="iconfont m-r-small">&#xe62d;</span>
								添加同级分类
							</a-button>
							<a-button size="small" danger @click="handDelete(title, key)">
								<span class="iconfont m-r-small">&#xe8b6;</span>
								删除分类
							</a-button>
						</div>
					</div>
				</template>
			</a-tree>
		</a-skeleton>
	</div>
	<!-- 编辑课件分类 -->
	<a-modal
		v-model:visible="formModalClassify.visible"
		class="tm-modal"
		okText="提交"
		cancelText="取消"
		:confirm-loading="formModalClassify.loading"
		@ok="handleModel"
		@cancel="handleCancel"
	>
		<template #title>
			<span class="iconfont m-r-small">&#xe62d;</span>
			{{ formModalClassify.title }}
		</template>
		<a-form
			ref="formModalClassifyRef"
			:model="formModalClassify"
			name="basic"
			autocomplete="off"
			:label-col="{ span: 4 }"
			:wrapper-col="{ span: 20 }"
		>
			<a-form-item label="缩略图" name="ename" :maxlength="50">
				<a-upload
					v-model:file-list="fileList"
					action=""
					list-type="picture-card"
				>
					<div v-if="fileList.length < 1">
						<div>上传</div>
					</div>
				</a-upload>
			</a-form-item>
			<a-form-item
				label="分类名称"
				name="name"
				:maxlength="50"
				:rules="[{ required: true, message: '请输入分类名称' }]"
			>
				<a-input
					v-model:value="formModalClassify.name"
					placeholder="请输入分类名称"
				/>
			</a-form-item>
			<a-form-item label="简称" name="cname" :maxlength="50">
				<a-input
					v-model:value="formModalClassify.cname"
					placeholder="请输入分类简称"
				/>
			</a-form-item>
			<a-form-item label="英文名称" name="ename" :maxlength="50">
				<a-input
					v-model:value="formModalClassify.ename"
					placeholder="请输入英文名称"
				/>
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import type {
	AntTreeNodeDropEvent,
	TreeDataItem,
	TreeProps,
} from 'ant-design-vue/es/tree'
import { fetchTree } from '~/fetch/http'
import { _handleDelete } from '~/assets/tsx/tool'

const tree = reactive({
	data: [],
	// 是否开始拖拽
	draggable: false,
	disabled: true,
})

const loadingTree = ref<boolean>(false)
const errorImg =
	'data:image/jpeg;base64,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'
const fileList = ref([])

// 获取数据
const handleData = async () => {
	loadingTree.value = true
	try {
		const data = await fetchTree()
		tree.data = data.data[0].data
		loadingTree.value = false
	} catch (error) {
		loadingTree.value = false
	}
}

const handDelete = (title: string, key: string) => {
	_handleDelete('删除分类', title, () => handleRemoveCourseware(key))
}

const handEdit = (
	key: string,
	img: string,
	title: string,
	cname: string,
	ename: string
) => {
	formModalClassify.title = '编辑课件分类'
	formModalClassify.visible = true
	formModalClassify.img = img
	formModalClassify.name = title
	formModalClassify.cname = cname
	formModalClassify.ename = ename
	formModalClassify.key = key
}

// 拖动排序
const onDrop = (info: AntTreeNodeDropEvent) => {
	console.log(info)
	const dropKey = info.node.key
	const dragKey = info.dragNode.key
	const dropPos = info.node.pos.split('-')
	const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
	const loop = (
		data: TreeProps['treeData'],
		key: string | number,
		callback: any
	) => {
		data.forEach((item, index) => {
			if (item.key === key) {
				return callback(item, index, data)
			}
			if (item.children) {
				return loop(item.children, key, callback)
			}
		})
	}
	const data = [...tree.data]

	// Find dragObject
	let dragObj: TreeDataItem
	loop(
		data,
		dragKey,
		(item: TreeDataItem, index: number, arr: TreeProps['treeData']) => {
			arr.splice(index, 1)
			dragObj = item
		}
	)
	if (!info.dropToGap) {
		// Drop on the content
		loop(data, dropKey, (item: TreeDataItem) => {
			item.children = item.children || []
			/// where to insert 示例添加到头部，可以是随意位置
			item.children.unshift(dragObj)
		})
	} else if (
		(info.node.children || []).length > 0 && // Has children
		info.node.expanded && // Is expanded
		dropPosition === 1 // On the bottom gap
	) {
		loop(data, dropKey, (item: TreeDataItem) => {
			item.children = item.children || []
			// where to insert 示例添加到头部，可以是随意位置
			item.children.unshift(dragObj)
		})
	} else {
		let ar: TreeProps['treeData'] = []
		let i = 0
		loop(
			data,
			dropKey,
			(_item: TreeDataItem, index: number, arr: TreeProps['treeData']) => {
				ar = arr
				i = index
			}
		)
		if (dropPosition === -1) {
			ar.splice(i, 0, dragObj)
		} else {
			ar.splice(i + 1, 0, dragObj)
		}
	}
	// 拖拽后
	tree.data = data
	tree.disabled = false
}

// 开启拖拽分类排序/恢复
const handleTreeActive = () => {
	// handleData()
	tree.draggable = !tree.draggable
	if (!tree.draggable) {
		tree.disabled = true
		handleData()
	}
}

// 确认修改排序
const handleSaveDropData = () => {
	message.success('TODO 操作成功')
	tree.disabled = true
	tree.draggable = false
	handleData()
}

// 删除课件
const handleRemoveCourseware = (key: string) => {
	console.log('开始异步')
	return new Promise<void>(resolve => {
		setTimeout(() => {
			// TODO  ajax
			console.log(key, '异步结束')
			handleData()
			resolve()
		}, 1500)
	})
}

// 编辑分类
const formModalClassifyRef = ref()
const formModalClassify = reactive({
	visible: false,
	img: '',
	title: '',
	name: '',
	cname: '',
	ename: '',
	key: '',
	loading: false,
})
const handleModel = async () => {
	formModalClassify.loading = true
	try {
		const data = await formModalClassifyRef.value.validate()
		console.log(data)
		setTimeout(() => {
			formModalClassify.loading = false
			formModalClassify.visible = false
			message.success('操作成功')
		}, 1500)
	} catch (error) {
		formModalClassify.loading = false
	}
}

const handleCancel = () => {
	formModalClassifyRef.value.resetFields()
}

const handleAdd = (key: string | number) => {
	formModalClassify.title = key ? '添加同级分类' : '添加根分类'
	formModalClassify.visible = true
}

onMounted(() => {
	handleData()
})
</script>

<style lang="less">
.tm-tree {
	max-height: calc(100% - 42px - @padding * 2);
	overflow: auto;

	&.tree-draggable {
		max-height: calc(100% - 42px - 50px - @padding * 2);
		.ant-tree-list,
		.ant-tree-show-line .ant-tree-switcher {
			background: lighten(@success-color, 40%);
		}
	}

	.tree-title {
		font-weight: bold;
		display: flex;
		line-height: 24px;
		.tree-image {
			object-fit: cover;
			height: 24px;
			width: 24px;
			margin-right: calc(@padding / 2);
		}
		&:hover {
			.tree-btn {
				display: block;
			}
			background-color: lighten(@primary-color, 45%);
			box-shadow: @box-shadow-base;
		}
		.tree-btn {
			display: none;
			margin-left: calc(@padding * 2);
			button {
				margin-right: @padding;
			}
		}
	}
}
</style>
