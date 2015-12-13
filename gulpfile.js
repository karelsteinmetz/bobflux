var gulp = require('gulp');
var ts = require('gulp-typescript');
var jasmine = require('gulp-jasmine');
var exec = require('child_process').exec

gulp.task('default', ['tsCompilation']);

gulp.task('tsCompilation', function (cb) {
    exec('tsc --p ./', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('runTests', ['tsCompilation'], function () {
    return gulp.src('./spec/**/*.spec.js')
        .pipe(jasmine({
            verbose: true,
            includeStackTrace: true
        }));
});