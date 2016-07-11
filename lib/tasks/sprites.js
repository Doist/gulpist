var gulp = require('gulp');
var config = require('../config').sprite
var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function () {
  return gulp.src(config.imgSrc)
            .pipe(spritesmith({
                retinaSrcFilter: [config.retinaSrcFilter],
                imgName: config.imgName,
                retinaImgName: config.retinaImgName,
                cssName: config.cssName,
                imgPath: config.imgPath,
                retinaImgPath: config.retinaImgPath,
                cssTemplate: __dirname + "/sprites.template.handlebars",
                algorithm: "top-down"
            }))
            .pipe(gulp.dest(config.destDir));
});
