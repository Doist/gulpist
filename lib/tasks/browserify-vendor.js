var gulp = require('gulp');
var uglify = require('gulp-uglify');
var notify = require("gulp-notify");
var gulpif = require('gulp-if');
var path = require('path');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var envify = require('envify');
var buffer = require('vinyl-buffer');

var config = require('../config')["browserify-vendor"]

function buildVenderBundle(moduleList, dest, forProduction) {
	var dest = path.parse(dest);
	var destDir = "./" + dest.dir;
	var destFileName = dest.base;

	var bundler = browserify();

	moduleList.forEach(function(e) {
		bundler.require(e);
	});

	//NOTE: by setting "process.env.NODE_ENV", some modules (i.e. reactjs)
	//will automatically be imported with production setting.
	if (forProduction) {
		process.env.NODE_ENV = 'production';
		bundler.transform(envify({
			NODE_ENV: 'production'
		}));
	} else {
		process.env.NODE_ENV = 'development';
		bundler.transform(envify({
			NODE_ENV: 'development'
		}));
	}

	return bundler.bundle()
		.on("error", notify.onError({
			title: "Broserify Error",
			message: "<%= error %>"
		}))
		.pipe(source(destFileName))
		.pipe(buffer())
		.pipe(gulpif(forProduction, uglify()))
		.pipe(gulp.dest(destDir))
		.pipe(notify({
			title: "Broserify - External Bundle Created",
			message: "<%= file.relative %>"
		}));
}

//NOTE: we want to normal and production bundle sequencially once
//since each requires setting of global env variable "process.env.NODE_ENV"
gulp.task('browserify-vendor', ["_browserify-vendor-prod"], function() {
	return buildVenderBundle(config.require, config.dest, false);
});

gulp.task('_browserify-vendor-prod', function() {
	return buildVenderBundle(config.require, config.prodDest, true);
});
