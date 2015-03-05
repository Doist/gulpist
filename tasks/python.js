var gulp = require('gulp');
var debug = require('gulp-debug');
var less = require('gulp-less');
var rename = require("gulp-rename");
var config = require('../config')
var shell = require('gulp-shell')

gulp.task("restart-server", 
  shell.task(['supervisorctl -c ../todoist-inventory/supervisor.conf restart todoist worker'])
);

gulp.task("watch:server", function() {
  gulp.watch(config.py_server_file, ["restart-server"]);
});
