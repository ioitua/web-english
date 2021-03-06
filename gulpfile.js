/* PIT Theme Gulpfile
 * Copyright © 2017 Viktor Yakubiv
 */

const gulp          = require('gulp');
const del           = require('del');
const filter        = require('gulp-filter');
const plumber       = require('gulp-plumber');
const rename        = require('gulp-rename');
const runSequence   = require('run-sequence');

const postcss       = require('gulp-postcss');
const autoprefixer  = require('autoprefixer');
const cssImport     = require('postcss-import');
const nano          = require('cssnano');
const sorting       = require('postcss-sorting');

const babel         = require('gulp-babel');
const uglify        = require('gulp-uglify');

const browserSync   = require('browser-sync').create();


gulp.task('clean', () => {
  return del('public');
});

gulp.task('css', () => {
  return gulp.src('src/css/main.css')
    .pipe(plumber())
    .pipe(postcss([cssImport(), autoprefixer(), sorting()]))
    .pipe(gulp.dest('public/css'))
    .pipe(filter('**/*.css'))
    .pipe(postcss([nano()]))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/css'))
    .on('end', browserSync.reload);
});

gulp.task('js', () => {
  return gulp.src('src/js/*')
    .pipe(plumber())
    // .pipe(babel({presets: ['env']}))
    // .pipe(rename({basename: 'app'}))
    // .pipe(gulp.dest('public/js'))
    // .pipe(uglify())
    // .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/js'));
});

gulp.task('html', () => {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('public'))
    .on('end', browserSync.reload);
});

gulp.task('images', () => {
  return gulp.src('src/images/**')
    .pipe(gulp.dest('public/images'))
    .on('end', browserSync.reload);
});

gulp.task('build', (cb) => {
  runSequence(
    'clean',
    ['css', 'js', 'html', 'images'],
    cb
  );
});

gulp.task('server', () => {
  return browserSync.init({
    server: 'public'
  });
});

gulp.task('watch', () => {
  gulp.watch('src/css/**', ['css']);
  gulp.watch('src/js/**', ['js']);
  gulp.watch('src/**/*.html', ['html']);
});

gulp.task('default', () => {
  runSequence('build', 'server', 'watch');
});
