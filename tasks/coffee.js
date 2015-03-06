var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var notify = require("gulp-notify");
var debug = require('gulp-debug');
var coffee = require('gulp-coffee');
var rename = require("gulp-rename");
var newer = require('gulp-newer');
var gulpif = require('gulp-if');
var config = require('../config').coffee


function buildCoffee(is_incremental_build) {
  return function() {
    gulp.src(config.src)
      .pipe(gulpif(is_incremental_build, newer({ //only compile if source file is newer than dest file
        dest: config.dist,
        map: function(relativePath) {
          return ".coffee." + path.parse(relativePath).name + ".js"
        }
      })))
      .pipe(coffee())
      .on("error", notify.onError({
          title: "Coffee Error",  
          subtitle: function(error) {
            var filename = path.parse(error.filename).base;
            return filename
          },
          message: "<%= error.name %>: <%= error.message %>"
      }))
      .pipe(rename({prefix: ".coffee."}))
      .pipe(notify({title:"Coffee", message: "Coffee compile succeeded: <%= file.relative %>"}))
      .pipe(gulp.dest(config.dist));
  };
}


gulp.task('coffee', buildCoffee(false));

gulp.task("watch:coffee", function() {
  buildCoffee(false)();
  gulp.watch(config.src, buildCoffee(true))
});

