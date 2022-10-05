
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
const plumber = require('gulp-plumber')

// Imagenes 
const webp = require('gulp-webp')

function css(done) {
    src('src/scss/**/*.scss') //identificar el archivo sass a compilar
        .pipe(plumber())
        .pipe(sass()) //compilarlo
        .pipe(dest('build/css'));      //almacenarla
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

function dev(done) {

    watch('src/scss/**/*.scss', css);

    done();
}

exports.css = css;
exports.versionWebp = versionWebp;
exports.dev = parallel(versionWebp, dev);