var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require("gulp-notify");
var path = require('path');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var coffeereact = require('coffee-reactify');
var coffeeify = require('coffeeify');
var transform = require('vinyl-transform');
var rename = require("gulp-rename");
var config = require('../config').browserify


gulp.task('browserify', function() {
  destFileName = path.parse(config.dist).base
  destDir = path.parse(config.dist).dir

  //transform browserify bundler into vinyl stream
  var browserified = transform(function(filename) {

    var bundler = browserify(filename, {
      paths: ['../doist_gulp/node_modules'],  //TODO: remove this
      debug: true,
      cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    
    var watcher  = watchify(bundler);

    return watcher
          .on('update', function () { // When any files update
              watcher.bundle()
                     .pipe(source(destFileName))
                     .pipe(gulp.dest(destDir))
                     .pipe(notify({title: "Broserify - Bundle Updated", message: "<%= file.relative %>"}))
                     .on("error", notify.onError({title: "Broserify Error", message: "<%= error.message %>"}))
          })
          .bundle()
          .on("error", notify.onError({title: "Broserify Error", message: "<%= error.message %>"}))
  });

  gulp.src(config.src)
    //.pipe(notify({title: "Broserify - Compling Bundld", message: "<%= file.relative %>"}))
    .pipe(browserified)
    .pipe(rename(destFileName))
    .pipe(notify({title: "Broserify - Bundle Created", message: "<%= file.relative %>"}))
    .pipe(gulp.dest(destDir));

});

