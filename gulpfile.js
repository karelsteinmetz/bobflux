var gulp = require('gulp');
var ts = require('gulp-typescript');
var jasmine = require('gulp-jasmine');

gulp.task('default', ['tsCompilation', 'runTests']);

gulp.task('tsCompilation', function () {
    var tsProject = ts.createProject('tsconfig.json');
    return tsProject.src()
        .pipe(ts(tsProject)).js
        .pipe(gulp.dest('dist'));
});

gulp.task('runTests', ['tsCompilation'], function () {
    return gulp.src('dist/spec/**/*.spec.js')
        .pipe(jasmine({
            verbose: true,
            includeStackTrace: true
        }));
});
