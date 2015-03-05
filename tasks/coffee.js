var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require("gulp-notify");
var debug = require('gulp-debug');
var coffee = require('gulp-coffee');
var rename = require("gulp-rename");
var config = require('../config').coffee


gulp.task('coffee', function() {
  gulp.src(config.src)
    .pipe(coffee())
    .on('error', 
      notify.onError( function (error) {
        return "Coffee compile error: " + error.message;
      })
    )
    .pipe(rename({
      prefix: ".coffee."
    }))
    .pipe(notify("Coffee compile succeeded: <%= file.relative %>"))
    .pipe(gulp.dest(config.dist));
});


gulp.task("watch:coffee", function() {
  gulp.watch(config.src, ["coffee"])
});
