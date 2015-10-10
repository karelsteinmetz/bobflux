var gulp = require('gulp');
var ts = require('gulp-typescript');
var jasmine = require('gulp-jasmine');
var exec = require('child_process').exec
var zip = require('gulp-zip');

var distWebDir = 'dist/web';

gulp.task('default', ['web', 'nw']);

// web
gulp.task('web', ['tsCompilation', 'indexCopy', 'systemJsCopy', 'cssCopy'], function () {
    return gulp.src('index.html')
        .pipe(gulp.dest(distWebDir));
});

// nw
var nwDistDir = 'dist/nw';

gulp.task('nw', ['indexCopy', 'systemJsCopy', 'cssCopy'], function() {
    return gulp.src([
            './dist/web/**/*.js',
            './dist/web/**/*.css',
            './dist/web/**/*.html',
            './package.json'])
        .pipe(zip('todo.nw'))
        .pipe(gulp.dest(nwDistDir));
});

// common
gulp.task('tsCompilation', function (cb) {
    exec('tsc --p ./', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

gulp.task('indexCopy', function () {
    return gulp.src('index.html')
        .pipe(gulp.dest(distWebDir));
});

gulp.task('systemJsCopy', function () {
    return gulp.src('node_modules/systemjs/dist/system.js')
        .pipe(gulp.dest(distWebDir));
});

gulp.task('cssCopy', function () {
    return gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
        .pipe(gulp.dest(distWebDir + '/css'));
});