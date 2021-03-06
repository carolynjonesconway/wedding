var gulp = require("gulp");
var less = require("gulp-less");
var rename = require("gulp-rename");
var minCss = require("gulp-clean-css");
var minJs = require("gulp-uglify");
var concat = require("gulp-concat");
var del = require("del");
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var gutil = require("gulp-util");
var sequence = require("run-sequence").use(gulp);
var aws = require("gulp-awspublish");
var publisher = aws.create({
    region: "us-east-1",
    params: {
        Bucket: "cocoandej"
    }
});

var src = __dirname + "/src";
var dest = __dirname + "/static";


gulp.task("styles", function() {
    return gulp.src([
            src + "/lib/css/**/*",
            src + "/less/**/*"
        ], {base: src})
        // .pipe(sourcemaps.init())
        .pipe(concat("style.min.css"))
        .pipe(less())
        .pipe(autoprefixer({
            browsers: [">1%"]
        }))
        // .pipe(minCss()) // This is breaking some of our CSS
        // .pipe(sourcemaps.write("maps"))
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

gulp.task("clean", function(){
    return del(dest);
});

gulp.task("build", ["styles", "img", "js", "fonts"]);

gulp.task("push:s3", ["clean"], function(done) {
    sequence("build", function() {
        gulp.src(dest + "/**/*", { base: dest })
            .pipe(publisher.publish({}, {force: true}))
            .pipe(aws.reporter())
            .on("end", done);
    });
});

gulp.task("watch", function() {
    gulp.watch(src + "/js/**/*", ["js"]);
    gulp.watch(src + "/img/**/*", ["img"]);
    gulp.watch(src + "/fonts/**/*", ["fonts"]);
    gulp.watch(src + "/less/**/*", ["styles"]);
});

gulp.task("default", ["clean"], function(){
    return gulp.start("build");
});
