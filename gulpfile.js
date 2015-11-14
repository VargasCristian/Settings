//------------------------------------------
// Librerias Requeridas
//------------------------------------------
var gulp = require("gulp");
var webserver = require('gulp-webserver');
var stylus = require('gulp-stylus');
var jade = require("gulp-jade");
var nib = require("nib");
var minifyCss = require("gulp-minify-css");
var plumber = require("gulp-plumber");

//----------------------------------------
// configuración de rutas
//----------------------------------------
var config = {
    styles: {
        main: "./src/styles/main.styl",
        watch: "./src/styles/**/*.styl",
        output: "./build/css"
    },
    jade: {
        main: "./src/jade/*.jade",
        watch: "./src/jade/**/*.jade",
        output: "./build"
    }
}

//------------------------------------------
//WebServer
//------------------------------------------

gulp.task("server", function(){
    gulp.src("./build")
        .pipe(plumber())
        .pipe(webserver({
            host: "0.0.0.0",
            port: 8080,
            livereload: true
        }));
});


//----------------------------------------
// Compilar Jade
//----------------------------------------
gulp.task("build:jade", function(){
    gulp.src(config.jade.main)
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(config.jade.output));
});


//----------------------------------------
//Compilar Stylus
//----------------------------------------
gulp.task("build:css", function(){
    gulp.src(config.styles.main)
        .pipe(plumber())
        .pipe(stylus({
            use: nib(),
            "include css": true
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest(config.styles.output));
});

//--------------------------------------------
//Build 
//--------------------------------------------
gulp.task("build", ["build:css", "build:jade"]);

//--------------------------------------------
//Watch
//--------------------------------------------
gulp.task("watch", function(){
    gulp.watch(config.styles.watch, ["build:css"]);
    gulp.watch(config.jade.watch, ["build:jade"]);
});

//---------------------------------------
//Default
//---------------------------------------
gulp.task("default", ["server", "build", "watch" ]);
