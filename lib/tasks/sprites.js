var gulp = require('gulp');
var configs = require('../config').sprite
var spritesmith = require('gulp.spritesmith');
var buffer = require('vinyl-buffer');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');
var notify = require("gulp-notify");
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var fs = require('fs');


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
        spriteElementPath: config.imgSrc,
        spritePath: config.imgName,
        cssPath: config.cssName,
        template: config.cssTemplate ? config.cssTemplate : __dirname + "/sprites-svg.css_template.handlebars",
        svgo: {
            plugins: [
                { cleanupAttrs: true },
                { cleanUpEnableBackground: true },
                { cleanupIDs: true },
                { minifyStyles: true }
            ]
        }
    };

    svgsprite(spriteConfigs, function(){
        var pngFile = config.imgName.replace(/\.svg$/, ".png");
        fs.unlinkSync(pngFile);

        gulp.src(config.imgName)
            .pipe(notify({
                onLast: true,
                title: "SVG Sprite created",
                message: [
                    config.imgName,
                    config.cssName
                ].join(" ")
            }));
    });
}


gulp.task('sprite', function() {
    var streams = [];

    for (var config of configs) {
        var matchSvg = config.imgSrc.match(/\.svg$/);
        var isSvgSprite = matchSvg ? true : false;

        if (!isSvgSprite) {
            createBitmapSprite(config, streams);
        }else{
            createSvgSprite(config);
        }
    }

    var mergedStream;

    if (streams.length > 0) {
        mergedStream = streams.reduce(function(prev, cur) {
            return merge(prev, cur);
        });
    }

    return mergedStream;
});
