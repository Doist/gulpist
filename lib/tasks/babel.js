var path = require('path');
var gulp = require("gulp");
var gulpif = require("gulp-if");
var notify = require("gulp-notify");
var babel = require("gulp-babel");
var rename = require('gulp-rename');
var config = require('../config').babel;
var count = require('gulp-count');
var newer = require('gulp-newer');
var debug = require('gulp-debug');
var watch = require('gulp-watch');

gulp.task('babel', function() {
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
        .pipe(rename(function(path) {
            path.basename = path.basename.replace(".es6", "");

            if (config.prefix) {
                path.basename = config.prefix + path.basename;
            }
        }))
        .pipe(gulp.dest(config.dest))
        .pipe(count('[babel] <%= counter %> file compiled'))
});

gulp.task('babel:watch', function() {
    return watch(config.src)
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
        .pipe(rename(function(path) {
            path.basename = path.basename.replace(".es6", "");

            if (config.prefix) {
                path.basename = config.prefix + path.basename;
            }
        }))
        .pipe(gulp.dest(config.dest))
        .pipe(notify("Babel compiled: <%= file.relative %>"));
});

