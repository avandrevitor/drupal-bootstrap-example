/*
 * @author André Vitor Miranda <andre.miranda@gft.com>
 * @package drupal-bootstrap-example
 * @version 1.0.0
 * @license MIT
 */
var
    gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    clean   = require('gulp-clean'),
    uglify  = require('gulp-uglify'),
    concat  = require('gulp-concat'),
    inject  = require('gulp-inject');

var
    source = 'src/',
    js     = source +'js/',
    dest   = 'build/drupstrap/',
    bower  = 'bower_components/',
    bootstrap = {
        in: bower+'bootstrap-sass/'
    },
    fonts = {
        in: [source+'fonts/**/*', bootstrap.in + 'assets/fonts/**/*'],
        out: dest + 'fonts/'
    },
    images = {
        in: [source+'images/**/*'],
        out: dest + 'images/'
    };
    templates = {
        in: [source+'templates/**/*'],
        out: dest + 'templates/'
    };

var scss = {
    in: 'src/sass/main.scss',
    out: dest + 'css/',
    //watch: source + 'sass/**/*',
    sassOpts: {
        outputStyle: 'compressed',
        precison: 3,
        errLogToConsole: true,
        includePaths: [
            bootstrap.in + 'assets/stylesheets'
        ]
    }
}

gulp.task('default', ['build'], function (){});

gulp.task('clean', function() {
    return gulp.src([dest],{read: false})
     .pipe(clean());
});

gulp.task('fonts',['clean'], function () {
    return gulp
    .src(fonts.in)
    .pipe(gulp.dest(fonts.out));
});

gulp.task('images', function () {
    return gulp
    .src(images.in)
    .pipe(gulp.dest(images.out));
});

gulp.task('templates', function () {
    return gulp
    .src(templates.in)
    .pipe(gulp.dest(templates.out));
});

gulp.task('theme',function(){
    return gulp.src([
        source+'*.yml',
        source+'*.ico',
        source+'*.png',
        source+'*.theme'
    ]).pipe(gulp.dest(dest));
});

gulp.task('sass', ['fonts','images'], function () {
    return gulp.src([
        scss.in
    ])
    .pipe(sass(scss.sassOpts))
    .pipe(gulp.dest(scss.out));
});

gulp.task('js', function() {
    gulp.src([
        js + '**/*.js'
    ])
    //.pipe(uglify())
    //.pipe(concat('main.js'))
    .pipe(gulp.dest(dest+'js/'));
});

gulp.task('build', ['sass','js','templates','theme'],function () {
//    gulp.src(html + 'index.html')
//        .pipe(inject(gulp.src(dest+'css/**/*.css', {read: false}), {relative: true}))
//        .pipe(inject(gulp.src(dest+'js/main.js', {read: false}), {relative: true}))
//        .pipe(gulp.dest(dest));
});
