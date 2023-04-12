#! /usr/bin/env node

const { program } = require('commander')
const inquirer = require('inquirer')
const path = require('path')
const Metalsmith = require('metalsmith')
const ejs = require('ejs')
const ora = require('ora')

const handleCreate = (params, options) => {
	console.log(params, options)
	// 用户交互
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'author',
				message: 'author name?',
			},
			{
				type: 'list',
				name: 'template',
				message: 'choose a template',
				choices: ['vue3-nuxt3'],
			},
		])
		.then(async answers => {
			//根据回答以及选项，参数来生成项目文件
			const processGenFiles = ora('Create project……')
			processGenFiles.start() // 进度条开始
			await genFiles({ ...answers, ...params, ...options })
			processGenFiles.succeed(`Create project complete: ${params.name}`)
		})
		.catch(error => {
			console.error(error)
		})
}

//获得命令运行时的路径
const getCwd = () => process.cwd()
const genFiles = options => {
	//模版的目录
	const templateSrc = path.resolve(__dirname, `./templates/${options.template}`)
	//项目指定生成目录，如果命令中没有有配置目录，则在当前命令运行的目录下生成以项目名称为名字的新目录
	const destination = options.destination
		? path.resolve(options.destination)
		: path.resolve(getCwd(), options.name)

	// 需要动态生成的文件
	const renderPathList = ['package.json']

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
					// 新内容
					const newContents = ejs.render(str, options)
					// 将新内容写到文件中
					file.contents = Buffer.from(newContents)
				}
			})
		})
		.build(err => {
			if (err) {
				console.error(err)
			}
		})
}

program
	.command('create <name> [destination]')
	.description('create a project')
	.action((name, destination) => {
		handleCreate({ name, destination }, program.opts())
	})

program.option('-ig,--initgit', 'init git')

program.parse(process.argv)
