const path = require('path')
const fs = require('fs')
const chalk = require('chalk');
const log = console.log;

const child_process = require('child_process')
const { execSync } = child_process

function getFilePath(dir) {
	const paths = []

	function getDirPaths(dir) {
		fs.readdirSync(dir).forEach((file) => {
			const pathname = path.join(dir, file)
			if (fs.statSync(pathname).isDirectory()) {
				getDirPaths(pathname)
			} else {
				paths.push(pathname)
			}
		})
	}

	getDirPaths(dir)
	return paths
}

function getBranchName() {
	return execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
}

const getVersion = () => {
	const branchName = getBranchName()
	const reg = /[\s\S]+[/]([\d]+\.[\d]+\.[\d]+)/g
	const result = reg.exec(branchName)
	if (result) {
		return result[1]
	}
	const error = '请检查你的分支名，正确格式为：prefix/x.y.z'
	log(chalk.red(error))
	throw Error(error);
}

const getObjectName = (fileName, version) => {
	const filePath = fileName.split('build')[1]
	return `${version}${filePath}`
}

module.exports = {
	getFilePath,
	getVersion,
	getObjectName,
}
