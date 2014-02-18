/**
 * Created by shijuvar on 16/2/14.
 */
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat')
jshintreporter = require('jshint-stylish');

gulp.task('js', function () {
    gulp.src('./app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(jshintreporter))
        .pipe(uglify())
        .pipe(concat('ngscripts.js'))
        .pipe(gulp.dest('./app'));
});
gulp.task('default', function () {
    gulp.run('js');
});

gulp.task('browserify', function () {
    gulp.src('./app/app.js')
    .pipe(browserify())
    .pipe(gulp.dest('./app/browserify'))
});




//gulp.watch('./app/**/*.js', ['js']);