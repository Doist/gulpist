var gulp = require('gulp');
var gulpif = require('gulp-if');
var jshint = require('gulp-jshint');
var path = require('path');
var notify = require("gulp-notify");
var rename = require("gulp-rename");
var config = require('../config').coffee
var coffeeJSX = require('gulp-cjsx');
var jshinst_config = require('./jshint_config.js');
var watch = require('gulp-watch');
var count = require('gulp-count');
var plumber = require('gulp-plumber');

gulp.task('coffee', function() {
  return gulp.src(config.src)
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
    .pipe(gulpif(config.jshint, jshint(jshinst_config)))
    .pipe(gulpif(!config.jshint, jshint.reporter('default')))
    .pipe(gulp.dest(config.dest))
    .pipe(count('[coffee] <%= counter %> file compiled'))
});

gulp.task('coffee:watch', function() {
  return watch(config.src)
    .pipe(plumber(function(error){
        notify.onError({
            title: "Coffee Error",
            subtitle: function(error) {
              if (error.filename) {
                var filename = path.parse(error.filename).base;
                return filename
              }
            },
            message: "<%= error.name %>: <%= error.message %> \n <%= error %>"
        })(error);
    }))
    .pipe(coffeeJSX({bare: true}))
    .pipe(plumber.stop())
    .pipe(rename({prefix: config.prefix}))
    .pipe(gulpif(config.jshint, jshint(jshinst_config)))
    .pipe(gulpif(!config.jshint, jshint.reporter('default')))
    .pipe(gulp.dest(config.dest))
    .pipe(notify("Babel compiled: <%= file.relative %>"));
});
