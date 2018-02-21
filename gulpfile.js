const gulp = require('gulp');
const fs = require('fs');
const sequence = require('gulp-sequence');
const critical = require('critical');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const inline = require('gulp-inline');

gulp.task('criticalCSS', (cb) => {
    critical.generate({
        inline: true,
        base: 'dist/',
        src: 'index.html',
        dest: 'index.html',
        width: 960,
        height: 600,
        minify: true,
        extract: true,
    }, cb.bind(cb));
});

gulp.task('minify-css', () => {
    return gulp.src('dist/assets/css/*.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('inline', () => {
    return gulp.src('dist/index.html')
    .pipe(inline({
      base: 'dist',
      disabledTypes: ['css'],
      ignore: ['dist/*.chunk.js']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('htmlmin', () => {
    return gulp.src('dist/*.html')
      .pipe(htmlmin({
        collapseWhitespace: true,
        minifyCSS: true,
        minfyJS: true
      }))
      .pipe(gulp.dest('dist'));
});

gulp.task('redirects', (cb) => {
    fs.writeFile('dist/_redirects', '/*    /index.html   200', cb);
});

gulp.task('css', sequence('minify-css', 'criticalCSS'));
gulp.task('html', sequence('htmlmin'));
gulp.task('default', sequence('css', 'html', 'redirects'));
