var path = require('path');
var argv = require('yargs').argv;

if (!argv.config) {
    argv.config = argv.gulpistpwd + '/' + 'gulpist_config.json';
}

try {
    var configFilePath = argv.config
    var config = require(configFilePath);
    config.workDir = path.parse(configFilePath).dir;
} catch(e) {
    console.error("Configuration File Error: Cannot load gulpist configuration file" + e);
    process.exit();
}

module.exports = config
