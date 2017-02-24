var gulp = require('gulp');
var notify = require("gulp-notify");
var config = require('../config').jade;
var jade = require('gulp-jade');
var newer = require('gulp-newer');

function compileJade(onlyNewFiles) {
    var options = {
        pretty: config.indentation ? config.indentation : false
    };

    var stream = gulp.src(config.src)

    if (onlyNewFiles) {
        stream = stream.pipe(newer({ dest: config.dest, ext: '.html' }));
    }

    stream = stream.pipe(jade(options))
        .pipe(gulp.dest(config.dest))
        .pipe(notify('JADE compiled: <%= file.relative %>'));

    return stream;
}

gulp.task('jade', function() { return compileJade(); });

gulp.task('jade:watch', function() {
  var filesToWatch = config.watch ? config.watch : config.src;
  gulp.watch(filesToWatch, function() { compileJade(true); });
});

