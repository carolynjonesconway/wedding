var gulp = require("gulp");
var less = require("gulp-less");
var rename = require("gulp-rename");
var minCss = require("gulp-clean-css");

gulp.task("styles", function(){
    return gulp.src(__dirname + "/src/less/**/*", {base: __dirname + "/src/less"})
        .pipe(less())
        .pipe(minCss())
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(gulp.dest(__dirname + "/static/css/"));
});

gulp.task("watch", function() {
    return gulp.watch(__dirname + "/src/less/**/*", ["styles"]);
});