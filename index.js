#! /usr/bin/env node

const inquirer = require('inquirer')
const path = require('path')
const Metalsmith = require('metalsmith')
const ora = require('ora')
const { promisify } = require('util')

const handleCreate = () => {
	// 用户交互
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'name',
				message: 'Project Name:',
				default: 'my-project',
			},
			{
				type: 'input',
				name: 'description',
				message: 'Project Description:',
				default: 'zhangrongliang',
			},
			{
				type: 'input',
				name: 'author',
				message: 'Project Author:',
				default: 'zhangrongliang',
			},
			{
				type: 'list',
				name: 'template',
				message: 'Choose A Template',
				choices: [
					'nuxt3-vue3-ant-design-vue',
					'nuxt3-vue3-element-plus',
					'vue-element-plus-admin',
					'antd pro vue',
				],
			},
		])
		.then(async answers => {
			// answers 用户交互数据
			const process = ora('开始创建项目……')
			// 进度条开始
			process.start()
			await genFiles(answers)
			process.succeed(`项目创建成功: ${answers.name}`)
		})
		.catch(error => {
			console.error(error)
		})
}

const clone = function (repo, desc) {
	return new Promise((resolve, reject) => {
		const download = promisify(require('download-git-repo'))
		const process = ora(`下载模板中...${repo}`)
		;(async () => {
			// 进度条开始
			process.start()
			await download(repo, desc.name, { clone: true })
			process.succeed(`模板下载成功: ${desc.template}`)
			resolve()
		})()
	})
}

const copy = function (options) {
	return new Promise((resolve, reject) => {
		// 获得命令运行时的路径
		const getCwd = () => process.cwd()
		//模版的目录
		const templateSrc = path.resolve(
			__dirname,
			`./templates/${options.template}`
		)
		// 项目生成目录
		const destination = options.destination
			? path.resolve(options.destination)
			: path.resolve(getCwd(), options.name)
		// 需要动态生成的文件
		const renderPathList = ['package.json']
		// 模板安装
		Metalsmith(__dirname)
			.source(templateSrc)
			.destination(destination)
			.use(files => {
				Object.keys(files).forEach(key => {
					// 指定的文件动态生成
					if (renderPathList.includes(key)) {
						const file = files[key]
						// 原内容
						const str = file.contents.toString()
						const newStr = JSON.parse(str)
						// 新内容
						const newContents = JSON.stringify(
							{ ...newStr, ...options },
							null,
							2
						)
						// 将新内容写到文件中
						file.contents = Buffer.from(newContents)
					}
				})
			})
			.build(err => {
				if (err) {
					console.error(err)
				}
				resolve()
			})
	})
}

// 下载模板
const genFiles = options => {
	return new Promise((resolve, reject) => {
		if (options.template === 'vue-element-plus-admin') {
			clone(
				'direct:https://gitee.com/kailong110120130/vue-element-plus-admin.git',
				options
			).then(() => {
				resolve()
			})
		} else if (options.template === 'antd pro vue') {
			clone(
				'direct:https://github.com/vueComponent/ant-design-vue-pro.git',
				options
			).then(() => {
				resolve()
			})
		} else {
			copy(options).then(() => {
				resolve()
			})
		}
	})
}

handleCreate()
