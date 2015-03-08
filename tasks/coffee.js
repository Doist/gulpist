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
var browserSync = require('browser-sync');

var coffeeJSX = require('gulp-cjsx');



function buildCoffee(is_incremental_build) {
  return function() {
    gulp.src(config.src)
      .pipe(gulpif(is_incremental_build, newer({ //only compile if source file is newer than dest file
        dest: config.dest,
        map: function(relativePath) {
          return path.parse(relativePath).dir + "/.coffee." + path.parse(relativePath).name + ".js"
        }
      })))
      //.pipe(coffee({bare: true}))
      .pipe(coffeeJSX({bare: true}))
      .on("error", notify.onError({
          title: "Coffee Error",  
          subtitle: function(error) {
            var filename = path.parse(error.filename).base;
            return filename
          },
          message: "<%= error.name %>: <%= error.message %>"
      }))
      .pipe(rename({prefix: config.destFilePrefix}))
      .pipe(notify({title:"Coffee", message: "Coffee compile succeeded: <%= file.relative %>"}))
      .pipe(gulp.dest(config.dest))
      .pipe(browserSync.reload({stream:true}));
  };
}


gulp.task('coffee', buildCoffee(false));

gulp.task("watch:coffee", function() {
  buildCoffee(false)();
  gulp.watch(config.src, buildCoffee(true))
});

