var config = require('./config');
var gulp = require('gulp');
var requireDir = require('require-dir')
var runSequence = require('run-sequence');

process.chdir(config.workDir);
requireDir('./tasks', { recurse: true });


/*
 * Gulp by default run all tasks concurrently. But since our "browserify" task
 * should not be run before completion of "coffee" task. We use "runSequence"
 * to force sequencial execution of tasks.
 *
 */

var buildSeq1 = []
var buildSeq2 = []
var watchSeq = []

if(config.hasOwnProperty("less")) {
  buildSeq1.push("less")
  watchSeq.push("less:watch")
}

if(config.hasOwnProperty("coffee")) {
  buildSeq1.push("coffee")
  watchSeq.push("coffee:watch")
}

if(config.hasOwnProperty("babel")) {
  buildSeq1.push("babel")
  watchSeq.push("babel:watch")
}

if(config.hasOwnProperty("jade")) {
  buildSeq1.push("jade")
  watchSeq.push("jade:watch")
}

if(config.hasOwnProperty("browserify-vendor")) {
  buildSeq1.push("browserify-vendor")
}

if(config.hasOwnProperty("browserify")) {
  buildSeq2.push("browserify")
  watchSeq.push("browserify:watch")
}


function runTwoSequences(seq1, seq2, callback) {
  var runSeqArg = []

  if(seq1.length > 0) {
    runSeqArg.push(seq1);
  }
  if(seq2.length > 0) {
    runSeqArg.push(seq2);
  }

  if(runSeqArg.length > 0) {
    runSeqArg.push(callback);
    runSequence.apply(this, runSeqArg);
  }
}

gulp.task('build', function(callback){
  runTwoSequences(buildSeq1, buildSeq2, callback)
});

gulp.task('watch', watchSeq);

