var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    jade = require("gulp-jade"),
    sass = require("gulp-sass"),
    plumber = require("gulp-plumber"),
    autoprefixer = require("gulp-autoprefixer");


gulp.task("autoprefixer", function(){
    return gulp.src("../public/assets/css/*.css")
    .pipe(plumber())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest("../public/assets/css"));
});

gulp.task("jade_html", function(){
    gulp.src(["index.jade", "./article/article.jade"])
    .pipe(plumber())
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest("../public/"));
});


gulp.task("sass_css", function(){
    gulp.src("./main.scss")
    .pipe(plumber())
    .pipe(sass({outputStyle: "compressed"}))
    .pipe(gulp.dest("../public/assets/css"));
});

gulp.task("watch", function(){
        gulp.watch(["./*.jade", "./articles/*.jade", "./aside/*.jade" ,"./footer/*.jade", "./header/*.jade", "./nav/*.jade", "./topBanner/*.jade", "./article/article.jade"], ["jade_html"]);
        gulp.watch(["./*.scss", "./articles/*.scss", "./aside/*.scss", "./footer/*.scss", "./header/*.scss", "./nav/*.scss", "./topBanner/*.scss", "./article/*.scss"], ["sass_css"]);
        gulp.watch("../public/assets/css/*.css", ["autoprefixer"]);
});
