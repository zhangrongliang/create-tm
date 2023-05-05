import { Modal, message } from 'ant-design-vue'

/**
 * @description: 生成随机数
 * @param {max}  随机数阈值
 * @return {number}  返回随机数
 */
export const _getRandomNumber = (max = 1000) => {
	return Math.floor(Math.random() * Math.floor(max))
}

/**
 * @description: 更改地址栏参数，不跳转 url
 * @param {query}
 */
export const _locationQuery = (query: string) => {
	try {
		window.history.pushState({}, '', `${window.location.pathname}${query}`)
	} catch (error) {}
}

/**
 * @description: 统一处理 confirm 方法和回调处理
 * @param {title} title 标题、附提示、确认按钮名称
 * @param {name} name <> 被特意表示的内容
 * @param {callBack} callBack 回调方法（可选），必须为异步方法
 */
export const _handleDelete = (title: string, name?: string, callBack?: any) => {
	Modal.confirm({
		title: `${title}确认`,
		content: `您确定${title}` + (name ? `<${name}>` : '') + `吗？`,
		okText: `${title}`,
		cancelText: '取消',
		okType: 'danger',
		maskClosable: true,
		onOk() {
			return new Promise<void>(resolve => {
				if (callBack) {
					;(async () => {
						await callBack()
						message.success('操作成功')
						resolve()
					})()
				} else {
					message.success('操作成功')
					resolve()
				}
			})
		},
	})
}
