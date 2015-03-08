var gulp = require('gulp');
var browserSync = require('browser-sync');


gulp.task('browser-sync', function() {
    browserSync({
        notify: true,
        ui: {
            port: 4000
        },
        proxy: "local.todoist.com"
    });
});

