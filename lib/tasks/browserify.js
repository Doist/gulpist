var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var notify = require("gulp-notify");
var sourcemaps = require("gulp-sourcemaps");
var path = require('path');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var config = require('../config').browserify
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer')


function browserifyTask(runWatcher) {
    var sourceFilePath = "./" + config.src;
    var dest = path.parse(config.dest);
    var destDir = "./" + dest.dir;
    var destFileName = dest.base;

    var bundler = browserify({
        entries: [sourceFilePath],
        debug: config.sourcemaps,
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
            .pipe(gulp.dest(destDir))
            .pipe(notify({title: "Broserify - Bundle Created", message: "<%= file.relative %>"}));
      });

    bundler.emit("update");
}

gulp.task('browserify', function() {
  browserifyTask(false);
});

gulp.task("browserify:watch", function(callback) {
  browserifyTask(true);
});

/*
gulp.task('_browserify:watch', function() {
  if(config.hasOwnProperty("watch")) {
      var filesToWatch = config.hasOwnProperty("watch") ? config.watch : config.src;
      gulp.watch(filesToWatch, {'dot': true}, function() { browserifyTask(false); })
  }
  else {
      browserifyTask(true);
  }
});
*/

