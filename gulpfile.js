try {
    config = require('./config');
} catch(e) {
    console.error("config.js Error: " + e);
    process.exit();
}

try {
  config.validateConfig();
} catch(e) {
  console.error("Error: " + e);
  process.exit();
}

var gulp = require('gulp');
var requireDir = require('require-dir')
var runSequence = require('run-sequence');

process.chdir(config.workDir);
requireDir('./tasks', { recurse: true });


// Figure out which tasks to run based on config
var buildSeq1 = []
var buildSeq2 = []
var watchSeq1 = []
var watchSeq2 = []

if(config.hasOwnProperty("less")) {
  buildSeq1.push("less")
  watchSeq1.push("less:watch")
}

if(config.hasOwnProperty("coffee")) {
  buildSeq1.push("coffee")
  watchSeq1.push("coffee:watch")
}

if(config.hasOwnProperty("browserify")) {
  buildSeq2.push("browserify")
  watchSeq2.push("browserify:watch")
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

gulp.task('watch', function(callback){
  runTwoSequences(watchSeq1, watchSeq2, callback)
});

