/**
 * Created by shijuvar on 16/2/14.
 */
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    jshintreporter = require('jshint-stylish'),
    minifycss = require('gulp-minify-css'),
    size = require('gulp-size'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename');

var filePath = {
    appjsminify: { src: './app/**/*.js', dest: './app' },
    libsjsminify: { src: ['libs/**/*.js', '!*.min.js', '!/**/*.min.js'], dest: 'libs/' },
    jshint: { src: './app/**/*.js' },
    minifycss: { src: ['../Content/themes/**/*.css', '!*.min.css', '!/**/*.min.css'], dest: '../Content/themes/' }
};


gulp.task('app-js-minify', function () {
    gulp.src(filePath.appjsminify.src)
        .pipe(uglify())
        .pipe(concat('ngscripts.js'))
        .pipe(size())
        .pipe(gulp.dest(filePath.appjsminify.dest));
});

gulp.task('libs-js-minify', function () {
    gulp.src(filePath.libsjsminify.src)
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(filePath.libsjsminify.dest));
});


gulp.task('jshint', function () {
    gulp.src(filePath.jshint.src)
      .pipe(jshint())
      .pipe(jshint.reporter(jshintreporter));
});


gulp.task('minify-css', function () {
    /*Excludes already minified files.*/
    gulp.src(filePath.minifycss.src)
    .pipe(minifycss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(filePath.minifycss.dest));
});

gulp.task('clean', function () {
    gulp.src('./ngscripts.js', { read: false })
    .pipe(clean());
});
gulp.task('build', ['app-js-minify', 'libs-js-minify', 'minify-css']);
gulp.task('clean',['clean']);

//gulp.watch('./app/**/*.js', ['js']);