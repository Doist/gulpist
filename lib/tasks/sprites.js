var gulp = require('gulp');
var configs = require('../config');
var spritesmith = require('gulp.spritesmith');
var buffer = require('vinyl-buffer');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');
var notify = require("gulp-notify");
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var fs = require('fs');
var svgSprite = require('gulp-svg-sprite');


function createBitmapSprite(config, streams) {
    var spriteConfigs = {
        imgName: config.imgName,
        imgPath: config.imgPath,
        cssName: config.cssName,
        cssTemplate: config.cssTemplate ? config.cssTemplate : __dirname + "/sprites.css_template.handlebars",
        algorithm: "top-down",
        algorithmOpts: {
            sort: "sortImgsByHeight" in config ? config.sortImgsByHeight : true
        }
    };

    if (config.retinaSrcFilter || config.retinaImgName || config.retinaImgPath) {
        spriteConfigs.retinaSrcFilter = [config.retinaSrcFilter];
        spriteConfigs.retinaImgName = config.retinaImgName;
        spriteConfigs.retinaImgPath = config.retinaImgPath;
    }

    var spriteData = gulp.src(config.imgSrc)
        .pipe(spritesmith(spriteConfigs));

    var imgStream;

    if (config.imgOptim) {
        imgStream = spriteData.img
            .pipe(buffer())
            .pipe(imagemin());
    } else {
        imgStream = spriteData.img;
    }

    imgStream.pipe(gulp.dest(config.destDir));

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


function createSvgSprite(config){
    var spriteConfigs = {
        log: 'info',
        src: config.imgSrc,
        dest: '.',
        mode: {
            css: {
                sprite: config.imgName,
                bust: false,
                render: {
                    less: {
                        template: config.cssTemplate,
                        dest: config.cssName
                    }
                }
            }
        },
        variables: {
            cssSpritePath: config.imgCssPath
        }
    };

    gulp.src(spriteConfigs.src, { cwd: spriteConfigs.dest })
        .pipe(svgSprite(spriteConfigs))
        .pipe(gulp.dest(spriteConfigs.dest));
}


// BITMAP SPRITE TASK
gulp.task('sprite', function() {
    var streams = [];

    for (var config of configs['sprite']) {
        createBitmapSprite(config, streams);
    }

    var mergedStream;

    if (streams.length > 0) {
        mergedStream = streams.reduce(function(prev, cur) {
            return merge(prev, cur);
        });
    }

    return mergedStream;
});


// SVG SPRITE TASK
gulp.task('svg-sprite', function() {
    for (var config of configs['svg-sprite']) {
        createSvgSprite(config);
    }
});
