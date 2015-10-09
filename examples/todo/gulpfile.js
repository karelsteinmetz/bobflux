var gulp = require('gulp');
var ts = require('gulp-typescript');
var jasmine = require('gulp-jasmine');

var distDir = 'dist';

gulp.task('default', ['indexCopy', 'systemJsCopy', 'cssCopy']);

gulp.task('tsCompilation', function () {
    var tsProject = ts.createProject('tsconfig.json');
    return tsProject.src()
        .pipe(ts(tsProject)).js
        .pipe(gulp.dest(distDir));
});

gulp.task('indexCopy', function () {
    return gulp.src('index.html')
        .pipe(gulp.dest(distDir));
});

gulp.task('systemJsCopy', function () {
    return gulp.src('node_modules/systemjs/dist/system.js')
        .pipe(gulp.dest(distDir));
});

gulp.task('cssCopy', function () {
    return gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
        .pipe(gulp.dest(distDir + '/css'));
});