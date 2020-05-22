const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const sassGlob = require('gulp-sass-glob');
// Static server
gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./*html').on('change', browserSync.reload);
    gulp.watch('./JS/**/*.js').on('change', browserSync.reload);
});

gulp.task("styles", function() {
    return gulp.src("./SASS/**/*.+(scss|sass)")
            .pipe(sassGlob())
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix: "",
                suffix: ".min",
              }))
            .pipe(autoprefixer())
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest('./CSS'))
            .pipe(browserSync.stream());

});

gulp.task('watch', function() {
    gulp.watch('./SASS/**/*.+(scss|sass)', gulp.parallel('styles'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));