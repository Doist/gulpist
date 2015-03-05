var config = require('./config')

// change the working directory of process so that all the path
// in config.js are relative the working directory
process.chdir(config.workDir);

var requireDir = require('require-dir')
requireDir('./', { recurse: true });
