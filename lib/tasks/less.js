var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');
var rename = require("gulp-rename");
var notify = require("gulp-notify");
var path = require('path');
var config = require('../config').less
var runSequence = require('run-sequence');


function buildLess() {
  return gulp.src(config.src)
    .pipe(less())
    .on("error", notify.onError({
        title: "LESS Error",  
        subtitle: function(error) {
          if (error.filename) {
            var filename = path.parse(error.filename).base;
            return filename
          }
        },
        message: "<%= error.name %>: <%= error.message %> \n <%= error %>"
    }))
    .pipe(rename({prefix: config.prefix}))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.dest))
    .pipe(notify("LESS compiled: <%= file.relative %>"));
}


gulp.task('less', function() { return buildLess(); });


gulp.task('_less:watch', function() {
  var filesToWatch = config.hasOwnProperty("watch") ? config.watch : config.src;
  gulp.watch(filesToWatch, {'dot': true}, function() { buildLess() })
});


gulp.task("less:watch", function(callback) {
  runSequence('less', '_less:watch', callback)
});
