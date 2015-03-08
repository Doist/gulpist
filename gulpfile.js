var gulp = require('gulp');
var config = require('./config')
var requireDir = require('require-dir')
var runSequence = require('run-sequence');

process.chdir(config.workDir);
requireDir('./tasks', { recurse: true });


gulp.task('build', function(callback){
  //here we only want browserify run after coffee complete
  runSequence(['less', 'coffee'],
              'browserify',
              callback);
});

gulp.task('watch', function(callback){
  runSequence(['less:watch', 'coffee:watch'],
              'browserify:watch',
              callback);
});


gulp.task('sync', ['watch', 'browser-sync']);
