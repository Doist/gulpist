var gulp = require('gulp');
var path = require('path');
var gutil = require('gulp-util');
var notify = require("gulp-notify");
var debug = require('gulp-debug');
var coffee = require('gulp-coffee');
var rename = require("gulp-rename");
var newer = require('gulp-newer');
var config = require('../config').coffee




gulp.task('coffee', function() {
  gulp.src(config.src)
    .pipe(newer({ //only compile if source file is newer than dest file
      dest: config.dist,
      map: function(relativePath) {
        return ".coffee." + path.parse(relativePath).name + ".js"
      }
    }))
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
});


gulp.task("watch:coffee", function() {
  gulp.watch(config.src, ["coffee"])
});
