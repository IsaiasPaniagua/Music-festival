
// function task(done) {
//     console.log("my first task");

//     done();
// }

// exports.task = task;
//extraer la funcionalidad del gulpfile
//src para identificar un archivo dest para guardarlo
// const {src, dest, watch} = require("gulp");
// const sass = require("gulp-sass")(require('sass'));

// function css(done) {
//     //1-identificar el archivo de sass
//     //2-compilar las funciones de sass
//     //3-almacenarla en el disco duro
//     // |           1        |       2      |             3          |
//     src("src/scss/app.scss").pipe( sass() ).pipe( dest("build/css") );
    

//     done();
// }

// function dev(done) {
//     watch("src/scss/app.scss", css);

//     done();
// }

// exports.css = css;
// exports.dev = dev;
const {src, dest, watch, parallel} = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer'); // Va asegurarse de que los estilos funcionen en cualquier navegador
const cssnano = require('cssnano'); // Va a comprimir nuestro codigo de css
const postcss = require('gulp-postcss'); // Va a hacer algunas transformaciones por medio de los dos de arriba
const sourcemaps = require('gulp-sourcemaps');

// Imagenes 
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

// JS
const terser = require('gulp-terser-js');

function css(done) {
    src('src/scss/**/*.scss') //identificar el archivo sass a compilar
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass()) //compilarlo
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'));      //almacenarla
    done();
}

function imagenes(done){
    const opciones = {
        optimizationLevel:3
    }
    src('src/img/**/*.{png, jpg}')
    .pipe( cache( imagemin(opciones)))
    .pipe( dest('build.img'))
    done();
}

function versionWebp(done) {

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones) )
        .pipe(dest('build/img'))
    done();
}

function javascript( done) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));

    done();
}

function dev(done) {

    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);

    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.dev = parallel(imagenes, versionWebp,javascript, dev);