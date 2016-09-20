var gulp = require('gulp');
var configs = require('../config')['svg-sprite'];
var svgSprite = require('gulp-svg-sprite');


gulp.task('svg-sprite', function() {
    for (var config of configs) {
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
});
