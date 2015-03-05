var config = require('./config')
var requireDir = require('require-dir')

process.chdir(config.workDir);
requireDir('./tasks', { recurse: true });
