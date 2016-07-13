var gulp = require('gulp');
var configs = require('../config').sprite
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');
var notify = require("gulp-notify");
var gulpif = require('gulp-if');
var rename = require('gulp-rename');

gulp.task('sprite', function() {
    var streams = [];

    for (var config of configs) {
        var spriteData = gulp.src(config.imgSrc).pipe(spritesmith({
            retinaSrcFilter: [config.retinaSrcFilter],
            imgName: config.imgName,
            retinaImgName: config.retinaImgName,
            cssName: config.cssName,
            imgPath: config.imgPath,
            retinaImgPath: config.retinaImgPath,
            cssTemplate: __dirname + "/sprites.template.handlebars",
            algorithm: "top-down"
        }));

        var imgStream = spriteData.img
            .pipe(gulp.dest(config.destDir));

        var outputLess = config.lessName !== undefined;

        var cssStream = spriteData.css
            .pipe(gulp.dest(config.destDir))
            .pipe(gulpif(outputLess, rename(config.lessName)))
            .pipe(gulp.dest(config.destDir));

        var stream = merge(imgStream, cssStream);

        stream.pipe(notify({
            onLast: true,
            title: "Sprite created",
            message: [
                config.imgName,
                config.retinaImgName,
                config.cssName,
                config.lessName
            ].join(" "),
        }));

        streams.push(stream);
    }

    var mergedStream = streams.reduce(function(prev, cur) {
        return merge(prev, cur);
    });

    return mergedStream;
});
