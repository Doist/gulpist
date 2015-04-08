var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var gulpif = require('gulp-if');
var less = require('gulp-less');
var rename = require("gulp-rename");
var notify = require("gulp-notify");
var path = require('path');
var newer = require('gulp-newer');
var config = require('../config').less
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');


function buildLess(is_incremental_build) {
  return gulp.src(config.src)
    .on('end', browserSync.reload)
    // .pipe(gulpif(is_incremental_build, newer({ //only compile if source file is newer than dest file
    //   dest: config.dest,
    //   map: function(relativePath) {
    //     return path.parse(relativePath).dir + ".less." + path.parse(relativePath).name + ".css";
    //   }
    // })))
    .pipe(less())
    .pipe(rename({prefix: config.prefix}))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.dest))
    .pipe(notify("LESS compiled: <%= file.relative %>"));
}


gulp.task('less', function() { return buildLess(true); });


gulp.task('_less:watch', function() {
  filesToWatch = config.hasOwnProperty("watch") ? config.watch : config.src;
  gulp.watch(filesToWatch, function() { buildLess(true) })
});


gulp.task("less:watch", function(callback) {
  runSequence('less', '_less:watch', callback)
});
