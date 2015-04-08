var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require("gulp-notify");
var path = require('path');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var transform = require('vinyl-transform');
var rename = require("gulp-rename");
var config = require('../config').browserify
var browserSync = require('browser-sync');


function browserifyTask(runWatcher) {

  return function() {
      sourceFilePath = "./" + config.src;
      destDir = "./" + path.parse(config.dest).dir
      destFileName = path.parse(config.dest).base

      var bundler = browserify({
          entries: [sourceFilePath],
          debug: true,
          cache: {}, 
          packageCache: {}, 
          fullPaths: true
      });

      if(runWatcher) {
        bundler  = watchify(bundler);
      }

      bundler.on('update', function () {
            bundler.bundle()
              .on("error", notify.onError({title: "Broserify Error", message: "<%= error.message %>"}))
              .pipe(source(destFileName))
              .pipe(gulp.dest(destDir))
              .pipe(notify({title: "Broserify - Bundle Updated", message: "<%= file.relative %>"}))
              .pipe(browserSync.reload({stream:true}));
        });

      bundler.emit("update");
  };

};

gulp.task('browserify', browserifyTask(false));
gulp.task('browserify:watch', browserifyTask(true));


