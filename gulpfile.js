var gulp = require('gulp');
var ts = require('gulp-typescript');
var jasmine = require('gulp-jasmine');

var distDir = 'dist';

gulp.task('default', ['tsCompilation', 'srcTsMove', 'runTests']);

gulp.task('tsCompilation', function () {
    var tsProject = ts.createProject('tsconfig.json');
    return tsProject.src()
        .pipe(ts(tsProject)).js
        .pipe(gulp.dest(distDir));
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
