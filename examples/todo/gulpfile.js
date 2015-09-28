var gulp = require('gulp');
var ts = require('gulp-typescript');
var jasmine = require('gulp-jasmine');

var distDir = 'dist';

gulp.task('default', ['tsCompilation', 'indexMove', 'systemJsMove']);

gulp.task('tsCompilation', function () {
    var tsProject = ts.createProject('tsconfig.json');
    return tsProject.src()
        .pipe(ts(tsProject)).js
        .pipe(gulp.dest(distDir));
});

gulp.task('indexMove', function () {
    return gulp.src('index.html')
        .pipe(gulp.dest(distDir));
});

gulp.task('systemJsMove', function () {
    return gulp.src('node_modules/systemjs/dist/system.js')
        .pipe(gulp.dest(distDir));
});
