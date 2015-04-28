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
var runSequence = require('run-sequence');

var coffeeJSX = require('gulp-cjsx');



function buildCoffee(is_incremental_build) {
  return gulp.src(config.src)
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
          if (error.filename) {
            var filename = path.parse(error.filename).base;
            return filename
          }
        },
        message: "<%= error.name %>: <%= error.message %> \n <%= error %>"
    }))
    .pipe(rename({prefix: config.prefix}))
    .pipe(notify({title:"Coffee", message: "Coffee compile succeeded: <%= file.relative %>"}))
    .pipe(gulp.dest(config.dest));
}


gulp.task('coffee', function() {
  return buildCoffee(false)
});

gulp.task('_coffee:watch', function() {
  gulp.watch(config.src, function(){
    return buildCoffee(true);
  })
});

gulp.task("coffee:watch", function(callback) {
  runSequence('coffee', '_coffee:watch', callback)
});

