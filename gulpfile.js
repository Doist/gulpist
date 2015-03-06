var gulp = require('gulp');
var config = require('./config')
var requireDir = require('require-dir')

process.chdir(config.workDir);
requireDir('./tasks', { recurse: true });


gulp.task('build', ['less', 'coffee']);
gulp.task('watch', ['watch:less', 'watch:coffee', 'browserify']);

