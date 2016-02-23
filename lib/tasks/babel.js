var path = require('path');
var gulp = require("gulp");
var notify = require("gulp-notify");
var babel = require("gulp-babel");
var rename = require('gulp-rename');
var config = require('../config').babel;

gulp.task("babel", function () {
    return gulp.src(config.src)
            .pipe(babel())
            .on("error", notify.onError({
                title: "Babel Error",
                subtitle: function(error) {
                  if (error.filename) {
                    var filename = path.parse(error.filename).base;
                    return filename;
                  }
                },
                message: "<%= error.name %>: <%= error.message %> \n <%= error %>"
            }))
            .pipe(rename(function(path){
                path.basename = path.basename.replace(".es6", "");
            }))
            .pipe(gulp.dest(config.dest))
            .pipe(notify("Babel compiled: <%= file.relative %>"));
});

gulp.task('babel:watch', function() {
  gulp.watch(config.src, ['babel'])
});
