var path = require('path');
var argv = require('yargs').argv;

if (!argv.config) {
    console.error("Arugment Error (Missing config): Please gulpist.json file path (ex: gulp build --config /project/gulpist.json)");
    process.exit();
}

try {
    var configFilePath = argv.config
    config = require(configFilePath);
    config.workDir = path.parse(configFilePath).dir;
} catch(e) {
    console.error("Configuration File Error: Cannot load gulpist configuration file" + e);
    process.exit();
}

module.exports = config
