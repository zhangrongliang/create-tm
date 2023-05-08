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
				message: '请输入项目名称',
				default: 'my-project',
			},
			/**
			 * TODO 放置在 template 目录下的配合使用
			 */
			{
				type: 'input',
				name: 'description',
				message: 'project description?',
				default: 'zhangrongliang',
			},
			{
				type: 'input',
				name: 'author',
				message: 'author name?',
				default: 'zhangrongliang',
			},
			{
				type: 'list',
				name: 'template',
				message: '请选择项目模板',
				choices: ['nuxt3-vue3-ant-design-vue', 'nuxt3-vue3-element-plus'],
			},
		])
		.then(async answers => {
			//根据回答以及选项，参数来生成项目文件
			const processGenFiles = ora('开始创建项目……')
			processGenFiles.start() // 进度条开始
			await genFiles(answers)
			processGenFiles.succeed(`项目创建成功: ${answers.name}`)
		})
		.catch(error => {
			console.error(error)
		})
}

const clone = function (repo, desc) {
	return new Promise((resolve, reject) => {
		// https://www.npmjs.com/package/download-git-repo
		const download = promisify(require('download-git-repo')) // download-git-repo: Download and extract a git repository (GitHub, GitLab, Bitbucket)
		const ora = require('ora')
		const process = ora(`下载模板中...${repo}`)
		;(async () => {
			process.start() // 进度条开始
			await download(repo, desc.name, { clone: true })
			//  download-git-repo导出的download方法，第一个参数repo是仓库地址，格式有三种：
			// GitHub - github:owner/name or simply owner/name
			// GitLab - gitlab:owner/name
			// Bitbucket - bitbucket:owner/name
			process.succeed(`模板下载成功: ${desc.template}`)
			resolve()
		})()
	})
}

//获得命令运行时的路径
const getCwd = () => process.cwd()

// 下载模板
const genFiles = options => {
	return new Promise((resolve, reject) => {
		/**
		 * TODO 放置在 template 目录下的配合使用
		 */
		//模版的目录
		const templateSrc = path.resolve(
			__dirname,
			`./templates/${options.template}`
		)
		//项目指定生成目录，如果命令中没有有配置目录，则在当前命令运行的目录下生成以项目名称为名字的新目录
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
		// Gitlab-通用模板(vue3 nuxt3，完全纯静态、SSR 服务器渲染、PWA 渐进式)
		// if (
		// 	options.template ===
		// 	'Gitlab-通用模板(vue3 nuxt3，完全纯静态、SSR 服务器渲染、PWA 渐进式)'
		// ) {
		// 	clone(
		// 		'direct:http://172.16.0.20/tm_java/tm_web/other/template/vue3-templates.git',
		// 		options
		// 	).then(() => {
		// 		resolve()
		// 	})
		// }
	})
}

handleCreate()
