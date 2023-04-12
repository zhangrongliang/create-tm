import axios from 'axios'

const baseUrl = process.env.NODE_ENV
	? 'http://localhost:7890'
	: 'https://nuxt.com'

const http = axios.create({
	baseURL: baseUrl + '/api',
	// 如果请求时间超过 `timeout` 的值，则请求会被中断
	timeout: 5000, // 默认值是 `0` (永不超时)
	// `responseType` 表示浏览器将要响应的数据类型
	// 选项包括: 'arraybuffer', 'document', 'json', 'text', 'stream'
	// 浏览器专属：'blob'
	responseType: 'json', // 默认值
	// `validateStatus` 定义了对于给定的 HTTP状态码是 resolve 还是 reject promise。
	// 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，
	// 则promise 将会 resolved，否则是 rejected。
	validateStatus: function (status) {
		return status >= 200 && status < 300 // 默认值
	},
})

// 添加请求拦截器
http.interceptors.request.use(
	function (config) {
		// 在发送请求之前做些什么
		const cookieTmToken = useCookie('tm-user')
		// console.log('cookieTmToken:', cookieTmToken)
		return config
	},
	function (error) {
		// 对请求错误做些什么
		return Promise.reject(error)
	}
)

// 添加响应拦截器
http.interceptors.response.use(
	function (response) {
		// 2xx 范围内的状态码都会触发该函数。
		// 对响应数据做点什么
		return response.data
	},
	function (error) {
		// 超出 2xx 范围的状态码都会触发该函数。
		// 对响应错误做点什么
		return Promise.reject(error)
	}
)

/**
 * index page
 */
// tree
export const fetchTree = () => http.get('/tree')

// 基础数据
export const fetchBaseData = () => http.get('/baseData')

// 最近操作日志
export const fetchOperation = () => http.get('/operation')

// 题库信息
export const fetchStatistics = () => http.get('/statistics')

/**
 * class page
 */
// index table

export const fetchClass = (query?: {
	class: string
	name: string
	pageSize?: number | 10
	currentPage: number | 1
}) =>
	http.get(
		'/class'
		// , { params: query }
	)

// 学员管理 table
export const fetchClassStudent = (query?: {
	class: string | number
	name: string
	number: string | number
	pageSize?: number | 10
	currentPage: number | 1
}) =>
	http.get(
		'/class/student'
		// , { params: query }
	)

// 学员管理 table
export const fetchClassStudentAll = (query?: {
	class: string | number
	name: string
	number: string | number
	pageSize?: number | 10
	currentPage: number | 1
}) =>
	http.get(
		'/class/student/all'
		// , { params: query }
	)

/**
 * VR 管理
 */
export const fetchVr = (query?: {
	name: string
	pageSize?: number | 10
	currentPage: number | 1
}) =>
	http.get(
		'/vr'
		// , { params: query }
	)
