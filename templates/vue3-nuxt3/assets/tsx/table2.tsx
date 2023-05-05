export const pageColumns = (handleThe: Function, handleDelete: Function) => ({
	data: [
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
			title: '学习次数',
			dataIndex: 'number',
			key: 'number',
			width: 100,
		},
		{
			title: '操作',
			dataIndex: 'active',
			key: 'active',
			width: 260,
			customRender: (row: any) => {
				const data = toRaw(row.record)
				return (
					<div>
						<a-button
							size='small'
							onClick={() => {
								handleThe(data)
							}}
						>
							<span class='iconfont m-r-small'>&#xe618;</span>
							口口 附件
						</a-button>
						<a-button
							danger
							size='small'
							onClick={() => {
								handleDelete(data)
							}}
						>
							<span class='iconfont m-r-small'>&#xe8b6;</span>
							删除
						</a-button>
					</div>
				)
			},
		},
	],
})

export const modalColumns = () => ({
	data: [
		{
			title: '名称',
			width: 200,
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '后缀名',
			dataIndex: 'suffix',
			key: 'suffix',
			width: 100,
		},
		{
			title: '上传用户',
			dataIndex: 'uploadName',
			key: 'uploadName',
			width: 100,
		},
		{
			title: '上传日期',
			dataIndex: 'date',
			key: 'date',
			width: 150,
		},
		{
			title: '操作',
			dataIndex: 'active',
			key: 'active',
			width: 100,
		},
	],
})
