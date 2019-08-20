const gulp = require("gulp");
const header = require("gulp-header");
const footer = require("gulp-footer");
const gulpBase64 = require("gulp-to-base64");

const imagesSourceFolder = "./src/images";
const imagesDestFolder = "./src/base64";
const imagesDestFileName = `${imagesDestFolder}/images.js`;

gulp.task("base64-convert", () => {
    return gulp.src(`${imagesSourceFolder}/*.{png,jpg,jpeg,svg,ttf}`).pipe(
        gulpBase64({
            outPath: imagesDestFileName,
        })
    );
});

gulp.task("base64-enrich-js", () => {
    return gulp
        .src(imagesDestFileName)
        .pipe(header("const IMAGES = "))
        .pipe(footer(";\nexport default IMAGES;"))
        .pipe(gulp.dest(imagesDestFolder));
});

gulp.task("base64", gulp.series("base64-convert", "base64-enrich-js"));
