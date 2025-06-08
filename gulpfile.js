const { src, dest, watch, series, parallel } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const cards = require('./src/pug/data/cards.json');


const paths = {
  pug: {
    src: 'src/pug/pages/*.pug',
    dest: 'dist/',
    watch: ['src/pug/**/*.pug']
  },
  styles: {
    src: 'src/assets/styles/main.scss',
    dest: 'dist/css/',
    watch: 'src/assets/**/*.scss'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js/',
    watch: 'src/js/**/*.js'
  }
};

const images = {
  src: 'src/assets/images/**/*',
  dest: 'dist/images'
};

function copyFonts() {
    return src('src/assets/fonts/**/*')
      .pipe(dest('dist/assets/fonts'));
}

function compilePug() {
  return src(paths.pug.src)
    .pipe(plumber())
    .pipe(pug({
      pretty: true,
      locals: { cards }
    }))
    .pipe(dest(paths.pug.dest))
    .pipe(browserSync.stream());
}

function compileStyles() {
  return src(paths.styles.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function copyScripts() {
  return src(paths.scripts.src)
    .pipe(plumber())
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

function copyImages() {
  return src(images.src)
    .pipe(plumber())
    .pipe(dest(images.dest))
    .pipe(browserSync.stream());
}

function watchFiles() {
  browserSync.init({
    server: { baseDir: 'dist/' },
    notify: false
  });

  watch(paths.pug.watch, compilePug);
  watch(paths.styles.watch, compileStyles);
  watch(paths.scripts.watch, copyScripts);
  watch(images.src, copyImages);
}


exports.compilePug = compilePug;
exports.compileStyles = compileStyles;
exports.copyScripts = copyScripts;
exports.copyImages = copyImages;
exports.copyFonts = copyFonts;

exports.default = series(
  parallel(compilePug, compileStyles, copyScripts, copyImages, copyFonts),
  watchFiles
);
