var gulp = require('gulp');
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

    if(config.externals) {
        config.externals.forEach(function(e) {
            bundler.external(e);
        });
    }

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

    if(config.externals && config.externalDest) {
        var extDest = path.parse(config.externalDest);
        var extDestDir = "./" + extDest.dir;
        var extDestFileName = extDest.base;

        var venderBundler = browserify();

        config.externals.forEach(function(e) {
            venderBundler.require(e);
        });

        venderBundler.bundle()
            .on("error", notify.onError({title: "Broserify Error", message: "<%= error %>"}))
            .pipe(source(extDestFileName))
            .pipe(buffer())
            .pipe(gulp.dest(extDestDir))
            .pipe(notify({title: "Broserify - External Bundle Created", message: "<%= file.relative %>"}));
    }
}

gulp.task('browserify', function() {
  browserifyTask(false);
});

gulp.task("browserify:watch", function(callback) {
  browserifyTask(true);
});

