var gulp = require('gulp');
var ts = require('gulp-typescript');
var jasmine = require('gulp-jasmine');
var exec = require('child_process').exec

var buildDir = 'build';

gulp.task('default', ['tsCompilation', 'runTests']);

gulp.task('tsCompilation', function (cb) {
    exec('tsc --p ./', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('runTests', ['tsCompilation'], function () {
    return gulp.src('build/spec/**/*.spec.js')
        .pipe(jasmine({
            verbose: true,
            includeStackTrace: true
        }));
});

// Dist
var distDir = 'dist'

gulp.task('dist', ['srcTsCopy'], function () {
    return gulp.src(buildDir + '/src/**/*')
        .pipe(gulp.dest(distDir));
});

gulp.task('srcTsCopy', function () {
    return gulp.src('src/**/*.ts')
        .pipe(gulp.dest(distDir));
});
