const gulp = require('gulp')
const del = require('del')
const concat = require('gulp-concat')
const sass = require('gulp-sass')(require('sass'))
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const cleanCss = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

// пути
const paths = {
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    }
}

// стили
function styles() {
    return gulp.src(paths.styles.src , {sourcemaps: true})
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleanCss())
        .pipe(rename({
             suffix: '.min' 
        }))
        .pipe(gulp.dest(paths.styles.dest , {sourcemaps: true}))
}


// скрипты
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(paths.scripts.dest))
}


// отчистка каталога
function clean() {
    return del(['dist'])
}


// наблюдатель
function watch() {
    gulp.watch(paths.styles.src, styles )
    gulp.watch(paths.scripts.src, scripts)
}


const build = gulp.series( clean, gulp.parallel(styles,scripts) ,watch )

exports.clean = clean
exports.styles = styles
exports.watch = watch
exports.scripts = scripts
exports.build = build
exports.default = build