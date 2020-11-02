const path = require('path')
const OSS = require('ali-oss')
const chalk = require('chalk')
const log = console.log

const { getFilePath, getVersion, getObjectName } = require('./utils')

const env = process.argv.slice(3, 4)[0]
const cwd = process.cwd()
const BUILD_PATH = path.join(cwd, './build')
const CONFIG_PATH = path.join(cwd, 'dxconfig.js')

const { bucket, ...option } = require(CONFIG_PATH)
option.bucket = env === '-o' ? bucket.prod : bucket.dev

const oss = new OSS(option)
const paths = getFilePath(BUILD_PATH)
const version = getVersion()

async function put() {
	try {
    log(chalk.blueBright(`发布版本：${version}`))
    const startTime = new Date().getTime()
		for (const fileName of paths) {
			const objectName = getObjectName(fileName, version)
      const { res, url, name } = await oss.put(objectName, fileName)
      const { statusCode, statusMessage} = res
      const color = statusCode === 200 ? 'green' : 'red'
      log(chalk[color](`${url}, ${statusMessage}`))
    }
    const endTime = new Date().getTime()
    const timeUsed = (endTime - startTime) / 1000
    log(chalk.bgGreen('🎉 Done in', timeUsed, 's'))
	} catch (e) {
		log(chalk.bgRed(e))
	}
}

put()
