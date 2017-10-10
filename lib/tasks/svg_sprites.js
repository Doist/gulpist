var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');

gulp.task('svg-sprite', function() {
    var configs = require('../config')['svg-sprite'];

    for (var config of configs) {
        var stream;
        var spriteConfigs = {
            log: 'info',
            src: config.imgSrc,
            dest: '.',
            mode: {
                css: {
                    sprite: config.imgName,
                    bust: false,
                    dest: config.cssDestDir || 'css',
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

        stream = gulp.src(spriteConfigs.src, { cwd: spriteConfigs.dest })
            .pipe(svgSprite(spriteConfigs))
            .pipe(gulp.dest(spriteConfigs.dest));

        return stream;
    }
});

gulp.task('svg-symbol-sprite', function() {
    var config = require('../config')['svg-symbol-sprite'];

    var spriteConfigs = {
        log: 'info',
        mode: {
            symbol: true
        }
    };

    return gulp.src(config.imgSrc)
            .pipe(svgSprite(spriteConfigs))
            .pipe(gulp.dest(config.imgDest));
});
