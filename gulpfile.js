var gulp = require("gulp");
var less = require("gulp-less");
var rename = require("gulp-rename");
var minCss = require("gulp-clean-css");
var minJs = require("gulp-uglify");
var concat = require("gulp-concat");
var del = require("del");

var src = __dirname + "/src";
var dest = __dirname + "/static";

gulp.task("styles", function() {
    return gulp.src([
            src + "/lib/css/**/*",
            src + "/less/**/*"
        ])
        .pipe(concat("style.min.css"))
        .pipe(less())
        .pipe(minCss())
        .pipe(gulp.dest(dest + "/css/"));
});

gulp.task("img", function() {
    return gulp.src(src + "/img/**/*", {base: src + "/img"})
        .pipe(gulp.dest(dest + "/img"));
});

gulp.task("fonts", function(){
    return gulp.src(src + "/fonts/**/*", {base: src + "/fonts"})
        .pipe(gulp.dest(dest + "/fonts"))
});

gulp.task("js", function() {
    return gulp.src([
            src + "/js/google_analytics.js",
            src + "/lib/js/jquery.js",
            src + "/lib/js/bootstrap.js",
            src + "/lib/js/**/*",
            src + "/js/**/*.js"
        ], {base: src + "/js"})
        .pipe(concat("app.min.js"))
        .pipe(minJs())
        .pipe(gulp.dest(dest + "/js"))
});

gulp.task("watch", function() {
    gulp.watch(src + "/js/**/*", ["js"]);
    gulp.watch(src + "/less/**/*", ["styles"]);
});

gulp.task("clean", function(){
    return del(dest);
});

gulp.task("build", ["styles", "img", "js", "fonts"]);

gulp.task("default", ["build"]);