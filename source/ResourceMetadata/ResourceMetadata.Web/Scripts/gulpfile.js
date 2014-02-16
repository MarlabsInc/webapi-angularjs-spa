/**
 * Created by shijuvar on 16/2/14.
 */
var gulp    = require('gulp'),
    gutil    = require('gulp-util'),
    uglify  = require('gulp-uglify'),
    concat  = require('gulp-concat');

gulp.task('js', function () {
    gulp.src('./app/**/*.js')
        .pipe(uglify())
        .pipe(concat('ngscripts.js'))
        .pipe(gulp.dest('./app'));
});
gulp.task('default', function(){
    gulp.run('js');
});