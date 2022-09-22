
// function task(done) {
//     console.log("my first task");

//     done();
// }

// exports.task = task;
//extraer la funcionalidad del gulpfile
//src para identificar un archivo dest para guardarlo
const {src, dest} = require("gulp");
const sass = require("gulp-sass")(require('sass'));

function css(done) {
    //1-identificar el archivo de sass
    //2-compilar las funciones de sass
    //3-almacenarla en el disco duro
    // |           1        |       2      |             3          |
    src("src/scss/app.scss").pipe( sass() ).pipe( dest("build/css") );
    

    done();
}

exports.css = css;