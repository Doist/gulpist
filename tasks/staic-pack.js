var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('../config');

gulp.task("watch:packs", function() {
  gulp.watch(config.staticPacks, browserSync.reload);
});

