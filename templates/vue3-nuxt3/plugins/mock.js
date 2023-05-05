// 使用mockjs模拟数据 http://mockjs.com/
import Mock from 'mockjs'
const imgArray = [
	'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
	'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
	'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp',
	'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
	'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
	'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
	'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
	'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
	'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
	'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
	'',
	'',
	'',
	'',
]

export default defineNuxtPlugin(nuxtApp => {
	const runtimeConfig = useRuntimeConfig()
	const baseUrl = 'http://localhost:7890'
	if (runtimeConfig.public.apiBase === 'mock') {
		/**
		 * index page
		 */
		// tree
		Mock.mock(baseUrl + '/api/tree', {
			// data: [
			// 	{
			// 		key: '@id',
			// 		date: '@datetime(yyyy-MM-dd HH:mm)',
			// 		title: '课件',
			// 		value: 1,
			// 		'children|5-50': [
			// 			{
			// 				key: '@id',
			// 				date: '@datetime(yyyy-MM-dd HH:mm)',
			// 				title: '@ctitle(3,20)',
			// 				value: '@integer(10, 10000)',
			// 				'children|1-10': [
			// 					{
			// 						key: '@id',
			// 						date: '@datetime(yyyy-MM-dd HH:mm)',
			// 						title: '@ctitle(3,20)',
			// 						value: '@integer(10, 10000)',
			// 					},
			// 				],
			// 			},
			// 		],
			// 	},
			// ],
			data: [
				{
					'data|5-50': [
						{
							key: '@id',
							date: '@datetime(yyyy-MM-dd HH:mm)',
							title: '@ctitle(3,20)',
							value: '@integer(10, 10000)',
							ename: '@word',
							cname: '@csentence(5)',
							'img|1': imgArray,
							'children|1-10': [
								{
									key: '@id',
									date: '@datetime(yyyy-MM-dd HH:mm)',
									title: '@ctitle(3,20)',
									value: '@integer(10, 10000)',
									ename: '@word',
									cname: '@csentence(5)',
									'img|1': imgArray,
								},
							],
						},
					],
				},
			],
		})

		// index-基础概览
		Mock.mock(baseUrl + '/api/baseData', {
			data: {
				coursewareClass: '@integer(10, 10000)',
				coursewareNumber: '@integer(100, 10000)',
				coursewareSize: '@integer(1, 100)',
				theoryClass: '@integer(10, 10000)',
				theoryNumber: '@integer(100, 10000)',
				materials: '@integer(100, 10000)',
				discuss: '@integer(100, 10000)',
				class: '@integer(1000, 9999)',
				teacher: '@integer(1000, 9999)',
				student: '@integer(10000, 99999)',
				onLine: '@integer(1, 10000)',
				studentNum: '@integer(1, 99999)',
				loginNum: '@integer(1, 99999)',
			},
		})

		// index-最近操作日志
		Mock.mock(baseUrl + '/api/operation', {
			'data|30-100': [
				{
					id: '@id',
					date: '@datetime(yyyy-MM-dd HH:mm)',
					name: '@cname',
					'active|1': [
						{
							name: '添加',
							icon: '&#xe62d;',
						},
						{
							name: '编辑',
							icon: '&#xf0213;',
						},
						{
							name: '删除',
							icon: '&#xe8b6;',
						},
						{
							name: '登录',
							icon: '&#xe653;',
						},
						{
							name: '退出登录',
							icon: '&#xe654;',
						},
						{
							name: '参与理论考试',
							icon: '&#xe66f;',
						},
						{
							name: '参与理论模拟考试',
							icon: '&#xe66f;',
						},
					],
					content: '@csentence',
				},
			],
		})

		// index-题库信息
		Mock.mock(baseUrl + '/api/statistics', {
			data: {
				yData: ['十一月', '十二月', '一月', '二月', '三月', '四月'],
				xData: [
					{
						'data|6': ['@integer(10, 100)'],
					},
					{
						'data|6': ['@integer(100, 1000)'],
					},
					{
						'data|6': ['@integer(100, 2000)'],
					},
					{
						'data|6': ['@integer(100, 3000)'],
					},
					{
						'data|6': ['@integer(100, 4000)'],
					},
				],
			},
		})

		/**
		 * 口口 管理
		 */
		// index table
		Mock.mock(baseUrl + '/api/class', {
			total: 50,
			'data|10': [
				{
					id: '@id',
					'img|1': imgArray,
					name: '@ctitle(3,20)',
					teacher: '@cname',
					'class|1': [
						'2016',
						'2017',
						'2018',
						'2019',
						'2020',
						'2021',
						'2022',
						'2022',
					],
					date: '@datetime(yyyy-MM-dd HH:mm)',
					comment: '@ctitle(10,100)',
				},
			],
		})
		// 学员管理
		Mock.mock(baseUrl + '/api/class/student', {
			total: 600,
			'data|10': [
				{
					id: '@id',
					key: '@id',
					'class|1': [
						'2016',
						'2017',
						'2018',
						'2019',
						'2020',
						'2021',
						'2022',
						'2022',
					],
					name: '@cname',
					number: '@natural',
					'sex|1': [0, 1],
				},
			],
		})
		// 学员管理-添加学员-等于查询所有学员
		Mock.mock(baseUrl + '/api/class/student/all', {
			total: 80,
			'data|10': [
				{
					id: '@id',
					'class|1': [
						'2016',
						'2017',
						'2018',
						'2019',
						'2020',
						'2021',
						'2022',
						'2022',
					],
					name: '@cname',
					number: '@natural',
				},
			],
		})
		/**
		 * 口口 管理
		 */
		Mock.mock(baseUrl + '/api/vr', {
			total: 60,
			'data|10': [
				{
					'img|1': imgArray,
					key: '@id',
					id: '@id',
					'class|1': [
						'2016',
						'2017',
						'2018',
						'2019',
						'2020',
						'2021',
						'2022',
						'2022',
					],
					name: '@ctitle(10,30)',
					cname: '@cname',
					cnumber: '@natural',
					score: '@integer(50, 100)',
					peopleNum: '@integer(10, 99999)',
					type: '@ctitle(3,10)',
					number: '@natural(10000,999999)',
					time: '@natural(10,9999)',
					date: '@datetime(yyyy-MM-dd HH:mm)',
				},
			],
		})
	}
})
