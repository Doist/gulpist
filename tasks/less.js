var gulp = require('gulp');
var gulpif = require('gulp-if');
var less = require('gulp-less');
var rename = require("gulp-rename");
var notify = require("gulp-notify");
var path = require('path');
var newer = require('gulp-newer');
var config = require('../config').less


function buildLess(is_incremental_build) {

  return function() {
    return gulp.src(config.src)
      .pipe(gulpif(is_incremental_build, newer({ //only compile if source file is newer than dest file
        dest: config.dest,
        map: function(relativePath) {
          return path.parse(relativePath).dir + ".less." + path.parse(relativePath).name + ".css";
        }
      })))
      .pipe(less())
      .pipe(rename({prefix: config.destFilePrefix}))
      .pipe(gulp.dest(config.dest))
      .pipe(notify("LESS compiled: <%= file.relative %>"));
  }

}


gulp.task('less', buildLess(false));

gulp.task("watch:less", function() {
  buildLess(false)();
  filesToWatch = config.hasOwnProperty("watch") ? config.watch : config.src;
  gulp.watch(filesToWatch, buildLess(true))
});

