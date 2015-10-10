var gulp = require('gulp');
var ts = require('gulp-typescript');
var jasmine = require('gulp-jasmine');
var exec = require('child_process').exec

var distDir = 'dist';

gulp.task('default', ['tsCompilation', 'srcTsMove', 'runTests']);

gulp.task('tsCompilation', function (cb) {
    exec('tsc --p ./', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('runTests', ['tsCompilation'], function () {
    return gulp.src('dist/spec/**/*.spec.js')
        .pipe(jasmine({
            verbose: true,
            includeStackTrace: true
        }));
});

gulp.task('srcTsMove', function () {
    return gulp.src('src/**/*.ts')
        .pipe(gulp.dest(distDir + '/src'));
});
