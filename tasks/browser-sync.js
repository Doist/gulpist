var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('../config').browserify


gulp.task('browser-sync', function() {
    browserSync({
        notify: true,
        proxy: "local.todoist.com"
    });
});

