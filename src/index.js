const path = require('path')
const {paramCase} = require('change-case')

module.exports = function (plop) {
	const cwd = process.cwd()
	const component_path = path.join(cwd, 'src/components')

	plop.setHelper('kebabCase', (value) => paramCase(value));

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
}
