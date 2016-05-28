var path = require('path');
var fs = require('fs');
var fileContent = fs.readFileSync('./package.json');
var jsonObj = JSON.parse(fileContent);

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var del = require('del');
var connect = require('gulp-connect');

var paths = {
  build: './build/' + jsonObj.name + '/' + jsonObj.version
}

gulp.task('clean',function(cb){
  del(['build'], cb);
});
gulp.task('copy-html', function() {
 	gulp.src('./src/**/*.html')
    .pipe(gulp.dest(paths.build))
    .pipe(connect.reload())
});

gulp.task('stylCompile', function() {
  gulp.src('./src/**/bundle.styl')
    .pipe(stylus({
        compress:true
    }))
    // .pipe(stylus())
    .pipe(gulp.dest(paths.build))
    .pipe(connect.reload())
});

gulp.task('reload', function () {
  gulp.src('./build/**/*.*')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./src/**/*.html'], ['copy-html']);
  gulp.watch(['./src/**/bundle.styl'], ['stylCompile']);
  gulp.watch(['./build/**/*.*'], ['reload']);
});

gulp.task("connect",function(){
  connect.server({
    root : "./build",
    host: "localhost",
    port : 8082,
    livereload: true
  });
});

gulp.task('default', ['connect','watch']);