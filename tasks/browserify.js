var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require("gulp-notify");
var path = require('path');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var coffeereact = require('coffee-reactify');
var coffeeify = require('coffeeify');

var config = require('../config').browserify

var transform = require('vinyl-transform');


gulp.task('browserify', function() {
    //rename output file with .coffee prefix and .js surffix (Doist Convention)
    destFileName = "bundle.js"

    var bundler = browserify({
        entries: [config.src],
        paths: ['../doist_gulp/node_modules'],
        //if you don't use jsx syntax in your .coffee, you could change it to coffeeify instead
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });

    var watcher  = watchify(bundler);

    return watcher
      .on('update', function () { // When any files update
          console.log('Watchify detect updated. Rebundle...');
          var updateStart = Date.now();

          watcher.bundle()
                 .on("error", notify.onError({
                    message: "<%= error.message %>",
                    title: "Broserify Error"
                 }))
                 .pipe(source(destFileName))
                 .pipe(gulp.dest(config.dest))
                 .pipe(notify({
                    title: "Broserify Bundle Created",
                    message: "<%= file.relative %>"
                 }));

          console.log('Rebundle finished!', (Date.now() - updateStart) + 'ms');
      })
      .bundle() // Create the initial bundle when starting the task
      .on("error", notify.onError({
        message: "<%= error.message %>",
        title: "Broserify Error"
      }))
      .pipe(source(destFileName))
      .pipe(gulp.dest(config.dist))
      .pipe(notify({
        title: "Broserify Bundle Created",
        message: "<%= file.relative %>"
      }));
});



/*
var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require("gulp-notify");
var debug = require('gulp-debug');
var rename = require("gulp-rename");



gulp.task('browserify', function() {

  var browserified = transform(function(filename) {
    var b = browserify(filename, {
      paths: ['../doist_gulp/node_modules'],
      debug: true
    });
    return b.bundle();
  });

  gulp.src(config.src)
    .pipe(browserified)
    .pipe(gulp.dest(config.dist))
    .pipe(coffee({bare: true}))
    .on('error', 
      notify.onError( function (error) {
        return "Coffee compile error: " + error.message;
      })
    )
    .pipe(rename({
      prefix: ".coffee."
    }))
});
*/
