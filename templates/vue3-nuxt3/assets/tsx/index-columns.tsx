export const pageColumns = (handleMsg: Function) => ({
	data: [
		{
			title: '课件名称',
			dataIndex: 'name',
			key: 'name',
			width: 200,
			fixed: true,
			ellipsis: true,
		},
		{
			title: '学习人数',
			dataIndex: 'peopleNum',
			key: 'peopleNum',
			width: 100,
			customRender: (row: any) => {
				const data = toRaw(row.record)
				return (
					<div>
						<span class='iconfont m-r-small'>&#xe659;</span>
						{data.peopleNum}
					</div>
				)
			},
		},
		{
			title: '提交报告数',
			dataIndex: 'number',
			key: 'number',
			width: 100,
			customRender: (row: any) => {
				const data = toRaw(row.record)
				return (
					<div>
						<span class='iconfont m-r-small'>&#xe616;</span>
						{data.number}
					</div>
				)
			},
		},
		{
			title: '平均成绩',
			dataIndex: 'score',
			key: 'score',
			width: 100,
			customRender: (row: any) => {
				const data = toRaw(row.record)
				let color = ''
				if (data.score <= 60) {
					color = 'error'
				} else if (data.score <= 80) {
					color = 'warning'
				} else if (data.score <= 90) {
					color = 'success'
				} else {
					color = 'processing'
				}
				return (
					<div>
						<a-tag color={color}>
							<span class='iconfont m-r-small'>&#xe66f;</span>
							{data.score}
						</a-tag>
					</div>
				)
			},
		},
		{
			title: '操作',
			dataIndex: 'active',
			key: 'active',
			width: 190,
			customRender: (row: any) => {
				const data = toRaw(row.record)
				return (
					<div>
						<a-button
							size='small'
							onClick={() => {
								handleMsg(data)
							}}
						>
							<span class='iconfont m-r-small'>&#xe69c;</span>
							学习详情
						</a-button>
						<a
							href='./口口 口口 导入模板.xls'
							download='口口 口口 导入模板.xls'
						>
							<a-button type='link' size='small' onClick={() => {}}>
								<span class='iconfont m-r-small'>&#xe60e;</span>
								下载
							</a-button>
						</a>
					</div>
				)
			},
		},
	],
})

export const modalColumns = () => ({
	data: [
		{
			title: '口口 姓名',
			dataIndex: 'cname',
			key: 'cname',
			width: 80,
			fixed: true,
		},
		{
			title: '学号',
			dataIndex: 'cnumber',
			key: 'cnumber',
			width: 180,
		},
		{
			title: '行政班',
			dataIndex: 'class',
			key: 'class',
			width: 100,
		},
		{
			title: '开始学习时间',
			dataIndex: 'date',
			key: 'date',
			width: 150,
		},
		{
			title: '最后学习时间',
			dataIndex: 'date',
			key: 'date',
			width: 150,
		},
		{
			title: '学习次数',
			dataIndex: 'class',
			key: 'class',
			width: 80,
		},
		{
			title: '总时长（h）',
			dataIndex: 'number',
			key: 'number',
			width: 100,
		},
		{
			title: '得分',
			dataIndex: 'class',
			key: 'class',
			width: 70,
		},
	],
})
