const { readdirSync } = require('fs')
const { resolve, basename } = require('path')

const fileName = basename(__filename)
const basePath = resolve(__dirname)
const baseApiPath = '/api'

const boot = (app) => {
    readdirSync(basePath)
        .filter((file) => file !== fileName)
        .forEach(function (file) {
            let module = file.substr(0, file.indexOf('.'))
            let filePath = basePath + '/' + module
            let apiPath = baseApiPath + '/' + module
            let route = resolve(filePath)

            require(route)(app, module, apiPath)
        })
}

exports.boot = boot
