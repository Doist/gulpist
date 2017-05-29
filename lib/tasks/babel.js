var path = require('path');
var gulp = require("gulp");
var gulpif = require("gulp-if");
var notify = require("gulp-notify");
var babel = require("gulp-babel");
var rename = require('gulp-rename');
var config = require('../config').babel;
var newer = require('gulp-newer');


function buildBabel(only_build_changed) {
    return gulp.src(config.src)
        .pipe(gulpif(only_build_changed, newer({ //only compile if source file is newer than dest file
            dest: config.dest,
            map: function(relativePath) {
                var p = path.parse(relativePath);
                if(config.prefix) {
                    return p.dir + "/" + config.prefix + p.name.replace(".es6", "") + ".js";
                } else {
                    return p.dir + "/" + p.name.replace(".es6", "") + ".js";
                }
            }
        })))
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
}

gulp.task('babel', function() {
    return buildBabel(false);
});

gulp.task('babel:watch', function() {
    buildBabel(true)

    return gulp.watch(config.src, function() {
        return buildBabel(true);
    });
});
