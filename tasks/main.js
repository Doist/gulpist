var gulp = require('gulp');

gulp.task('build', ['less', 'coffee']);
gulp.task('watch', ['build', 'watch:less', 'watch:coffee']);

