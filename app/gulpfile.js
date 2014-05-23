var gulp = require('gulp'),
    less = require('gulp-less'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    domSrc = require('gulp-dom-src'),
    cssmin = require('gulp-cssmin'),
    minifyHTML = require('gulp-minify-html'),
    cheerio = require('gulp-cheerio'),
    runSequence = require('run-sequence'),
    clean = require('gulp-clean');

// ========== less task ========== //
gulp.task('less', function () {
   gulp.src('less/main.less').
       pipe(less()).
       pipe(gulp.dest('css/')).
       pipe(connect.reload())
});

gulp.task('watch:less', function () {
   gulp.watch('less/**/*.less', ['less']);
});

gulp.task('server', function () {
   connect.server({
       root: '',
       port: 9003,
       livereload: true
   })
});

// ========== deploy task ========== //

gulp.task('deploy:js', function () {
    return domSrc({file: 'index.html', selector: 'script', attribute: 'src'})
        .pipe(concat('workshop.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('deploy:css', function () {
    return domSrc({file: 'index.html', selector: 'link', attribute: 'href'})
        .pipe(concat('workshop.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('deploy:html', function () {
    return gulp.src('templates/**/*.html')
        .pipe(minifyHTML({
            quotes: true,
            spare: true,
            empty: true,
            cdata: true
        }))
        .pipe(gulp.dest('dist/templates/'))
});

gulp.task('deploy:fonts', function () {
    return gulp.src('vendors/bootstrap/dist/fonts/*')
        .pipe(gulp.dest('dist/fonts/'))
});

gulp.task('deploy:img', function () {
    return gulp.src('img/**/*')
        .pipe(gulp.dest('dist/img/'))
});

gulp.task('deploy:index', function () {
    return gulp.src('index.html')
        .pipe(cheerio(function ($) {
            $('script').remove();
            $('link').remove();
            $('head').append('<link rel="stylesheet" href="css/workshop.min.css">')
            $('body').append('<script src="js/workshop.min.js">')
        }))
        .pipe(minifyHTML({
            quotes: true,
            spare: true,
            empty: true,
            cdata: true
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('deploy:clean', function () {
   return gulp.src('dist/', {read: false})
       .pipe(clean());
});

gulp.task('deploy', function (callback) {
    runSequence('deploy:clean', 'less', ['deploy:js', 'deploy:css', 'deploy:html', 'deploy:fonts', 'deploy:img', 'deploy:index'], callback);
})

gulp.task('default', ['server', 'watch:less']);