var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require("gulp-notify");
var debug = require('gulp-debug');
var coffee = require('gulp-coffee');
var rename = require("gulp-rename");
var config = require('../config').coffee


var config = require('../config').coffee



gulp.task('coffee', function() {
  gulp.src(config.src)
    .pipe(debug({title: 'coffee files src'}))
    .pipe(coffee({bare: true}))
    .on('error', 
      notify.onError( function (error) {
        return "Coffee compile error: " + error.message;
      })
    )
    .pipe(rename({
      prefix: ".coffee."
    }))
    .pipe(gulp.dest(config.dist))
    .pipe(debug({title: 'coffee files dist'}))
    .pipe(notify("Coffee compile succeeded: <%= file.relative %>"));
});

gulp.task("watch:coffee", function() {
  gulp.watch(config.src, ["coffee"])
});
