let models = require('require-dir')()

module.exports =  Object.assign(...Object.keys(models).map(name => {
    let obj = {}
    obj[name[0].toUpperCase()+name.substr(1)] = models[name].default
    return obj
}))
