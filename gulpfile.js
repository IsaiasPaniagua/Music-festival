
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
const {src, dest, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber')

function css(done) {
    src('src/scss/**/*.scss') //identificar el archivo sass a compilar
        .pipe(plumber())
        .pipe(sass()) //compilarlo
        .pipe(dest('build/css'));      //almacenarla
    done();
}

function dev(done) {

    watch('src/scss/**/*.scss', css);

    done();
}

exports.css = css;
exports.dev = dev;