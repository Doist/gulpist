var gulp = require('gulp');
var less = require('gulp-less');
var rename = require("gulp-rename");
var notify = require("gulp-notify");
var config = require('../config').less


gulp.task('less', function () {
  return gulp.src(config.src)
    .pipe(less())
    .pipe(rename({
      prefix: ".less."
    }))
    .pipe(gulp.dest(config.dist))
    .pipe(notify("LESS compiled: <%= file.relative %>"));
});

gulp.task("watch:less", function() {
  gulp.watch(config.src, ["less"]);
});

