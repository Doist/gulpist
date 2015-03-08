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


function browserifyBuild(incremental_build) {

  return function() {
    sourceFilePath = "./" + (config.src)  //Browserify required file path with ./
    destDir = "./" + path.parse(config.dest).dir
    destFileName = path.parse(config.dest).base

    //transform browserify bundler into vinyl stream
    var browserified = transform(function(filename) {

      var bundler = browserify(filename, {
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
      });
      
      if(incremental_build) {
        bundler  = watchify(bundler);
      }

      return bundler
            .on('update', function () { // When any files update
                bundler.bundle()
                       .on('end', browserSync.reload)
                       .pipe(source(destFileName))
                       .pipe(gulp.dest(destDir))
                       .pipe(notify({title: "Broserify - Bundle Updated", message: "<%= file.relative %>"}))
                       .on("error", notify.onError({title: "Broserify Error", message: "<%= error.message %>"}))
            })
            .bundle()
            .on("error", notify.onError({title: "Broserify Error", message: "<%= error.message %>"}))
            .pipe(browserSync.reload({stream:true}));
    });

    gulp.src(sourceFilePath)
      //.pipe(notify({title: "Broserify - Compling Bundld", message: "<%= file.relative %>"}))
      .pipe(browserified)
      .pipe(rename(destFileName))
      .pipe(notify({title: "Broserify - Bundle Created", message: "<%= file.relative %>"}))
      .on('end', browserSync.reload)
      .pipe(gulp.dest(destDir));

  };

};

gulp.task('browserify', browserifyBuild(false));
gulp.task('browserify:watch', browserifyBuild(true));
