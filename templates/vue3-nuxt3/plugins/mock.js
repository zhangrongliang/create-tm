// 使用mockjs模拟数据
import Mock from 'mockjs'

export default defineNuxtPlugin(nuxtApp => {
	const runtimeConfig = useRuntimeConfig()
	const baseUrl = 'http://localhost:7890'
	if (runtimeConfig.public.apiBase === 'mock') {
		/**
		 * index page
		 */
		// tree
		Mock.mock(baseUrl + '/api/tree', {
			data: [
				{
					id: '@id',
					date: '@datetime(yyyy-MM-dd HH:mm)',
					label: '课件',
					value: 1,
					'children|5-50': [
						{
							id: '@id',
							date: '@datetime(yyyy-MM-dd HH:mm)',
							label: '@ctitle(3,20)',
							value: '@integer(10, 10000)',
							'children|1-10': [
								{
									id: '@id',
									date: '@datetime(yyyy-MM-dd HH:mm)',
									label: '@ctitle(3,20)',
									value: '@integer(10, 10000)',
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
				coursewareClass: '@integer(10, 100)',
				coursewareNumber: '@integer(100, 1000)',
				theoryClass: '@integer(10, 100)',
				theoryNumber: '@integer(100, 5000)',
				materials: '@integer(100, 5000)',
				discuss: '@integer(100, 5000)',
				class: '@integer(10, 500)',
				teacher: '@integer(10, 500)',
				student: '@integer(10, 500)',
				onLine: '@integer(1, 100)',
			},
		})

		// index-最近操作日志
		Mock.mock(baseUrl + '/api/operation', {
			'data|30-100': [
				{
					id: '@id',
					date: '@datetime(yyyy-MM-dd HH:mm)',
					name: '@cname',
					'active|1': ['新增', '编辑', '删除', '登录'],
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
		 * 班级管理
		 */
		// index table
		Mock.mock(baseUrl + '/api/class', {
			total: 50,
			'data|10': [
				{
					id: '@id',
					'img|1': [
						'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
						'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
						'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
						'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
						'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
						'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
						'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
					],
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
		 * VR 管理
		 */
		Mock.mock(baseUrl + '/api/vr', {
			total: 60,
			'data|10': [
				{
					'img|1': [
						'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
						'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
						'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
						'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
						'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
						'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
						'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
					],
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
					type: '@ctitle(3,10)',
					number: '@natural(10000,999999)',
					time: '@natural(10,9999)',
				},
			],
		})
	}
})
