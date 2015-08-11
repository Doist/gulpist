var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var notify = require("gulp-notify");
var sourcemaps = require("gulp-sourcemaps");
var path = require('path');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var transform = require('vinyl-transform');
var rename = require("gulp-rename");
var config = require('../config').browserify

var buffer = require('vinyl-buffer')


function browserifyTask(runWatcher, distBuild) {
    var sourceFilePath = "./" + config.src;
    var dest = path.parse(config.dest);
    var destDir = "./" + dest.dir;
    var destFileName = distBuild ? (dest.name + ".min" + dest.ext) : dest.base;

    var bundler = browserify({
        entries: [sourceFilePath],
        debug: !distBuild,
        cache: {}, 
        packageCache: {}, 
        fullPaths: false
    });

    if(runWatcher) {
      bundler = watchify(bundler);
    }

    bundler.on('update', function () {
          bundler.bundle()
            .on("error", notify.onError({title: "Broserify Error", message: "<%= error %>"}))
            .pipe(source(destFileName))
            .pipe(buffer())
            .pipe(sourcemaps.init())
            .pipe(gulpif(distBuild, uglify()))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest(destDir))
            .pipe(notify({title: "Broserify - Bundle Updated", message: "<%= file.relative %>"}));
      });

    bundler.emit("update");
};

gulp.task('browserify', function() {
  browserifyTask(false, false);
  browserifyTask(false, true);
});

gulp.task('browserify:watch', function() {
  browserifyTask(true, false);
});
