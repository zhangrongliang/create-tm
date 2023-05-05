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
				message: 'project name?',
				default: 'my-project',
			},
			// {
			// 	type: 'input',
			// 	name: 'description',
			// 	message: 'project description?',
			// 	default: 'tme',
			// },
			// {
			// 	type: 'input',
			// 	name: 'author',
			// 	message: 'author name?',
			// 	default: 'tme',
			// },
			{
				type: 'list',
				name: 'template',
				message: 'choose a template',
				choices: [
					'Gitlab-通用模板(vue3 nuxt3，完全纯静态、SSR 服务器渲染、PWA 渐进式)',
					'Gitlab-Vue3基础模板',
					'Gitlab-uniapp vue3小程序模板',
					'Gitlab-Unity打包WebGL的模板',
					'Gitlab-VSP类型课件模板',
					'Gitlab-一屏课件模板 - 无后端',
					'Gitlab-一屏课件模板 - 有后端',
					'Gitlab-怡康Vue3项目模板',
					'Gitlab-Vue2基础模板',
				],
			},
		])
		.then(async answers => {
			//根据回答以及选项，参数来生成项目文件
			const processGenFiles = ora('Create project……')
			processGenFiles.start() // 进度条开始
			await genFiles(answers)
			processGenFiles.succeed(`Create project complete: ${answers.name}`)
		})
		.catch(error => {
			console.error(error)
		})
}

const clone = async function (repo, desc) {
	// https://www.npmjs.com/package/download-git-repo
	const download = promisify(require('download-git-repo')) // download-git-repo: Download and extract a git repository (GitHub, GitLab, Bitbucket)
	const ora = require('ora')
	const process = ora(`下载......${repo}`)
	process.start() // 进度条开始
	await download(repo, desc.name, { clone: true })
	//  download-git-repo导出的download方法，第一个参数repo是仓库地址，格式有三种：
	// GitHub - github:owner/name or simply owner/name
	// GitLab - gitlab:owner/name
	// Bitbucket - bitbucket:owner/name
	process.succeed()
}

//获得命令运行时的路径
const getCwd = () => process.cwd()

// 下载模板
const genFiles = options => {
	//模版的目录
	const templateSrc = path.resolve(__dirname, `./templates/${options.template}`)
	//项目指定生成目录，如果命令中没有有配置目录，则在当前命令运行的目录下生成以项目名称为名字的新目录
	const destination = options.destination
		? path.resolve(options.destination)
		: path.resolve(getCwd(), options.name)

	// 需要动态生成的文件
	const renderPathList = ['package.json']
	// vue3-nuxt3 模板
	// if (options.template === 'vue3-nuxt3') {
	// 	Metalsmith(__dirname)
	// 		.source(templateSrc)
	// 		.destination(destination)
	// 		.use(files => {
	// 			Object.keys(files).forEach(key => {
	// 				// 指定的文件动态生成
	// 				if (renderPathList.includes(key)) {
	// 					const file = files[key]
	// 					// 原内容
	// 					const str = file.contents.toString()
	// 					const newStr = JSON.parse(str)
	// 					// 新内容
	// 					const newContents = JSON.stringify(
	// 						{ ...newStr, ...options },
	// 						null,
	// 						2
	// 					)
	// 					// 将新内容写到文件中
	// 					file.contents = Buffer.from(newContents)
	// 				}
	// 			})
	// 		})
	// 		.build(err => {
	// 			if (err) {
	// 				console.error(err)
	// 			}
	// 		})
	// }

	// Gitlab-通用模板(vue3 nuxt3，完全纯静态、SSR 服务器渲染、PWA 渐进式)
	if (
		options.template ===
		'Gitlab-通用模板(vue3 nuxt3，完全纯静态、SSR 服务器渲染、PWA 渐进式)'
	) {
		clone(
			'direct:http://172.16.0.20/tm_java/tm_web/other/template/vue3-templates.git',
			options
		)
	}

	// Gitlab-Vue3基础模板
	if (options.template === 'Gitlab-Vue3基础模板') {
		clone(
			'direct:http://172.16.0.20/tm_java/tm_web/other/template/vue3-template.git',
			options
		)
	}

	// Gitlab-uniapp vue3小程序模板
	if (options.template === 'Gitlab-uniapp vue3小程序模板') {
		clone(
			'direct:http://172.16.0.20/tm_java/tm_web/other/template/uniapp-vue3.git',
			options
		)
	}

	// Gitlab-Unity打包WebGL的模板
	if (options.template === 'Gitlab-Unity打包WebGL的模板') {
		clone(
			'direct:http://172.16.0.20/tm_java/tm_web/other/template/unity.git',
			options
		)
	}

	// Gitlab-VSP类型课件模板
	if (options.template === 'Gitlab-VSP类型课件模板') {
		clone(
			'direct:http://172.16.0.20/tm_java/tm_web/other/template/vsp-courseware-template.git',
			options
		)
	}

	// Gitlab-Vue2基础模板
	if (options.template === 'Gitlab-Vue2基础模板') {
		clone(
			'direct:http://172.16.0.20/tm_java/tm_web/other/template/vue2-template.git',
			options
		)
	}

	// Gitlab-一屏课件模板 - 无后端
	if (options.template === 'Gitlab-一屏课件模板 - 无后端') {
		clone(
			'direct:http://172.16.0.20/tm_java/tm_web/other/template/courseware-template.git',
			options
		)
	}

	// Gitlab-一屏课件模板 - 有后端
	if (options.template === 'Gitlab-一屏课件模板 - 有后端') {
		clone(
			'direct:http://172.16.0.20/tm_java/tm_web/other/template/courseware-template-api.git',
			options
		)
	}

	// Gitlab-怡康Vue3项目模板
	if (options.template === 'Gitlab-怡康Vue3项目模板') {
		clone(
			'direct:http://172.16.0.20/tm_java/tm_web/other/template/vue3.git',
			options
		)
	}
}

handleCreate()
