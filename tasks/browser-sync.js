var gulp = require('gulp');
var browserSync = require('browser-sync');


gulp.task('browser-sync', function() {
    browserSync({
        notify: true,
        ui: {
            port: 4000
        },
        scriptPath: function (path, port, options) {
          console.log(options.get("absolute"));
          return options.get("absolute");
        }
    });
});

