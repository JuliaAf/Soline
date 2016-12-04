"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync");
var rename = require("gulp-rename");
var clearCSS = require("gulp-clean-css");
var rimraf = require("rimraf");
var merge = require("merge-stream");
var pug = require("gulp-pug");
var watch = require("gulp-watch");
var combineMq = require('gulp-combine-mq');

gulp.task("clean", function (cb){
  rimraf("./build", cb)
});

gulp.task("pug", ["clean"], function() {
  return gulp.src("pug/index.pug")
  .pipe(plumber())
  .pipe(pug())
  .pipe(gulp.dest(""))
  .pipe(server.reload({stream: true}));
});

gulp.task("style", ["pug"], function() {
  gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Opera versions",
        "last 2 Edge versions"
      ]})
    ]))
    .pipe(gulp.dest("css"))
    .pipe(server.reload({stream: true}));
});

gulp.task("compress", ["style"], function(){
  gulp.src("css/**/*.css")
  .pipe(clearCSS())
  .pipe(combineMq({
        beautify: false
    }))
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("css"));
});

gulp.task("build", ["compress"], function(){
  var htmls = gulp.src("index.html")
  .pipe(gulp.dest("build"));

  var imgs = gulp.src("img/**/*.{png,jpg,gif,svg,ico}")
  .pipe(gulp.dest("build/img"));

  var fonts = gulp.src("fonts/**/*.{woff,woff2,otf,ttf}")
  .pipe(gulp.dest("build/fonts"));

  var jss = gulp.src("js/**/*.js")
  .pipe(gulp.dest("build/js"));

  var phps = gulp.src("php/**/*.php")
  .pipe(gulp.dest("build/php"));

  var csss = gulp.src("css/**/*.css")
  .pipe(gulp.dest("build/css"));

  return merge(htmls, imgs, jss, fonts, phps, csss);
})


gulp.task("serve", ["style", "pug"], function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    ui: false
});
  gulp.watch("less/**/*.less", ["style"]);
  gulp.watch("pug/**/*.pug", ["pug"]);
  gulp.watch("*.css").on("change", server.reload);
  gulp.watch("*.html").on("change", server.reload);
});
