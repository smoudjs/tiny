var del = require('del');
var gulp = require('gulp');
var path = require('path');
var argv = require('yargs').argv;
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('gulp-buffer');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var babelify = require('babelify');
var browserify = require('browserify');
var gap = require('gulp-append-prepend');
var rename = require("gulp-rename");
var stripDebug = require('gulp-strip-debug');

function isProduction() {
    return argv.production;
}

var BUILD_PATH = "./lib/"

function cleanBuild(cb) {
    del([BUILD_PATH + '**/*.*']);
    cb()
}


function buildProd(cb) {
    browserify({
        paths: [path.join(__dirname, '/')],
        entries: ['./src/index.js'],
        debug: false,
        transform: [
            [
                babelify, {
                    presets: ["@babel/preset-env"]
                }
            ]
        ]
    })
        .transform(babelify)
        .bundle(function (err, buff) {
            if (err)
             console.log(err)
           // var content = buff.toString("utf8")

            cb()
        }).on('error', function (error) {
            cb()
        })
        .pipe(source("gulp_tiny.js"))
        .pipe(buffer())
        .pipe(gulp.dest(BUILD_PATH + "uncompressed"))
        .pipe(uglify())
        .pipe(gulp.dest(BUILD_PATH));
}


function build(cb) {
    buildProd(function() {
       cb()
    })
         //   .pipe(gulp.dest(BUILD_PATH));
   //     }


// gulp.src(['./SDKdev.js'])
//         .pipe(uglify(uglify_opt))
//         .pipe(gulp.dest("../GPG_MI/local_build/"));
//        // .pipe(gulp.dest(BUILD_PATH));
//     cb()

}


gulp.task('cleanBuild', cleanBuild);
gulp.task('build', build);


gulp.task('default', gulp.series('build'));