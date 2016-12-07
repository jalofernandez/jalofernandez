/*
* Dependencias
*/
   var gulp = require('gulp'),
     concat = require('gulp-concat'),
     uglify = require('gulp-uglify'),
   cleanCSS = require('gulp-clean-css'),
   imagemin = require('gulp-imagemin'),
gulpIgnore  = require('gulp-ignore'),
       less = require('gulp-less'),
       path = require('path'),
       jade = require('gulp-jade'),
    sitemap = require('gulp-sitemap');

/*
* Configuración de la tarea 'default' (gulp) last step to publish
*/
gulp.task('default', ['sitemap', 'css']);

/*
* Configuración de la tarea 'deploy' (gulp) first step: compile
*/
gulp.task('deploy', ['js', 'jade', 'less', 'img']);

/*
* Configuración de la tarea 'js' --> gulp-concat + gulp-uglify (gulp js)
*/
gulp.task('js', function () {
  gulp.src('js/sources/*.js')
  .pipe(concat('scripts-min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('js/dist/'))
});

/*
* Configuración de la tarea 'css' --> gulp-clean-css (gulp css)
*/
gulp.task('css', function() {
  return gulp.src('css/sources/style.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('css/dist'));
});

/*
* Configuración de la tarea 'img' --> gulp-imagemin (gulp img)
*/
gulp.task('img', function () {
    return gulp.src(['img/sources/**/*.*'])
        .pipe(imagemin())
        .pipe(gulp.dest('img/dist'));
});

/*
* Configuración de la tarea 'less' --> gulp-less (gulp less)
*/
gulp.task('less', function () {
  return gulp.src('./less/**/[^_]*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./css/sources'));
});

/*
* Configuración de la tarea 'jade' --> gulp-jade (gulp jade)
*/
gulp.task('jade', function () {
  var YOUR_LOCALS = {};
  gulp.src('./templates/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./'));
});

/*
* Configuración de la tarea 'sitemap' --> gulp-sitemap (gulp sitemap)
*/
gulp.task('sitemap', function () {
    gulp.src('*.html', {
            read: false
        })
        .pipe(sitemap({
            siteUrl: 'http://www.jalofernandez.com',
            changefreq: 'weekly',
            priority: '1.0'
        }))
        .pipe(gulp.dest('./'));
});