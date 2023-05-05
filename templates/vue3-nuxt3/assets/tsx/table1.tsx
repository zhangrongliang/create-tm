export const pageColumns = (
	handleGoVRPage: Function,
	handleStudent: Function,
	handleEdit: Function,
	handleDelete: Function
) => ({
	data: [
		{
			title: '名称',
			dataIndex: 'name',
			key: 'name',
			width: 200,
			fixed: true,
		},
		{
			title: '届别',
			dataIndex: 'class',
			key: 'class',
			width: 100,
		},
		{
			title: '教师',
			dataIndex: 'teacher',
			key: 'teacher',
			width: 100,
		},
		{
			title: '创建时间',
			dataIndex: 'date',
			key: 'date',
			width: 180,
		},
		{
			title: '操作',
			dataIndex: 'active',
			key: 'active',
			width: 390,
			customRender: (row: any) => {
				const data = toRaw(row.record)
				return (
					<div>
						<a-button
							type='link'
							size='small'
							onClick={() => {
								handleGoVRPage(data)
							}}
						>
							<span class='iconfont m-r-small'>&#xe6e2;</span>
							口口 管理
						</a-button>
						<a-button
							size='small'
							onClick={() => {
								handleStudent(data)
							}}
						>
							<span class='iconfont m-r-small'>&#xe69c;</span>
							口口 管理
						</a-button>
						<a-button
							size='small'
							onClick={() => {
								handleEdit(data)
							}}
						>
							<span class='iconfont m-r-small'>&#xf0213;</span>
							编辑
						</a-button>
						<a-button
							danger
							size='small'
							onClick={() => {
								handleDelete(data)
							}}
						>
							<span class='iconfont m-r-small'>&#xe8b6;</span>
							强制删除
						</a-button>
					</div>
				)
			},
		},
	],
})

export const modalColumns = (handleModalDelete: Function) => ({
	data: [
		{
			title: '届别',
			dataIndex: 'class',
			key: 'class',
			width: 100,
		},
		{
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
			width: 100,
		},
		{
			title: '学号',
			dataIndex: 'number',
			key: 'number',
			width: 150,
		},
		{
			title: '性别',
			dataIndex: 'sex',
			key: 'sex',
			width: 50,
			customRender: (row: any) => h('div', row.record.sex ? '男' : '女'),
		},
		{
			title: '操作',
			dataIndex: 'active',
			key: 'active',
			width: 80,
			customRender: (row: any) => (
				<a-button
					danger
					size='small'
					onClick={() => {
						const data = toRaw(row.record)
						handleModalDelete(data)
					}}
				>
					<span class='iconfont m-r-small'>&#xe615;</span>移除口口
				</a-button>
			),
		},
	],
})

export const modalAddColumns = () => ({
	data: [
		{
			title: '届别',
			dataIndex: 'class',
			key: 'class',
			width: 100,
		},
		{
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
			width: 100,
		},
		{
			title: '学号',
			dataIndex: 'number',
			key: 'number',
			width: 150,
		},
		{
			title: '性别',
			dataIndex: 'sex',
			key: 'sex',
			width: 50,
			customRender: (row: any) => h('div', row.record.sex ? '男' : '女'),
		},
	],
})
