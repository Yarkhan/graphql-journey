var normalizedPath = require("path").join(__dirname);

let models = {}
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  if(file == 'index.js') return
  models[file.slice(0,-3)] = require('./'+file).default
});

for(let model in models){
    models[model].associate(models)
}

// export {models}
export default models
