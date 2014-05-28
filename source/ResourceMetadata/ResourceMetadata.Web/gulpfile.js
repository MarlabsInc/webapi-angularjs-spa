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
    rename = require('gulp-rename'),
    open = require('gulp-open'),
    connect = require('gulp-connect');

var filePath = {
    appjsminify: { src: './Scripts/app/**/*.js', dest: './Scripts/app' },
    libsjsminify: { src: ['./Scripts/libs/**/*.js', '!*.min.js', '!/**/*.min.js'], dest: './Scripts/libs/' },
    jshint: { src: './Scripts/app/**/*.js' },
    minifycss: { src: ['./Content/themes/**/*.css', '!*.min.css', '!/**/*.min.css'], dest: './Content/themes/' }
};



gulp.task('app-js-minify', function () {
    gulp.src(filePath.appjsminify.src)
        .pipe(uglify())
        .pipe(concat('ngscripts.js'))
        .pipe(size())
        .pipe(gulp.dest(filePath.appjsminify.dest));
});

gulp.task('libs-js-minify', function () {
    /*Excludes already minified files.*/
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
    gulp.src(
        [
            'Scripts/app/ngscripts.js',
            'Scripts/libs/angular-ui/select2.min.js',
            'Scripts/libs/select2/select2.min.js',
            'Scripts/libs/semantic/semantic.min.js',
            'Scripts/libs/**/*.min.js',
            'Scripts/libs/jquery-1.9.1.min.js',
            '!Scripts/libs/jquery-ui-1.10.3.min.js',
            './Content/themes/semantic/semantic.min.css',
            './Content/themes/Site.min.css',
            './Content/themes/select2/select2.min.css'
        ], { read: false })
    .pipe(clean({ force: true }));
});
gulp.task('build', ['app-js-minify', 'libs-js-minify', 'minify-css']);
gulp.task('cleanbuild', ['clean']);

gulp.task('tests', function () {
    connect.server({ 
        port:8000
    });
    var testUrl = "http://localhost:8000/SpecRunner.html";
    gulp.src("./SpecRunner.html")
      .pipe(open("", { url: testUrl }));
});

//gulp.watch('./app/**/*.js', ['js']);