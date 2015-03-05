var gulp = require('gulp');
var browserSync = require('browser-sync');

/*
gulp.task('browser-sync', function() {
    browserSync({
        proxy: "local.todoist.com",
        notify: true,
    });
});
*/

gulp.task('build', ['less', 'coffee']);
gulp.task('watch', ['build', 'watch:less', 'watch:coffee']);

