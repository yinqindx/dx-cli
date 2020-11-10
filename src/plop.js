const path = require('path')
const {paramCase, pascalCase} = require('change-case')

module.exports = function (plop) {
	const cwd = process.cwd()
	const component_path = path.join(cwd, 'src/components')
	const page_path = path.join(cwd, 'src/pages')

	plop.setHelper('kebabCase', (value) => {
		const paths = value.split('/')
		const name = paths[paths.length - 1]
		return paramCase(name)
	});

	plop.setHelper('pascalCase', (value) => {
		const paths = value.split('/')
		const name = paths[paths.length - 1]
		console.log(name)
		return pascalCase(name)
	});

	plop.setGenerator('component', {
		description: '组件创建',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'component name please',
			},
		],
		actions: [
			{
				type: 'add',
				path: component_path + '/{{name}}/index.jsx',
				templateFile: 'template/component/index.hbs',
			},
			{
				type: 'add',
				path: component_path + '/{{name}}/index.less',
				templateFile: 'template/component/index.less.hbs',
			},
		],
	})

	plop.setGenerator('page', {
		description: '页面创建创建',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'page name please',
			},
			{
				type: 'confirm',
				name: 'withForm',
				message: '页面是否添加表单？',
				default: false
			},
		],
		actions: [
			{
				type: 'add',
				path: page_path + '/{{name}}/index.jsx',
				templateFile: 'template/page/index.hbs',
			},
			{
				type: 'add',
				path: page_path + '/{{name}}/store.js',
				templateFile: 'template/page/store.hbs',
			},
			{
				type: 'add',
				path: page_path + '/{{name}}/index.less',
				templateFile: 'template/page/index.less.hbs',
			},
		],
	})
}
