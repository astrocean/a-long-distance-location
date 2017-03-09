var gulp = require('gulp'),
    changed = require('gulp-changed'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    filePath={
    	src:'./src',
    	dest:'./dest'
    };
// watch files for changes and reload
gulp.task('serve', function() {
    browserSync.init({
        files: ['./dest/**/*.*'],
        // proxy: {
        //     target: "http://www.diwudai.com/web/item/"
        // },
        server: {
            baseDir: './dest/',
            directory: true
        }
    });
});


var copy = function(type) {
        return gulp.src([filePath.src+'/**/*.' + type])
            .pipe(changed(filePath.dest))
            .pipe(gulp.dest(filePath.dest));
    }
    /**
     * 复制到release
     */
gulp.task('copy', function() {
    var type = ['html', 'js', 'css', 'png', 'jpg', 'gif','json','ico','svg'];
    for (var i = 0; i < type.length; i++) {
        copy(type[i]);
    }
});

/**
 *renmae index
 */
gulp.task('watch', function() {
    return gulp.watch(['./src/**/*.*'], function() {
        runSequence('copy');
    });
});
gulp.task('default', ['copy'], function() {
    runSequence('watch', 'serve');
});
