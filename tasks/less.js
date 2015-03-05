var gulp = require('gulp');
var debug = require('gulp-debug');
var less = require('gulp-less');
var rename = require("gulp-rename");
var config = require('../config').less
var notify = require("gulp-notify");


gulp.task('less', function () {
  return gulp.src(config.src)
    .pipe(debug({title: 'less src files'}))
    .pipe(less())
    .pipe(rename({
      prefix: ".less."
    }))
    .pipe(gulp.dest(config.dist))
    .pipe(debug({title: 'less dist files'}))
    .pipe(notify("LESS compiled: <%= file.relative %>"));
});

gulp.task("watch:less", function() {
  gulp.watch(config.src, ["less"]);
});

