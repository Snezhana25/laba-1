const gulp = require('gulp');
    sass = require('gulp-sass');
    uglify = require('gulp-uglify');
    plumber = require('gulp-plumber'),

    browserSync = require('browser-sync').create();


gulp.task('sass', (done) => {
    gulp.src('./app/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
    done();
});

gulp.task('js',function(){
    gulp.src('app/js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename("*.min.js"))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('serve', function(done) {

    browserSync.init({
        server: "app/"
    });

    gulp.watch("app/scss/*.sass", gulp.series('sass'));
    gulp.watch("app/*.html").on('change', () => {
        browserSync.reload();
        done();
    });

    done();
});

gulp.task('clean', () => {

});

gulp.task('sass:watch', () => {
    gulp.watch('./app/scss/*.scss', ['sass']);
    gulp.watch('js/*.js', ['js']);
});

gulp.task('default', (done) => {
    gulp.series('clean','sass', 'sass:watch', 'serve', 'js');
    done();
});
